---
title: "ESP32-P4 Smart Vision Terminal: A Competition Project Dev Log"
description: "ESP32-P4 + ESP32-C3 dual-MCU terminal, from an empty board to a thing that talks back. What I built, what broke, where it ended up."
pubDate: 2026-05-30
tags: [Embedded, ESP32, Competition]
---

A project I'm prepping for my school's embedded-systems competition. About six weeks in, 81 commits, 15 git tags, current version `v1.3-tools`. Repo at [github.com/Hooper18/esp32p4_competition](https://github.com/Hooper18/esp32p4_competition). This post is a dev log for my own retrospective use — and a way to land the full story in five minutes for anyone interviewing or reviewing.

## What it does

A smart vision terminal built around an ESP32-P4 main chip and an ESP32-C3 coprocessor. Power on: the camera streams 30 fps preview to the LCD, the mic listens, the HUD shows live status. Hit REC and talk; the cloud loop runs Whisper + GPT-4o + TTS, and the speaker answers. During the call, GPT can invoke seven tools on its own: take a photo, fetch weather, set a timer, read ambient sound level, check device status, report current time, play a beep.

## What it looks like

The 5.5″ 720×1280 MIPI LCD shows camera preview with an RGB565 HUD overlay. A stable-state HUD frame:

```text
FPS 30.0  AI 1MS
CAM OK    TOUCH OK
C3 OK     WIFI OK
RSSI -52  IP 192.168.x.x
NET OK    HTTP 204 320MS
mic LVL 3 SPEECH
ASR 7.5s · LLM 5.5s · TTS 5.1s
< last turn transcript >
[REC] [CAM] [STOP]
```

![Live: the HUD in its boot-greeting stable state](/images/projects/esp32p4-2.jpg)

Hit REC, ask "what time is it in Beijing"; 7.5 seconds later the speaker answers "14:32 Beijing time." Say "beep in 5 seconds"; once TTS finishes saying "sure, timer set," 5 seconds later you hear three beeps. Say "take a look and describe it for me"; GPT calls `take_photo` on its own, the frame goes up, then GPT answers.

![On the bench: asking "how's the weather in Beijing today," GPT calls get_weather on its own, condenses the Open-Meteo JSON into a natural sentence, and the TTS reads it back](/images/projects/esp32p4-3.jpg)

## What's in the box

**Hardware**

- Main chip: ALIENTEK DNESP32P4 (ESP32-P4 RISC-V 400 MHz + PSRAM + MIPI display/camera hardware acceleration + H.264 codec)
- Coprocessor: ESP32-C3-DevKitM-1-N4X (handles all Wi-Fi / HTTPS — the P4 has no radio of its own)
- Display: 5.5″ MIPI DSI LCD 720×1280
- Touch: GT911 I²C capacitive
- Camera: OV5645 MIPI CSI
- Mic: INMP441 digital I²S
- Amp: MAX98357A digital I²S
- Interconnect: UART1 between P4 and C3, started at 115200 then pushed to 460800 (GPIO28/29 ↔ GPIO5/4, only UART and shared ground)

**Software stack**

ESP-IDF v5.5.4, C/C++, FreeRTOS, LVGL v9 + esp_lvgl_port, minimp3, cJSON, PPA framebuffer hardware acceleration, esp_jpeg_enc. Cloud side: OpenAI Whisper / GPT-4o / TTS. Weather: Open-Meteo (free tier).

**Why two MCUs**

The ESP32-P4 is powerful but ships with no Wi-Fi / Bluetooth radio, so the C3 handles the entire network stack as a coprocessor. Two benefits from that split:

1. The P4 stays focused on real-time audio/video — 30 fps camera + full-duplex I²S + LVGL UI + AI inference scheduling all live on the P4 without being interrupted by Wi-Fi / TCP work
2. The C3 isolates TLS handshakes, cert validation, and streaming HTTP up/down — the P4 only sees a clean base64 byte stream

The cost: you have to design a reliable dual-MCU protocol yourself. That turned out to be the single biggest technical challenge of the project.

## Features shipped (current v1.3-tools)

**Inputs**

- Voice recording: tap REC to start, tap again to stop; or let the local VAD auto-stop after 1.5 s of silence
- Image capture: tap CAM to grab a frame; or hold both REC + CAM for "talk while showing"
- Touch: GT911 full-screen + three virtual buttons in the HUD

**Cloud pipeline**

- VAD upload trimming: `make_wav` trims leading/trailing silence — typical 5 s recording shrinks 30-50%
- ASR: OpenAI Whisper-1
- LLM: OpenAI gpt-4o-2024-11-20 with a JARVIS-flavored system prompt, last 3 turns of history, and function calling
- TTS: OpenAI gpt-4o-mini-tts, `coral` voice, streamed MP3

**Function-calling toolset (7)**

- `get_ambient_sound_level` — current room loudness bucket
- `get_device_status` — Wi-Fi RSSI / uptime / free heap
- `take_photo` — trigger a capture
- `play_beep(freq, duration)` — beep
- `get_time` — Beijing time (Y/M/D/h/m/s + weekday)
- `set_timer(seconds)` — one-shot timer, three beeps when it fires
- `get_weather(lat, lon)` — Open-Meteo weather at any coordinate

**Outputs**

- Streaming TTS playback over I²S (download + decode + play in parallel)
- MIPI DSI 720×1280 LCD: camera preview + RGB565 HUD overlay

## What broke (and what I learned)

### 1. Dual-MCU UART stability (the painful one)

Started with a naive text protocol: one base64 line per frame, `HTTP_POST_DATA <b64>\n`. Any single bit flip would fail the base64 decode and abort the whole request.

The baud-rate climb was a string of slaps:

```
5dc8c79  P4↔C3 UART 115200 → 921600, latency ~106s → ~35s
cf7fdf1  921600 too aggressive (dropped bytes), down to 460800 + C3 RX 16K + TX wait drain
ef6ec75  460800 still drops bytes, down to 230400 + RX 32K + ets_delay_us(1000) cushion
a8ec1e5  back to 115200: 230400 still bit-flips occasionally — stability first, optimize later
```

The root cause, in hindsight: **DuPont wires, no shielding, no hardware flow control — anything above 115200 produces occasional bit flips**. Lowering baud and growing buffers was treating the symptom.

The real fix was protocol v2: every frame carries `seq=NN crc=XXXX` (CRC16-LE via the ROM's `esp_rom_crc16_le`), stop-and-wait waiting for ACK before sending the next frame, NAK/timeout triggering retransmission of the same seq up to three times.

But v1.0 of that protocol blew up on first deploy: camera glitched, buttons locked. Diagnosis: **the 200 ms ACK timeout was completely inadequate for the upload path** — when C3 calls `esp_http_client_write` it can block >1 s under TCP backpressure, so the ACK arrives late, then pollutes the next HEALTH heartbeat channel.

v1.2 patched two things:

1. ACK timeout 200 ms → 2000 ms (covers worst-case TCP backpressure)
2. After retries are exhausted, `uart_flush_input` to clear stale ACKs and cut off the path where they poison the HEALTH channel into deadlock

Result: 0% uplink CRC errors, 1.3% downlink (every NAK-retransmit succeeded), zero link deadlocks, ASR time 14 s → 7.5 s.

Biggest takeaway: protocol design has to **consider every blocking point on both the sender and the receiver**; ACK timeout shouldn't be "theoretical round-trip × 1.5" — it should be "worst case how slow can the receiver get."

### 2. Streaming TTS playback

OpenAI TTS returns an MP3 stream; you want download + decode + play in parallel. First attempt — feeding minimp3 directly from UART chunks — failed: minimp3's layer-III bit reservoir needs byte continuity across frames, and UART chunk boundaries broke that. After the first frame I got 153 consecutive skips.

The opposite — full-buffer then decode — works perfectly but adds a >10 s wait before sound.

The final design is **two tasks + adaptive pre-buffer**. The UART chunk callback only appends bytes to a PSRAM accumulator. An independent decoder task pulls from the accumulator into minimp3 → pushes PCM into the audio_service stream ring → a player task drains to I²S TX.

The key trick is the adaptive pre-buffer:

```
prebuf_audio_ms ≥ remaining_download_ms × 0.7
```

I track observed download rate × `content_length` to estimate "how much download is left," and only call `audio_service_pcm_stream_start` once the pre-buffer covers that remaining time. So no matter how slow the network is, the ring never under-runs.

OpenAI TTS uses chunked transfer with no `content_length` — fallback: start playback as soon as download_done fires.

### 3. Reading digits aloud

The TTS kept butchering numbers. "38640" became "34680," "532" became "332," "024" came out as "zero hundred two ten four."

The chain of attempts:

1. Added an instruction "read Arabic digits one at a time" — TTS doesn't strictly obey instructions
2. Inserted spaces between digits, "5 3 2" — TTS still merged them as "five hundred thirty-two"
3. Replaced with Chinese characters "五三二" — worked, but "11" → "一一" got reduced by the TTS to just "一"
4. Added a separator "一、一" — better but still occasionally muddled
5. Final form: convert 1-99 to natural Chinese numerals ("11" → "十一"), 3+ digits per-digit ("2026" → "二零二六"), decimal point → "点", leading-zero pairs preserved ("01" → "零一", which fixed "12:01" getting read as "12:1")

Lesson: with Chinese TTS, digit-reading bugs are near-unavoidable; deal with them in a text preprocessor instead of trusting the model to obey instructions.

### 4. Function-calling side-effect timing

First time I shipped `set_timer(seconds)`, the user said "beep in 5 seconds" — and heard the beep before GPT finished saying "sure, timer set."

Cause: tool execution is synchronous, so `esp_timer_start_once(5_s)` fires immediately. But there's still a GPT round 2 (5-10 s) plus a TTS download + playback (15 s) ahead. The 5-second timer fired before TTS even started.

Fix: the tool doesn't start `esp_timer` directly — it stashes `seconds` in a static `s_deferred_timer_seconds`, and `cloud_pipeline_task` calls `cloud_pipeline_fire_deferred_timer()` only after TTS playback finishes. The variable resets at the start of each turn so a failed timer from a previous turn can't leak into the next.

### 5. Other small bites

- INMP441 pinout: the onboard ES8388 occupies GPIO46-50, so the external mic has to use GPIO16-20. Four pin combos before the right one (matrix kept in `02_verified_demos/p4_i2s_mic_test/`)
- FreeRTOS doesn't warn you about stack overflow — it just panics. New habit: every new task starts with 32 KB
- PPA output buffers must be 64-byte aligned, otherwise it errors out
- OpenAI's first TLS handshake after boot fails a lot → C3 added 3 retries with 1 s gap
- Single-frame RMS noise spikes were triggering false SPEECH → added EMA smoothing; speech vs. clapping looked identical → added peak hold/decay

## Numbers

End-to-end conversation:

| Stage | Typical time | Notes |
|---|---|---|
| Recording | User-controlled | VAD auto-stops at 1.5 s silence, usually 3-8 s |
| Whisper upload + ASR | 7-12 s | 100 KB WAV upload + OpenAI processing |
| GPT round 1 | 3-8 s | Includes tools spec |
| Tool execution | 0.1-3 s | `get_weather` adds a GET round-trip |
| GPT round 2 (if tool) | 3-8 s | Synthesizes tool result into reply |
| TTS download + decode | 6-15 s | 100-200 KB MP3, includes prebuf |
| TTS playback | Matches audio length | 4-8 s typical |
| **Total (no tool)** | **~30 s** | |
| **Total (with tool)** | **~40 s** | |

UART link (v1.2 at 460800 baud, measured):

- Uplink throughput ~25 KB/s (including ACK round-trip)
- Downlink throughput ~23 KB/s
- Uplink CRC error rate 0% (175 frames tested)
- Downlink CRC error rate 1.3% (750 frames tested, every NAK-retransmit succeeded)
- 0 fatal errors / 0 link deadlocks

![The full rig mid-development: breadboard + main board + C3 coprocessor on the left, LCD running live camera preview on the right](/images/projects/esp32p4-5.jpg)

## Limitations

To be honest:

- **AI is still a dummy inference / skeleton**. The "AI 1MS" on the HUD only exercises the local inference scheduling framework — no real model attached. Real on-device AI is still TODO before the competition
- **Fully cloud-dependent for LLM**. No internet, no half the features. OpenAI / Groq have real-world issues — slow responses (GPT POST 30+ s), region instability, quota limits. Groq Whisper testing once hit what looked like a quota exhaustion, manifesting as severe TCP backpressure
- **Round-trip is not fast**. Typical 30-40 s. The bottlenecks are ASR upload + TTS download — next experiment is Opus-encoded audio upload (WAV 100 KB → ~10-15 KB, ASR upload 1-2 s) and GPT-4o SSE streaming
- **Physical UART layer still drops 1.3% downlink**. Considering bare DuPont wires with no flow control, that's not bad — but it's only stable because of retransmission, not because the physical layer is good
- **Only two cloud APIs wired up** (OpenAI + Open-Meteo). Demoing anything else on stage means more integration

Things I want to ship next, but haven't started: a `look_around` vision tool (so GPT can opt into the camera instead of waiting for the user to press CAM), HUD widgets for tool results (weather icon, timer countdown bar), Opus-encoded uploads, and refactoring `cloud_service` into an explicit FSM.

## Habits this project hammered into me

Six weeks of being slapped around bought a few engineering reflexes:

- **Incremental verification + isolated demos**. Each hardware subsystem first ran as a standalone demo under `02_verified_demos/` before being merged into the main project. Saved me multiple times (pin fixes, I²S mode fixes, cert bundle fixes)
- **HUD as a state mirror**. Putting state-machine state, current tool name, per-stage timings, UART link state on screen meant on-stage debugging didn't need a serial cable
- **Commit messages as docs**. Each commit explains "why this change + measured numbers." Half a year later, I can rebuild context instantly
- **Git tags as safety nets**. Tag every milestone; when a deploy disaster hits, `git reset --hard <last_good_tag>` is a one-liner rollback
- **32 KB stacks by default**. FreeRTOS doesn't politely tell you the stack is too small — it just panics
- **Stop-and-wait beats sliding window over UART**. UART throughput and network throughput aren't on the same order of magnitude, so pipelining buys little and adds plenty of complexity

The repo's `00_docs/DEVELOPMENT_JOURNEY.md` is the full 682-line version, with commit traces, error codes, and speedup ratios on every problem. Once the competition is over, it'll also be paper material.
