// 内置预设主题调色盘 (Firefox Color 风格，无 emoji)
export const PRESET_THEMES = [
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
    id: 'firefox-twilight',
    name: '极光紫魅 (Firefox Twilight)',
    description: 'Firefox Color 标志性的深紫与烈焰橙高亮',
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
export const PRESET_WALLPAPERS = [
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
export const DEFAULT_CONFIG = {
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
