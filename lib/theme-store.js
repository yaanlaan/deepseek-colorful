import { DEFAULT_CONFIG, PRESET_THEMES, PRESET_WALLPAPERS } from './presets.js';
import { applyTheme, removeTheme, updateColorVariablesFast } from './theme-engine.js';

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

export const themeStore = new ThemeCustomizerStore();
