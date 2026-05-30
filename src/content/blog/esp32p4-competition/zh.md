---
title: "ESP32-P4 智能视觉终端"
description: "ESP32-P4 + ESP32-C3 双 MCU 智能交互终端，比赛项目开发记录。"
pubDate: 2026-05-30
tags: [嵌入式, ESP32, 比赛]
---

准备学校嵌入式系统比赛的项目。当前版本 v1.3-tools。仓库 [github.com/Hooper18/esp32p4_competition](https://github.com/Hooper18/esp32p4_competition)。

## 干了什么

DNESP32P4 开发板（ESP32-P4 主控）+ ESP32-C3 协处理器构成的双 MCU 智能交互终端。P4 负责本地视觉、显示、触摸、音频、HUD；C3 隔离整个网络栈，专跑 Wi-Fi 和 HTTPS。两者通过 UART1（115200 8N1）连接，承载语音对话、视觉问答和工具调用的全部上下行数据。

## 效果

5.5 寸 720×1280 MIPI LCD 上同时显示摄像头预览和 RGB565 HUD 叠加。稳定状态：

```text
FPS 30.0  AI 1MS
CAM OK    TOUCH OK
C3 OK     WIFI OK
RSSI -52  IP 192.168.x.x
NET OK    HTTP 204 320MS
mic LVL 3 SPEECH
ASR 7.5s · LLM 5.5s · TTS 5.1s
[REC] [CAM] [STOP]
```

![LCD 启动后的 HUD：开机问候已就绪](/images/projects/esp32p4-2.jpg)

实际对话样例：

- 问"现在北京几点" → 喇叭回答"北京时间 14 点 32 分"
- 说"5 秒后哔一下" → TTS 播完"已设置"，5 秒到时哔三声
- 说"看一眼帮我描述一下" → GPT 自动 call `take_photo` 拍照上传再回答

![天气查询：GPT 自动 call get_weather，把 Open-Meteo 结构化数据整理成自然语言](/images/projects/esp32p4-3.jpg)

![视觉问答：GPT 收到照片后描述桌面场景](/images/projects/esp32p4-4.jpg)

端到端延迟典型 30 秒（无 tool）/ 40 秒（有 tool）。

## 用了什么

**硬件**

- 主控：正点原子 DNESP32P4（ESP32-P4 RISC-V 400MHz + PSRAM + MIPI 显示/摄像头硬件加速）
- 协处理器：ESP32-C3-DevKitM-1-N4X
- 显示：5.5″ MIPI DSI LCD 720×1280
- 触摸：GT911 I2C
- 摄像头：OV5645 MIPI CSI 1280×960 RGB565
- 麦克风：INMP441 数字 I2S
- 功放：MAX98357A 数字 I2S
- 互联：P4 ↔ C3 UART1，GPIO28/29 ↔ GPIO5/4，115200 起步后升 460800

**软件栈**：ESP-IDF v5.5.4 / C/C++ / FreeRTOS / LVGL v9 + esp_lvgl_port / minimp3 / cJSON / PPA framebuffer 硬件加速 / esp_jpeg_enc / OpenAI Whisper · GPT-4o · TTS / Open-Meteo Weather。

**双 MCU 分工**：ESP32-P4 性能强但没有 Wi-Fi/BT 射频，所以让 C3 隔离整个网络栈。这样 P4 专注实时音视频（30fps 预览 + I2S 全双工 + LVGL UI + AI 推理调度）不被网络中断打断；C3 隔离 TLS 握手、cert 验证、HTTP 上下行，P4 只看到简洁的 base64 字节流。代价是要自己设计可靠的双 MCU 通信协议——这成为项目最大的技术挑战。

![实拍：P4 ↔ C3 的杜邦线和外设接线](/images/projects/esp32p4-7.jpg)

## 达到了什么功能

**输入**

- 语音录音：REC 按一下开始、再按停；或本地 VAD 检测 1.5 s 静音自动停
- 图像捕获：CAM 按一下抓帧；可与 REC 同按实现"看着说"
- 触摸：GT911 全屏 + HUD 三个虚拟按钮（REC / CAM / PLAY）

**云端处理流程**

- VAD 上传裁剪：典型 5 s 录音体积减 30-50%
- ASR：OpenAI Whisper-1
- LLM：OpenAI gpt-4o-2024-11-20，含人格化 system prompt + 最近 3 轮历史 + 当前北京时间 + function calling
- TTS：OpenAI gpt-4o-mini-tts，coral 音色，MP3 流式输出。数字 / ℃ / % 走文本预处理再合成

**Function calling 工具集（7 个）**

本地工具：

- `get_ambient_sound_level` — 当前环境音量等级
- `get_device_status` — Wi-Fi RSSI / uptime / free heap
- `take_photo` — 触发拍照
- `play_beep(freq, duration)` — 提示音

网络工具：

- `get_time` — 当前北京时间（C3 NTP 同步）
- `set_timer(seconds)` — 一次性定时器，延后到 TTS 播完才启动
- `get_weather(lat, lon)` — Open-Meteo 任意经纬度天气

多轮调用循环最多 3 轮，最后一轮强制不带 tools 让 GPT 收尾给文本。

**输出**

- I2S 流式 TTS 播放（边下边解码边播）
- MIPI DSI 720×1280 LCD：摄像头预览 + RGB565 HUD 叠加

**HUD 实时显示**：C3 链路、Wi-Fi、HTTP 状态、麦克风 RMS、喇叭播放、录音进度、当前 cloud pipeline 状态、各阶段耗时、对话区滚动 5 行、按钮颜色随状态切换（绿=可点 / 灰=忙 / 红=录音 / 青=播放）。

![整套设备运行时的样子：硬件 + LCD 上的功能调用结果同框](/images/projects/esp32p4-1.jpg)

## 遇到了什么问题 / 怎么解决

### UART 链路稳定性

朴素文本协议起步：每帧一行 base64，`HTTP_POST_DATA <b64>\n`。任何 1 bit flip 整帧 abort。

baud 升级过程：115200 太慢（对话 ~100 s）→ 升 230400 / 460800 / 921600 都偶发位翻转 → 回到 115200 牺牲速度换稳定。根因：杜邦线无屏蔽无流控，115200 以上必然偶发 bit flip。

最后用协议 v2：每帧 `seq=NN crc=XXXX`，CRC16-LE 用 ROM 里的 `esp_rom_crc16_le`，stop-and-wait 等 ACK 才发下一帧，NAK / timeout 重传最多 3 次。

v1.0 上线后立刻死锁：摄像头花屏 + 按键无响应。诊断：ACK timeout 200 ms 在上传路径完全不够；C3 端 `esp_http_client_write` 因 TCP backpressure 可阻塞 >1 s，延迟到的 ACK 污染下次 HEALTH 心跳通道。v1.2 修两处：ACK timeout 改 2000 ms 覆盖 TCP backpressure 最坏情况；retry 耗尽后 `uart_flush_input` 清残留 ACK 阻断污染路径。

结果：上行 0% CRC 错、下行 1.3%（全部 NAK 重传成功）、链路 0 死锁、ASR 时间 14 s → 7.5 s。

### 流式 TTS 播放

OpenAI TTS 返回 MP3 流，需要边下边解码边播。直接喂 minimp3 失败：layer-III bit reservoir 需要跨帧字节连续，UART chunk 边界打断，第一帧后 153 次 skip。全缓冲又得等十几秒才开声。

最终方案：双任务 + 自适应预缓冲。UART chunk callback 只追加写 PSRAM accumulator；独立 decoder 任务从 accumulator 拉数据用 minimp3 解码 → PCM 推 stream ring → player drain 到 I2S TX。

关键算法：观测下载速率 × content_length 推算"还要下多久"，预缓冲到 `prebuf_audio_ms ≥ remaining_download_ms × 0.7` 才正式调 `audio_service_pcm_stream_start`。无论网络快慢都不会 ring underrun。

### 数字朗读

TTS 模型经常把数字念错："38640" → "34680"、"532" → "332"、"024" → "0 百 2 十 4"。TTS instructions 无法强制控制读法。

最终用文本层预处理彻底规避：1-99 转自然中文数词（"11" → "十一"），3+ 位逐位（"2026" → "二零二六"），小数点 → "点"，leading-zero 保留位（"01" → "零一"，修了"12:01" 念成"十二点一"丢 0 的 bug），℃/° → "度"，% → "百分"。

### Function calling 副作用时机

`set_timer(seconds)` 第一次实现：用户说"5 秒后哔一下"，结果先听到哔再听到 GPT 说"已设置"。

根因：tool 同步执行立刻 `esp_timer_start_once(5_s)`，但还要走 GPT round 2（5-10 s）+ TTS 下载播放（15 s），定时器在 TTS 没开始就已触发。

修复：tool 不直接启动 esp_timer，而是把 seconds 存到静态变量；cloud_pipeline_task 完成 TTS 播放后才调用 `cloud_pipeline_fire_deferred_timer()`。turn 开始时 reset 避免上一轮失败 timer 泄露到下一轮。

![开发现场：笔电跑 dev server，硬件平摆桌上](/images/projects/esp32p4-6.jpg)

## 局限性

- **AI 仍是 dummy inference / skeleton**：HUD 上的 "AI 1MS" 只是展示本地推理调度框架，没接真实模型。比赛现场的本地 AI 能力还要补
- **完全依赖云端 LLM**：没网就废一半功能；OpenAI / Groq 偶发慢响应（GPT POST 30+ s）、地区不稳、quota 限制都是现实问题
- **端到端 30-40 s 不算快**：瓶颈在 ASR 上传和 TTS 下载，下一步想试 Opus 编码音频（WAV 100 KB → 10-15 KB）+ GPT-4o SSE 流式响应
- **UART 物理层仍有 1.3% 下行 CRC 错**：靠重传兜底，物理层本身不算稳定
- **除 OpenAI / Open-Meteo 外没接其他云 API**：现场演示其他云服务还得加

![当前状态：LCD 上跑摄像头实景预览](/images/projects/esp32p4-5.jpg)

更细节的开发记录在仓库 `00_docs/DEVELOPMENT_JOURNEY.md`，每个 commit 的 trace、错码、提速倍率都在里面。
