/**
 * UI Styles for Theme Customizer Panel and Floating Studio (No emoji)
 */
export const UI_STYLES = `
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

/* Dual Color Row System */
.dsh-dual-color-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dsh-dual-color-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  gap: 16px;
  flex-wrap: wrap;
  transition: border-color 0.2s, background-color 0.2s;
}

.dsh-dual-color-row:hover {
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.28);
}

.dsh-color-info {
  flex: 1;
  min-width: 200px;
}

.dsh-color-desc {
  font-size: 11px;
  color: #64748b;
  margin-top: 2px;
}

.dsh-dual-color-inputs {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.dsh-color-input-badge-group {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.25);
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.dsh-color-mode-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
}

.dsh-color-mode-tag.dark {
  background: #181920;
  color: #94a3b8;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.dsh-color-mode-tag.light {
  background: #f1f5f9;
  color: #0f172a;
}

/* Form Controls & Grids */
.dsh-mode-toggle-group {
  display: inline-flex;
  background: rgba(0, 0, 0, 0.3);
  padding: 4px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  gap: 6px;
  margin-bottom: 16px;
}

.dsh-mode-toggle-btn {
  background: transparent;
  border: none;
  color: var(--dsw-alias-label-secondary, #94a3b8);
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.dsh-mode-toggle-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.dsh-mode-toggle-btn.active {
  background: var(--dsw-alias-brand-primary, #00f0ff);
  color: #000;
  font-weight: 600;
}

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
  border-radius: 16px;
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  z-index: 100000;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  animation: dshCustomizerSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

body[data-ds-dark-theme] #dsh-floating-customizer-modal {
  background: rgba(20, 24, 33, 0.92) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08) !important;
  color: #f8fafc !important;
}

body:not([data-ds-dark-theme]) #dsh-floating-customizer-modal {
  background: rgba(255, 255, 255, 0.88) !important;
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(0, 0, 0, 0.06) !important;
  color: #0f172a !important;
}

body:not([data-ds-dark-theme]) .dsh-modal-header {
  border-bottom-color: rgba(0, 0, 0, 0.1) !important;
}

body:not([data-ds-dark-theme]) .dsh-modal-header-title {
  color: #0f172a !important;
}

body:not([data-ds-dark-theme]) .dsh-customizer-card {
  background: rgba(0, 0, 0, 0.03) !important;
  border-color: rgba(0, 0, 0, 0.08) !important;
}

body:not([data-ds-dark-theme]) .dsh-customizer-card-title,
body:not([data-ds-dark-theme]) .dsh-customizer-title {
  color: #0f172a !important;
}

body:not([data-ds-dark-theme]) .dsh-color-item,
body:not([data-ds-dark-theme]) .dsh-dual-color-row,
body:not([data-ds-dark-theme]) .dsh-preset-card,
body:not([data-ds-dark-theme]) .dsh-bg-source-card {
  background: rgba(0, 0, 0, 0.04) !important;
  border-color: rgba(0, 0, 0, 0.08) !important;
}

body:not([data-ds-dark-theme]) .dsh-preset-name,
body:not([data-ds-dark-theme]) .dsh-color-label,
body:not([data-ds-dark-theme]) .dsh-bg-source-title {
  color: #0f172a !important;
}

body:not([data-ds-dark-theme]) .dsh-color-hex-input {
  background: rgba(0, 0, 0, 0.06) !important;
  border-color: rgba(0, 0, 0, 0.15) !important;
  color: #0f172a !important;
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
