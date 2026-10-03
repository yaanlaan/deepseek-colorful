/**
 * Theme Store for DeepSeek Harness Customizer
 * Central state container with multi-tab support & dual light/dark palettes
 */

import { DEFAULT_CONFIG, PRESET_THEMES, PRESET_WALLPAPERS } from './presets.js';
import { applyTheme, updateColorVariablesFast, isCurrentDarkMode } from './theme-engine.js';

const STORAGE_KEY = 'dsh_theme_customizer_config_v2';
const USER_PRESETS_KEY = 'dsh_theme_customizer_user_presets';

export class ThemeCustomizerStore {
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
          colors: activeColors,
          frosted: { ...DEFAULT_CONFIG.frosted, ...(parsed.frosted || {}) },
          background: { ...DEFAULT_CONFIG.background, ...(parsed.background || {}) }
        };
      }
    } catch (e) {
      console.warn('[UI Theme Customizer] Failed to read config from localStorage:', e);
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
      if (raw) {
        return JSON.parse(raw);
      }
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

  getConfig() {
    return this.config;
  }

  getUserPresets() {
    return this.userPresets;
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
        console.error('[UI Theme Customizer] Error in state listener:', err);
      }
    }
  }

  // 高频颜色拖动更新：直接更新 CSS 变量，防卡顿防抖
  updateSingleColorFast(key, value) {
    const isDark = isCurrentDarkMode();
    if (isDark) {
      this.config.darkColors[key] = value;
    } else {
      this.config.lightColors[key] = value;
    }
    this.config.colors[key] = value;

    updateColorVariablesFast(this.config.colors, this.config.frosted, this.config.background);

    if (this.saveTimeout) clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      this.saveConfig();
      applyTheme(this.config);
      this.notify();
    }, 180);
  }

  // 批量保存并应用深浅双色板配置
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

  // 响应 DSH 官方深浅色切换：跟随系统自动无缝切换当前配色
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
        url: wp.url,
        presetId: wp.id,
        mediaType: wp.mediaType || 'image'
      }
    });
  }

  saveCurrentAsPreset(name) {
    const isDark = isCurrentDarkMode();
    const newPreset = {
      id: 'custom-' + Date.now(),
      name: name || `我的主题 ${this.userPresets.length + 1}`,
      description: '用户自定义方案',
      createdAt: new Date().toLocaleDateString(),
      darkColors: { ...this.config.darkColors },
      lightColors: { ...this.config.lightColors },
      colors: { ...this.config.colors },
      frosted: { ...this.config.frosted },
      background: { ...this.config.background }
    };

    this.userPresets.unshift(newPreset);
    this.saveUserPresets();
    this.config.activePresetId = newPreset.id;
    this.saveConfig();
    this.notify();
    return newPreset;
  }

  deleteUserPreset(presetId) {
    this.userPresets = this.userPresets.filter(p => p.id !== presetId);
    this.saveUserPresets();
    if (this.config.activePresetId === presetId) {
      this.config.activePresetId = 'deepseek-official';
      this.applyPreset('deepseek-official');
    } else {
      this.notify();
    }
  }

  resetToDefault() {
    this.config = structuredClone(DEFAULT_CONFIG);
    this.saveConfig();
    applyTheme(this.config);
    updateColorVariablesFast(this.config.colors, this.config.frosted, this.config.background);
    this.notify();
  }

  exportConfigJson() {
    return JSON.stringify(this.config, null, 2);
  }

  importConfigJson(jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('无效的 JSON 对象');
      }
      this.updateConfig(parsed);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
}
