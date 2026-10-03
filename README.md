# DeepSeek Colorful 🎨

A comprehensive and elegant UI theme, frosted glass & live wallpaper customizer plugin for **DeepSeek Harness** (Desktop & Web).  
Inspired by the classic **Firefox Color**, empowered with modern **Acrylic Frosted Glass** aesthetics and **Dynamic Live Video Wallpapers**.

[中文说明文档 (README_zh.md)](./README_zh.md)

---

## ✨ Features

- **Firefox Color-style Palette Tuning**:
  - Full granular control over `Base Background`, `Sidebar Fill`, `Chat Cards`, `Composer Input`, `Brand Primary Accent`, `Hover Feedback`, `Code Block Background`, `Text Color`, and `Border Stroke`.
  - Non-blocking, discrete batch application with draft buffering for zero lag during color selection.
- **Acrylic Frosted Glass (Glassmorphism)**:
  - Adjustable Gaussian Blur Radius (0px - 40px), Surface Opacity (10% - 100%), and Background Saturation Boost (100% - 220%).
  - Independent toggles for sidebar blur, chat card blur, composer blur, and metallic edge highlight.
  - Dedicated Code & Diff preview opacity slider (50% - 100%) to preserve high-contrast readability against complex backgrounds.
- **Live Video & Image Wallpapers**:
  - Full support for **looping dynamic videos** (`.mp4`, `.webm`) and static images (`.jpg`, `.png`, `.svg`, `.webp`).
  - Seamless full-screen viewport spanning across sidebar, top bar, and main chat column without color blocks.
  - Built-in live cyber matrix and space travel dynamic wallpapers.
- **User Preset Management**:
  - Create and save your custom visual setups (colors, frosted glass, and wallpapers) into named presets.
  - One-click instant switching and deletion.
- **Smart Invisible Floating Studio**:
  - Floating palette button automatically hides completely after 2 seconds of inactivity.
  - Re-appears seamlessly when the mouse approaches the bottom-right corner.

---

## 🚀 Installation & Usage

1. Link or install `deepseek-colorful` into your DeepSeek Harness profile dependencies:
   ```json
   "dependencies": {
     "deepseek-colorful": "link:/path/to/deepseek-colorful"
   }
   ```
2. Enable it in your `cordis.patch.yml`:
   ```yaml
   - insert:
       - id: deepseek-colorful
         name: deepseek-colorful
   ```
3. Restart or refresh DeepSeek Harness (`Ctrl + R`).

---

## 📄 License

MIT © [yaanlaan](https://github.com/yaanlaan)
