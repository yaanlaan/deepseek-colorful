/**
 * Theme Engine for DeepSeek Harness
 * Custom UI theme applicator, frosted glass & background image manager
 * Supports both static wallpapers and dynamic looping video backgrounds
 * Dual Dark/Light Palette Architecture
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
 * 根据双模态色板配置生成完整的 CSS (同时声明深色与浅色两套作用域规则)
 */
export function generateCss(config) {
  if (!config || !config.enabled) {
    return '';
  }

  const { frosted, background } = config;
  const darkColors = config.darkColors || config.colors;
  const lightColors = config.lightColors || config.colors;

  const isFrosted = frosted && frosted.enabled;
  const hasBg = background && background.enabled && Boolean(background.url);

  // 基础透明度策略：开启背景或磨砂时，必须透出背景图
  const baseAlpha = hasBg ? (isFrosted ? Math.min(frosted.surfaceOpacity * 0.75, 0.65) : 0.68) : 1;
  const sidebarAlpha = hasBg ? (isFrosted && frosted.sidebarBlur ? Math.min(frosted.surfaceOpacity * 0.85, 0.7) : 0.75) : 1;
  const layer1Alpha = hasBg ? (isFrosted && frosted.cardsBlur ? Math.min(frosted.surfaceOpacity * 0.85, 0.8) : 0.85) : 1;
  const layer2Alpha = isFrosted ? Math.min(layer1Alpha + 0.05, 0.9) : 1;
  const codeAlpha = frosted && frosted.codeCardOpacity !== undefined ? frosted.codeCardOpacity : 0.96;

  // 深色模式专属 RGBA
  const darkBgBaseRgba = hexToRgba(darkColors.bgBase, baseAlpha);
  const darkSidebarFillRgba = hexToRgba(darkColors.sidebarFill, sidebarAlpha);
  const darkLayer1Rgba = hexToRgba(darkColors.layer1, layer1Alpha);
  const darkLayer2Rgba = hexToRgba(darkColors.layer2, layer2Alpha);
  const darkCodeBlockBgRgba = hexToRgba(darkColors.codeBlockBg || darkColors.layer2 || '#161922', codeAlpha);

  // 浅色模式专属 RGBA
  const lightBgBaseRgba = hexToRgba(lightColors.bgBase, baseAlpha);
  const lightSidebarFillRgba = hexToRgba(lightColors.sidebarFill, sidebarAlpha);
  const lightLayer1Rgba = hexToRgba(lightColors.layer1, layer1Alpha);
  const lightLayer2Rgba = hexToRgba(lightColors.layer2, layer2Alpha);
  const lightCodeBlockBgRgba = hexToRgba(lightColors.codeBlockBg || lightColors.layer2 || '#f8f9fa', codeAlpha);

  // 新会话按钮与加号按钮半透明磨砂底色 (融入整体背景)
  const darkNewSessionBgRgba = hexToRgba(darkColors.newSessionBg || darkColors.layer2 || '#232324', hasBg ? 0.75 : 1);
  const lightNewSessionBgRgba = hexToRgba(lightColors.newSessionBg || lightColors.layer1 || '#ffffff', hasBg ? 0.82 : 1);
  const darkAddBtnBgRgba = hexToRgba(darkColors.addBtnBg || darkColors.layer2 || '#2c2c2e', hasBg ? 0.8 : 1);
  const lightAddBtnBgRgba = hexToRgba(lightColors.addBtnBg || lightColors.layer2 || '#ebeef2', hasBg ? 0.85 : 1);

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
    /* DeepSeek Colorful Generated Styles - Dual Theme Architecture */

    /* 1. 深色模式作用域变量 (Dark Mode Scope) */
    :root, body, body[data-ds-dark-theme], html[data-theme="dark"] {
      --dsw-alias-bg-base: ${darkBgBaseRgba} !important;
      --dsw-specific-sidebar-fill: ${darkSidebarFillRgba} !important;
      --dsw-alias-bg-layer-1: ${darkLayer1Rgba} !important;
      --dsw-alias-bg-layer-2: ${darkLayer2Rgba} !important;
      --dsw-alias-bg-layer-3: ${hexToRgba(darkColors.layer2, 0.98)} !important;
      --dsw-alias-bg-overlay: ${hexToRgba(darkColors.layer2, 0.96)} !important;
      --dsw-alias-bg-module-platform: ${darkLayer2Rgba} !important;
      --dsw-specific-input-major: transparent !important;
      --dsw-specific-bubble: ${darkLayer1Rgba} !important;
      --dsw-specific-menu: ${darkLayer2Rgba} !important;
      --dsw-menu-surface-fill: ${darkLayer2Rgba} !important;

      /* 按钮系统变量覆盖：新会话与加号按钮 */
      --dsw-alias-button-elevated-fill: ${darkNewSessionBgRgba} !important;
      --dsw-specific-selector: ${darkAddBtnBgRgba} !important;

      --dsw-alias-markdown-code-block: ${darkCodeBlockBgRgba} !important;
      --dsw-alias-markdown-code-block-banner: ${darkCodeBlockBgRgba} !important;
      --dsl-code-block-background: ${darkCodeBlockBgRgba} !important;

      --dsw-alias-brand-primary: ${darkColors.brandPrimary} !important;
      --dsw-alias-brand-primary-new-colorprimary-new-color: ${darkColors.brandPrimary} !important;
      --dsw-alias-button-primary-fill: ${darkColors.brandPrimary} !important;
      --dsw-alias-button-primary-hover: ${darkColors.brandHover} !important;
      --dsw-alias-button-info-fill: ${darkColors.brandPrimary} !important;
      --dsw-alias-button-info-hover: ${darkColors.brandHover} !important;
      --dsw-alias-state-business-primary: ${darkColors.brandPrimary} !important;
      --dsw-alias-link: ${darkColors.brandPrimary} !important;
      --dsw-specific-bubble-highlight: ${hexToRgba(darkColors.brandPrimary, 0.18)} !important;
      
      --dsw-alias-interactive-bg-hover: ${hexToRgba(darkColors.brandHover, 0.18)} !important;
      --dsw-alias-interactive-bg-hover-solid: ${hexToRgba(darkColors.brandHover, 0.25)} !important;
      --dsw-alias-interactive-bg-hover-accent: ${hexToRgba(darkColors.brandHover, 0.3)} !important;
      --dsw-alias-interactive-bg-active: ${hexToRgba(darkColors.brandHover, 0.35)} !important;
      --dsw-specific-sidebar-nav-item-hover: ${hexToRgba(darkColors.brandHover, 0.15)} !important;

      --dsw-alias-label-primary: ${darkColors.textPrimary} !important;
      --dsw-alias-label-primary-bluish: ${darkColors.textPrimary} !important;
      --dsw-alias-brand-text: ${darkColors.textPrimary} !important;
      --dsw-alias-label-secondary: ${darkColors.textSecondary} !important;
      --dsw-alias-label-tertiary: ${hexToRgba(darkColors.textSecondary, 0.85)} !important;
      --dsw-alias-label-caption: ${hexToRgba(darkColors.textSecondary, 0.7)} !important;

      --dsw-alias-border-l1: ${darkColors.borderColor}40 !important;
      --dsw-alias-border-l2: ${darkColors.borderColor} !important;
      --dsw-alias-border-l3: ${darkColors.borderColor} !important;
      --dsw-alias-border-l4: ${darkColors.borderColor} !important;
      --dsw-alias-settings-card-stroke: ${darkColors.borderColor} !important;
    }

    /* 2. 浅色模式作用域变量 (Light Mode Scope) */
    body:not([data-ds-dark-theme]), html:not([data-theme="dark"]):not(:has(body[data-ds-dark-theme])) {
      --dsw-alias-bg-base: ${lightBgBaseRgba} !important;
      --dsw-specific-sidebar-fill: ${lightSidebarFillRgba} !important;
      --dsw-alias-bg-layer-1: ${lightLayer1Rgba} !important;
      --dsw-alias-bg-layer-2: ${lightLayer2Rgba} !important;
      --dsw-alias-bg-layer-3: ${hexToRgba(lightColors.layer2, 0.98)} !important;
      --dsw-alias-bg-overlay: ${hexToRgba(lightColors.layer2, 0.96)} !important;
      --dsw-alias-bg-module-platform: ${lightLayer2Rgba} !important;
      --dsw-specific-input-major: transparent !important;
      --dsw-specific-bubble: ${lightLayer1Rgba} !important;
      --dsw-specific-menu: ${lightLayer2Rgba} !important;
      --dsw-menu-surface-fill: ${lightLayer2Rgba} !important;

      /* 按钮系统变量覆盖：新会话与加号按钮 */
      --dsw-alias-button-elevated-fill: ${lightNewSessionBgRgba} !important;
      --dsw-specific-selector: ${lightAddBtnBgRgba} !important;

      --dsw-alias-markdown-code-block: ${lightCodeBlockBgRgba} !important;
      --dsw-alias-markdown-code-block-banner: ${lightCodeBlockBgRgba} !important;
      --dsl-code-block-background: ${lightCodeBlockBgRgba} !important;

      --dsw-alias-brand-primary: ${lightColors.brandPrimary} !important;
      --dsw-alias-brand-primary-new-colorprimary-new-color: ${lightColors.brandPrimary} !important;
      --dsw-alias-button-primary-fill: ${lightColors.brandPrimary} !important;
      --dsw-alias-button-primary-hover: ${lightColors.brandHover} !important;
      --dsw-alias-button-info-fill: ${lightColors.brandPrimary} !important;
      --dsw-alias-button-info-hover: ${lightColors.brandHover} !important;
      --dsw-alias-state-business-primary: ${lightColors.brandPrimary} !important;
      --dsw-alias-link: ${lightColors.brandPrimary} !important;
      --dsw-specific-bubble-highlight: ${hexToRgba(lightColors.brandPrimary, 0.18)} !important;
      
      --dsw-alias-interactive-bg-hover: ${hexToRgba(lightColors.brandHover, 0.18)} !important;
      --dsw-alias-interactive-bg-hover-solid: ${hexToRgba(lightColors.brandHover, 0.25)} !important;
      --dsw-alias-interactive-bg-hover-accent: ${hexToRgba(lightColors.brandHover, 0.3)} !important;
      --dsw-alias-interactive-bg-active: ${hexToRgba(lightColors.brandHover, 0.35)} !important;
      --dsw-specific-sidebar-nav-item-hover: ${hexToRgba(lightColors.brandHover, 0.15)} !important;

      --dsw-alias-label-primary: ${lightColors.textPrimary} !important;
      --dsw-alias-label-primary-bluish: ${lightColors.textPrimary} !important;
      --dsw-alias-brand-text: ${lightColors.textPrimary} !important;
      --dsw-alias-label-secondary: ${lightColors.textSecondary} !important;
      --dsw-alias-label-tertiary: ${hexToRgba(lightColors.textSecondary, 0.85)} !important;
      --dsw-alias-label-caption: ${hexToRgba(lightColors.textSecondary, 0.7)} !important;

      --dsw-alias-border-l1: ${lightColors.borderColor}40 !important;
      --dsw-alias-border-l2: ${lightColors.borderColor} !important;
      --dsw-alias-border-l3: ${lightColors.borderColor} !important;
      --dsw-alias-border-l4: ${lightColors.borderColor} !important;
      --dsw-alias-settings-card-stroke: ${lightColors.borderColor} !important;
    }

    /* 3. 新会话按钮样式直接穿透支持：支持自定义背景色、边框与文字自适应 */
    body[data-ds-dark-theme] ._2H3hWW_newSession,
    body[data-ds-dark-theme] div[class*="newSession"] {
      background-color: ${darkNewSessionBgRgba} !important;
      background: ${darkNewSessionBgRgba} !important;
      color: ${darkColors.textPrimary} !important;
      border: 1px solid ${darkColors.borderColor}44 !important;
      ${frostedBackdropFilter}
      transition: background-color 0.2s ease, border-color 0.2s ease !important;
    }
    body[data-ds-dark-theme] ._2H3hWW_newSession:hover,
    body[data-ds-dark-theme] div[class*="newSession"]:hover {
      background-color: ${hexToRgba(darkColors.brandHover, 0.22)} !important;
      border-color: ${darkColors.brandPrimary} !important;
    }

    body:not([data-ds-dark-theme]) ._2H3hWW_newSession,
    body:not([data-ds-dark-theme]) div[class*="newSession"] {
      background-color: ${lightNewSessionBgRgba} !important;
      background: ${lightNewSessionBgRgba} !important;
      color: ${lightColors.textPrimary} !important;
      border: 1px solid ${lightColors.borderColor}66 !important;
      ${frostedBackdropFilter}
      transition: background-color 0.2s ease, border-color 0.2s ease !important;
    }
    body:not([data-ds-dark-theme]) ._2H3hWW_newSession:hover,
    body:not([data-ds-dark-theme]) div[class*="newSession"]:hover {
      background-color: ${hexToRgba(lightColors.brandHover, 0.15)} !important;
      border-color: ${lightColors.brandPrimary} !important;
    }

    /* 4. 输入栏左侧加号(+)按钮样式直接穿透支持 */
    body[data-ds-dark-theme] .RlGAzG_add,
    body[data-ds-dark-theme] button[class*="add"] {
      background-color: ${darkAddBtnBgRgba} !important;
      background: ${darkAddBtnBgRgba} !important;
      color: ${darkColors.textPrimary} !important;
      border: 1px solid ${darkColors.borderColor}44 !important;
      transition: background-color 0.2s ease, border-color 0.2s ease !important;
    }
    body[data-ds-dark-theme] .RlGAzG_add:hover:not(:disabled),
    body[data-ds-dark-theme] button[class*="add"]:hover:not(:disabled) {
      background-color: ${hexToRgba(darkColors.brandHover, 0.25)} !important;
      color: #fff !important;
    }

    body:not([data-ds-dark-theme]) .RlGAzG_add,
    body:not([data-ds-dark-theme]) button[class*="add"] {
      background-color: ${lightAddBtnBgRgba} !important;
      background: ${lightAddBtnBgRgba} !important;
      color: ${lightColors.textPrimary} !important;
      border: 1px solid ${lightColors.borderColor}66 !important;
      transition: background-color 0.2s ease, border-color 0.2s ease !important;
    }
    body:not([data-ds-dark-theme]) .RlGAzG_add:hover:not(:disabled),
    body:not([data-ds-dark-theme]) button[class*="add"]:hover:not(:disabled) {
      background-color: ${hexToRgba(lightColors.brandHover, 0.18)} !important;
      color: ${lightColors.brandPrimary} !important;
    }

    /* 代码修改、Diff 对比卡片与编辑器预览保护 (深浅自动适配高清晰度) */
    body[data-ds-dark-theme] div[class*="diffBody"],
    body[data-ds-dark-theme] div[class*="pFy1Ka_diffBody"],
    body[data-ds-dark-theme] div[class*="CodeCard"],
    body[data-ds-dark-theme] div[class*="_codeBody_"],
    body[data-ds-dark-theme] pre,
    body[data-ds-dark-theme] code {
      background-color: ${darkCodeBlockBgRgba} !important;
      background: ${darkCodeBlockBgRgba} !important;
      backdrop-filter: blur(24px) !important;
      -webkit-backdrop-filter: blur(24px) !important;
      border: 1px solid ${darkColors.borderColor}66 !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45) !important;
    }

    body:not([data-ds-dark-theme]) div[class*="diffBody"],
    body:not([data-ds-dark-theme]) div[class*="pFy1Ka_diffBody"],
    body:not([data-ds-dark-theme]) div[class*="CodeCard"],
    body:not([data-ds-dark-theme]) div[class*="_codeBody_"],
    body:not([data-ds-dark-theme]) pre,
    body:not([data-ds-dark-theme]) code {
      background-color: ${lightCodeBlockBgRgba} !important;
      background: ${lightCodeBlockBgRgba} !important;
      backdrop-filter: blur(24px) !important;
      -webkit-backdrop-filter: blur(24px) !important;
      border: 1px solid ${lightColors.borderColor}66 !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
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

      /* 顶部 Windows 自定义标题栏与圆角黑边彻底修复 */
      /* 关键修复 1：将 Windows 自定义窗口内容区圆角去除 (--dsh-windows-content-radius: 0px)，消除其产生的黑角隙！ */
      [data-windows-titlebar] .BynINW_frame, [data-windows-titlebar] .BynINW_frame * {
        --dsh-windows-content-radius: 0px !important;
      }

      [data-windows-titlebar] .BynINW_frame {
        background: transparent !important;
        background-color: transparent !important;
      }
      body[data-ds-dark-theme] [data-windows-titlebar] .BynINW_frame:before {
        background: ${darkSidebarFillRgba} !important;
        background-color: ${darkSidebarFillRgba} !important;
        ${frostedBackdropFilter}
        border-bottom: 0.5px solid ${darkColors.borderColor}44 !important;
        z-index: 10 !important;
      }
      body:not([data-ds-dark-theme]) [data-windows-titlebar] .BynINW_frame:before {
        background: ${lightSidebarFillRgba} !important;
        background-color: ${lightSidebarFillRgba} !important;
        ${frostedBackdropFilter}
        border-bottom: 0.5px solid ${lightColors.borderColor}44 !important;
        z-index: 10 !important;
      }
      div[data-windows-menu] {
        background: transparent !important;
        z-index: 1200 !important;
      }

      /* 关键修复 2：彻底抹平中间列顶部的圆角与背景黑缝 */
      [data-windows-titlebar] .BynINW_centerCol, .BynINW_centerCol {
        border-radius: 0px !important;
        corner-shape: none !important;
      }

      /* 左侧栏：深浅自适应透光磨砂 (包含根容器和内层所有 sidebar 节点) */
      body[data-ds-dark-theme] div[class*="sidebarCol"], body[data-ds-dark-theme] .BynINW_sidebarCol,
      body[data-ds-dark-theme] aside, body[data-ds-dark-theme] nav, body[data-ds-dark-theme] [data-sidebar],
      body[data-ds-dark-theme] div[class*="_2H3hWW_root"], body[data-ds-dark-theme] div[class*="sidebar"] {
        background-color: ${darkSidebarFillRgba} !important;
        background: ${darkSidebarFillRgba} !important;
        ${frostedBackdropFilter}
        border-right: 1px solid ${darkColors.borderColor}44 !important;
      }
      body:not([data-ds-dark-theme]) div[class*="sidebarCol"], body:not([data-ds-dark-theme]) .BynINW_sidebarCol,
      body:not([data-ds-dark-theme]) aside, body:not([data-ds-dark-theme]) nav, body:not([data-ds-dark-theme]) [data-sidebar],
      body:not([data-ds-dark-theme]) div[class*="_2H3hWW_root"], body:not([data-ds-dark-theme]) div[class*="sidebar"] {
        background-color: ${lightSidebarFillRgba} !important;
        background: ${lightSidebarFillRgba} !important;
        ${frostedBackdropFilter}
        border-right: 1px solid ${lightColors.borderColor}44 !important;
      }

      /* 修复左侧栏顶部 logoRow、topStrip 等子容器，严禁产生不透明纯白块遮挡 */
      div[class*="_2H3hWW_logoRow"], div[class*="_2H3hWW_topStrip"], div[class*="_2H3hWW_regionArea"] {
        background: transparent !important;
        background-color: transparent !important;
      }

      /* 中间主工作区列：深浅自适应透光磨砂 */
      body[data-ds-dark-theme] div[class*="centerCol"], body[data-ds-dark-theme] .BynINW_centerCol {
        background-color: ${darkBgBaseRgba} !important;
        background: ${darkBgBaseRgba} !important;
        ${frostedBackdropFilter}
      }
      body:not([data-ds-dark-theme]) div[class*="centerCol"], body:not([data-ds-dark-theme]) .BynINW_centerCol {
        background-color: ${lightBgBaseRgba} !important;
        background: ${lightBgBaseRgba} !important;
        ${frostedBackdropFilter}
      }

      /* 右侧辅助列：深浅自适应透光磨砂 */
      body[data-ds-dark-theme] div[class*="rightbarCol"], body[data-ds-dark-theme] .BynINW_rightbarCol {
        background-color: ${darkSidebarFillRgba} !important;
        background: ${darkSidebarFillRgba} !important;
        ${frostedBackdropFilter}
        border-left: 1px solid ${darkColors.borderColor}44 !important;
      }
      body:not([data-ds-dark-theme]) div[class*="rightbarCol"], body:not([data-ds-dark-theme]) .BynINW_rightbarCol {
        background-color: ${lightSidebarFillRgba} !important;
        background: ${lightSidebarFillRgba} !important;
        ${frostedBackdropFilter}
        border-left: 1px solid ${lightColors.borderColor}44 !important;
      }

      /* 右侧栏内容区半透明磨砂化 */
      div[class*="unKlVG_entry"], div[class*="Rightbar"] {
        ${frostedBackdropFilter}
      }

      /* 核心：消灭中间横跨屏幕的黑色大横条与矩形框 */
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

      /* 顶部会话标题与面包屑胶囊：彻底去除突兀的白框，与毛玻璃背景融为一体 */
      .Dc7zOa_crumb, .Dc7zOa_crumbCurrent,
      div[class*="crumb"], span[class*="crumb"], button[class*="crumb"],
      nav[class*="crumbs"], div[class*="titleCluster"] {
        background: transparent !important;
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }
      body:not([data-ds-dark-theme]) .Dc7zOa_crumbCurrent,
      body:not([data-ds-dark-theme]) span[class*="crumbCurrent"] {
        background: rgba(0, 0, 0, 0.05) !important;
        background-color: rgba(0, 0, 0, 0.05) !important;
        color: ${lightColors.textPrimary} !important;
        border-radius: 6px !important;
        padding: 2px 8px !important;
      }
      body[data-ds-dark-theme] .Dc7zOa_crumbCurrent,
      body[data-ds-dark-theme] span[class*="crumbCurrent"] {
        background: rgba(255, 255, 255, 0.08) !important;
        background-color: rgba(255, 255, 255, 0.08) !important;
        color: ${darkColors.textPrimary} !important;
        border-radius: 6px !important;
        padding: 2px 8px !important;
      }

      /* 右侧会话轮次大纲导航器 (Turn Navigator)：彻底剔除死白底色，深浅自适应通透磨砂胶囊 */
      body[data-ds-dark-theme] div[class*="xpvNua_frame"],
      body[data-ds-dark-theme] div[class*="_frame_"][style*="right"],
      body[data-ds-dark-theme] div[class*="xpvNua_scroller"] {
        background: ${hexToRgba(darkColors.layer2, 0.45)} !important;
        background-color: ${hexToRgba(darkColors.layer2, 0.45)} !important;
        border: 1px solid ${darkColors.borderColor}44 !important;
        border-radius: 14px !important;
        padding: 4px 2px !important;
        ${frostedBackdropFilter}
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25) !important;
      }

      body:not([data-ds-dark-theme]) div[class*="xpvNua_frame"],
      body:not([data-ds-dark-theme]) div[class*="_frame_"][style*="right"],
      body:not([data-ds-dark-theme]) div[class*="xpvNua_scroller"] {
        background: ${hexToRgba(lightColors.layer2, 0.55)} !important;
        background-color: ${hexToRgba(lightColors.layer2, 0.55)} !important;
        border: 1px solid ${lightColors.borderColor}66 !important;
        border-radius: 14px !important;
        padding: 4px 2px !important;
        ${frostedBackdropFilter}
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
      }

      button[class*="xpvNua_mark"]:before {
        background: var(--dsw-alias-brand-primary, #4176e6) !important;
      }
      ` : ''}

    /* 真正唯一的输入框实体卡片 (RlGAzG_card)：完全透明无黑框，自适应细微边框 */
    body[data-ds-dark-theme] div[class*="RlGAzG_card"],
    body[data-ds-dark-theme] div[class*="_card_"][class*="RlGAzG"] {
      background-color: transparent !important;
      background: transparent !important;
      background-image: none !important;
      ${frostedBackdropFilter}
      border: 1px solid rgba(255, 255, 255, 0.14) !important;
      box-shadow: none !important;
      outline: none !important;
      --dsw-elevation-stroke: none !important;
      --dsw-elevation-soft: none !important;
      --dsw-elevation-stroke-color: transparent !important;
      transition: border-color 0.2s ease !important;
    }

    body:not([data-ds-dark-theme]) div[class*="RlGAzG_card"],
    body:not([data-ds-dark-theme]) div[class*="_card_"][class*="RlGAzG"] {
      background-color: transparent !important;
      background: transparent !important;
      background-image: none !important;
      ${frostedBackdropFilter}
      border: 1px solid rgba(0, 0, 0, 0.12) !important;
      box-shadow: none !important;
      outline: none !important;
      --dsw-elevation-stroke: none !important;
      --dsw-elevation-soft: none !important;
      --dsw-elevation-stroke-color: transparent !important;
      transition: border-color 0.2s ease !important;
    }

    /* 聚焦状态去除外框高亮 */
    body[data-ds-dark-theme] div[class*="RlGAzG_card"]:focus-within {
      border: 1px solid rgba(255, 255, 255, 0.25) !important;
      border-color: rgba(255, 255, 255, 0.25) !important;
      box-shadow: none !important;
      outline: none !important;
    }

    body:not([data-ds-dark-theme]) div[class*="RlGAzG_card"]:focus-within {
      border: 1px solid rgba(0, 0, 0, 0.22) !important;
      border-color: rgba(0, 0, 0, 0.22) !important;
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
      background: ${hexToRgba(darkColors.textSecondary, 0.25)};
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${hexToRgba(darkColors.textSecondary, 0.45)};
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

  const newSessionBgRgba = hexToRgba(colors.newSessionBg || colors.layer2 || '#232324', hasBg ? 0.78 : 1);
  const addBtnBgRgba = hexToRgba(colors.addBtnBg || colors.layer2 || '#2c2c2e', hasBg ? 0.82 : 1);

  const targets = [document.documentElement, document.body].filter(Boolean);

  for (const el of targets) {
    el.style.setProperty('--dsw-alias-bg-base', bgBaseRgba, 'important');
    el.style.setProperty('--dsw-specific-sidebar-fill', sidebarFillRgba, 'important');
    el.style.setProperty('--dsw-alias-bg-layer-1', layer1Rgba, 'important');
    el.style.setProperty('--dsw-alias-bg-layer-2', layer2Rgba, 'important');
    el.style.setProperty('--dsw-specific-input-major', 'transparent', 'important');
    el.style.setProperty('--dsw-specific-bubble', layer1Rgba, 'important');

    el.style.setProperty('--dsw-alias-button-elevated-fill', newSessionBgRgba, 'important');
    el.style.setProperty('--dsw-specific-selector', addBtnBgRgba, 'important');

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
