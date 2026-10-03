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

  // 保存当前设置到我的自定义预设库
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

  // 删除自定义预设
  deleteUserPreset(presetId) {
    this.userPresets = this.userPresets.filter(p => p.id !== presetId);
    this.saveUserPresets();
    this.notify();
  }

  // 针对拖拽色盘的高频保存做防抖，减少磁盘/LocalStorage I/O
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

  /**
   * 极速色彩更新（拖拽取色器专属：直接 setProperty，不重建 CSS，保证 60fps 丝滑响应）
   */
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
    // 优先从自定义预设中查找，否则从内置预设中查找
    const preset = this.userPresets.find(p => p.id === presetId) || PRESET_THEMES.find(p => p.id === presetId);
    if (!preset) return;

    const newPartial = {
      activePresetId: presetId,
      colors: { ...preset.colors },
      frosted: preset.frosted ? { ...this.config.frosted, ...preset.frosted } : this.config.frosted
    };

    // 如果用户自定义预设保存了背景，一并还原
    if (preset.background) {
      newPartial.background = { ...this.config.background, ...preset.background };
    }

    this.updateConfig(newPartial);
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

  // 导出轻量配置（不含庞大的 base64 视频/图片，防止复制导致浏览器剪贴板和界面假死卡住）
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
      // 如果发现是占位标记，保留原有本地图片不变
      if (parsed.background && parsed.background.url && parsed.background.url.includes('[本地离线数据')) {
        delete parsed.background.url;
      }
      this.updateConfig(parsed);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  init() {
    applyTheme(this.config);
  }
}

export const themeStore = new ThemeCustomizerStore();
