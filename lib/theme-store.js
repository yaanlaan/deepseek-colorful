import { DEFAULT_CONFIG, PRESET_THEMES, PRESET_WALLPAPERS } from './presets.js';
import { applyTheme, removeTheme, updateColorVariablesFast, isCurrentDarkMode } from './theme-engine.js';

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
        const darkColors = { ...DEFAULT_CONFIG.darkColors, ...(parsed.darkColors || parsed.colors || {}) };
        const lightColors = { ...DEFAULT_CONFIG.lightColors, ...(parsed.lightColors || {}) };
        const isDark = isCurrentDarkMode();
        const activeColors = isDark ? darkColors : lightColors;

        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          darkColors,
          lightColors,
          colors: { ...activeColors },
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
    const trimmed = (name || '').trim() || `双模态外观方案 ${this.userPresets.length + 1}`;
    const darkColors = structuredClone(this.config.darkColors || this.config.colors);
    const lightColors = structuredClone(this.config.lightColors || this.config.colors);

    const newPreset = {
      id: 'user-' + Date.now(),
      name: trimmed,
      description: '用户自定义方案 (含深色与浅色双模态专属色板)',
      createdAt: new Date().toLocaleDateString(),
      darkColors,
      lightColors,
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

  updateDualColors(darkColors, lightColors) {
    this.config.darkColors = { ...this.config.darkColors, ...darkColors };
    this.config.lightColors = { ...this.config.lightColors, ...lightColors };

    const isDark = isCurrentDarkMode();
    this.config.colors = isDark ? { ...this.config.darkColors } : { ...this.config.lightColors };

    this.saveConfig();
    applyTheme(this.config);
    updateColorVariablesFast(this.config.colors, this.config.frosted, this.config.background);
    this.notify();
  }

  updateConfig(partial) {
    const isDark = isCurrentDarkMode();
    this.config = {
      ...this.config,
      ...partial,
      darkColors: partial.darkColors ? { ...this.config.darkColors, ...partial.darkColors } : this.config.darkColors,
      lightColors: partial.lightColors ? { ...this.config.lightColors, ...partial.lightColors } : this.config.lightColors,
      colors: partial.colors ? { ...this.config.colors, ...partial.colors } : (isDark ? this.config.darkColors : this.config.lightColors),
      frosted: partial.frosted ? { ...this.config.frosted, ...partial.frosted } : this.config.frosted,
      background: partial.background ? { ...this.config.background, ...partial.background } : this.config.background
    };
    this.saveConfig();
    applyTheme(this.config);
    updateColorVariablesFast(this.config.colors, this.config.frosted, this.config.background);
    this.notify();
  }

  applyPreset(presetId) {
    const preset = this.userPresets.find(p => p.id === presetId) || PRESET_THEMES.find(p => p.id === presetId);
    if (!preset) return;

    const isDark = isCurrentDarkMode();
    const darkColors = preset.darkColors ? { ...preset.darkColors } : { ...preset.colors };
    const lightColors = preset.lightColors ? { ...preset.lightColors } : { ...preset.colors };
    const currentModeColors = isDark ? darkColors : lightColors;

    const newPartial = {
      activePresetId: presetId,
      darkColors,
      lightColors,
      colors: currentModeColors,
      frosted: preset.frosted ? { ...this.config.frosted, ...preset.frosted } : this.config.frosted
    };

    if (preset.background) {
      newPartial.background = { ...this.config.background, ...preset.background };
    }

    this.updateConfig(newPartial);
  }

  // 响应 DSH 官方明暗主题切换：跟随系统自动无缝切换当前配色
  adaptSystemTheme(isDark) {
    const targetColors = isDark ? this.config.darkColors : this.config.lightColors;
    if (targetColors) {
      this.config.colors = { ...targetColors };
      this.saveConfig();
      applyTheme(this.config);
      updateColorVariablesFast(this.config.colors, this.config.frosted, this.config.background);
      this.notify();
    } else {
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

    if (ctx) {
      if (ctx.on) {
        ctx.on("theme/change", (snapshot) => {
          const isDark = snapshot?.active?.colorScheme === 'dark' || document.body.hasAttribute('data-ds-dark-theme');
          this.adaptSystemTheme(isDark);
        });
      }

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

export const themeStore = new ThemeCustomizerStore();
