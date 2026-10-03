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
    const UI_STYLES = `
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
    const STYLE_TAG_ID = 'dsh-theme-customizer-injected-style';
const BG_CONTAINER_ID = 'dsh-theme-customizer-bg-container';

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

function formatCssUrl(url) {
  if (!url) return 'none';
  const trimmed = url.trim();
  if (trimmed.startsWith('url(')) return trimmed;
  const safe = trimmed.replaceAll("'", "%27");
  return `url('${safe}')`;
}

function isVideoMedia(url, explicitType) {
  if (explicitType === 'video') return true;
  if (!url) return false;
  const clean = url.trim().toLowerCase();
  if (clean.startsWith('data:video/')) return true;
  return clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.ogg') || clean.endsWith('.mov') || clean.includes('.mp4?') || clean.includes('.webm?');
}

function isCurrentDarkMode() {
  if (typeof document === 'undefined') return true;
  return document.body.hasAttribute('data-ds-dark-theme') || (typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches);
}

function generateCss(config) {
  if (!config || !config.enabled) {
    return '';
  }

  const { colors, frosted, background } = config;
  const isFrosted = frosted && frosted.enabled;
  const hasBg = background && background.enabled && Boolean(background.url);

  // 基础透明度策略：开启背景或磨砂时，必须透出背景图
  const baseAlpha = hasBg ? (isFrosted ? Math.min(frosted.surfaceOpacity * 0.75, 0.65) : 0.68) : 1;
  const sidebarAlpha = hasBg ? (isFrosted && frosted.sidebarBlur ? Math.min(frosted.surfaceOpacity * 0.85, 0.7) : 0.75) : 1;
  const layer1Alpha = hasBg ? (isFrosted && frosted.cardsBlur ? Math.min(frosted.surfaceOpacity * 0.85, 0.8) : 0.85) : 1;
  const layer2Alpha = isFrosted ? Math.min(layer1Alpha + 0.05, 0.9) : 1;

  // 代码修改与 diff 卡片专属高不透明度 (默认 0.96)，避免半透明导致代码文本与背景重叠难以阅读
  const codeAlpha = frosted && frosted.codeCardOpacity !== undefined ? frosted.codeCardOpacity : 0.96;
  const codeBlockBgRgba = hexToRgba(colors.codeBlockBg || colors.layer2 || '#161922', codeAlpha);

  const bgBaseRgba = hexToRgba(colors.bgBase, baseAlpha);
  const sidebarFillRgba = hexToRgba(colors.sidebarFill, sidebarAlpha);
  const layer1Rgba = hexToRgba(colors.layer1, layer1Alpha);
  const layer2Rgba = hexToRgba(colors.layer2, layer2Alpha);

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

      /* 核心修复：彻底消灭中间横跨屏幕的黑色大横条与矩形框 */
      /* 精确针对 composerSeat / composerHero / composerStack / HeroShell 彻底清空背景与边框，绝不添加多余 border 和 blur */
      .Dc7zOa_root .Dc7zOa_composerSeat,
      .Dc7zOa_root[data-phase] .Dc7zOa_composerSeat,
      .Dc7zOa_embeddedBody[data-content-phase] .Dc7zOa_composerSeat,
      .Dc7zOa_scrollBody:has([data-conversation-composer-overlay]) > .Dc7zOa_composerSeat,
      .Dc7zOa_composerSeat,
      div[class*="composerSeat"], div[class*="_composerSeat_"],
      div[data-composer-seat], [data-conversation-region="composer"],
      div[class*="composerStack"], div[class*="_composerStack_"],
      div[class*="composerHero"], div[class*="_composerHero_"],
      div[class*="Hqq-bq_root"], div[class*="HeroShell"], div[class*="Hqq-bq_stack"],
      div[class*="heroWorkspaceRow"], div[class*="_heroWorkspaceRow_"],
      div[class*="RlGAzG_root"], div[class*="_root_"][class*="RlGAzG"],
      div[class*="RlGAzG_dock"], div[class*="v1kfCW_dock"],
      div[class*="Dc7zOa_root"], div[class*="viewArea"], div[class*="conversation"],
      div[class*="scrollBody"], div[class*="_scrollBody_"] {
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
        border: none !important;
        border-top: none !important;
        border-bottom: none !important;
        border-left: none !important;
        border-right: none !important;
        box-shadow: none !important;
        outline: none !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
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

    /* 真正唯一的输入框实体卡片 (RlGAzG_card)：背景完全透明无黑框，去除刺眼高亮外框 */
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

    /* 聚焦状态下完全去除外框高亮 (无青色发光光环，保持微弱柔和边界) */
    div[class*="RlGAzG_card"]:focus-within,
    div[class*="RlGAzG_card"] textarea:focus {
      border: 1px solid rgba(255, 255, 255, 0.22) !important;
      border-color: rgba(255, 255, 255, 0.22) !important;
      box-shadow: none !important;
      outline: none !important;
    }

    /* 输入框内部的 textarea、按钮与原生下拉框底色彻底透明，不叠加任何遮挡 */
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
export function updateColorVariablesFast(colors, frosted, background) {
  const isFrosted = frosted && frosted.enabled;
  const hasBg = background && background.enabled && Boolean(background.url);

  const baseAlpha = hasBg ? (isFrosted ? Math.min(frosted.surfaceOpacity * 0.75, 0.65) : 0.68) : 1;
  const sidebarAlpha = hasBg ? (isFrosted && frosted.sidebarBlur ? Math.min(frosted.surfaceOpacity * 0.85, 0.7) : 0.75) : 1;
  const layer1Alpha = hasBg ? (isFrosted && frosted.cardsBlur ? Math.min(frosted.surfaceOpacity * 0.85, 0.8) : 0.85) : 1;
  const layer2Alpha = isFrosted ? Math.min(layer1Alpha + 0.05, 0.9) : 1;
  const codeAlpha = frosted && frosted.codeCardOpacity !== undefined ? frosted.codeCardOpacity : 0.96;

  const bgBaseRgba = hexToRgba(colors.bgBase, baseAlpha);
  const sidebarFillRgba = hexToRgba(colors.sidebarFill, sidebarAlpha);
  const layer1Rgba = hexToRgba(colors.layer1, layer1Alpha);
  const layer2Rgba = hexToRgba(colors.layer2, layer2Alpha);
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
export function applyBackground(config) {
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
export function applyTheme(config) {
  const styleTag = getOrCreateStyleTag();
  if (styleTag) {
    styleTag.textContent = generateCss(config);
  }
  applyBackground(config);
}

/**
 * 移除自定义样式与背景
 */
export function removeTheme() {
  const styleTag = document.getElementById(STYLE_TAG_ID);
  if (styleTag) styleTag.remove();

  const bgContainer = document.getElementById(BG_CONTAINER_ID);
  if (bgContainer) bgContainer.remove();
}
