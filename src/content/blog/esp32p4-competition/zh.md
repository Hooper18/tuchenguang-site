---
title: "ESP32-P4 智能视觉终端：嵌入式比赛项目开发记录"
description: "ESP32-P4 + ESP32-C3 双 MCU 智能终端，从空板到能对话的硬件。做了什么、踩了哪些坑、最后到哪里。"
pubDate: 2026-05-30
tags: [嵌入式, ESP32, 比赛]
---

这是我准备学校嵌入式系统比赛的项目，前后约 6 周，81 个 commit，15 个 git tag，当前版本 v1.3-tools。仓库在 [github.com/Hooper18/esp32p4_competition](https://github.com/Hooper18/esp32p4_competition)。这篇是给本人回顾用的开发记录，也方便面试 / 评审能在 5 分钟内看到完整故事。

## 干了什么

一台基于 ESP32-P4 主控 + ESP32-C3 协处理器的智能视觉终端。上电之后摄像头自动开始 30fps 预览、屏幕显示状态、麦克风听你说话。按一下 REC 对着说话，云端 Whisper + GPT-4o + TTS 走一圈，喇叭回答你。过程里 GPT 还能主动调用 7 个工具：拍照、查天气、设定时器、读环境噪声、查设备状态、报当前时间、播提示音。

## 看起来什么样

5.5 寸 720×1280 MIPI LCD 上同时显示摄像头预览和 RGB565 HUD 叠加层。稳定状态下 HUD 大致是这样：

```text
FPS 30.0  AI 1MS
CAM OK    TOUCH OK
C3 OK     WIFI OK
RSSI -52  IP 192.168.x.x
NET OK    HTTP 204 320MS
mic LVL 3 SPEECH
ASR 7.5s · LLM 5.5s · TTS 5.1s
< 上一轮对话内容 >
[REC] [CAM] [STOP]
```

按 REC，对着 mic 说"现在北京几点"，7.5 秒后听到喇叭说"北京时间 14 点 32 分"。说"5 秒后哔一下"，TTS 播报完"好的已经设置"再过 5 秒哔三声。说"看一眼帮我描述一下"，GPT 主动 call `take_photo`，画面截下来上传，再回答。

## 用了什么

**硬件**

- 主控：正点原子 DNESP32P4（ESP32-P4 RISC-V 400MHz + PSRAM + MIPI 显示/摄像头硬件加速 + H.264 编解码）
- 协处理器：ESP32-C3-DevKitM-1-N4X（专门跑 Wi-Fi / HTTPS，P4 自己没射频）
- 屏：5.5 寸 MIPI DSI LCD 720×1280
- 触摸：GT911 I2C 电容触摸
- 摄像头：OV5645 MIPI CSI
- 麦克风：INMP441 数字麦克风（I2S）
- 功放：MAX98357A 数字 I2S 功放
- 互联：P4↔C3 之间 UART1，从 115200 起步后升到 460800（GPIO28/29 ↔ GPIO5/4，只接 UART 和共地）

**软件栈**

ESP-IDF v5.5.4、C/C++、FreeRTOS、LVGL v9 + esp_lvgl_port、minimp3、cJSON、PPA framebuffer 硬件加速、esp_jpeg_enc。云端走 OpenAI Whisper / GPT-4o / TTS，天气查 Open-Meteo 免费 API。

**为什么是双 MCU**

ESP32-P4 性能很强但没有 Wi-Fi/Bluetooth 射频，所以让 C3 当协处理器专门跑网络栈。这样分工带来两个好处：

1. P4 专注实时音视频处理——摄像头 30fps + I2S 全双工 + LVGL UI + AI 推理调度都在 P4 上跑，不被 Wi-Fi/TCP 中断打断
2. C3 隔离 TLS 握手、cert 验证、HTTP 流式上下行，P4 看到的只是简洁的 base64 二进制流

代价是必须自己设计可靠的双 MCU 通信协议。这成了整个项目最大的技术挑战。

## 完成的功能（v1.3-tools 当前清单）

**输入**

- 语音录音：REC 按钮按一下开始，再按停；或本地 VAD 检测 1.5s 静音自动停
- 图像捕获：CAM 按钮抓帧；可与 REC 同按实现"看着说"
- 触摸输入：GT911 全屏触摸 + HUD 区三个虚拟按钮

**云端处理流程**

- VAD 上传裁剪：录音 make_wav 前自动裁掉首尾静音，典型 5s 录音减 30-50% 体积
- ASR：OpenAI Whisper-1
- LLM：OpenAI gpt-4o-2024-11-20，含 JARVIS 风格 system prompt + 最近 3 轮对话历史 + function calling
- TTS：OpenAI gpt-4o-mini-tts，coral 音色，MP3 流式输出

**Function calling 工具集（7 个）**

- `get_ambient_sound_level` —— 当前环境音量等级
- `get_device_status` —— Wi-Fi RSSI / uptime / free heap
- `take_photo` —— 触发拍照
- `play_beep(freq, duration)` —— 提示音
- `get_time` —— 当前北京时间（年月日时分秒+星期）
- `set_timer(seconds)` —— 一次性定时器，到点哔三声
- `get_weather(lat, lon)` —— Open-Meteo 任意经纬度天气

**输出**

- I2S 流式 TTS 播放（边下边解码边播）
- MIPI DSI 720×1280 LCD：摄像头预览 + RGB565 HUD 叠加

## 踩过的坑

### 1. 双 MCU UART 通信稳定性（最痛的一段）

朴素文本协议起步：每帧一行 base64，`HTTP_POST_DATA <b64>\n`。任何 1 bit flip 都会让 base64 解码失败、整个请求 abort。

baud 升级一路打脸：

```
5dc8c79  P4↔C3 UART 115200 → 921600，对话延迟 ~106s → ~35s
cf7fdf1  UART 921600 太激进掉字节，降到 460800 + C3 RX 16K + TX wait drain
ef6ec75  UART 460800 仍掉字节，降到 230400 + RX 32K + ets_delay_us(1000) 兜底
a8ec1e5  回退到 115200 baud：230400 仍偶发位翻转，先稳定后优化
```

事后才搞明白根因：**杜邦线连接、无屏蔽、无硬件流控，115200 以上 baud 都会偶发 bit flip**，反复降 baud + 加缓冲都是治标。

最后的解法是协议 v2：每帧带 `seq=NN crc=XXXX`，CRC16-LE 用 ROM 里的 `esp_rom_crc16_le`，stop-and-wait 等 ACK 才发下一帧，NAK/timeout 同 seq 重传最多 3 次。

但这个协议 v1.0 上线后立刻出大问题：摄像头花屏 + 按键死锁。诊断后是 **ACK timeout 200ms 在上传路径完全不够**——C3 处理上传时 `esp_http_client_write` 会因 TCP backpressure 阻塞 >1 秒，导致 ACK 延迟回来污染下次 HEALTH 心跳通道。

v1.2 修两处：

1. ACK timeout 200ms → 2000ms（覆盖 TCP backpressure 最坏情况）
2. retry 耗尽后 `uart_flush_input` 清残留 ACK，断绝 stale ACK 污染 HEALTH 通道的死锁路径

结果：上行 CRC 错误率 0%，下行 1.3%（全部 NAK 重传成功），UART 链路 0 死锁，ASR 时间 14s → 7.5s。

最大的教训：协议设计要 **同时考虑发送端和接收端的所有阻塞点**；ACK timeout 不能按"理论最短响应时间 ×1.5"算，要按"最坏情况下接收端能多慢"算。

### 2. 流式 TTS 播放

OpenAI TTS 返回 MP3 流，要边下边解码边播——第一次直接喂 minimp3 失败：minimp3 的 layer-III bit reservoir 需要跨帧字节连续，UART chunk 边界打断了这个连续性，第一帧后 153 次 skip。

反过来全缓冲又太慢，要等十几秒才听到声音。

最后方案是 **双任务 + 自适应预缓冲**：UART chunk callback 只负责追加写入 PSRAM accumulator；独立 decoder 任务从 accumulator 拉数据用 minimp3 解码 → PCM 推入 audio_service stream ring → player task drain 到 I2S TX。

关键发明是 adaptive pre-buffer：

```
prebuf_audio_ms ≥ remaining_download_ms × 0.7
```

观测下载速率 × content_length 推算"还要下多久"，预缓冲到足够 cover 剩余下载时间再 `audio_service_pcm_stream_start`，这样无论网络快慢都不会 ring underrun。

OpenAI TTS 用 chunked transfer 没有 content_length——fallback：等 download_done 触发立即播。

### 3. 数字朗读

TTS 老是把数字念错。"38640" 念成 "34680"、"532" 念成 "332"、"024" 念成 "0百2十4"。

尝试链：

1. TTS instructions 加"遇到阿拉伯数字一位一位地念" → 无效，TTS 不严格遵守 instructions
2. 数字之间插空格 "5 3 2" → 还是被合并理解为"五百三十二"
3. 替换成中文字符 "五三二" → 有效，但 "11" → "一一" 被 TTS 省读成"一"
4. 加顿号 "一、一" → 改善但偶尔含糊
5. 最终：1-99 转成自然中文数词（"11" → "十一"），3+ 位逐位（"2026" → "二零二六"），小数点 → "点"，leading-zero "01" → "零一"（这条修了"12:01" 念成"十二点一"的丢 0 bug）

教训：TTS 数字朗读问题在中文 TTS 上几乎不可避免，最好通过文本层预处理彻底规避，不能信赖 TTS 模型按指示读。

### 4. Function calling 的副作用时机

实现 `set_timer(seconds)` 时第一次踩坑：用户说"5 秒后哔一下"，结果先听到哔再听到 GPT 说"好的已经设置好定时器"。

根因：tool 执行是同步的，立刻 `esp_timer_start_once(5_s)`。但还要走 GPT round 2（5-10s）+ TTS 下载播放（15s），5 秒定时器在 TTS 还没开始就触发了。

修复：tool 不直接启动 esp_timer，而是把 seconds 存到静态变量 `s_deferred_timer_seconds`，在 cloud_pipeline_task 完成 TTS 播放后调用 `cloud_pipeline_fire_deferred_timer()` 才真正启动。turn 开始时 reset 这个变量避免上一轮失败 timer 泄露到下一轮。

### 5. 一些其他踩过的坑

- INMP441 引脚选错：板载 ES8388 占用 GPIO46-50，必须外接走 GPIO16-20，前后试了 4 组才对（`02_verified_demos/p4_i2s_mic_test/` 留有矩阵）
- FreeRTOS 栈不够不会主动报错，只会 panic——后来形成习惯：新 task 默认 32KB
- PPA 输出 buffer 必须 64 字节对齐，否则直接报错
- OpenAI cold TLS handshake 经常 boot 后第一个请求失败 → C3 端加 3 次重试 + 1s 间隔
- 单帧 RMS 噪声尖刺会触发假 SPEECH → 引入 EMA 平滑；讲话和拍手数值无差异化 → 改 peak hold/decay 路径

## 性能数据

端到端对话时长：

| 阶段 | 典型耗时 | 说明 |
|---|---|---|
| 录音 | 用户控制 | VAD 自动 1.5s 静音停，通常 3-8s |
| Whisper 上传 + ASR | 7-12s | 100KB WAV 上传 + OpenAI 处理 |
| GPT round 1 | 3-8s | 含 tools 规格 |
| Tool 执行 | 0.1-3s | get_weather 需要 GET 网络往返 |
| GPT round 2（有 tool 时） | 3-8s | 综合 tool 结果生成回复 |
| TTS 下载 + 解码 | 6-15s | 100-200KB MP3，含 prebuf |
| TTS 播放 | 与音频长度同步 | 4-8s 典型 |
| **总（无 tool）** | **~30s** | |
| **总（有 tool）** | **~40s** | |

UART 链路（v1.2 460800 baud 实测）：

- 上传吞吐 ~25 KB/s（含 ACK round-trip）
- 下载吞吐 ~23 KB/s
- 上行 CRC 错误率 0%（实测 175 帧）
- 下行 CRC 错误率 1.3%（实测 750 帧，全部 NAK 重传成功）
- 0 fatal errors / 0 链路死锁

## 局限性

老老实实写一下：

- **AI 仍是 dummy inference / skeleton**：HUD 上的 "AI 1MS" 只是展示本地推理调度框架，没接真实模型。比赛现场的本地 AI 能力还要补
- **完全依赖云端 LLM**：没网就废一半功能。OpenAI / Groq 偶发慢响应（GPT POST 30+s）、地区不稳、quota 限制都是现实问题。Groq Whisper 测试中遇到过疑似 quota 用完导致严重 TCP backpressure
- **端到端对话时长不算快**：典型 30-40 秒。瓶颈是 ASR 上传 + TTS 下载，下一步想试 Opus 编码（WAV 100KB → 10-15KB，ASR 上传时间降到 1-2s）和 GPT-4o SSE 流式响应
- **UART 物理层仍有 1.3% 下行 CRC 错误**：杜邦线无屏蔽 + 无硬件流控的现实下已经很好了，但还是靠重传兜底，不是物理层稳定
- **没接真实云端 API（除 OpenAI / Open-Meteo）**：现场要演示其他云服务还得加

后面想再做的几件事都还没动：本地 vision tool（让 GPT 主动调摄像头看而不是被动等用户按 CAM）、HUD 工具结果可视化（weather 显示气温图标、timer 倒计时进度条）、Opus 编码音频上传、cloud_service 状态机抽象成显式 FSM。

## 经验沉淀

这一个半月里反复打脸打出来的几条工程习惯：

- **增量验证 + 隔离 demo**：每个硬件子系统先在 `02_verified_demos/` 跑通独立 demo，再合入主项目。多次救命（修引脚、修 I2S 模式、修 cert bundle）
- **HUD 暴露内部状态**：把状态机当前 state、tool 名、各阶段耗时、UART 链路状态都画在屏幕上，现场调试不需要串口
- **commit message 当文档**：每次 commit 详细写"为什么改 + 实测数据"，半年后看回去能立刻 reconstruct context
- **打 git tag 当 safety net**：每个里程碑打 tag，灾难时可以 `git reset --hard <last_good_tag>` 一键回退
- **新 task 默认 32KB 栈**：FreeRTOS 不会给你"栈不够"的友好提示，只会 panic
- **stop-and-wait 在 UART 上比 sliding window 简单且够用**：UART 速度和网络速度不在同一量级，pipelining 收益小、复杂度高

仓库里 `00_docs/DEVELOPMENT_JOURNEY.md` 是更细致的 682 行版本，每个 commit 的 trace、错码、提速倍率都在里面，等比赛结束顺便当论文素材。
