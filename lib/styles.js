export const UI_STYLES = `/* Theme Customizer Container & Typography */
.dsh-customizer-root {
  font-family: var(--dsw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
  color: var(--dsw-alias-label-primary, inherit);
  box-sizing: border-box;
  padding: 16px 20px 40px;
  max-width: 900px;
  margin: 0 auto;
}

.dsh-customizer-header {
  margin-bottom: 24px;
}

.dsh-customizer-title {
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 6px 0;
  color: var(--dsw-alias-label-primary, inherit);
}

.dsh-customizer-subtitle {
  font-size: 13px;
  color: var(--dsw-alias-label-secondary, #64748b);
  margin: 0;
}

/* Tabs Navigation */
.dsh-customizer-tabs {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.2));
  padding-bottom: 12px;
  margin-bottom: 24px;
  overflow-x: hidden;
  flex-wrap: wrap;
}

.dsh-customizer-tab-btn {
  background: transparent;
  border: 1px solid transparent;
  color: var(--dsw-alias-label-secondary, #64748b);
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
  background: var(--dsw-alias-interactive-bg-hover, rgba(128, 128, 128, 0.1));
  color: var(--dsw-alias-label-primary, inherit);
}

.dsh-customizer-tab-btn.active {
  background: var(--dsw-alias-brand-primary, #4176e6) !important;
  color: #ffffff !important;
  font-weight: 600;
}

/* Sections & Cards */
.dsh-customizer-card {
  background: var(--dsw-alias-bg-layer-2, rgba(128, 128, 128, 0.08));
  border: 1px solid var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.18));
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
  color: var(--dsw-alias-label-primary, inherit);
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
  background: var(--dsw-alias-bg-layer-1, rgba(128, 128, 128, 0.06));
  border: 1px solid var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.12));
  border-radius: 10px;
  gap: 16px;
  flex-wrap: wrap;
  transition: border-color 0.2s, background-color 0.2s;
}

.dsh-dual-color-row:hover {
  border-color: var(--dsw-alias-brand-primary, #4176e6);
  background: var(--dsw-alias-interactive-bg-hover, rgba(128, 128, 128, 0.12));
}

.dsh-color-info {
  flex: 1;
  min-width: 200px;
}

.dsh-color-desc {
  font-size: 11px;
  color: var(--dsw-alias-label-secondary, #64748b);
  margin-top: 2px;
}

.dsh-dual-color-inputs {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

/* Mode Toggle Group */
.dsh-mode-toggle-group {
  display: inline-flex;
  background: var(--dsw-alias-bg-layer-1, rgba(128, 128, 128, 0.1));
  padding: 4px;
  border-radius: 10px;
  border: 1px solid var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.15));
  gap: 6px;
}

.dsh-mode-toggle-btn {
  background: transparent;
  border: none;
  color: var(--dsw-alias-label-secondary, #64748b);
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
  color: var(--dsw-alias-label-primary, inherit);
  background: var(--dsw-alias-interactive-bg-hover, rgba(128, 128, 128, 0.1));
}

.dsh-mode-toggle-btn.active {
  background: var(--dsw-alias-brand-primary, #4176e6) !important;
  color: #ffffff !important;
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
  background: var(--dsw-alias-bg-layer-1, rgba(128, 128, 128, 0.06));
  border: 1px solid var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.12));
  border-radius: 8px;
  transition: border-color 0.2s;
}

.dsh-color-item:hover {
  border-color: var(--dsw-alias-brand-primary, #4176e6);
}

.dsh-color-label {
  font-size: 13px;
  color: var(--dsw-alias-label-primary, inherit);
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
  box-shadow: 0 0 0 2px var(--dsw-alias-border-l3, rgba(128, 128, 128, 0.3));
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
  background: var(--dsw-alias-bg-layer-2, rgba(128, 128, 128, 0.1));
  border: 1px solid var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.2));
  border-radius: 4px;
  color: var(--dsw-alias-label-primary, inherit);
  text-align: center;
}

.dsh-color-hex-input:focus {
  outline: none;
  border-color: var(--dsw-alias-brand-primary, #4176e6);
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
  color: var(--dsw-alias-label-primary, inherit);
}

.dsh-slider-val {
  font-weight: 600;
  color: var(--dsw-alias-brand-primary, #4176e6);
}

.dsh-range-slider {
  width: 100%;
  height: 6px;
  background: var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.25));
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
  background: var(--dsw-alias-brand-primary, #4176e6);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(65, 118, 230, 0.5);
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
  color: var(--dsw-alias-label-primary, inherit);
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
  background-color: var(--dsw-alias-border-l3, rgba(128, 128, 128, 0.3));
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
  background-color: var(--dsw-alias-brand-primary, #4176e6);
}

.dsh-switch input:checked + .dsh-switch-slider:before {
  transform: translateX(20px);
  background-color: #fff;
}

/* Preset Cards Grid */
.dsh-preset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.dsh-preset-card {
  background: var(--dsw-alias-bg-layer-1, rgba(128, 128, 128, 0.08));
  border: 1.5px solid var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.15));
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}

.dsh-preset-card:hover {
  transform: translateY(-2px);
  border-color: var(--dsw-alias-brand-primary, #4176e6);
  background: var(--dsw-alias-interactive-bg-hover, rgba(128, 128, 128, 0.12));
}

.dsh-preset-card.active {
  border-color: var(--dsw-alias-brand-primary, #4176e6);
  background: var(--dsw-alias-interactive-bg-hover, rgba(65, 118, 230, 0.08));
  box-shadow: 0 4px 20px rgba(65, 118, 230, 0.15);
}

.dsh-preset-palette-bar {
  display: flex;
  height: 16px;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 6px;
  border: 1px solid var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.2));
}

.dsh-preset-palette-color {
  flex: 1;
}

.dsh-preset-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--dsw-alias-label-primary, inherit);
}

.dsh-preset-desc {
  font-size: 12px;
  color: var(--dsw-alias-label-secondary, #64748b);
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
  background: var(--dsw-alias-bg-layer-1, rgba(128, 128, 128, 0.08));
  border: 1.5px solid var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.15));
  border-radius: 10px;
  padding: 16px;
  transition: all 0.2s ease;
  position: relative;
}

.dsh-bg-source-card.active {
  border-color: var(--dsw-alias-brand-primary, #4176e6);
  background: var(--dsw-alias-interactive-bg-hover, rgba(65, 118, 230, 0.08));
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
  color: var(--dsw-alias-label-primary, inherit);
}

.dsh-bg-source-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-2, rgba(128, 128, 128, 0.15));
  color: var(--dsw-alias-label-secondary, #64748b);
}

.dsh-bg-source-card.active .dsh-bg-source-badge {
  background: var(--dsw-alias-brand-primary, #4176e6);
  color: #ffffff;
  font-weight: 600;
}

.dsh-bg-source-desc {
  font-size: 12px;
  color: var(--dsw-alias-label-secondary, #64748b);
  margin-bottom: 12px;
  line-height: 1.4;
}

/* Active Preview Box */
.dsh-bg-preview-card {
  background: var(--dsw-alias-bg-layer-1, rgba(128, 128, 128, 0.08));
  border: 1px solid var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.18));
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
  border: 1px solid var(--dsw-alias-border-l3, rgba(128, 128, 128, 0.3));
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.dsh-bg-preview-info {
  flex: 1;
  min-width: 0;
}

.dsh-bg-preview-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--dsw-alias-label-primary, inherit);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dsh-bg-preview-meta {
  font-size: 12px;
  color: var(--dsw-alias-label-secondary, #64748b);
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
  border-color: var(--dsw-alias-brand-primary, #4176e6);
}

.dsh-wallpaper-card.active {
  border-color: var(--dsw-alias-brand-primary, #4176e6);
  box-shadow: 0 0 16px rgba(65, 118, 230, 0.4);
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

/* Floating Studio Launcher Button */
#dsh-floating-customizer-btn {
  position: fixed;
  right: 20px;
  bottom: 24px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--dsw-alias-brand-primary, #4176e6);
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35), 0 0 14px rgba(65, 118, 230, 0.4);
  z-index: 99999;
  opacity: 0.95;
  transform: scale(1);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, box-shadow 0.25s ease;
}

#dsh-floating-customizer-btn.dsh-btn-autohide {
  opacity: 0 !important;
  pointer-events: none !important;
  transform: scale(0.7) !important;
}

#dsh-floating-customizer-btn:hover {
  opacity: 1 !important;
  pointer-events: auto !important;
  transform: scale(1.08) !important;
  box-shadow: 0 6px 26px rgba(0, 0, 0, 0.45), 0 0 20px rgba(65, 118, 230, 0.6);
}

/* Modal Window - Dual Light/Dark Adaptation */
#dsh-floating-customizer-modal {
  position: fixed;
  top: 48px;
  right: 24px;
  width: 540px;
  max-width: calc(100vw - 48px);
  height: calc(100vh - 96px);
  border-radius: 16px;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  animation: dshCustomizerSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
}

/* Dark mode modal */
body[data-ds-dark-theme] #dsh-floating-customizer-modal {
  background: rgba(22, 24, 32, 0.92) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  color: #f8fafc !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08) !important;
}

/* Light mode modal - 浅色模式全透毛玻璃面板 */
body:not([data-ds-dark-theme]) #dsh-floating-customizer-modal {
  background: rgba(255, 255, 255, 0.88) !important;
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
  color: #0f172a !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.06) !important;
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
  border-bottom: 1px solid var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.15));
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
  color: var(--dsw-alias-label-primary, inherit);
}

.dsh-modal-close-btn {
  background: transparent;
  border: none;
  color: var(--dsw-alias-label-secondary, #64748b);
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
  background: var(--dsw-alias-interactive-bg-hover, rgba(128, 128, 128, 0.12));
  color: var(--dsw-alias-label-primary, inherit);
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
  background: var(--dsw-alias-brand-primary, #4176e6) !important;
  color: #ffffff !important;
  font-weight: 600;
}

.dsh-btn-primary:hover {
  filter: brightness(1.1);
}

.dsh-btn-secondary {
  background: var(--dsw-alias-bg-layer-2, rgba(128, 128, 128, 0.1));
  color: var(--dsw-alias-label-primary, inherit);
  border-color: var(--dsw-alias-border-l2, rgba(128, 128, 128, 0.2));
}

.dsh-btn-secondary:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(128, 128, 128, 0.18));
}

.dsh-btn-danger {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.25);
}

.dsh-btn-danger:hover {
  background: rgba(239, 68, 68, 0.25);
}

/* 全面浅色模式弹窗与表单深度适配 (Light Mode Customizer UI) */
body:not([data-ds-dark-theme]) .dsh-customizer-tab-btn {
  color: #64748b !important;
}

body:not([data-ds-dark-theme]) .dsh-customizer-tab-btn:hover {
  background: rgba(0, 0, 0, 0.05) !important;
  color: #0f172a !important;
}

body:not([data-ds-dark-theme]) .dsh-customizer-tab-btn.active {
  background: var(--dsw-alias-brand-primary, #4176e6) !important;
  color: #ffffff !important;
}

body:not([data-ds-dark-theme]) .dsh-mode-toggle-group {
  background: rgba(0, 0, 0, 0.05) !important;
  border-color: rgba(0, 0, 0, 0.1) !important;
}

body:not([data-ds-dark-theme]) .dsh-mode-toggle-btn {
  color: #64748b !important;
}

body:not([data-ds-dark-theme]) .dsh-mode-toggle-btn.active {
  background: var(--dsw-alias-brand-primary, #4176e6) !important;
  color: #ffffff !important;
}

body:not([data-ds-dark-theme]) .dsh-btn-secondary {
  background: rgba(0, 0, 0, 0.05) !important;
  border-color: rgba(0, 0, 0, 0.12) !important;
  color: #0f172a !important;
}

body:not([data-ds-dark-theme]) .dsh-btn-secondary:hover {
  background: rgba(0, 0, 0, 0.09) !important;
}

body:not([data-ds-dark-theme]) .dsh-range-slider {
  background: rgba(0, 0, 0, 0.12) !important;
}

body:not([data-ds-dark-theme]) .dsh-switch-slider {
  background-color: rgba(0, 0, 0, 0.18) !important;
}

body:not([data-ds-dark-theme]) .dsh-slider-header {
  color: #0f172a !important;
}

body:not([data-ds-dark-theme]) .dsh-switch-label {
  color: #0f172a !important;
}

body:not([data-ds-dark-theme]) select,
body:not([data-ds-dark-theme]) textarea {
  background: rgba(0, 0, 0, 0.04) !important;
  border-color: rgba(0, 0, 0, 0.15) !important;
  color: #0f172a !important;
}
`;\n