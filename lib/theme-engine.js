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
export function hexToRgba(hex, alpha = 1) {
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
export function formatCssUrl(url) {
  if (!url) return 'none';
  const trimmed = url.trim();
  if (trimmed.startsWith('url(')) return trimmed;
  const safe = trimmed.replaceAll("'", "%27");
  return `url('${safe}')`;
}

/**
 * 判断是否为视频媒体资源 (通过后缀、MIME 或参数)
 */
export function isVideoMedia(url, explicitType) {
  if (explicitType === 'video') return true;
  if (!url) return false;
  const clean = url.trim().toLowerCase();
  if (clean.startsWith('data:video/')) return true;
  return clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.ogg') || clean.endsWith('.mov') || clean.includes('.mp4?') || clean.includes('.webm?');
}

/**
 * 检测当前系统是否处于深色模式
 */
export function isCurrentDarkMode() {
  if (typeof document === 'undefined') return true;
  return document.body.hasAttribute('data-ds-dark-theme') || (typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches);
}

/**
 * 根据配置生成完整的 CSS
 */
export function generateCss(config) {
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
  const composerAlpha = hasBg ? (isFrosted && frosted.composerBlur ? Math.min(frosted.surfaceOpacity, 0.85) : 0.92) : 1;

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
      --dsw-specific-input-major: ${composerBgRgba} !important;
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

      /* 聊天对话视口与背景透明化，杜绝中间列再次被纯黑覆盖 */
      div[class*="Dc7zOa_root"], div[class*="viewArea"], div[class*="conversation"] {
        background-color: transparent !important;
        background: transparent !important;
      }
      div[class*="composerSeat"], div[class*="_composerSeat_"] {
        background: transparent !important;
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

    ${isFrosted && frosted.composerBlur ? `
      /* 输入框卡片浮动毛玻璃质感 */
      div[class*="composer"], div[class*="inputCard"], textarea {
        ${frostedBackdropFilter}
        ${borderHighlightStyle}
        transition: box-shadow 0.25s ease, border-color 0.25s ease !important;
      }
      div[class*="composer"]:focus-within, textarea:focus {
        border-color: ${colors.brandPrimary} !important;
        box-shadow: 0 0 0 1px ${colors.brandPrimary}, 0 8px 32px rgba(0, 0, 0, 0.3) !important;
      }
    ` : ''}

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

  const baseAlpha = hasBg ? (isFrosted ? Math.min(frosted.surfaceOpacity, 0.85) : 0.82) : 1;
  const sidebarAlpha = hasBg ? (isFrosted && frosted.sidebarBlur ? Math.min(frosted.surfaceOpacity * 0.9, 0.72) : 0.78) : 1;
  const layer1Alpha = hasBg ? (isFrosted && frosted.cardsBlur ? Math.min(frosted.surfaceOpacity, 0.88) : 0.92) : 1;
  const layer2Alpha = isFrosted ? Math.min(layer1Alpha + 0.05, 0.95) : 1;
  const composerAlpha = hasBg ? (isFrosted && frosted.composerBlur ? Math.min(frosted.surfaceOpacity, 0.85) : 0.92) : 1;
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
    el.style.setProperty('--dsw-specific-input-major', composerBgRgba, 'important');
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
