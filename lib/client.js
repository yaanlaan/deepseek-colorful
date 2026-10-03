// DeepSeek Colorful (Custom theme palettes, frosted glass & background images/videos)
window.__ModuleLoader__.load({
  id: "deepseek-colorful",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    const React = require("react");

    // ==========================================
    // 1. UI 样式表
    // ==========================================
    const UI_STYLES = `/**
 * UI Styles for Theme Customizer Panel and Floating Studio (No emoji)
 */

/* Theme Customizer Container & Typography */
.dsh-customizer-root {
  font-family: var(--dsw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
  color: var(--dsw-alias-label-primary, #ffffff);
  box-sizing: border-box;
  padding: 16px 20px 40px;
  max-width: 900px;
  margin: 0 auto;
}

.dsh-customizer-header {
  margin-bottom: 24px;
}

.dsh-customizer-title {
  font-size: 22px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 6px 0;
  color: var(--dsw-alias-label-primary, #fff);
}

.dsh-customizer-subtitle {
  font-size: 13px;
  color: var(--dsw-alias-label-secondary, #94a3b8);
  margin: 0;
}

/* Tabs Navigation - 紧凑防换行/防水平溢出横条 */
.dsh-customizer-tabs {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--dsw-alias-border-l2, rgba(255, 255, 255, 0.1));
  padding-bottom: 12px;
  margin-bottom: 24px;
  overflow-x: hidden;
  flex-wrap: wrap;
}

.dsh-customizer-tab-btn {
  background: transparent;
  border: 1px solid transparent;
  color: var(--dsw-alias-label-secondary, #94a3b8);
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.dsh-customizer-tab-btn:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(255, 255, 255, 0.08));
  color: var(--dsw-alias-label-primary, #fff);
}

.dsh-customizer-tab-btn.active {
  background: var(--dsw-alias-brand-primary, #00f0ff);
  color: #000;
  font-weight: 600;
}

/* Sections & Cards */
.dsh-customizer-card {
  background: var(--dsw-alias-bg-layer-2, rgba(30, 35, 45, 0.6));
  border: 1px solid var(--dsw-alias-border-l2, rgba(255, 255, 255, 0.08));
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.dsh-customizer-card-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--dsw-alias-label-primary, #fff);
}

/* Form Controls & Grids */
.dsh-color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}

.dsh-color-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  transition: border-color 0.2s;
}

.dsh-color-item:hover {
  border-color: rgba(255, 255, 255, 0.15);
}

.dsh-color-label {
  font-size: 13px;
  color: var(--dsw-alias-label-primary, #eee);
  font-weight: 500;
}

.dsh-color-picker-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dsh-color-swatch-input {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  background: transparent;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
}

.dsh-color-swatch-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.dsh-color-swatch-input::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
}

.dsh-color-hex-input {
  width: 76px;
  padding: 4px 6px;
  font-family: monospace;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  color: #fff;
  text-align: center;
}

.dsh-color-hex-input:focus {
  outline: none;
  border-color: var(--dsw-alias-brand-primary, #00f0ff);
}

/* Range Sliders */
.dsh-slider-group {
  margin-bottom: 16px;
}

.dsh-slider-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 13px;
}

.dsh-slider-val {
  font-weight: 600;
  color: var(--dsw-alias-brand-primary, #00f0ff);
}

.dsh-range-slider {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
}

.dsh-range-slider::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--dsw-alias-brand-primary, #00f0ff);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
  border: 2px solid #fff;
}

/* Switch Toggles */
.dsh-switch-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 8px 0;
  user-select: none;
}

.dsh-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.dsh-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.dsh-switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.2);
  transition: .3s;
  border-radius: 24px;
}

.dsh-switch-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

.dsh-switch input:checked + .dsh-switch-slider {
  background-color: var(--dsw-alias-brand-primary, #00f0ff);
}

.dsh-switch input:checked + .dsh-switch-slider:before {
  transform: translateX(20px);
  background-color: #000;
}

/* Preset Cards Grid */
.dsh-preset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.dsh-preset-card {
  background: rgba(0, 0, 0, 0.25);
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}

.dsh-preset-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.35);
}

.dsh-preset-card.active {
  border-color: var(--dsw-alias-brand-primary, #00f0ff);
  background: rgba(0, 240, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 240, 255, 0.15);
}

.dsh-preset-palette-bar {
  display: flex;
  height: 20px;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dsh-preset-palette-color {
  flex: 1;
}

.dsh-preset-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #fff;
}

.dsh-preset-desc {
  font-size: 12px;
  color: var(--dsw-alias-label-secondary, #94a3b8);
  line-height: 1.4;
}

/* Background Source Selection Cards */
.dsh-bg-source-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
  margin-bottom: 20px;
}

.dsh-bg-source-card {
  background: rgba(0, 0, 0, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 16px;
  transition: all 0.2s ease;
  position: relative;
}

.dsh-bg-source-card.active {
  border-color: var(--dsw-alias-brand-primary, #00f0ff);
  background: rgba(0, 240, 255, 0.04);
}

.dsh-bg-source-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.dsh-bg-source-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.dsh-bg-source-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--dsw-alias-label-secondary, #94a3b8);
}

.dsh-bg-source-card.active .dsh-bg-source-badge {
  background: var(--dsw-alias-brand-primary, #00f0ff);
  color: #000;
  font-weight: 600;
}

.dsh-bg-source-desc {
  font-size: 12px;
  color: var(--dsw-alias-label-secondary, #94a3b8);
  margin-bottom: 12px;
  line-height: 1.4;
}

/* Active Preview Box */
.dsh-bg-preview-card {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  display: flex;
  gap: 18px;
  align-items: center;
}

.dsh-bg-preview-thumbnail {
  width: 160px;
  height: 90px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.dsh-bg-preview-info {
  flex: 1;
  min-width: 0;
}

.dsh-bg-preview-name {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dsh-bg-preview-meta {
  font-size: 12px;
  color: var(--dsw-alias-label-secondary, #94a3b8);
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-all;
}

/* Wallpaper Grid */
.dsh-wallpaper-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;
  margin-top: 12px;
}

.dsh-wallpaper-card {
  height: 120px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  transition: all 0.2s ease;
}

.dsh-wallpaper-card:hover {
  transform: scale(1.02);
  border-color: rgba(255, 255, 255, 0.3);
}

.dsh-wallpaper-card.active {
  border-color: var(--dsw-alias-brand-primary, #00f0ff);
  box-shadow: 0 0 16px rgba(0, 240, 255, 0.3);
}

.dsh-wallpaper-name-badge {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6px 8px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Floating Studio Launcher Button - 静止未操作时完全透明并禁用指针交互，鼠标移至右下角时即刻唤醒展示 */
#dsh-floating-customizer-btn {
  position: fixed;
  right: 20px;
  bottom: 24px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--dsw-alias-brand-primary, #00f0ff);
  color: #000;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35), 0 0 14px rgba(0, 240, 255, 0.3);
  z-index: 99999;
  opacity: 0.95;
  transform: scale(1);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, box-shadow 0.25s ease;
}

/* 完全隐藏态：透明度归零、缩小且不挡任何点击，视觉上 100% 干净 */
#dsh-floating-customizer-btn.dsh-btn-autohide {
  opacity: 0 !important;
  pointer-events: none !important;
  transform: scale(0.7) !important;
}

/* 鼠标激活/悬停唤醒展示 */
#dsh-floating-customizer-btn:hover {
  opacity: 1 !important;
  pointer-events: auto !important;
  transform: scale(1.08) !important;
  box-shadow: 0 6px 26px rgba(0, 0, 0, 0.45), 0 0 20px rgba(0, 240, 255, 0.5);
}

#dsh-floating-customizer-modal {
  position: fixed;
  top: 48px;
  right: 24px;
  width: 520px;
  max-width: calc(100vw - 48px);
  height: calc(100vh - 96px);
  background: rgba(20, 24, 33, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08);
  z-index: 100000;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  animation: dshCustomizerSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes dshCustomizerSlideIn {
  from {
    opacity: 0;
    transform: translateX(40px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.dsh-modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dsh-modal-header-title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
}

.dsh-modal-close-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 18px;
  cursor: pointer;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.dsh-modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.dsh-modal-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 20px;
}

/* Action Buttons */
.dsh-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.dsh-btn-primary {
  background: var(--dsw-alias-brand-primary, #00f0ff);
  color: #000;
  font-weight: 600;
}

.dsh-btn-primary:hover {
  filter: brightness(1.1);
}

.dsh-btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.15);
}

.dsh-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.18);
}

.dsh-btn-danger {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}

.dsh-btn-danger:hover {
  background: rgba(239, 68, 68, 0.3);
}
`;

    function installUiStyles() {
      if (typeof document === 'undefined') return;
      const tagId = 'dsh-customizer-ui-base-styles';
      if (!document.getElementById(tagId)) {
        const style = document.createElement('style');
        style.id = tagId;
        style.textContent = UI_STYLES;
        document.head.appendChild(style);
      }
    }

    // ==========================================
    // 2. 预设配置与壁纸库
    // ==========================================
    // 内置预设主题调色盘 (无 emoji)
const PRESET_THEMES = [
  // 1. 官方原生 DeepSeek 专属默认调色方案 (深海极客蓝)
  {
    id: 'deepseek-official',
    name: 'DeepSeek 原生深海 (DeepSeek Official)',
    description: 'DeepSeek 官方经典深海蓝与纯净灰阶，完美融合官方调性',
    colors: {
      bgBase: '#151517',        // 官方 --dsw-static-neutral-bluish-950
      sidebarFill: '#1b1b1c',   // 官方 --dsw-static-neutral-bluish-900
      layer1: '#232324',        // 官方 --dsw-static-neutral-bluish-875
      layer2: '#2c2c2e',        // 官方 --dsw-static-neutral-bluish-850
      codeBlockBg: '#1b1b1c',   // 官方代码块
      brandPrimary: '#4176e6',   // 官方标志性 DeepSeek 蓝色 (--dsw-static-deepseek-500)
      brandHover: '#5686fe',     // 官方高亮悬浮蓝 (--dsw-static-deepseek-450)
      textPrimary: '#ffffff',
      textSecondary: '#adb2b8',  // 官方 --dsw-static-neutral-bluish-400
      borderColor: '#353638',   // 官方 --dsw-static-neutral-bluish-800
      composerBg: '#232324',
    },
    frosted: {
      enabled: true,
      blurRadius: 18,
      surfaceOpacity: 0.82,
      saturation: 135,
    }
  },
  // 2. 官方原生 DeepSeek 浅色经典 (晨曦蓝调)
  {
    id: 'deepseek-official-light',
    name: 'DeepSeek 晨曦明亮 (DeepSeek Daylight)',
    description: '明亮通透的 DeepSeek 浅色主题，契合官方浅色模式',
    colors: {
      bgBase: '#ffffff',
      sidebarFill: '#f9fafb',   // 官方 --dsw-static-neutral-bluish-50
      layer1: '#ffffff',
      layer2: '#ebeef2',        // 官方 --dsw-static-neutral-bluish-100
      codeBlockBg: '#f5f6f7',   // 官方 --dsw-static-neutral-bluish-60
      brandPrimary: '#4176e6',   // 官方 DeepSeek 蓝
      brandHover: '#2563eb',
      textPrimary: '#0f1115',   // 官方文字
      textSecondary: '#61666b',  // 官方次级字
      borderColor: '#e1e5ee',   // 官方边框
      composerBg: '#ffffff',
    },
    frosted: {
      enabled: true,
      blurRadius: 16,
      surfaceOpacity: 0.88,
      saturation: 120,
    }
  },
  {
    id: 'twilight-purple',
    name: '极光紫魅 (Twilight Purple)',
    description: '神秘深邃的深紫与烈焰橙高亮',
    colors: {
      bgBase: '#1c1b22',
      sidebarFill: '#2b2a33',
      layer1: '#23222b',
      layer2: '#2b2a33',
      codeBlockBg: '#1e1c26',
      brandPrimary: '#ff7139',
      brandHover: '#ff9466',
      textPrimary: '#fbfbfe',
      textSecondary: '#cfcfd8',
      borderColor: '#38343d',
      composerBg: '#2b2a33',
    },
    frosted: {
      enabled: true,
      blurRadius: 18,
      surfaceOpacity: 0.78,
      saturation: 140,
    }
  },
  {
    id: 'cyberpunk-neon',
    name: '赛博朋克 (Cyberpunk 2077)',
    description: '高对比霓虹青与荧光粉，未来科幻感',
    colors: {
      bgBase: '#0b0c10',
      sidebarFill: '#13151b',
      layer1: '#161922',
      layer2: '#1f2430',
      codeBlockBg: '#12151e',
      brandPrimary: '#00f0ff',
      brandHover: '#ff0055',
      textPrimary: '#ffffff',
      textSecondary: '#a0aab8',
      borderColor: '#242a3a',
      composerBg: '#161922',
    },
    frosted: {
      enabled: true,
      blurRadius: 22,
      surfaceOpacity: 0.72,
      saturation: 160,
    }
  },
  {
    id: 'deep-midnight',
    name: '深邃星河 (Deep Midnight)',
    description: '宁静浩瀚的深空蓝紫与优雅靛蓝',
    colors: {
      bgBase: '#0a0d14',
      sidebarFill: '#101420',
      layer1: '#141a29',
      layer2: '#1a2236',
      codeBlockBg: '#0f1422',
      brandPrimary: '#7c5cfc',
      brandHover: '#957bfd',
      textPrimary: '#f0f4fc',
      textSecondary: '#94a3b8',
      borderColor: '#1e283d',
      composerBg: '#121724',
    },
    frosted: {
      enabled: true,
      blurRadius: 24,
      surfaceOpacity: 0.75,
      saturation: 150,
    }
  },
  {
    id: 'forest-matcha',
    name: '禅意抹茶 (Forest Matcha)',
    description: '护眼舒适的暗色森林与清新薄荷绿',
    colors: {
      bgBase: '#0c1311',
      sidebarFill: '#121c19',
      layer1: '#162420',
      layer2: '#1d2f2a',
      codeBlockBg: '#101a17',
      brandPrimary: '#10b981',
      brandHover: '#34d399',
      textPrimary: '#f2fbf7',
      textSecondary: '#a7d5c4',
      borderColor: '#223832',
      composerBg: '#14201c',
    },
    frosted: {
      enabled: true,
      blurRadius: 16,
      surfaceOpacity: 0.8,
      saturation: 130,
    }
  },
  {
    id: 'sakura-romance',
    name: '樱花浪漫 (Sakura Romance)',
    description: '柔美优雅的烟粉与浅紫暗调',
    colors: {
      bgBase: '#171216',
      sidebarFill: '#221a21',
      layer1: '#2a1f29',
      layer2: '#352734',
      codeBlockBg: '#211720',
      brandPrimary: '#f472b6',
      brandHover: '#fb7185',
      textPrimary: '#fdf2f8',
      textSecondary: '#d8b4cb',
      borderColor: '#432f41',
      composerBg: '#241b23',
    },
    frosted: {
      enabled: true,
      blurRadius: 20,
      surfaceOpacity: 0.76,
      saturation: 145,
    }
  },
  {
    id: 'caramel-latte',
    name: '焦糖拿铁 (Caramel Latte)',
    description: '温暖醇厚的复古暖棕与暖金',
    colors: {
      bgBase: '#181412',
      sidebarFill: '#221c19',
      layer1: '#2b231f',
      layer2: '#372d27',
      codeBlockBg: '#201814',
      brandPrimary: '#d97706',
      brandHover: '#f59e0b',
      textPrimary: '#fef3c7',
      textSecondary: '#d6c2aa',
      borderColor: '#42362e',
      composerBg: '#231d1a',
    },
    frosted: {
      enabled: true,
      blurRadius: 16,
      surfaceOpacity: 0.82,
      saturation: 125,
    }
  },
  {
    id: 'nordic-fjord',
    name: '北欧峡湾 (Nordic Fjord)',
    description: '清冽深邃的冰蓝与冷灰海湾质感',
    colors: {
      bgBase: '#0b1118',
      sidebarFill: '#111a24',
      layer1: '#15212e',
      layer2: '#1c2b3d',
      codeBlockBg: '#0f1722',
      brandPrimary: '#0284c7',
      brandHover: '#38bdf8',
      textPrimary: '#f0f9ff',
      textSecondary: '#93a9c2',
      borderColor: '#203247',
      composerBg: '#131e2b',
    },
    frosted: {
      enabled: true,
      blurRadius: 20,
      surfaceOpacity: 0.78,
      saturation: 140,
    }
  },
  {
    id: 'matrix-terminal',
    name: '黑客矩阵 (Matrix Terminal)',
    description: '极客最爱的纯黑底色与荧光绿终端',
    colors: {
      bgBase: '#040805',
      sidebarFill: '#08110b',
      layer1: '#0d1c12',
      layer2: '#122619',
      codeBlockBg: '#07100a',
      brandPrimary: '#22c55e',
      brandHover: '#4ade80',
      textPrimary: '#86efac',
      textSecondary: '#4ade80b0',
      borderColor: '#193a23',
      composerBg: '#09140c',
    },
    frosted: {
      enabled: true,
      blurRadius: 12,
      surfaceOpacity: 0.85,
      saturation: 150,
    }
  },
  {
    id: 'pure-black-oled',
    name: '极致纯黑 (OLED Pure Black)',
    description: '极致节能与专注的无暇全黑背景',
    colors: {
      bgBase: '#000000',
      sidebarFill: '#0a0a0a',
      layer1: '#121212',
      layer2: '#1a1a1a',
      codeBlockBg: '#0d0d0d',
      brandPrimary: '#6366f1',
      brandHover: '#818cf8',
      textPrimary: '#ffffff',
      textSecondary: '#a3a3a3',
      borderColor: '#262626',
      composerBg: '#0f0f0f',
    },
    frosted: {
      enabled: false,
      blurRadius: 0,
      surfaceOpacity: 1.0,
      saturation: 100,
    }
  },
  {
    id: 'apple-pearl-light',
    name: '珍珠白浅色 (Pearl Light)',
    description: '苹果风格的通透清爽浅色磨砂质感',
    colors: {
      bgBase: '#f5f5f7',
      sidebarFill: '#eaebee',
      layer1: '#ffffff',
      layer2: '#f0f1f4',
      codeBlockBg: '#f8f9fa',
      brandPrimary: '#0071e3',
      brandHover: '#0077ed',
      textPrimary: '#1d1d1f',
      textSecondary: '#6e6e73',
      borderColor: '#d2d2d7',
      composerBg: '#ffffff',
    },
    frosted: {
      enabled: true,
      blurRadius: 20,
      surfaceOpacity: 0.85,
      saturation: 130,
    }
  }
];

// 内置免版权精美壁纸预设（支持高可用动态视频流与静态高清矢量渐变）
const PRESET_WALLPAPERS = [
  {
    id: 'aurora-gradient',
    name: '极光夜色 (Aurora Purple)',
    mediaType: 'image',
    preview: 'linear-gradient(135deg, #09090e 0%, #17153b 40%, #2e236c 70%, #433d8b 100%)',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><defs><radialGradient id="g1" cx="20%" cy="30%" r="60%"><stop offset="0%" stop-color="%23581c87" stop-opacity="0.8"/><stop offset="100%" stop-color="%2309090e" stop-opacity="0"/></radialGradient><radialGradient id="g2" cx="80%" cy="70%" r="60%"><stop offset="0%" stop-color="%230284c7" stop-opacity="0.6"/><stop offset="100%" stop-color="%2309090e" stop-opacity="0"/></radialGradient><radialGradient id="g3" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="%231e1b4b" stop-opacity="1"/><stop offset="100%" stop-color="%23020617" stop-opacity="1"/></radialGradient></defs><rect width="100%" height="100%" fill="%23030712"/><rect width="100%" height="100%" fill="url(%23g3)"/><rect width="100%" height="100%" fill="url(%23g1)"/><rect width="100%" height="100%" fill="url(%23g2)"/></svg>',
  },
  {
    id: 'video-cyber-matrix',
    name: '动态：赛博矩阵穿梭 (Matrix Live)',
    mediaType: 'video',
    preview: 'linear-gradient(135deg, #020b14 0%, #032b2f 50%, #044b46 100%)',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-changing-numbers-42171-large.mp4',
  },
  {
    id: 'video-deep-space',
    name: '动态：星际深空流转 (Cosmic Live)',
    mediaType: 'video',
    preview: 'linear-gradient(135deg, #05051a 0%, #140d36 50%, #1e1045 100%)',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-star-field-in-space-41544-large.mp4',
  },
  {
    id: 'cyber-mesh',
    name: '赛博流光 (Cyber Wave)',
    mediaType: 'image',
    preview: 'linear-gradient(135deg, #0d0221 0%, #0f084b 50%, #26408b 100%)',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><defs><radialGradient id="c1" cx="15%" cy="80%" r="50%"><stop offset="0%" stop-color="%23ff0055" stop-opacity="0.5"/><stop offset="100%" stop-color="%23000" stop-opacity="0"/></radialGradient><radialGradient id="c2" cx="85%" cy="20%" r="50%"><stop offset="0%" stop-color="%2300f0ff" stop-opacity="0.5"/><stop offset="100%" stop-color="%23000" stop-opacity="0"/></radialGradient><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2306070d"/><stop offset="100%" stop-color="%23120c1f"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23bg)"/><rect width="100%" height="100%" fill="url(%23c1)"/><rect width="100%" height="100%" fill="url(%23c2)"/></svg>',
  },
  {
    id: 'deep-space',
    name: '深空星河 (Deep Space)',
    mediaType: 'image',
    preview: 'linear-gradient(135deg, #050505 0%, #0d1117 50%, #161b22 100%)',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><defs><radialGradient id="s1" cx="30%" cy="40%" r="55%"><stop offset="0%" stop-color="%231e3a8a" stop-opacity="0.7"/><stop offset="100%" stop-color="%23020617" stop-opacity="0"/></radialGradient><radialGradient id="s2" cx="70%" cy="60%" r="50%"><stop offset="0%" stop-color="%234338ca" stop-opacity="0.5"/><stop offset="100%" stop-color="%23020617" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="%23020408"/><rect width="100%" height="100%" fill="url(%23s1)"/><rect width="100%" height="100%" fill="url(%23s2)"/><circle cx="150" cy="200" r="1.5" fill="%23fff" opacity="0.8"/><circle cx="450" cy="120" r="1" fill="%23fff" opacity="0.6"/><circle cx="850" cy="320" r="2" fill="%23fff" opacity="0.9"/><circle cx="1200" cy="180" r="1.2" fill="%23fff" opacity="0.7"/><circle cx="1550" cy="400" r="1.8" fill="%23fff" opacity="0.85"/><circle cx="1720" cy="220" r="1.2" fill="%23fff" opacity="0.65"/><circle cx="680" cy="700" r="1.6" fill="%23fff" opacity="0.8"/></svg>',
  },
  {
    id: 'emerald-abyss',
    name: '翡翠深渊 (Emerald Forest)',
    mediaType: 'image',
    preview: 'linear-gradient(135deg, #021a12 0%, #064e3b 50%, #022c22 100%)',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><defs><radialGradient id="e1" cx="30%" cy="30%" r="60%"><stop offset="0%" stop-color="%23059669" stop-opacity="0.6"/><stop offset="100%" stop-color="%23021a12" stop-opacity="0"/></radialGradient><radialGradient id="e2" cx="70%" cy="70%" r="60%"><stop offset="0%" stop-color="%230d9488" stop-opacity="0.5"/><stop offset="100%" stop-color="%23021a12" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="%2302110b"/><rect width="100%" height="100%" fill="url(%23e1)"/><rect width="100%" height="100%" fill="url(%23e2)"/></svg>',
  }
];

// 默认皮肤：默认即为官方深海极客蓝 (DeepSeek Official)
const DEFAULT_CONFIG = {
  enabled: true,
  activePresetId: 'deepseek-official',
  colors: { ...PRESET_THEMES[0].colors },
  frosted: {
    enabled: true,
    blurRadius: 18,
    surfaceOpacity: 0.82,
    saturation: 135,
    sidebarBlur: true,
    cardsBlur: true,
    composerBlur: true,
    borderHighlight: true,
    codeCardOpacity: 0.96,
  },
  background: {
    enabled: true,
    type: 'preset',
    mediaType: 'image',
    url: PRESET_WALLPAPERS[0].url,
    presetId: 'aurora-gradient',
    fit: 'cover',
    overlayColor: '#000000',
    overlayOpacity: 0.35,
    blur: 0,
    brightness: 100,
    contrast: 100,
  }
};


    // ==========================================
    // 3. 样式引擎与背景图管理
    // ==========================================
    /**
 * Theme Engine for DeepSeek Harness
 * Custom UI theme applicator, frosted glass & background image manager
 * Supports both static wallpapers and dynamic looping video backgrounds
 */

const STYLE_TAG_ID = 'dsh-theme-customizer-injected-style';
const BG_CONTAINER_ID = 'dsh-theme-customizer-bg-container';

/**
 * 将 #RRGGBB 或 #RGB 转换为带有指定不透明度的 rgba(...) 字符串
 */
function hexToRgba(hex, alpha = 1) {
  if (!hex || typeof hex !== 'string') return hex;
  let clean = hex.trim().replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  if (clean.length !== 6) return hex;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return hex;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * 获取或创建注入样式的 style 标签
 */
function getOrCreateStyleTag() {
  if (typeof document === 'undefined') return null;
  let tag = document.getElementById(STYLE_TAG_ID);
  if (!tag) {
    tag = document.createElement('style');
    tag.id = STYLE_TAG_ID;
    tag.dataset.customizer = 'true';
    document.head.appendChild(tag);
  }
  return tag;
}

/**
 * 获取或创建全屏背景容器
 * 注意：整个窗口只保留这一个视口级统一背景容器，全屏固定定位 (fixed)，覆盖整个屏幕
 * 支持双模态渲染：<div id="...bg-image"> 静态图片与 <video id="...bg-video"> 动态循环视频
 */
function getOrCreateBgContainer() {
  if (typeof document === 'undefined') return null;
  let container = document.getElementById(BG_CONTAINER_ID);
  if (!container) {
    container = document.createElement('div');
    container.id = BG_CONTAINER_ID;
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    `;

    // 静态背景图层
    const imgEl = document.createElement('div');
    imgEl.id = 'dsh-customizer-bg-image';
    imgEl.style.cssText = `
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background-position: center center;
      background-repeat: no-repeat;
      transition: opacity 0.25s ease, filter 0.25s ease;
      display: none;
    `;

    // 动态视频背景图层
    const videoEl = document.createElement('video');
    videoEl.id = 'dsh-customizer-bg-video';
    videoEl.autoplay = true;
    videoEl.muted = true;
    videoEl.loop = true;
    videoEl.playsInline = true;
    videoEl.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      transform: translate(-50%, -50%);
      object-fit: cover;
      pointer-events: none;
      transition: opacity 0.25s ease, filter 0.25s ease;
      display: none;
    `;

    // 遮罩蒙版层
    const overlayEl = document.createElement('div');
    overlayEl.id = 'dsh-customizer-bg-overlay';
    overlayEl.style.cssText = `
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      transition: background-color 0.25s ease, opacity 0.25s ease;
    `;

    container.appendChild(imgEl);
    container.appendChild(videoEl);
    container.appendChild(overlayEl);
    document.body.prepend(container);
  }
  return container;
}

/**
 * 格式化背景 URL，避免内联 SVG 或 data-uri 中未编码的双引号破坏 CSS url(...)
 */
function formatCssUrl(url) {
  if (!url) return 'none';
  const trimmed = url.trim();
  if (trimmed.startsWith('url(')) return trimmed;
  const safe = trimmed.replaceAll("'", "%27");
  return `url('${safe}')`;
}

/**
 * 判断是否为视频媒体资源 (通过后缀、MIME 或参数)
 */
function isVideoMedia(url, explicitType) {
  if (explicitType === 'video') return true;
  if (!url) return false;
  const clean = url.trim().toLowerCase();
  if (clean.startsWith('data:video/')) return true;
  return clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.ogg') || clean.endsWith('.mov') || clean.includes('.mp4?') || clean.includes('.webm?');
}

/**
 * 检测当前系统是否处于深色模式
 */
function isCurrentDarkMode() {
  if (typeof document === 'undefined') return true;
  return document.body.hasAttribute('data-ds-dark-theme') || (typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches);
}

/**
 * 根据配置生成完整的 CSS
 */
function generateCss(config) {
  if (!config || !config.enabled) {
    return '';
  }

  const { colors, frosted, background } = config;
  const isFrosted = frosted && frosted.enabled;
  const hasBg = background && background.enabled && Boolean(background.url);

  // 基础透明度策略：开启背景或磨砂时，必须透出背景图
  const baseAlpha = hasBg ? (isFrosted ? Math.min(frosted.surfaceOpacity, 0.85) : 0.82) : 1;
  const sidebarAlpha = hasBg ? (isFrosted && frosted.sidebarBlur ? Math.min(frosted.surfaceOpacity * 0.9, 0.72) : 0.78) : 1;
  const layer1Alpha = hasBg ? (isFrosted && frosted.cardsBlur ? Math.min(frosted.surfaceOpacity, 0.88) : 0.92) : 1;
  const layer2Alpha = isFrosted ? Math.min(layer1Alpha + 0.05, 0.95) : 1;
  
  // 输入框大卡片通透度：设置清爽轻盈的半透明（0.45 ~ 0.52），透出底部壁纸与磨砂，彻底杜绝黑色厚块
  const composerAlpha = hasBg ? (isFrosted && frosted.composerBlur ? Math.min(frosted.surfaceOpacity * 0.55, 0.48) : 0.45) : 1;

  // 代码修改与 diff 卡片专属高不透明度 (默认 0.96)，避免半透明导致代码文本与背景重叠难以阅读
  const codeAlpha = frosted && frosted.codeCardOpacity !== undefined ? frosted.codeCardOpacity : 0.96;
  const codeBlockBgRgba = hexToRgba(colors.codeBlockBg || colors.layer2 || '#161922', codeAlpha);

  const bgBaseRgba = hexToRgba(colors.bgBase, baseAlpha);
  const sidebarFillRgba = hexToRgba(colors.sidebarFill, sidebarAlpha);
  const layer1Rgba = hexToRgba(colors.layer1, layer1Alpha);
  const layer2Rgba = hexToRgba(colors.layer2, layer2Alpha);
  const composerBgRgba = hexToRgba(colors.composerBg || colors.layer1, composerAlpha);

  const blurPx = isFrosted ? frosted.blurRadius : 0;
  const satPct = isFrosted ? frosted.saturation : 100;

  // 磨砂样式规则
  const frostedBackdropFilter = isFrosted ? `
    backdrop-filter: blur(${blurPx}px) saturate(${satPct}%) !important;
    -webkit-backdrop-filter: blur(${blurPx}px) saturate(${satPct}%) !important;
  ` : '';

  const borderHighlightStyle = isFrosted && frosted.borderHighlight ? `
    box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
  ` : '';

  return `
    /* DeepSeek Colorful Generated Styles */
    :root, body, body[data-ds-dark-theme], html {
      /* 1. 基础面板与层级色彩 */
      --dsw-alias-bg-base: ${bgBaseRgba} !important;
      --dsw-specific-sidebar-fill: ${sidebarFillRgba} !important;
      --dsw-alias-bg-layer-1: ${layer1Rgba} !important;
      --dsw-alias-bg-layer-2: ${layer2Rgba} !important;
      --dsw-alias-bg-layer-3: ${hexToRgba(colors.layer2, 0.98)} !important;
      --dsw-alias-bg-overlay: ${hexToRgba(colors.layer2, 0.96)} !important;
      --dsw-alias-bg-module-platform: ${layer2Rgba} !important;
      --dsw-specific-input-major: transparent !important;
      --dsw-specific-bubble: ${layer1Rgba} !important;
      --dsw-specific-menu: ${layer2Rgba} !important;
      --dsw-menu-surface-fill: ${layer2Rgba} !important;

      /* 代码与 diff 卡片专属高清晰度底色变量 */
      --dsw-alias-markdown-code-block: ${codeBlockBgRgba} !important;
      --dsw-alias-markdown-code-block-banner: ${codeBlockBgRgba} !important;
      --dsl-code-block-background: ${codeBlockBgRgba} !important;

      /* 2. 品牌主色、强调与按钮 */
      --dsw-alias-brand-primary: ${colors.brandPrimary} !important;
      --dsw-alias-brand-primary-new-colorprimary-new-color: ${colors.brandPrimary} !important;
      --dsw-alias-button-primary-fill: ${colors.brandPrimary} !important;
      --dsw-alias-button-primary-hover: ${colors.brandHover} !important;
      --dsw-alias-button-info-fill: ${colors.brandPrimary} !important;
      --dsw-alias-button-info-hover: ${colors.brandHover} !important;
      --dsw-alias-state-business-primary: ${colors.brandPrimary} !important;
      --dsw-alias-link: ${colors.brandPrimary} !important;
      --dsw-specific-bubble-highlight: ${hexToRgba(colors.brandPrimary, 0.18)} !important;
      
      /* 悬停高亮色 (Hover Accent) 强力映射 */
      --dsw-alias-interactive-bg-hover: ${hexToRgba(colors.brandHover, 0.18)} !important;
      --dsw-alias-interactive-bg-hover-solid: ${hexToRgba(colors.brandHover, 0.25)} !important;
      --dsw-alias-interactive-bg-hover-accent: ${hexToRgba(colors.brandHover, 0.3)} !important;
      --dsw-alias-interactive-bg-active: ${hexToRgba(colors.brandHover, 0.35)} !important;
      --dsw-specific-sidebar-nav-item-hover: ${hexToRgba(colors.brandHover, 0.15)} !important;

      /* 3. 文字颜色 */
      --dsw-alias-label-primary: ${colors.textPrimary} !important;
      --dsw-alias-label-primary-bluish: ${colors.textPrimary} !important;
      --dsw-alias-brand-text: ${colors.textPrimary} !important;
      --dsw-alias-label-secondary: ${colors.textSecondary} !important;
      --dsw-alias-label-tertiary: ${hexToRgba(colors.textSecondary, 0.85)} !important;
      --dsw-alias-label-caption: ${hexToRgba(colors.textSecondary, 0.7)} !important;

      /* 4. 边框与描边 */
      --dsw-alias-border-l1: ${colors.borderColor}40 !important;
      --dsw-alias-border-l2: ${colors.borderColor} !important;
      --dsw-alias-border-l3: ${colors.borderColor} !important;
      --dsw-alias-border-l4: ${colors.borderColor} !important;
      --dsw-alias-settings-card-stroke: ${colors.borderColor} !important;
    }

    /* 代码修改、Diff 对比卡片与编辑器预览保护 */
    div[class*="diffBody"], div[class*="pFy1Ka_diffBody"],
    div[class*="CodeCard"], div[class*="_codeBody_"],
    pre, code, .block[data-code-wrap] {
      background-color: ${codeBlockBgRgba} !important;
      background: ${codeBlockBgRgba} !important;
      backdrop-filter: blur(24px) !important;
      -webkit-backdrop-filter: blur(24px) !important;
      border: 1px solid ${colors.borderColor}66 !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45) !important;
    }

    ${hasBg || isFrosted ? `
      /* 5. 确保外层结构透明，展现整个视口唯一的统一背景图与磨砂效果 */
      html, body {
        background-color: transparent !important;
        background: transparent !important;
      }
      #root {
        position: relative !important;
        z-index: 1 !important;
        background-color: transparent !important;
        background: transparent !important;
      }

      /* 彻底穿透框架布局层，消除纯黑色块阻挡 */
      div[class*="frame"], div[class*="_frame_"], [data-windows-titlebar] .BynINW_frame, div[class*="BynINW_frame"], div[class*="BynINW_"] {
        background-color: transparent !important;
        background: transparent !important;
      }

      /* 顶部 Windows 自定义标题栏 (包含应用/编辑菜单和窗口控制按钮) */
      [data-windows-titlebar] .BynINW_frame {
        background: transparent !important;
        background-color: transparent !important;
      }
      [data-windows-titlebar] .BynINW_frame:before {
        background: ${sidebarFillRgba} !important;
        background-color: ${sidebarFillRgba} !important;
        ${frostedBackdropFilter}
        border-bottom: 0.5px solid ${colors.borderColor}44 !important;
        z-index: 10 !important;
      }
      div[data-windows-menu] {
        background: transparent !important;
        z-index: 1200 !important;
      }

      /* 左侧栏：穿透为半透明+磨砂 */
      div[class*="sidebarCol"], div[class*="_sidebarCol_"], .BynINW_sidebarCol,
      aside, nav, [data-sidebar], div[class*="_2H3hWW_root"], div[class*="sidebar"] {
        background-color: ${sidebarFillRgba} !important;
        background: ${sidebarFillRgba} !important;
        ${frostedBackdropFilter}
        border-right: 1px solid ${colors.borderColor}44 !important;
      }

      /* 中间主工作区列：穿透为半透明+磨砂 */
      div[class*="centerCol"], div[class*="_centerCol_"], .BynINW_centerCol, [data-windows-titlebar] .BynINW_centerCol {
        background-color: ${bgBaseRgba} !important;
        background: ${bgBaseRgba} !important;
        ${frostedBackdropFilter}
      }

      /* 右侧辅助列：穿透为半透明+磨砂 */
      div[class*="rightbarCol"], div[class*="_rightbarCol_"], .BynINW_rightbarCol {
        background-color: ${sidebarFillRgba} !important;
        background: ${sidebarFillRgba} !important;
        ${frostedBackdropFilter}
        border-left: 1px solid ${colors.borderColor}44 !important;
      }

      /* 右侧栏内容区与卡片（工作区文件、新建终端、浏览器）半透明磨砂化 */
      div[class*="unKlVG_entry"], div[class*="Rightbar"] {
        ${frostedBackdropFilter}
      }

      /* 核心修复：新会话初始页 (探索未至之境) 与全部主聊天视口、输入底座穿透完全透明化 */
      div[class*="Dc7zOa_root"], div[class*="viewArea"], div[class*="conversation"],
      div[class*="Hqq-bq_root"], div[class*="HeroShell"], div[class*="Hqq-bq_stack"],
      div[class*="scrollBody"], div[class*="_scrollBody_"],
      div[class*="composerStack"], div[class*="_composerStack_"],
      div[class*="composerHero"], div[class*="_composerHero_"],
      div[class*="composerSeat"], div[class*="_composerSeat_"],
      div[data-composer-seat], [data-conversation-region="composer"],
      div[class*="heroWorkspaceRow"], div[class*="_heroWorkspaceRow_"],
      div[class*="RlGAzG_root"], div[class*="_root_"][class*="RlGAzG"],
      div[class*="RlGAzG_dock"], div[class*="v1kfCW_dock"] {
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
        border-top: none !important;
        border-bottom: none !important;
        box-shadow: none !important;
      }

      /* 彻底消灭原生针对 active / overlay 状态下 composerSeat 注入的实心渐变黑色带 */
      .Dc7zOa_root[data-phase] .Dc7zOa_composerSeat,
      .Dc7zOa_embeddedBody[data-content-phase] .Dc7zOa_composerSeat,
      .Dc7zOa_scrollBody:has([data-conversation-composer-overlay]) > .Dc7zOa_composerSeat,
      .Dc7zOa_root .Dc7zOa_composerSeat,
      .Dc7zOa_composerSeat {
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
        border: none !important;
        box-shadow: none !important;
      }

      /* 新建会话顶部 header 区域透明化 */
      div[class*="Dc7zOa_header"], div[class*="_headerBlank_"] {
        background: transparent !important;
        background-color: transparent !important;
        border-bottom: none !important;
      }

      /* 右侧会话轮次大纲导航器 (Turn Navigator) 磨砂胶囊化 */
      div[class*="xpvNua_frame"], div[class*="_frame_"][style*="right"] {
        background: ${hexToRgba(colors.layer2, 0.45)} !important;
        border: 1px solid ${colors.borderColor}44 !important;
        border-radius: 14px !important;
        padding: 4px 2px !important;
        ${frostedBackdropFilter}
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25) !important;
      }
      button[class*="xpvNua_mark"]:before {
        background: ${colors.brandPrimary} !important;
      }
    ` : ''}

    /* 输入框主卡片：去除背景黑色，保留纯粹透明毛玻璃质感，并彻底去除刺眼的高亮外框 */
    div[class*="composer"], div[class*="inputCard"],
    div[class*="RlGAzG_card"], div[class*="_card_"][class*="RlGAzG"] {
      background-color: transparent !important;
      background: transparent !important;
      background-image: none !important;
      ${frostedBackdropFilter}
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      box-shadow: none !important;
      outline: none !important;
      --dsw-elevation-stroke: none !important;
      --dsw-elevation-soft: none !important;
      --dsw-elevation-stroke-color: transparent !important;
      transition: border-color 0.2s ease !important;
    }

    /* 彻底去除聚焦时的高亮外框 (去除青色/品牌色光环与外发光) */
    div[class*="composer"]:focus-within, div[class*="inputCard"]:focus-within,
    div[class*="RlGAzG_card"]:focus-within, textarea:focus {
      border: 1px solid rgba(255, 255, 255, 0.22) !important;
      border-color: rgba(255, 255, 255, 0.22) !important;
      box-shadow: none !important;
      outline: none !important;
    }

    /* 输入框内部的 textarea、按钮与原生下拉框底色彻底透明，不叠加遮挡 */
    div[class*="RlGAzG_card"] textarea, textarea,
    div[class*="RlGAzG_card"] select,
    div[class*="RlGAzG_card"] [class*="select"] {
      background: transparent !important;
      background-color: transparent !important;
      border: none !important;
      box-shadow: none !important;
      outline: none !important;
    }

    ${isFrosted && frosted.cardsBlur ? `
      /* 消息对话气泡与容器卡片磨砂效果 */
      div[class*="chat-node"], div[class*="bubble"], div[class*="message"] {
        ${frostedBackdropFilter}
        ${borderHighlightStyle}
      }
    ` : ''}

    /* 滚动条美化匹配主题 */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: ${hexToRgba(colors.textSecondary, 0.25)};
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${hexToRgba(colors.textSecondary, 0.45)};
    }
  `;
}

/**
 * 实时更新 CSS 变量（高频颜色调节时直接通过 style.setProperty，同时更新 styleTag，保证无延迟且彻底生效）
 */
function updateColorVariablesFast(colors, frosted, background) {
  const isFrosted = frosted && frosted.enabled;
  const hasBg = background && background.enabled && Boolean(background.url);

  const baseAlpha = hasBg ? (isFrosted ? Math.min(frosted.surfaceOpacity, 0.85) : 0.82) : 1;
  const sidebarAlpha = hasBg ? (isFrosted && frosted.sidebarBlur ? Math.min(frosted.surfaceOpacity * 0.9, 0.72) : 0.78) : 1;
  const layer1Alpha = hasBg ? (isFrosted && frosted.cardsBlur ? Math.min(frosted.surfaceOpacity, 0.88) : 0.92) : 1;
  const layer2Alpha = isFrosted ? Math.min(layer1Alpha + 0.05, 0.95) : 1;
  const composerAlpha = hasBg ? (isFrosted && frosted.composerBlur ? Math.min(frosted.surfaceOpacity * 0.55, 0.48) : 0.45) : 1;
  const codeAlpha = frosted && frosted.codeCardOpacity !== undefined ? frosted.codeCardOpacity : 0.96;

  const bgBaseRgba = hexToRgba(colors.bgBase, baseAlpha);
  const sidebarFillRgba = hexToRgba(colors.sidebarFill, sidebarAlpha);
  const layer1Rgba = hexToRgba(colors.layer1, layer1Alpha);
  const layer2Rgba = hexToRgba(colors.layer2, layer2Alpha);
  const composerBgRgba = hexToRgba(colors.composerBg || colors.layer1, composerAlpha);
  const codeBlockBgRgba = hexToRgba(colors.codeBlockBg || colors.layer2 || '#161922', codeAlpha);

  const targets = [document.documentElement, document.body].filter(Boolean);

  for (const el of targets) {
    el.style.setProperty('--dsw-alias-bg-base', bgBaseRgba, 'important');
    el.style.setProperty('--dsw-specific-sidebar-fill', sidebarFillRgba, 'important');
    el.style.setProperty('--dsw-alias-bg-layer-1', layer1Rgba, 'important');
    el.style.setProperty('--dsw-alias-bg-layer-2', layer2Rgba, 'important');
    el.style.setProperty('--dsw-specific-input-major', 'transparent', 'important');
    el.style.setProperty('--dsw-specific-bubble', layer1Rgba, 'important');
    el.style.setProperty('--dsw-alias-markdown-code-block', codeBlockBgRgba, 'important');
    el.style.setProperty('--dsl-code-block-background', codeBlockBgRgba, 'important');
    el.style.setProperty('--dsw-alias-brand-primary', colors.brandPrimary, 'important');
    el.style.setProperty('--dsw-alias-brand-primary-new-colorprimary-new-color', colors.brandPrimary, 'important');
    el.style.setProperty('--dsw-alias-button-primary-fill', colors.brandPrimary, 'important');
    el.style.setProperty('--dsw-alias-button-primary-hover', colors.brandHover, 'important');
    el.style.setProperty('--dsw-alias-button-info-fill', colors.brandPrimary, 'important');
    el.style.setProperty('--dsw-alias-button-info-hover', colors.brandHover, 'important');
    el.style.setProperty('--dsw-alias-state-business-primary', colors.brandPrimary, 'important');
    el.style.setProperty('--dsw-alias-link', colors.brandPrimary, 'important');
    el.style.setProperty('--dsw-alias-interactive-bg-hover', hexToRgba(colors.brandHover, 0.18), 'important');
    el.style.setProperty('--dsw-alias-interactive-bg-hover-solid', hexToRgba(colors.brandHover, 0.25), 'important');
    el.style.setProperty('--dsw-alias-interactive-bg-hover-accent', hexToRgba(colors.brandHover, 0.3), 'important');
    el.style.setProperty('--dsw-alias-interactive-bg-active', hexToRgba(colors.brandHover, 0.35), 'important');
    el.style.setProperty('--dsw-specific-sidebar-nav-item-hover', hexToRgba(colors.brandHover, 0.15), 'important');
    el.style.setProperty('--dsw-alias-label-primary', colors.textPrimary, 'important');
    el.style.setProperty('--dsw-alias-label-primary-bluish', colors.textPrimary, 'important');
    el.style.setProperty('--dsw-alias-brand-text', colors.textPrimary, 'important');
    el.style.setProperty('--dsw-alias-label-secondary', colors.textSecondary, 'important');
    el.style.setProperty('--dsw-alias-border-l1', `${colors.borderColor}40`, 'important');
    el.style.setProperty('--dsw-alias-border-l2', colors.borderColor, 'important');
    el.style.setProperty('--dsw-alias-border-l3', colors.borderColor, 'important');
    el.style.setProperty('--dsw-alias-border-l4', colors.borderColor, 'important');
  }
}

/**
 * 应用并更新背景图层/视频层（全局唯一的视口容器）
 */
function applyBackground(config) {
  const container = getOrCreateBgContainer();
  if (!container) return;

  const imgEl = container.querySelector('#dsh-customizer-bg-image');
  const videoEl = container.querySelector('#dsh-customizer-bg-video');
  const overlayEl = container.querySelector('#dsh-customizer-bg-overlay');

  if (!config || !config.enabled || !config.background || !config.background.enabled || !config.background.url) {
    if (imgEl) {
      imgEl.style.display = 'none';
      imgEl.style.backgroundImage = 'none';
    }
    if (videoEl) {
      videoEl.style.display = 'none';
      videoEl.pause();
      videoEl.src = '';
    }
    if (overlayEl) {
      overlayEl.style.backgroundColor = 'transparent';
      overlayEl.style.opacity = '0';
    }
    return;
  }

  const { url, fit, overlayColor, overlayOpacity, blur, brightness, contrast, mediaType } = config.background;
  const isVideo = isVideoMedia(url, mediaType);

  const filterStyle = `blur(${blur || 0}px) brightness(${brightness || 100}%) contrast(${contrast || 100}%)`;
  const transformStyle = (blur && blur > 0) ? 'scale(1.05)' : 'none';

  if (isVideo) {
    if (imgEl) imgEl.style.display = 'none';
    if (videoEl) {
      videoEl.style.display = 'block';
      if (videoEl.src !== url) {
        videoEl.src = url;
        videoEl.load();
        videoEl.play().catch(e => console.warn('[UI Theme Customizer] Video autoplay waiting for interaction:', e));
      }
      videoEl.style.filter = filterStyle;
      videoEl.style.transform = `translate(-50%, -50%) ${blur && blur > 0 ? 'scale(1.05)' : 'scale(1)'}`;
      videoEl.style.opacity = '1';
    }
  } else {
    if (videoEl) {
      videoEl.style.display = 'none';
      videoEl.pause();
    }
    if (imgEl) {
      imgEl.style.display = 'block';
      imgEl.style.backgroundImage = formatCssUrl(url);
      imgEl.style.backgroundSize = fit === 'repeat' ? 'auto' : fit || 'cover';
      imgEl.style.backgroundRepeat = fit === 'repeat' ? 'repeat' : 'no-repeat';
      imgEl.style.filter = filterStyle;
      imgEl.style.transform = transformStyle;
      imgEl.style.opacity = '1';
    }
  }

  if (overlayEl) {
    overlayEl.style.backgroundColor = overlayColor || '#000000';
    overlayEl.style.opacity = String(overlayOpacity !== undefined ? overlayOpacity : 0.35);
  }
}

/**
 * 完整应用主题设置
 */
function applyTheme(config) {
  const styleTag = getOrCreateStyleTag();
  if (styleTag) {
    styleTag.textContent = generateCss(config);
  }
  applyBackground(config);
}

/**
 * 移除自定义样式与背景
 */
function removeTheme() {
  const styleTag = document.getElementById(STYLE_TAG_ID);
  if (styleTag) styleTag.remove();

  const bgContainer = document.getElementById(BG_CONTAINER_ID);
  if (bgContainer) bgContainer.remove();
}


    // ==========================================
    // 4. 响应式状态管理 (localStorage 持久化)
    // ==========================================
    


const STORAGE_KEY = 'dsh_ui_theme_customizer_config';
const USER_PRESETS_KEY = 'dsh_ui_theme_customizer_user_presets';

class ThemeCustomizerStore {
  constructor() {
    this.config = this.loadConfig();
    this.userPresets = this.loadUserPresets();
    this.listeners = new Set();
    this.saveTimeout = null;
  }

  loadConfig() {
    if (typeof localStorage === 'undefined') {
      return structuredClone(DEFAULT_CONFIG);
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          colors: { ...DEFAULT_CONFIG.colors, ...(parsed.colors || {}) },
          frosted: { ...DEFAULT_CONFIG.frosted, ...(parsed.frosted || {}) },
          background: { ...DEFAULT_CONFIG.background, ...(parsed.background || {}) }
        };
      }
    } catch (e) {
      console.warn('[UI Theme Customizer] Failed to read localStorage:', e);
    }
    return structuredClone(DEFAULT_CONFIG);
  }

  saveConfig() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config));
    } catch (e) {
      console.warn('[UI Theme Customizer] Failed to save config to localStorage:', e);
    }
  }

  loadUserPresets() {
    if (typeof localStorage === 'undefined') return [];
    try {
      const raw = localStorage.getItem(USER_PRESETS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('[UI Theme Customizer] Failed to load user presets:', e);
    }
    return [];
  }

  saveUserPresets() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(USER_PRESETS_KEY, JSON.stringify(this.userPresets));
    } catch (e) {
      console.warn('[UI Theme Customizer] Failed to save user presets:', e);
    }
  }

  getUserPresets() {
    return this.userPresets;
  }

  saveCurrentAsPreset(name) {
    const trimmed = (name || '').trim() || `自定义配色 ${this.userPresets.length + 1}`;
    const newPreset = {
      id: 'user-' + Date.now(),
      name: trimmed,
      description: '用户自定义保存的外观方案',
      createdAt: new Date().toLocaleDateString(),
      colors: structuredClone(this.config.colors),
      frosted: structuredClone(this.config.frosted),
      background: structuredClone(this.config.background)
    };
    this.userPresets.unshift(newPreset);
    this.saveUserPresets();
    this.notify();
    return newPreset;
  }

  deleteUserPreset(presetId) {
    this.userPresets = this.userPresets.filter(p => p.id !== presetId);
    this.saveUserPresets();
    this.notify();
  }

  scheduleSave() {
    if (this.saveTimeout) clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      this.saveConfig();
    }, 200);
  }

  getConfig() {
    return this.config;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.config);
      } catch (err) {
        console.error('[UI Theme Customizer] Listener error:', err);
      }
    }
  }

  updateColorsFast(newColors) {
    this.config.colors = { ...this.config.colors, ...newColors };
    updateColorVariablesFast(this.config.colors, this.config.frosted, this.config.background);
    this.scheduleSave();
  }

  updateConfig(partial) {
    this.config = {
      ...this.config,
      ...partial,
      colors: partial.colors ? { ...this.config.colors, ...partial.colors } : this.config.colors,
      frosted: partial.frosted ? { ...this.config.frosted, ...partial.frosted } : this.config.frosted,
      background: partial.background ? { ...this.config.background, ...partial.background } : this.config.background
    };
    this.saveConfig();
    applyTheme(this.config);
    this.notify();
  }

  applyPreset(presetId) {
    const preset = this.userPresets.find(p => p.id === presetId) || PRESET_THEMES.find(p => p.id === presetId);
    if (!preset) return;

    const newPartial = {
      activePresetId: presetId,
      colors: { ...preset.colors },
      frosted: preset.frosted ? { ...this.config.frosted, ...preset.frosted } : this.config.frosted
    };

    if (preset.background) {
      newPartial.background = { ...this.config.background, ...preset.background };
    }

    this.updateConfig(newPartial);
  }

  // 响应 DSH 官方明暗主题切换：跟随系统自动自适应
  adaptSystemTheme(isDark) {
    // 如果当前处于官方预设之一，自动在深色/浅色官方预设间切换
    if (this.config.activePresetId === 'deepseek-official' && !isDark) {
      this.applyPreset('deepseek-official-light');
    } else if (this.config.activePresetId === 'deepseek-official-light' && isDark) {
      this.applyPreset('deepseek-official');
    } else {
      // 其它预设重新触发当前配色渲染以匹配深浅属性
      applyTheme(this.config);
    }
  }

  applyWallpaper(wallpaperId) {
    const wp = PRESET_WALLPAPERS.find(w => w.id === wallpaperId);
    if (!wp) return;
    this.updateConfig({
      background: {
        ...this.config.background,
        enabled: true,
        type: 'preset',
        mediaType: wp.mediaType || 'image',
        presetId: wp.id,
        url: wp.url
      }
    });
  }

  resetToDefault() {
    this.config = structuredClone(DEFAULT_CONFIG);
    this.saveConfig();
    applyTheme(this.config);
    this.notify();
  }

  exportConfigJson() {
    const cleanConfig = structuredClone(this.config);
    if (cleanConfig.background && cleanConfig.background.url && cleanConfig.background.url.startsWith('data:')) {
      cleanConfig.background = {
        ...cleanConfig.background,
        url: '[本地离线数据 - 不随 JSON 导出以防止复制假死]'
      };
    }
    return JSON.stringify(cleanConfig, null, 2);
  }

  importConfigJson(jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.background && parsed.background.url && parsed.background.url.includes('[本地离线数据')) {
        delete parsed.background.url;
      }
      this.updateConfig(parsed);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  init(ctx) {
    applyTheme(this.config);

    // 监听 DeepSeek Harness 官方的明暗主题变化事件 (theme/change)
    if (ctx) {
      if (ctx.on) {
        ctx.on("theme/change", (snapshot) => {
          const isDark = snapshot?.active?.colorScheme === 'dark' || document.body.hasAttribute('data-ds-dark-theme');
          this.adaptSystemTheme(isDark);
        });
      }

      // 监听 document.body 上的 data-ds-dark-theme 属性变化
      if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
        const observer = new MutationObserver(() => {
          const isDark = document.body.hasAttribute('data-ds-dark-theme');
          this.adaptSystemTheme(isDark);
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] });
      }
    }
  }
}

const themeStore = new ThemeCustomizerStore();


    // ==========================================
    // 5. 视图渲染逻辑
    // ==========================================
    


/**
 * 创建全功能原生 DOM 调色与配置面板 (无 emoji，严密逻辑架构)
 */
function createCustomizerDom(store) {
  const root = document.createElement('div');
  root.className = 'dsh-customizer-root';

  let currentTab = 'background'; // 默认进入背景设置方便用户即时配置

  function render() {
    root.innerHTML = '';
    const config = store.getConfig();

    // 1. Header
    const header = document.createElement('div');
    header.className = 'dsh-customizer-header';
    header.innerHTML = `
      <h2 class="dsh-customizer-title">
        UI 调色与外观定制
      </h2>
      <p class="dsh-customizer-subtitle">
        全方位色彩微调、全页面背景壁纸/动态视频透传与毛玻璃拟态引擎
      </p>
    `;
    root.appendChild(header);

    // 2. Tabs
    const tabs = document.createElement('div');
    tabs.className = 'dsh-customizer-tabs';
    const tabList = [
      { id: 'background', label: '背景图片与视频' },
      { id: 'colors', label: '颜色调节' },
      { id: 'frosted', label: '磨砂玻璃' },
      { id: 'presets', label: '预设主题' },
      { id: 'backup', label: '备份与重置' }
    ];

    tabList.forEach(t => {
      const btn = document.createElement('button');
      btn.className = `dsh-customizer-tab-btn ${currentTab === t.id ? 'active' : ''}`;
      btn.textContent = t.label;
      btn.onclick = () => {
        currentTab = t.id;
        render();
      };
      tabs.appendChild(btn);
    });
    root.appendChild(tabs);

    // 3. Tab Content
    const content = document.createElement('div');
    content.className = 'dsh-customizer-tab-content';

    if (currentTab === 'background') {
      renderBackgroundTab(content, config, store, render);
    } else if (currentTab === 'colors') {
      renderColorsTab(content, config, store);
    } else if (currentTab === 'frosted') {
      renderFrostedTab(content, config, store);
    } else if (currentTab === 'presets') {
      renderPresetsTab(content, config, store, render);
    } else if (currentTab === 'backup') {
      renderBackupTab(content, config, store, render);
    }

    root.appendChild(content);
  }

  render();
  return root;
}

/** 颜色调节选项卡 - 改为按键应用机制，彻底根除实时触发造成的掉帧与卡顿 */
function renderColorsTab(container, config, store) {
  // 维护局部草稿颜色，未点击应用前不触发系统重绘
  let draftColors = { ...config.colors };

  const card = document.createElement('div');
  card.className = 'dsh-customizer-card';
  card.innerHTML = `
    <div class="dsh-customizer-card-title">
      <span>各区域色彩自定义</span>
      <div style="display: flex; gap: 10px; align-items: center;">
        <button class="dsh-btn dsh-btn-secondary" id="dsh-btn-discard-colors" style="padding: 5px 12px; font-size: 12px;">重置修改</button>
        <button class="dsh-btn dsh-btn-primary" id="dsh-btn-apply-colors" style="padding: 5px 16px; font-size: 13px; font-weight: 600;">
          应用颜色更改
        </button>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: -6px; margin-bottom: 16px;">
      <p style="font-size: 12px; color: #94a3b8; margin: 0;">
        调整下方各区域的颜色（支持吸色器或直接输入 Hex 色值），选好后点击右上角“应用颜色更改”即可一次性生效。
      </p>
      <span id="dsh-color-apply-hint" style="font-size: 12px; color: #4ade80; font-weight: 500;"></span>
    </div>
  `;

  const colorItems = [
    { key: 'bgBase', label: '主界面底色 (Base Background)', desc: '控制主工作区整体背景色基调' },
    { key: 'sidebarFill', label: '侧边栏背景 (Sidebar Fill)', desc: '控制左侧导航栏及折叠栏的填充色' },
    { key: 'layer1', label: '对话卡片表面 (Layer 1)', desc: 'AI 与用户对话消息卡片底色' },
    { key: 'layer2', label: '二级面板/设置卡片 (Layer 2)', desc: '设置弹窗与二级卡片底色' },
    { key: 'codeBlockBg', label: '代码/Diff卡片背景 (Code Block)', desc: '文件修改、Diff对比卡片专属清晰底色' },
    { key: 'composerBg', label: '底部输入框背景 (Composer)', desc: '聊天输入卡片的填充色' },
    { key: 'brandPrimary', label: '品牌主色/按钮 (Brand Accent)', desc: '发送按钮、高亮选中标签与主题主色' },
    { key: 'brandHover', label: '悬停高亮色 (Hover Accent)', desc: '按钮与可点击组件鼠标滑过悬停色' },
    { key: 'textPrimary', label: '正文主要文本 (Primary Text)', desc: '标题与正文主要文字颜色' },
    { key: 'textSecondary', label: '次要弱化文本 (Secondary Text)', desc: '描述文字、提示符与次级文本颜色' },
    { key: 'borderColor', label: '边框与分割线 (Border & Stroke)', desc: '卡片边缘与面板分割线的描边色' }
  ];

  const grid = document.createElement('div');
  grid.className = 'dsh-color-grid';

  const rowElements = [];

  colorItems.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'dsh-color-item';

    const val = draftColors[item.key] || '#ffffff';
    const hex6 = val.startsWith('#') && val.length >= 7 ? val.slice(0, 7) : val;

    itemEl.innerHTML = `
      <div style="flex: 1; min-width: 0; padding-right: 8px;">
        <div class="dsh-color-label">${item.label}</div>
        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${item.desc}</div>
      </div>
      <div class="dsh-color-picker-wrap">
        <input type="color" class="dsh-color-swatch-input" value="${hex6}" title="打开系统拾色器">
        <input type="text" class="dsh-color-hex-input" value="${val}" spellcheck="false" title="输入 Hex 颜色代码">
      </div>
    `;

    const swatch = itemEl.querySelector('.dsh-color-swatch-input');
    const textInput = itemEl.querySelector('.dsh-color-hex-input');

    // 仅更新草稿，不触发整页重排
    swatch.oninput = (e) => {
      const newColor = e.target.value;
      textInput.value = newColor;
      draftColors[item.key] = newColor;
    };

    textInput.oninput = (e) => {
      let newColor = e.target.value.trim();
      if (!newColor.startsWith('#')) newColor = '#' + newColor;
      if (newColor.length >= 7) {
        swatch.value = newColor.slice(0, 7);
      }
      draftColors[item.key] = newColor;
    };

    rowElements.push({ key: item.key, swatch, textInput });
    grid.appendChild(itemEl);
  });

  card.appendChild(grid);

  // 绑定应用按钮
  const applyBtn = card.querySelector('#dsh-btn-apply-colors');
  const discardBtn = card.querySelector('#dsh-btn-discard-colors');
  const applyHint = card.querySelector('#dsh-color-apply-hint');

  applyBtn.onclick = () => {
    store.updateConfig({ colors: { ...draftColors } });
    applyHint.textContent = '已成功应用新配色！';
    setTimeout(() => { applyHint.textContent = ''; }, 2500);
  };

  discardBtn.onclick = () => {
    draftColors = { ...config.colors };
    rowElements.forEach(({ key, swatch, textInput }) => {
      const c = draftColors[key] || '#ffffff';
      textInput.value = c;
      swatch.value = c.startsWith('#') && c.length >= 7 ? c.slice(0, 7) : c;
    });
    applyHint.textContent = '已还原为当前生效值';
    setTimeout(() => { applyHint.textContent = ''; }, 2000);
  };

  container.appendChild(card);
}


/** 磨砂玻璃选项卡 */
function renderFrostedTab(container, config, store) {
  const frosted = config.frosted || {};

  const card = document.createElement('div');
  card.className = 'dsh-customizer-card';

  card.innerHTML = `
    <div class="dsh-customizer-card-title">
      <span>磨砂毛玻璃 (Frosted Glass)</span>
      <label class="dsh-switch">
        <input type="checkbox" id="dsh-frosted-toggle" ${frosted.enabled ? 'checked' : ''}>
        <span class="dsh-switch-slider"></span>
      </label>
    </div>
    <p style="font-size: 13px; color: #94a3b8; margin-top: -6px; margin-bottom: 20px;">
      通过 Backdrop Filter 与表面半透明化，透出底层背景图片或动态视频，呈现细腻高级的玻璃拟态质感。
    </p>

    <!-- 模糊度滑块 -->
    <div class="dsh-slider-group">
      <div class="dsh-slider-header">
        <span>高斯模糊半径 (Blur Radius)</span>
        <span class="dsh-slider-val" id="val-blur">${frosted.blurRadius || 18}px</span>
      </div>
      <input type="range" class="dsh-range-slider" id="slider-blur" min="0" max="40" value="${frosted.blurRadius || 18}">
    </div>

    <!-- 表面透明度滑块 -->
    <div class="dsh-slider-group">
      <div class="dsh-slider-header">
        <span>通用表面不透明度 (Surface Opacity)</span>
        <span class="dsh-slider-val" id="val-opacity">${Math.round((frosted.surfaceOpacity !== undefined ? frosted.surfaceOpacity : 0.78) * 100)}%</span>
      </div>
      <input type="range" class="dsh-range-slider" id="slider-opacity" min="10" max="100" value="${Math.round((frosted.surfaceOpacity !== undefined ? frosted.surfaceOpacity : 0.78) * 100)}">
    </div>

    <!-- 代码修改/Diff卡片专属清晰度滑块 (避免被背景干扰) -->
    <div class="dsh-slider-group" style="background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
      <div class="dsh-slider-header">
        <span style="font-weight: 500; color: #fff;">代码修改 / Diff 对比卡片不透明度 (防背景干扰)</span>
        <span class="dsh-slider-val" id="val-code-opacity">${Math.round((frosted.codeCardOpacity !== undefined ? frosted.codeCardOpacity : 0.96) * 100)}%</span>
      </div>
      <div style="font-size: 11px; color: #94a3b8; margin-bottom: 8px;">提高此数值可使代码对比、Diff 差异与终端文本保持实心或近实心，彻底杜绝复杂壁纸对代码阅读的干扰。</div>
      <input type="range" class="dsh-range-slider" id="slider-code-opacity" min="50" max="100" value="${Math.round((frosted.codeCardOpacity !== undefined ? frosted.codeCardOpacity : 0.96) * 100)}">
    </div>

    <!-- 饱和度增强滑块 -->
    <div class="dsh-slider-group">
      <div class="dsh-slider-header">
        <span>背景饱和度增益 (Saturation Boost)</span>
        <span class="dsh-slider-val" id="val-sat">${frosted.saturation || 140}%</span>
      </div>
      <input type="range" class="dsh-range-slider" id="slider-sat" min="100" max="220" value="${frosted.saturation || 140}">
    </div>

    <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 20px 0; padding-top: 16px;">
      <h4 style="margin: 0 0 12px; font-size: 14px; color: #eee;">细分区域磨砂生效控制</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <label class="dsh-switch-label" style="background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px;">
          <span style="font-size: 13px;">侧边栏磨砂</span>
          <input type="checkbox" id="chk-sidebar-blur" ${frosted.sidebarBlur !== false ? 'checked' : ''}>
        </label>
        <label class="dsh-switch-label" style="background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px;">
          <span style="font-size: 13px;">消息卡片磨砂</span>
          <input type="checkbox" id="chk-cards-blur" ${frosted.cardsBlur !== false ? 'checked' : ''}>
        </label>
        <label class="dsh-switch-label" style="background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px;">
          <span style="font-size: 13px;">输入框卡片磨砂</span>
          <input type="checkbox" id="chk-composer-blur" ${frosted.composerBlur !== false ? 'checked' : ''}>
        </label>
        <label class="dsh-switch-label" style="background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px;">
          <span style="font-size: 13px;">玻璃微光高光边框</span>
          <input type="checkbox" id="chk-border-highlight" ${frosted.borderHighlight !== false ? 'checked' : ''}>
        </label>
      </div>
    </div>
  `;

  // 绑定事件
  card.querySelector('#dsh-frosted-toggle').onchange = (e) => {
    store.updateConfig({ frosted: { enabled: e.target.checked } });
  };

  const sliderBlur = card.querySelector('#slider-blur');
  const valBlur = card.querySelector('#val-blur');
  sliderBlur.oninput = (e) => {
    valBlur.textContent = `${e.target.value}px`;
    store.updateConfig({ frosted: { blurRadius: parseInt(e.target.value) } });
  };

  const sliderOpacity = card.querySelector('#slider-opacity');
  const valOpacity = card.querySelector('#val-opacity');
  sliderOpacity.oninput = (e) => {
    valOpacity.textContent = `${e.target.value}%`;
    store.updateConfig({ frosted: { surfaceOpacity: parseInt(e.target.value) / 100 } });
  };

  const sliderCodeOpacity = card.querySelector('#slider-code-opacity');
  const valCodeOpacity = card.querySelector('#val-code-opacity');
  sliderCodeOpacity.oninput = (e) => {
    valCodeOpacity.textContent = `${e.target.value}%`;
    store.updateConfig({ frosted: { codeCardOpacity: parseInt(e.target.value) / 100 } });
  };

  const sliderSat = card.querySelector('#slider-sat');
  const valSat = card.querySelector('#val-sat');
  sliderSat.oninput = (e) => {
    valSat.textContent = `${e.target.value}%`;
    store.updateConfig({ frosted: { saturation: parseInt(e.target.value) } });
  };

  card.querySelector('#chk-sidebar-blur').onchange = (e) => {
    store.updateConfig({ frosted: { sidebarBlur: e.target.checked } });
  };
  card.querySelector('#chk-cards-blur').onchange = (e) => {
    store.updateConfig({ frosted: { cardsBlur: e.target.checked } });
  };
  card.querySelector('#chk-composer-blur').onchange = (e) => {
    store.updateConfig({ frosted: { composerBlur: e.target.checked } });
  };
  card.querySelector('#chk-border-highlight').onchange = (e) => {
    store.updateConfig({ frosted: { borderHighlight: e.target.checked } });
  };

  container.appendChild(card);
}

/** 背景图片与动态视频选项卡 - 明确区分三种来源，带当前生效卡片与实时预览 */
function renderBackgroundTab(container, config, store, requestRerender) {
  const bg = config.background || {};
  const currentSourceType = bg.type || 'preset'; // 'upload' | 'url' | 'preset'
  const isVideo = isVideoMedia(bg.url, bg.mediaType);

  // 计算当前壁纸名称
  let currentTitle = '未设置背景';
  let currentMeta = '请选择下方任一方式添加背景图片或动态视频';
  if (bg.enabled && bg.url) {
    if (currentSourceType === 'upload') {
      currentTitle = isVideo ? '当前生效：本地上传动态视频' : '当前生效：本地上传图片';
      currentMeta = '已保存在本地浏览器存储中，离线可用';
    } else if (currentSourceType === 'url') {
      currentTitle = isVideo ? '当前生效：网络动态视频流' : '当前生效：自定义网络图片';
      currentMeta = bg.url.length > 50 ? bg.url.slice(0, 50) + '...' : bg.url;
    } else {
      const foundWp = PRESET_WALLPAPERS.find(w => w.id === bg.presetId || w.url === bg.url);
      currentTitle = `当前生效：${foundWp ? foundWp.name : '精选壁纸库'}`;
      currentMeta = isVideo ? '动态视频壁纸，无限平滑循环播放' : '免版权高可用矢量/夜景壁纸';
    }
  }

  const card = document.createElement('div');
  card.className = 'dsh-customizer-card';

  card.innerHTML = `
    <div class="dsh-customizer-card-title">
      <span>自定义背景图片与动态视频</span>
      <label class="dsh-switch">
        <input type="checkbox" id="dsh-bg-toggle" ${bg.enabled ? 'checked' : ''}>
        <span class="dsh-switch-slider"></span>
      </label>
    </div>

    <!-- 1. 当前背景状态与大图预览卡片 (支持视频与图片预览) -->
    <div class="dsh-bg-preview-card" id="dsh-bg-preview-box">
      <div class="dsh-bg-preview-thumbnail" id="dsh-preview-thumb">
        ${isVideo && bg.url ? `
          <video src="${bg.url}" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
        ` : ''}
      </div>
      <div class="dsh-bg-preview-info">
        <div class="dsh-bg-preview-name" id="dsh-preview-title">${currentTitle}</div>
        <div class="dsh-bg-preview-meta" id="dsh-preview-meta">${currentMeta}</div>
        <div style="display: flex; gap: 8px;">
          <button class="dsh-btn dsh-btn-secondary" id="dsh-btn-clear-bg" style="padding: 4px 10px; font-size: 12px;">
            清除背景
          </button>
        </div>
      </div>
    </div>

    <!-- 2. 三种背景来源分类卡片 -->
    <div style="font-size: 13px; font-weight: 600; color: #eee; margin-bottom: 10px;">选择背景图片/视频来源</div>
    <div class="dsh-bg-source-grid">
      <!-- 来源A：本地上传图片或MP4视频 -->
      <div class="dsh-bg-source-card ${currentSourceType === 'upload' && bg.enabled ? 'active' : ''}">
        <div class="dsh-bg-source-header">
          <span class="dsh-bg-source-title">方式 1：本地文件</span>
          <span class="dsh-bg-source-badge">${currentSourceType === 'upload' && bg.enabled ? '使用中' : '未激活'}</span>
        </div>
        <div class="dsh-bg-source-desc">支持本地图片 (JPG/PNG/GIF) 或视频 (MP4/WebM)，自动离线持久化存储。</div>
        <label class="dsh-btn dsh-btn-primary" style="cursor: pointer; width: 100%; justify-content: center; box-sizing: border-box;">
          <span>选择本地图片或视频...</span>
          <input type="file" id="dsh-bg-file-input" accept="image/*,video/mp4,video/webm" style="display: none;">
        </label>
      </div>

      <!-- 来源B：网络图片或视频直链 URL -->
      <div class="dsh-bg-source-card ${currentSourceType === 'url' && bg.enabled ? 'active' : ''}">
        <div class="dsh-bg-source-header">
          <span class="dsh-bg-source-title">方式 2：网络 URL</span>
          <span class="dsh-bg-source-badge">${currentSourceType === 'url' && bg.enabled ? '使用中' : '未激活'}</span>
        </div>
        <div class="dsh-bg-source-desc">输入任意网络图片或动态视频 (.mp4 / .webm) 直链。</div>
        <div style="display: flex; gap: 6px;">
          <input type="text" id="dsh-bg-url-input" placeholder="输入 https://... (支持图片/视频)" 
                 value="${currentSourceType === 'url' && bg.url ? bg.url : ''}" 
                 style="flex: 1; min-width: 0; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 12px;">
          <button class="dsh-btn dsh-btn-primary" id="dsh-bg-url-save" style="padding: 6px 12px; font-size: 12px;">应用</button>
        </div>
      </div>

      <!-- 来源C：精选壁纸库 (含动态视频与静态矢量) -->
      <div class="dsh-bg-source-card ${currentSourceType === 'preset' && bg.enabled ? 'active' : ''}">
        <div class="dsh-bg-source-header">
          <span class="dsh-bg-source-title">方式 3：精选库</span>
          <span class="dsh-bg-source-badge">${currentSourceType === 'preset' && bg.enabled ? '使用中' : '未激活'}</span>
        </div>
        <div class="dsh-bg-source-desc">内置矢量渐变与动态赛博/星空视频，点击下方卡片即可选用。</div>
        <div style="font-size: 12px; color: var(--dsw-alias-brand-primary, #00f0ff);">向下滑动选择精选库 ↓</div>
      </div>
    </div>

    <!-- 3. 精选壁纸展示区 (含动态视频标识) -->
    <div style="margin-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 14px; font-weight: 600; color: #fff;">精选免版权壁纸与动态视频库</span>
        <span style="font-size: 12px; color: #94a3b8;">共 ${PRESET_WALLPAPERS.length} 款壁纸（含动态循环视频），点击直接生效</span>
      </div>
      <div class="dsh-wallpaper-grid"></div>
    </div>

    <!-- 4. 排版模式、遮罩与滤镜调节 -->
    <div style="margin-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 16px;">
      <span style="font-size: 14px; font-weight: 600; color: #fff; display: block; margin-bottom: 12px;">背景排版与文字保护蒙版</span>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 16px; background: rgba(0,0,0,0.2); padding: 14px; border-radius: 8px;">
        <div>
          <label style="font-size: 12px; color: #94a3b8; display: block; margin-bottom: 6px;">适应模式 (Fit Mode)</label>
          <select id="dsh-bg-fit" style="width: 100%; background: #1a1f2c; color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 6px 8px; font-size: 13px;">
            <option value="cover" ${bg.fit === 'cover' ? 'selected' : ''}>Cover (铺满裁剪)</option>
            <option value="contain" ${bg.fit === 'contain' ? 'selected' : ''}>Contain (完整显示)</option>
            <option value="center" ${bg.fit === 'center' ? 'selected' : ''}>Center (居中显示)</option>
            <option value="repeat" ${bg.fit === 'repeat' ? 'selected' : ''}>Tile (平铺纹理)</option>
          </select>
        </div>
        <div>
          <label style="font-size: 12px; color: #94a3b8; display: block; margin-bottom: 6px;">保护蒙版颜色 (按键应用防卡顿)</label>
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="color" id="dsh-bg-overlay-color" value="${bg.overlayColor || '#000000'}" class="dsh-color-swatch-input">
            <button class="dsh-btn dsh-btn-primary" id="dsh-btn-apply-overlay-color" style="padding: 4px 10px; font-size: 12px;">应用蒙版色</button>
            <span id="dsh-overlay-color-hint" style="font-size: 11px; color: #4ade80;"></span>
          </div>
        </div>
      </div>

      <!-- 遮罩不透明度滑块 -->
      <div class="dsh-slider-group">
        <div class="dsh-slider-header">
          <span>遮罩蒙版不透明度 (保证文字可读性)</span>
          <span class="dsh-slider-val" id="val-bg-overlay">${Math.round((bg.overlayOpacity !== undefined ? bg.overlayOpacity : 0.35) * 100)}%</span>
        </div>
        <input type="range" class="dsh-range-slider" id="slider-bg-overlay" min="0" max="90" value="${Math.round((bg.overlayOpacity !== undefined ? bg.overlayOpacity : 0.35) * 100)}">
      </div>

      <!-- 背景自身模糊滑块 -->
      <div class="dsh-slider-group">
        <div class="dsh-slider-header">
          <span>背景自身虚化 (Background Blur)</span>
          <span class="dsh-slider-val" id="val-bg-blur">${bg.blur || 0}px</span>
        </div>
        <input type="range" class="dsh-range-slider" id="slider-bg-blur" min="0" max="30" value="${bg.blur || 0}">
      </div>
    </div>
  `;

  // 设置预览图缩略图
  const thumbEl = card.querySelector('#dsh-preview-thumb');
  if (bg.enabled && bg.url) {
    if (!isVideo) {
      thumbEl.style.backgroundImage = formatCssUrl(bg.url);
    }
  } else {
    thumbEl.style.backgroundImage = 'none';
    thumbEl.style.backgroundColor = '#1e293b';
  }

  // 绑定事件：总开关
  card.querySelector('#dsh-bg-toggle').onchange = (e) => {
    store.updateConfig({ background: { enabled: e.target.checked } });
    if (requestRerender) requestRerender();
  };

  // 绑定清除背景
  card.querySelector('#dsh-btn-clear-bg').onclick = () => {
    store.updateConfig({
      background: {
        enabled: false,
        url: '',
        presetId: null,
        mediaType: 'image'
      }
    });
    if (requestRerender) requestRerender();
  };

  // 绑定文件上传 (支持图片与 MP4/WebM 视频)
  const fileInput = card.querySelector('#dsh-bg-file-input');
  fileInput.onchange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVid = file.type.startsWith('video/');
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target.result;
      store.updateConfig({
        background: {
          enabled: true,
          type: 'upload',
          mediaType: isVid ? 'video' : 'image',
          url: dataUrl,
          presetId: null
        }
      });
      if (requestRerender) requestRerender();
    };
    reader.readAsDataURL(file);
  };

  // 绑定 URL 保存
  const urlInput = card.querySelector('#dsh-bg-url-input');
  const urlSaveBtn = card.querySelector('#dsh-bg-url-save');
  urlSaveBtn.onclick = () => {
    const u = urlInput.value.trim();
    if (!u) return;
    const isVid = isVideoMedia(u, null);
    store.updateConfig({
      background: {
        enabled: true,
        type: 'url',
        mediaType: isVid ? 'video' : 'image',
        url: u,
        presetId: null
      }
    });
    if (requestRerender) requestRerender();
  };

  // 绑定排版参数
  card.querySelector('#dsh-bg-fit').onchange = (e) => {
    store.updateConfig({ background: { fit: e.target.value } });
  };

  // 关键优化：保护蒙版颜色改为按键应用，避免选色器实时频繁重绘导致卡顿
  const overlayColorInput = card.querySelector('#dsh-bg-overlay-color');
  const applyOverlayBtn = card.querySelector('#dsh-btn-apply-overlay-color');
  const overlayHint = card.querySelector('#dsh-overlay-color-hint');
  applyOverlayBtn.onclick = () => {
    const chosenColor = overlayColorInput.value;
    store.updateConfig({ background: { overlayColor: chosenColor } });
    overlayHint.textContent = '已应用';
    setTimeout(() => { overlayHint.textContent = ''; }, 2000);
  };

  const sliderOverlay = card.querySelector('#slider-bg-overlay');
  const valOverlay = card.querySelector('#val-bg-overlay');
  sliderOverlay.oninput = (e) => {
    valOverlay.textContent = `${e.target.value}%`;
    store.updateConfig({ background: { overlayOpacity: parseInt(e.target.value) / 100 } });
  };

  const sliderBlur = card.querySelector('#slider-bg-blur');
  const valBlur = card.querySelector('#val-bg-blur');
  sliderBlur.oninput = (e) => {
    valBlur.textContent = `${e.target.value}px`;
    store.updateConfig({ background: { blur: parseInt(e.target.value) } });
  };

  // 渲染精选壁纸网格
  const wpGrid = card.querySelector('.dsh-wallpaper-grid');
  PRESET_WALLPAPERS.forEach(wp => {
    const wpEl = document.createElement('div');
    const isActive = currentSourceType === 'preset' && (bg.presetId === wp.id || bg.url === wp.url);
    wpEl.className = `dsh-wallpaper-card ${isActive ? 'active' : ''}`;
    wpEl.style.backgroundImage = wp.preview.startsWith('linear-gradient') ? wp.preview : formatCssUrl(wp.url);
    wpEl.innerHTML = `
      <div class="dsh-wallpaper-name-badge">${wp.name}</div>
    `;
    wpEl.onclick = () => {
      store.applyWallpaper(wp.id);
      if (requestRerender) requestRerender();
    };
    wpGrid.appendChild(wpEl);
  });

  container.appendChild(card);
}

/** 预设主题选项卡：内置精选主题 + 用户自定义预设创建/保存/删除 */
function renderPresetsTab(container, config, store, requestRerender) {
  const userPresets = store.getUserPresets();

  const card = document.createElement('div');
  card.className = 'dsh-customizer-card';
  card.innerHTML = `
    <!-- 1. 保存当前配置为新预设 -->
    <div style="background: rgba(0, 240, 255, 0.05); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 10px; padding: 14px; margin-bottom: 24px;">
      <div style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 6px;">创建并保存当前外观方案</div>
      <div style="font-size: 12px; color: #94a3b8; margin-bottom: 12px;">将您当前微调的色彩、磨砂深度与背景图片/动态视频保存为独立方案，随时一键切换。</div>
      <div style="display: flex; gap: 8px;">
        <input type="text" id="dsh-save-preset-name" placeholder="为当前预设命名 (如：我的暗黑代码流)..." 
               style="flex: 1; min-width: 0; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 7px 12px; color: #fff; font-size: 13px;">
        <button class="dsh-btn dsh-btn-primary" id="dsh-btn-save-current" style="white-space: nowrap; padding: 7px 16px;">
          保存当前方案
        </button>
      </div>
      <div id="dsh-save-preset-hint" style="font-size: 12px; color: #4ade80; margin-top: 6px;"></div>
    </div>

    <!-- 2. 用户自定义预设列表 -->
    ${userPresets.length > 0 ? `
      <div class="dsh-customizer-card-title">
        <span>我的自定义外观方案</span>
        <span style="font-size: 12px; font-weight: normal; color: #94a3b8;">共 ${userPresets.length} 个已存方案</span>
      </div>
      <div class="dsh-preset-grid" style="margin-bottom: 28px;" id="dsh-user-preset-grid"></div>
    ` : ''}

    <!-- 3. 内置精选主题预设 -->
    <div class="dsh-customizer-card-title">
      <span>精选官方预设主题</span>
      <span style="font-size: 12px; font-weight: normal; color: #94a3b8;">共 ${PRESET_THEMES.length} 套精心调优配色方案</span>
    </div>
    <div class="dsh-preset-grid" id="dsh-builtin-preset-grid"></div>
  `;

  // 绑定保存预设按钮
  const saveInput = card.querySelector('#dsh-save-preset-name');
  const saveBtn = card.querySelector('#dsh-btn-save-current');
  const saveHint = card.querySelector('#dsh-save-preset-hint');

  saveBtn.onclick = () => {
    const name = saveInput.value.trim();
    const created = store.saveCurrentAsPreset(name);
    saveInput.value = '';
    saveHint.textContent = `已成功保存方案：“${created.name}”！`;
    setTimeout(() => {
      if (requestRerender) requestRerender();
    }, 600);
  };

  // 渲染用户自定义预设网格
  if (userPresets.length > 0) {
    const userGrid = card.querySelector('#dsh-user-preset-grid');
    userPresets.forEach(p => {
      const pEl = document.createElement('div');
      const isActive = config.activePresetId === p.id;
      pEl.className = `dsh-preset-card ${isActive ? 'active' : ''}`;

      pEl.innerHTML = `
        <div class="dsh-preset-palette-bar">
          <div class="dsh-preset-palette-color" style="background: ${p.colors.bgBase};" title="背景底色"></div>
          <div class="dsh-preset-palette-color" style="background: ${p.colors.sidebarFill};" title="侧边栏"></div>
          <div class="dsh-preset-palette-color" style="background: ${p.colors.layer1};" title="卡片色"></div>
          <div class="dsh-preset-palette-color" style="background: ${p.colors.brandPrimary};" title="高亮主色"></div>
          <div class="dsh-preset-palette-color" style="background: ${p.colors.textPrimary};" title="文本色"></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div class="dsh-preset-name">${p.name}</div>
            <div class="dsh-preset-desc">${p.description} (${p.createdAt})</div>
          </div>
          <button class="dsh-btn dsh-btn-danger" style="padding: 2px 6px; font-size: 11px; margin-top: -2px;" title="删除该方案">
            删除
          </button>
        </div>
      `;

      // 点击卡片应用方案
      pEl.onclick = (e) => {
        if (e.target.tagName === 'BUTTON') return;
        store.applyPreset(p.id);
        if (requestRerender) requestRerender();
      };

      // 绑定删除按钮
      const delBtn = pEl.querySelector('button');
      delBtn.onclick = (e) => {
        e.stopPropagation();
        if (confirm(`确定要删除方案“${p.name}”吗？`)) {
          store.deleteUserPreset(p.id);
          if (requestRerender) requestRerender();
        }
      };

      userGrid.appendChild(pEl);
    });
  }

  // 渲染内置精选预设网格
  const builtinGrid = card.querySelector('#dsh-builtin-preset-grid');
  PRESET_THEMES.forEach(p => {
    const pEl = document.createElement('div');
    const isActive = config.activePresetId === p.id;
    pEl.className = `dsh-preset-card ${isActive ? 'active' : ''}`;

    pEl.innerHTML = `
      <div class="dsh-preset-palette-bar">
        <div class="dsh-preset-palette-color" style="background: ${p.colors.bgBase};" title="背景底色"></div>
        <div class="dsh-preset-palette-color" style="background: ${p.colors.sidebarFill};" title="侧边栏"></div>
        <div class="dsh-preset-palette-color" style="background: ${p.colors.layer1};" title="卡片色"></div>
        <div class="dsh-preset-palette-color" style="background: ${p.colors.brandPrimary};" title="高亮主色"></div>
        <div class="dsh-preset-palette-color" style="background: ${p.colors.textPrimary};" title="文本色"></div>
      </div>
      <div class="dsh-preset-name">${p.name}</div>
      <div class="dsh-preset-desc">${p.description}</div>
    `;

    pEl.onclick = () => {
      store.applyPreset(p.id);
      if (requestRerender) requestRerender();
    };

    builtinGrid.appendChild(pEl);
  });

  container.appendChild(card);
}

/** 备份与重置选项卡 - 异步剪贴板与防卡顿优化 */
function renderBackupTab(container, config, store, requestRerender) {
  const card = document.createElement('div');
  card.className = 'dsh-customizer-card';
  card.innerHTML = `
    <div class="dsh-customizer-card-title">
      <span>配置导出、导入与重置</span>
    </div>
    <p style="font-size: 13px; color: #94a3b8; margin-bottom: 20px;">
      可以将您设计的色彩与磨砂背景配置导出为轻量 JSON 分享或备份，粘贴配置即可快速还原。
    </p>

    <div style="margin-bottom: 24px;">
      <button class="dsh-btn dsh-btn-secondary" id="dsh-btn-export">复制当前配置 JSON 到剪贴板</button>
      <span id="dsh-export-hint" style="margin-left: 12px; font-size: 12px; color: #4ade80;"></span>
    </div>

    <div style="margin-bottom: 24px;">
      <textarea id="dsh-import-json-area" placeholder="在此粘贴导出的配置 JSON 字符串..." 
                style="width: 100%; height: 90px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px; color: #fff; font-family: monospace; font-size: 12px; box-sizing: border-box; resize: vertical; overflow-x: hidden;"></textarea>
      <div style="margin-top: 8px; display: flex; gap: 10px; align-items: center;">
        <button class="dsh-btn dsh-btn-primary" id="dsh-btn-import">导入并立即应用</button>
        <span id="dsh-import-hint" style="font-size: 12px;"></span>
      </div>
    </div>

    <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; margin-top: 24px;">
      <h4 style="margin: 0 0 10px; font-size: 14px; color: #ef4444;">恢复初始设置</h4>
      <p style="font-size: 12px; color: #94a3b8; margin-bottom: 12px;">重置所有自定义颜色、磨砂和壁纸，还原为官方推荐的预设外观。</p>
      <button class="dsh-btn dsh-btn-danger" id="dsh-btn-reset">恢复默认设置</button>
    </div>
  `;

  // 绑定导出（异步分片执行，彻底防止大文本锁死 UI 线程）
  const exportBtn = card.querySelector('#dsh-btn-export');
  const exportHint = card.querySelector('#dsh-export-hint');
  exportBtn.onclick = () => {
    exportBtn.disabled = true;
    exportHint.style.color = '#94a3b8';
    exportHint.textContent = '正在生成配置...';

    setTimeout(() => {
      try {
        const jsonStr = store.exportConfigJson();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(jsonStr).then(() => {
            exportHint.style.color = '#4ade80';
            exportHint.textContent = '已成功复制到剪贴板！';
            exportBtn.disabled = false;
            setTimeout(() => { exportHint.textContent = ''; }, 3000);
          }).catch(err => {
            fallbackCopy(jsonStr);
          });
        } else {
          fallbackCopy(jsonStr);
        }
      } catch (e) {
        exportHint.style.color = '#ef4444';
        exportHint.textContent = '导出失败：' + e.message;
        exportBtn.disabled = false;
      }
    }, 20);

    function fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      exportHint.style.color = '#4ade80';
      exportHint.textContent = '已成功复制到剪贴板！';
      exportBtn.disabled = false;
      setTimeout(() => { exportHint.textContent = ''; }, 3000);
    }
  };

  // 绑定导入（异步执行，避免大 JSON 解析阻塞主界面）
  const importBtn = card.querySelector('#dsh-btn-import');
  const importArea = card.querySelector('#dsh-import-json-area');
  const importHint = card.querySelector('#dsh-import-hint');
  importBtn.onclick = () => {
    const raw = importArea.value.trim();
    if (!raw) return;
    importBtn.disabled = true;
    importHint.style.color = '#94a3b8';
    importHint.textContent = '正在解析应用...';

    setTimeout(() => {
      const res = store.importConfigJson(raw);
      importBtn.disabled = false;
      if (res.success) {
        importHint.style.color = '#4ade80';
        importHint.textContent = '导入成功并已应用！';
        setTimeout(() => { importHint.textContent = ''; }, 3000);
        if (requestRerender) requestRerender();
      } else {
        importHint.style.color = '#ef4444';
        importHint.textContent = `导入失败: ${res.error}`;
      }
    }, 20);
  };

  const resetBtn = card.querySelector('#dsh-btn-reset');
  resetBtn.onclick = () => {
    if (confirm('确定要恢复默认设置吗？您当前的所有色彩与背景调整将被重置。')) {
      store.resetToDefault();
      alert('已成功重置为默认主题！');
      if (requestRerender) requestRerender();
    }
  };

  container.appendChild(card);
}



    // ==========================================
    // 6. 悬浮快捷球与弹窗面板
    // ==========================================
    


const LAUNCHER_BTN_ID = 'dsh-floating-customizer-btn';
const MODAL_ID = 'dsh-floating-customizer-modal';

let isModalOpen = false;
let hideTimer = null;

function installFloatingLauncher() {
  if (typeof document === 'undefined') return;

  // 1. 如果按钮已存在则无需重复创建
  if (document.getElementById(LAUNCHER_BTN_ID)) return;

  // 2. 创建悬浮按钮 (纯矢量图标风格)
  const btn = document.createElement('button');
  btn.id = LAUNCHER_BTN_ID;
  btn.title = 'UI 调色与磨砂背景定制 (点击打开)';
  btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`;

  btn.onclick = () => {
    toggleModal();
  };

  // 3. 智能完全隐藏逻辑：
  // 鼠标离开或无操作 2 秒后自动完全透明隐形（opacity: 0, 缩小，且 pointer-events: none，屏幕边缘 100% 干净，不遮挡任何界面元素）
  // 鼠标移动到屏幕右下角区域 (距离右边缘与下边缘 110px 以内) 时瞬间完全显形唤醒！
  function scheduleAutoHide() {
    if (isModalOpen) return;
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!isModalOpen) {
        btn.classList.add('dsh-btn-autohide');
      }
    }, 2000);
  }

  function wakeUpButton() {
    if (hideTimer) clearTimeout(hideTimer);
    btn.classList.remove('dsh-btn-autohide');
    scheduleAutoHide();
  }

  btn.onmouseenter = () => {
    if (hideTimer) clearTimeout(hideTimer);
    btn.classList.remove('dsh-btn-autohide');
  };

  btn.onmouseleave = () => {
    scheduleAutoHide();
  };

  // 监听全屏鼠标活动，当鼠标进入屏幕右下角感应区时瞬间唤醒
  window.addEventListener('mousemove', (e) => {
    const fromRight = window.innerWidth - e.clientX;
    const fromBottom = window.innerHeight - e.clientY;
    if (fromRight < 110 && fromBottom < 110) {
      wakeUpButton();
    }
  }, { passive: true });

  document.body.appendChild(btn);
  scheduleAutoHide();
}

function openModal() {
  if (typeof document === 'undefined') return;
  let modal = document.getElementById(MODAL_ID);
  const btn = document.getElementById(LAUNCHER_BTN_ID);
  if (btn) {
    btn.classList.remove('dsh-btn-autohide');
    if (hideTimer) clearTimeout(hideTimer);
  }

  if (modal) {
    modal.style.display = 'flex';
    isModalOpen = true;
    return;
  }

  modal = document.createElement('div');
  modal.id = MODAL_ID;

  // Header
  const header = document.createElement('div');
  header.className = 'dsh-modal-header';
  header.innerHTML = `
    <div class="dsh-modal-header-title">
      <span>外观设计器</span>
    </div>
    <button class="dsh-modal-close-btn" title="关闭">✕</button>
  `;

  header.querySelector('.dsh-modal-close-btn').onclick = () => {
    closeModal();
  };

  // Body
  const body = document.createElement('div');
  body.className = 'dsh-modal-body';
  body.appendChild(createCustomizerDom(themeStore));

  modal.appendChild(header);
  modal.appendChild(body);
  document.body.appendChild(modal);

  isModalOpen = true;
}

function closeModal() {
  if (typeof document === 'undefined') return;
  const modal = document.getElementById(MODAL_ID);
  if (modal) {
    modal.style.display = 'none';
  }
  isModalOpen = false;

  const btn = document.getElementById(LAUNCHER_BTN_ID);
  if (btn) {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      btn.classList.add('dsh-btn-autohide');
    }, 2000);
  }
}

function toggleModal() {
  if (isModalOpen) {
    closeModal();
  } else {
    openModal();
  }
}


    // ==========================================
    // 7. 设置面板 React 组件
    // ==========================================
    function CustomizerSettingsSection(props) {
      const containerRef = React.useRef(null);
      React.useEffect(() => {
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(createCustomizerDom(themeStore));
        }
      }, []);
      return React.createElement('div', {
        ref: containerRef,
        style: { width: '100%', height: '100%', overflowY: 'auto' }
      });
    }

    // ==========================================
    // 8. 插件入口与 Cordis Slot 注入
    // ==========================================
    const inject = ["slots", "theme"];

    function apply(ctx) {
      console.log("[DeepSeek Colorful] Initializing client plugin...");

      // 1. 安装基础 UI 样式与全屏背景层
      installUiStyles();

      // 2. 初始化持久化主题，立即应用配色、磨砂与背景图
      themeStore.init();

      // 3. 安装主界面右下角悬浮设计球
      installFloatingLauncher();

      // 4. 注册到系统设置（Settings）面板的独立 section
      if (ctx.slots && typeof ctx.slots.inject === 'function') {
        ctx.slots.inject("settings.section", () => {
          return ctx.slots.register({
            name: "settings.section",
            id: "deepseek-colorful",
            order: 25,
            label: () => "外观定制",
            locale: "settings.customizer"
          }, CustomizerSettingsSection);
        });
      }

      console.log("[DeepSeek Colorful] Client plugin ready!");
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  }
});
