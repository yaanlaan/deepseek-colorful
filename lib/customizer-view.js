import { PRESET_THEMES, PRESET_WALLPAPERS } from './presets.js';
import { formatCssUrl, isVideoMedia } from './theme-engine.js';

/**
 * 创建全功能原生 DOM 调色与配置面板 (无 emoji，严密逻辑架构)
 */
export function createCustomizerDom(store) {
  const root = document.createElement('div');
  root.className = 'dsh-customizer-root';

  let currentTab = 'background'; // 默认进入背景设置方便用户即时配置

  function render() {
    root.innerHTML = '';
    const config = store.getConfig();

    // 1. Header
    const header = document.createElement('div');
    header.className = 'dsh-customizer-header';
    header.innerHTML = `
      <h2 class="dsh-customizer-title">
        UI 调色与外观定制
      </h2>
      <p class="dsh-customizer-subtitle">
        Firefox Color 级色彩微调、全页面背景壁纸/动态视频透传与毛玻璃拟态引擎
      </p>
    `;
    root.appendChild(header);

    // 2. Tabs
    const tabs = document.createElement('div');
    tabs.className = 'dsh-customizer-tabs';
    const tabList = [
      { id: 'background', label: '背景图片与视频' },
      { id: 'colors', label: '颜色调节' },
      { id: 'frosted', label: '磨砂玻璃' },
      { id: 'presets', label: '预设主题' },
      { id: 'backup', label: '备份与重置' }
    ];

    tabList.forEach(t => {
      const btn = document.createElement('button');
      btn.className = `dsh-customizer-tab-btn ${currentTab === t.id ? 'active' : ''}`;
      btn.textContent = t.label;
      btn.onclick = () => {
        currentTab = t.id;
        render();
      };
      tabs.appendChild(btn);
    });
    root.appendChild(tabs);

    // 3. Tab Content
    const content = document.createElement('div');
    content.className = 'dsh-customizer-tab-content';

    if (currentTab === 'background') {
      renderBackgroundTab(content, config, store, render);
    } else if (currentTab === 'colors') {
      renderColorsTab(content, config, store);
    } else if (currentTab === 'frosted') {
      renderFrostedTab(content, config, store);
    } else if (currentTab === 'presets') {
      renderPresetsTab(content, config, store, render);
    } else if (currentTab === 'backup') {
      renderBackupTab(content, config, store, render);
    }

    root.appendChild(content);
  }

  render();
  return root;
}

/** 颜色调节选项卡 - 改为按键应用机制，彻底根除实时触发造成的掉帧与卡顿 */
function renderColorsTab(container, config, store) {
  let draftColors = { ...config.colors };

  const card = document.createElement('div');
  card.className = 'dsh-customizer-card';
  card.innerHTML = `
    <div class="dsh-customizer-card-title">
      <span>各区域色彩自定义</span>
      <div style="display: flex; gap: 10px; align-items: center;">
        <button class="dsh-btn dsh-btn-secondary" id="dsh-btn-discard-colors" style="padding: 5px 12px; font-size: 12px;">重置修改</button>
        <button class="dsh-btn dsh-btn-primary" id="dsh-btn-apply-colors" style="padding: 5px 16px; font-size: 13px; font-weight: 600;">
          应用颜色更改
        </button>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: -6px; margin-bottom: 16px;">
      <p style="font-size: 12px; color: #94a3b8; margin: 0;">
        调整下方各区域的颜色（支持吸色器或直接输入 Hex 色值），选好后点击右上角“应用颜色更改”即可一次性生效。
      </p>
      <span id="dsh-color-apply-hint" style="font-size: 12px; color: #4ade80; font-weight: 500;"></span>
    </div>
  `;

  const colorItems = [
    { key: 'bgBase', label: '主界面底色 (Base Background)', desc: '控制主工作区整体背景色基调' },
    { key: 'sidebarFill', label: '侧边栏背景 (Sidebar Fill)', desc: '控制左侧导航栏及折叠栏的填充色' },
    { key: 'layer1', label: '对话卡片表面 (Layer 1)', desc: 'AI 与用户对话消息卡片底色' },
    { key: 'layer2', label: '二级面板/设置卡片 (Layer 2)', desc: '设置弹窗与二级卡片底色' },
    { key: 'codeBlockBg', label: '代码/Diff卡片背景 (Code Block)', desc: '文件修改、Diff对比卡片专属清晰底色' },
    { key: 'composerBg', label: '底部输入框背景 (Composer)', desc: '聊天输入卡片的填充色' },
    { key: 'brandPrimary', label: '品牌主色/按钮 (Brand Accent)', desc: '发送按钮、高亮选中标签与主题主色' },
    { key: 'brandHover', label: '悬停高亮色 (Hover Accent)', desc: '按钮与可点击组件鼠标滑过悬停色' },
    { key: 'textPrimary', label: '正文主要文本 (Primary Text)', desc: '标题与正文主要文字颜色' },
    { key: 'textSecondary', label: '次要弱化文本 (Secondary Text)', desc: '描述文字、提示符与次级文本颜色' },
    { key: 'borderColor', label: '边框与分割线 (Border & Stroke)', desc: '卡片边缘与面板分割线的描边色' }
  ];

  const grid = document.createElement('div');
  grid.className = 'dsh-color-grid';

  const rowElements = [];

  colorItems.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'dsh-color-item';

    const val = draftColors[item.key] || '#ffffff';
    const hex6 = val.startsWith('#') && val.length >= 7 ? val.slice(0, 7) : val;

    itemEl.innerHTML = `
      <div style="flex: 1; min-width: 0; padding-right: 8px;">
        <div class="dsh-color-label">${item.label}</div>
        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${item.desc}</div>
      </div>
      <div class="dsh-color-picker-wrap">
        <input type="color" class="dsh-color-swatch-input" value="${hex6}" title="打开系统拾色器">
        <input type="text" class="dsh-color-hex-input" value="${val}" spellcheck="false" title="输入 Hex 颜色代码">
      </div>
    `;

    const swatch = itemEl.querySelector('.dsh-color-swatch-input');
    const textInput = itemEl.querySelector('.dsh-color-hex-input');

    swatch.oninput = (e) => {
      const newColor = e.target.value;
      textInput.value = newColor;
      draftColors[item.key] = newColor;
    };

    textInput.oninput = (e) => {
      let newColor = e.target.value.trim();
      if (!newColor.startsWith('#')) newColor = '#' + newColor;
      if (newColor.length >= 7) {
        swatch.value = newColor.slice(0, 7);
      }
      draftColors[item.key] = newColor;
    };

    rowElements.push({ key: item.key, swatch, textInput });
    grid.appendChild(itemEl);
  });

  card.appendChild(grid);

  const applyBtn = card.querySelector('#dsh-btn-apply-colors');
  const discardBtn = card.querySelector('#dsh-btn-discard-colors');
  const applyHint = card.querySelector('#dsh-color-apply-hint');

  applyBtn.onclick = () => {
    store.updateConfig({ colors: { ...draftColors } });
    applyHint.textContent = '已成功应用新配色！';
    setTimeout(() => { applyHint.textContent = ''; }, 2500);
  };

  discardBtn.onclick = () => {
    draftColors = { ...config.colors };
    rowElements.forEach(({ key, swatch, textInput }) => {
      const c = draftColors[key] || '#ffffff';
      textInput.value = c;
      swatch.value = c.startsWith('#') && c.length >= 7 ? c.slice(0, 7) : c;
    });
    applyHint.textContent = '已还原为当前生效值';
    setTimeout(() => { applyHint.textContent = ''; }, 2000);
  };

  container.appendChild(card);
}

/** 磨砂玻璃选项卡 */
function renderFrostedTab(container, config, store) {
  const frosted = config.frosted || {};

  const card = document.createElement('div');
  card.className = 'dsh-customizer-card';

  card.innerHTML = `
    <div class="dsh-customizer-card-title">
      <span>磨砂毛玻璃 (Frosted Glass)</span>
      <label class="dsh-switch">
        <input type="checkbox" id="dsh-frosted-toggle" ${frosted.enabled ? 'checked' : ''}>
        <span class="dsh-switch-slider"></span>
      </label>
    </div>
    <p style="font-size: 13px; color: #94a3b8; margin-top: -6px; margin-bottom: 20px;">
      通过 Backdrop Filter 与表面半透明化，透出底层背景图片或动态视频，呈现细腻高级的玻璃拟态质感。
    </p>

    <!-- 模糊度滑块 -->
    <div class="dsh-slider-group">
      <div class="dsh-slider-header">
        <span>高斯模糊半径 (Blur Radius)</span>
        <span class="dsh-slider-val" id="val-blur">${frosted.blurRadius || 18}px</span>
      </div>
      <input type="range" class="dsh-range-slider" id="slider-blur" min="0" max="40" value="${frosted.blurRadius || 18}">
    </div>

    <!-- 表面透明度滑块 -->
    <div class="dsh-slider-group">
      <div class="dsh-slider-header">
        <span>通用表面不透明度 (Surface Opacity)</span>
        <span class="dsh-slider-val" id="val-opacity">${Math.round((frosted.surfaceOpacity !== undefined ? frosted.surfaceOpacity : 0.78) * 100)}%</span>
      </div>
      <input type="range" class="dsh-range-slider" id="slider-opacity" min="10" max="100" value="${Math.round((frosted.surfaceOpacity !== undefined ? frosted.surfaceOpacity : 0.78) * 100)}">
    </div>

    <!-- 代码修改/Diff卡片专属清晰度滑块 (避免被背景干扰) -->
    <div class="dsh-slider-group" style="background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
      <div class="dsh-slider-header">
        <span style="font-weight: 500; color: #fff;">代码修改 / Diff 对比卡片不透明度 (防背景干扰)</span>
        <span class="dsh-slider-val" id="val-code-opacity">${Math.round((frosted.codeCardOpacity !== undefined ? frosted.codeCardOpacity : 0.96) * 100)}%</span>
      </div>
      <div style="font-size: 11px; color: #94a3b8; margin-bottom: 8px;">提高此数值可使代码对比、Diff 差异与终端文本保持实心或近实心，彻底杜绝复杂壁纸对代码阅读的干扰。</div>
      <input type="range" class="dsh-range-slider" id="slider-code-opacity" min="50" max="100" value="${Math.round((frosted.codeCardOpacity !== undefined ? frosted.codeCardOpacity : 0.96) * 100)}">
    </div>

    <!-- 饱和度增强滑块 -->
    <div class="dsh-slider-group">
      <div class="dsh-slider-header">
        <span>背景饱和度增益 (Saturation Boost)</span>
        <span class="dsh-slider-val" id="val-sat">${frosted.saturation || 140}%</span>
      </div>
      <input type="range" class="dsh-range-slider" id="slider-sat" min="100" max="220" value="${frosted.saturation || 140}">
    </div>

    <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 20px 0; padding-top: 16px;">
      <h4 style="margin: 0 0 12px; font-size: 14px; color: #eee;">细分区域磨砂生效控制</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <label class="dsh-switch-label" style="background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px;">
          <span style="font-size: 13px;">侧边栏磨砂</span>
          <input type="checkbox" id="chk-sidebar-blur" ${frosted.sidebarBlur !== false ? 'checked' : ''}>
        </label>
        <label class="dsh-switch-label" style="background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px;">
          <span style="font-size: 13px;">消息卡片磨砂</span>
          <input type="checkbox" id="chk-cards-blur" ${frosted.cardsBlur !== false ? 'checked' : ''}>
        </label>
        <label class="dsh-switch-label" style="background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px;">
          <span style="font-size: 13px;">输入框卡片磨砂</span>
          <input type="checkbox" id="chk-composer-blur" ${frosted.composerBlur !== false ? 'checked' : ''}>
        </label>
        <label class="dsh-switch-label" style="background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px;">
          <span style="font-size: 13px;">玻璃微光高光边框</span>
          <input type="checkbox" id="chk-border-highlight" ${frosted.borderHighlight !== false ? 'checked' : ''}>
        </label>
      </div>
    </div>
  `;

  // 绑定事件
  card.querySelector('#dsh-frosted-toggle').onchange = (e) => {
    store.updateConfig({ frosted: { enabled: e.target.checked } });
  };

  const sliderBlur = card.querySelector('#slider-blur');
  const valBlur = card.querySelector('#val-blur');
  sliderBlur.oninput = (e) => {
    valBlur.textContent = `${e.target.value}px`;
    store.updateConfig({ frosted: { blurRadius: parseInt(e.target.value) } });
  };

  const sliderOpacity = card.querySelector('#slider-opacity');
  const valOpacity = card.querySelector('#val-opacity');
  sliderOpacity.oninput = (e) => {
    valOpacity.textContent = `${e.target.value}%`;
    store.updateConfig({ frosted: { surfaceOpacity: parseInt(e.target.value) / 100 } });
  };

  const sliderCodeOpacity = card.querySelector('#slider-code-opacity');
  const valCodeOpacity = card.querySelector('#val-code-opacity');
  sliderCodeOpacity.oninput = (e) => {
    valCodeOpacity.textContent = `${e.target.value}%`;
    store.updateConfig({ frosted: { codeCardOpacity: parseInt(e.target.value) / 100 } });
  };

  const sliderSat = card.querySelector('#slider-sat');
  const valSat = card.querySelector('#val-sat');
  sliderSat.oninput = (e) => {
    valSat.textContent = `${e.target.value}%`;
    store.updateConfig({ frosted: { saturation: parseInt(e.target.value) } });
  };

  card.querySelector('#chk-sidebar-blur').onchange = (e) => {
    store.updateConfig({ frosted: { sidebarBlur: e.target.checked } });
  };
  card.querySelector('#chk-cards-blur').onchange = (e) => {
    store.updateConfig({ frosted: { cardsBlur: e.target.checked } });
  };
  card.querySelector('#chk-composer-blur').onchange = (e) => {
    store.updateConfig({ frosted: { composerBlur: e.target.checked } });
  };
  card.querySelector('#chk-border-highlight').onchange = (e) => {
    store.updateConfig({ frosted: { borderHighlight: e.target.checked } });
  };

  container.appendChild(card);
}

/** 背景图片与动态视频选项卡 - 明确区分三种来源，带当前生效卡片与实时预览 */
function renderBackgroundTab(container, config, store, requestRerender) {
  const bg = config.background || {};
  const currentSourceType = bg.type || 'preset';
  const isVideo = isVideoMedia(bg.url, bg.mediaType);

  let currentTitle = '未设置背景';
  let currentMeta = '请选择下方任一方式添加背景图片或动态视频';
  if (bg.enabled && bg.url) {
    if (currentSourceType === 'upload') {
      currentTitle = isVideo ? '当前生效：本地上传动态视频' : '当前生效：本地上传图片';
      currentMeta = '已保存在本地浏览器存储中，离线可用';
    } else if (currentSourceType === 'url') {
      currentTitle = isVideo ? '当前生效：网络动态视频流' : '当前生效：自定义网络图片';
      currentMeta = bg.url.length > 50 ? bg.url.slice(0, 50) + '...' : bg.url;
    } else {
      const foundWp = PRESET_WALLPAPERS.find(w => w.id === bg.presetId || w.url === bg.url);
      currentTitle = `当前生效：${foundWp ? foundWp.name : '精选壁纸库'}`;
      currentMeta = isVideo ? '动态视频壁纸，无限平滑循环播放' : '免版权高可用矢量/夜景壁纸';
    }
  }

  const card = document.createElement('div');
  card.className = 'dsh-customizer-card';

  card.innerHTML = `
    <div class="dsh-customizer-card-title">
      <span>自定义背景图片与动态视频</span>
      <label class="dsh-switch">
        <input type="checkbox" id="dsh-bg-toggle" ${bg.enabled ? 'checked' : ''}>
        <span class="dsh-switch-slider"></span>
      </label>
    </div>

    <div class="dsh-bg-preview-card" id="dsh-bg-preview-box">
      <div class="dsh-bg-preview-thumbnail" id="dsh-preview-thumb">
        ${isVideo && bg.url ? `
          <video src="${bg.url}" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
        ` : ''}
      </div>
      <div class="dsh-bg-preview-info">
        <div class="dsh-bg-preview-name" id="dsh-preview-title">${currentTitle}</div>
        <div class="dsh-bg-preview-meta" id="dsh-preview-meta">${currentMeta}</div>
        <div style="display: flex; gap: 8px;">
          <button class="dsh-btn dsh-btn-secondary" id="dsh-btn-clear-bg" style="padding: 4px 10px; font-size: 12px;">
            清除背景
          </button>
        </div>
      </div>
    </div>

    <div style="font-size: 13px; font-weight: 600; color: #eee; margin-bottom: 10px;">选择背景图片/视频来源</div>
    <div class="dsh-bg-source-grid">
      <div class="dsh-bg-source-card ${currentSourceType === 'upload' && bg.enabled ? 'active' : ''}">
        <div class="dsh-bg-source-header">
          <span class="dsh-bg-source-title">方式 1：本地文件</span>
          <span class="dsh-bg-source-badge">${currentSourceType === 'upload' && bg.enabled ? '使用中' : '未激活'}</span>
        </div>
        <div class="dsh-bg-source-desc">支持本地图片 (JPG/PNG/GIF) 或视频 (MP4/WebM)，自动离线持久化存储。</div>
        <label class="dsh-btn dsh-btn-primary" style="cursor: pointer; width: 100%; justify-content: center; box-sizing: border-box;">
          <span>选择本地图片或视频...</span>
          <input type="file" id="dsh-bg-file-input" accept="image/*,video/mp4,video/webm" style="display: none;">
        </label>
      </div>

      <div class="dsh-bg-source-card ${currentSourceType === 'url' && bg.enabled ? 'active' : ''}">
        <div class="dsh-bg-source-header">
          <span class="dsh-bg-source-title">方式 2：网络 URL</span>
          <span class="dsh-bg-source-badge">${currentSourceType === 'url' && bg.enabled ? '使用中' : '未激活'}</span>
        </div>
        <div class="dsh-bg-source-desc">输入任意网络图片或动态视频 (.mp4 / .webm) 直链。</div>
        <div style="display: flex; gap: 6px;">
          <input type="text" id="dsh-bg-url-input" placeholder="输入 https://... (支持图片/视频)" 
                 value="${currentSourceType === 'url' && bg.url ? bg.url : ''}" 
                 style="flex: 1; min-width: 0; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 12px;">
          <button class="dsh-btn dsh-btn-primary" id="dsh-bg-url-save" style="padding: 6px 12px; font-size: 12px;">应用</button>
        </div>
      </div>

      <div class="dsh-bg-source-card ${currentSourceType === 'preset' && bg.enabled ? 'active' : ''}">
        <div class="dsh-bg-source-header">
          <span class="dsh-bg-source-title">方式 3：精选库</span>
          <span class="dsh-bg-source-badge">${currentSourceType === 'preset' && bg.enabled ? '使用中' : '未激活'}</span>
        </div>
        <div class="dsh-bg-source-desc">内置矢量渐变与动态赛博/星空视频，点击下方卡片即可选用。</div>
        <div style="font-size: 12px; color: var(--dsw-alias-brand-primary, #00f0ff);">向下滑动选择精选库 ↓</div>
      </div>
    </div>

    <div style="margin-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 14px; font-weight: 600; color: #fff;">精选免版权壁纸与动态视频库</span>
        <span style="font-size: 12px; color: #94a3b8;">共 ${PRESET_WALLPAPERS.length} 款壁纸（含动态循环视频），点击直接生效</span>
      </div>
      <div class="dsh-wallpaper-grid"></div>
    </div>

    <div style="margin-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 16px;">
      <span style="font-size: 14px; font-weight: 600; color: #fff; display: block; margin-bottom: 12px;">背景排版与文字保护蒙版</span>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 16px; background: rgba(0,0,0,0.2); padding: 14px; border-radius: 8px;">
        <div>
          <label style="font-size: 12px; color: #94a3b8; display: block; margin-bottom: 6px;">适应模式 (Fit Mode)</label>
          <select id="dsh-bg-fit" style="width: 100%; background: #1a1f2c; color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 6px 8px; font-size: 13px;">
            <option value="cover" ${bg.fit === 'cover' ? 'selected' : ''}>Cover (铺满裁剪)</option>
            <option value="contain" ${bg.fit === 'contain' ? 'selected' : ''}>Contain (完整显示)</option>
            <option value="center" ${bg.fit === 'center' ? 'selected' : ''}>Center (居中显示)</option>
            <option value="repeat" ${bg.fit === 'repeat' ? 'selected' : ''}>Tile (平铺纹理)</option>
          </select>
        </div>
        <div>
          <label style="font-size: 12px; color: #94a3b8; display: block; margin-bottom: 6px;">保护蒙版颜色 (按键应用防卡顿)</label>
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="color" id="dsh-bg-overlay-color" value="${bg.overlayColor || '#000000'}" class="dsh-color-swatch-input">
            <button class="dsh-btn dsh-btn-primary" id="dsh-btn-apply-overlay-color" style="padding: 4px 10px; font-size: 12px;">应用蒙版色</button>
            <span id="dsh-overlay-color-hint" style="font-size: 11px; color: #4ade80;"></span>
          </div>
        </div>
      </div>

      <div class="dsh-slider-group">
        <div class="dsh-slider-header">
          <span>遮罩蒙版不透明度 (保证文字可读性)</span>
          <span class="dsh-slider-val" id="val-bg-overlay">${Math.round((bg.overlayOpacity !== undefined ? bg.overlayOpacity : 0.35) * 100)}%</span>
        </div>
        <input type="range" class="dsh-range-slider" id="slider-bg-overlay" min="0" max="90" value="${Math.round((bg.overlayOpacity !== undefined ? bg.overlayOpacity : 0.35) * 100)}">
      </div>

      <div class="dsh-slider-group">
        <div class="dsh-slider-header">
          <span>背景自身虚化 (Background Blur)</span>
          <span class="dsh-slider-val" id="val-bg-blur">${bg.blur || 0}px</span>
        </div>
        <input type="range" class="dsh-range-slider" id="slider-bg-blur" min="0" max="30" value="${bg.blur || 0}">
      </div>
    </div>
  `;

  const thumbEl = card.querySelector('#dsh-preview-thumb');
  if (bg.enabled && bg.url) {
    if (!isVideo) {
      thumbEl.style.backgroundImage = formatCssUrl(bg.url);
    }
  } else {
    thumbEl.style.backgroundImage = 'none';
    thumbEl.style.backgroundColor = '#1e293b';
  }

  card.querySelector('#dsh-bg-toggle').onchange = (e) => {
    store.updateConfig({ background: { enabled: e.target.checked } });
    if (requestRerender) requestRerender();
  };

  card.querySelector('#dsh-btn-clear-bg').onclick = () => {
    store.updateConfig({
      background: {
        enabled: false,
        url: '',
        presetId: null,
        mediaType: 'image'
      }
    });
    if (requestRerender) requestRerender();
  };

  const fileInput = card.querySelector('#dsh-bg-file-input');
  fileInput.onchange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVid = file.type.startsWith('video/');
    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target.result;
      store.updateConfig({
        background: {
          enabled: true,
          type: 'upload',
          mediaType: isVid ? 'video' : 'image',
          url: dataUrl,
          presetId: null
        }
      });
      if (requestRerender) requestRerender();
    };
    reader.readAsDataURL(file);
  };

  const urlInput = card.querySelector('#dsh-bg-url-input');
  const urlSaveBtn = card.querySelector('#dsh-bg-url-save');
  urlSaveBtn.onclick = () => {
    const u = urlInput.value.trim();
    if (!u) return;
    const isVid = isVideoMedia(u, null);
    store.updateConfig({
      background: {
        enabled: true,
        type: 'url',
        mediaType: isVid ? 'video' : 'image',
        url: u,
        presetId: null
      }
    });
    if (requestRerender) requestRerender();
  };

  card.querySelector('#dsh-bg-fit').onchange = (e) => {
    store.updateConfig({ background: { fit: e.target.value } });
  };

  const overlayColorInput = card.querySelector('#dsh-bg-overlay-color');
  const applyOverlayBtn = card.querySelector('#dsh-btn-apply-overlay-color');
  const overlayHint = card.querySelector('#dsh-overlay-color-hint');
  applyOverlayBtn.onclick = () => {
    const chosenColor = overlayColorInput.value;
    store.updateConfig({ background: { overlayColor: chosenColor } });
    overlayHint.textContent = '已应用';
    setTimeout(() => { overlayHint.textContent = ''; }, 2000);
  };

  const sliderOverlay = card.querySelector('#slider-bg-overlay');
  const valOverlay = card.querySelector('#val-bg-overlay');
  sliderOverlay.oninput = (e) => {
    valOverlay.textContent = `${e.target.value}%`;
    store.updateConfig({ background: { overlayOpacity: parseInt(e.target.value) / 100 } });
  };

  const sliderBlur = card.querySelector('#slider-bg-blur');
  const valBlur = card.querySelector('#val-bg-blur');
  sliderBlur.oninput = (e) => {
    valBlur.textContent = `${e.target.value}px`;
    store.updateConfig({ background: { blur: parseInt(e.target.value) } });
  };

  const wpGrid = card.querySelector('.dsh-wallpaper-grid');
  PRESET_WALLPAPERS.forEach(wp => {
    const wpEl = document.createElement('div');
    const isActive = currentSourceType === 'preset' && (bg.presetId === wp.id || bg.url === wp.url);
    wpEl.className = `dsh-wallpaper-card ${isActive ? 'active' : ''}`;
    wpEl.style.backgroundImage = wp.preview.startsWith('linear-gradient') ? wp.preview : formatCssUrl(wp.url);
    wpEl.innerHTML = `
      <div class="dsh-wallpaper-name-badge">${wp.name}</div>
    `;
    wpEl.onclick = () => {
      store.applyWallpaper(wp.id);
      if (requestRerender) requestRerender();
    };
    wpGrid.appendChild(wpEl);
  });

  container.appendChild(card);
}

/** 预设主题选项卡：内置精选主题 + 用户自定义预设创建/保存/删除 */
function renderPresetsTab(container, config, store, requestRerender) {
  const userPresets = store.getUserPresets();

  const card = document.createElement('div');
  card.className = 'dsh-customizer-card';
  card.innerHTML = `
    <!-- 1. 保存当前配置为新预设 -->
    <div style="background: rgba(0, 240, 255, 0.05); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 10px; padding: 14px; margin-bottom: 24px;">
      <div style="font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 6px;">创建并保存当前外观方案</div>
      <div style="font-size: 12px; color: #94a3b8; margin-bottom: 12px;">将您当前微调的色彩、磨砂深度与背景图片/动态视频保存为独立方案，随时一键切换。</div>
      <div style="display: flex; gap: 8px;">
        <input type="text" id="dsh-save-preset-name" placeholder="为当前预设命名 (如：我的暗黑代码流)..." 
               style="flex: 1; min-width: 0; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 7px 12px; color: #fff; font-size: 13px;">
        <button class="dsh-btn dsh-btn-primary" id="dsh-btn-save-current" style="white-space: nowrap; padding: 7px 16px;">
          保存当前方案
        </button>
      </div>
      <div id="dsh-save-preset-hint" style="font-size: 12px; color: #4ade80; margin-top: 6px;"></div>
    </div>

    <!-- 2. 用户自定义预设列表 -->
    ${userPresets.length > 0 ? `
      <div class="dsh-customizer-card-title">
        <span>我的自定义外观方案</span>
        <span style="font-size: 12px; font-weight: normal; color: #94a3b8;">共 ${userPresets.length} 个已存方案</span>
      </div>
      <div class="dsh-preset-grid" style="margin-bottom: 28px;" id="dsh-user-preset-grid"></div>
    ` : ''}

    <!-- 3. 内置精选主题预设 -->
    <div class="dsh-customizer-card-title">
      <span>Firefox Color 风格官方预设</span>
      <span style="font-size: 12px; font-weight: normal; color: #94a3b8;">共 ${PRESET_THEMES.length} 套精心调优配色方案</span>
    </div>
    <div class="dsh-preset-grid" id="dsh-builtin-preset-grid"></div>
  `;

  const saveInput = card.querySelector('#dsh-save-preset-name');
  const saveBtn = card.querySelector('#dsh-btn-save-current');
  const saveHint = card.querySelector('#dsh-save-preset-hint');

  saveBtn.onclick = () => {
    const name = saveInput.value.trim();
    const created = store.saveCurrentAsPreset(name);
    saveInput.value = '';
    saveHint.textContent = `已成功保存方案：“${created.name}”！`;
    setTimeout(() => {
      if (requestRerender) requestRerender();
    }, 600);
  };

  if (userPresets.length > 0) {
    const userGrid = card.querySelector('#dsh-user-preset-grid');
    userPresets.forEach(p => {
      const pEl = document.createElement('div');
      const isActive = config.activePresetId === p.id;
      pEl.className = `dsh-preset-card ${isActive ? 'active' : ''}`;

      pEl.innerHTML = `
        <div class="dsh-preset-palette-bar">
          <div class="dsh-preset-palette-color" style="background: ${p.colors.bgBase};" title="背景底色"></div>
          <div class="dsh-preset-palette-color" style="background: ${p.colors.sidebarFill};" title="侧边栏"></div>
          <div class="dsh-preset-palette-color" style="background: ${p.colors.layer1};" title="卡片色"></div>
          <div class="dsh-preset-palette-color" style="background: ${p.colors.brandPrimary};" title="高亮主色"></div>
          <div class="dsh-preset-palette-color" style="background: ${p.colors.textPrimary};" title="文本色"></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div class="dsh-preset-name">${p.name}</div>
            <div class="dsh-preset-desc">${p.description} (${p.createdAt})</div>
          </div>
          <button class="dsh-btn dsh-btn-danger" style="padding: 2px 6px; font-size: 11px; margin-top: -2px;" title="删除该方案">
            删除
          </button>
        </div>
      `;

      pEl.onclick = (e) => {
        if (e.target.tagName === 'BUTTON') return;
        store.applyPreset(p.id);
        if (requestRerender) requestRerender();
      };

      const delBtn = pEl.querySelector('button');
      delBtn.onclick = (e) => {
        e.stopPropagation();
        if (confirm(`确定要删除方案“${p.name}”吗？`)) {
          store.deleteUserPreset(p.id);
          if (requestRerender) requestRerender();
        }
      };

      userGrid.appendChild(pEl);
    });
  }

  const builtinGrid = card.querySelector('#dsh-builtin-preset-grid');
  PRESET_THEMES.forEach(p => {
    const pEl = document.createElement('div');
    const isActive = config.activePresetId === p.id;
    pEl.className = `dsh-preset-card ${isActive ? 'active' : ''}`;

    pEl.innerHTML = `
      <div class="dsh-preset-palette-bar">
        <div class="dsh-preset-palette-color" style="background: ${p.colors.bgBase};" title="背景底色"></div>
        <div class="dsh-preset-palette-color" style="background: ${p.colors.sidebarFill};" title="侧边栏"></div>
        <div class="dsh-preset-palette-color" style="background: ${p.colors.layer1};" title="卡片色"></div>
        <div class="dsh-preset-palette-color" style="background: ${p.colors.brandPrimary};" title="高亮主色"></div>
        <div class="dsh-preset-palette-color" style="background: ${p.colors.textPrimary};" title="文本色"></div>
      </div>
      <div class="dsh-preset-name">${p.name}</div>
      <div class="dsh-preset-desc">${p.description}</div>
    `;

    pEl.onclick = () => {
      store.applyPreset(p.id);
      if (requestRerender) requestRerender();
    };

    builtinGrid.appendChild(pEl);
  });

  container.appendChild(card);
}

/** 备份与重置选项卡 */
function renderBackupTab(container, config, store, requestRerender) {
  const card = document.createElement('div');
  card.className = 'dsh-customizer-card';
  card.innerHTML = `
    <div class="dsh-customizer-card-title">
      <span>配置导出、导入与重置</span>
    </div>
    <p style="font-size: 13px; color: #94a3b8; margin-bottom: 20px;">
      可以将您设计的色彩与磨砂背景配置导出为 JSON 分享或备份，粘贴配置即可快速还原。
    </p>

    <div style="margin-bottom: 20px;">
      <button class="dsh-btn dsh-btn-secondary" id="dsh-btn-export">复制当前配置 JSON 到剪贴板</button>
      <span id="dsh-export-hint" style="margin-left: 12px; font-size: 12px; color: #4ade80;"></span>
    </div>

    <div style="margin-bottom: 20px;">
      <textarea id="dsh-import-json-area" placeholder="在此粘贴导出的配置 JSON 字符串..." 
                style="width: 100%; height: 90px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 10px; color: #fff; font-family: monospace; font-size: 12px; box-sizing: border-box; resize: vertical;"></textarea>
      <div style="margin-top: 8px; display: flex; gap: 10px; align-items: center;">
        <button class="dsh-btn dsh-btn-primary" id="dsh-btn-import">导入并立即应用</button>
        <span id="dsh-import-hint" style="font-size: 12px;"></span>
      </div>
    </div>

    <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; margin-top: 24px;">
      <h4 style="margin: 0 0 10px; font-size: 14px; color: #ef4444;">恢复初始设置</h4>
      <p style="font-size: 12px; color: #94a3b8; margin-bottom: 12px;">重置所有自定义颜色、磨砂和壁纸，还原为官方推荐的预设外观。</p>
      <button class="dsh-btn dsh-btn-danger" id="dsh-btn-reset">恢复默认设置</button>
    </div>
  `;

  const exportBtn = card.querySelector('#dsh-btn-export');
  const exportHint = card.querySelector('#dsh-export-hint');
  exportBtn.onclick = () => {
    const jsonStr = store.exportConfigJson();
    navigator.clipboard.writeText(jsonStr).then(() => {
      exportHint.textContent = '已成功复制到剪贴板！';
      setTimeout(() => { exportHint.textContent = ''; }, 3000);
    }).catch(() => {
      exportHint.textContent = '复制失败，请手动打开控制台复制';
    });
  };

  const importBtn = card.querySelector('#dsh-btn-import');
  const importArea = card.querySelector('#dsh-import-json-area');
  const importHint = card.querySelector('#dsh-import-hint');
  importBtn.onclick = () => {
    const raw = importArea.value.trim();
    if (!raw) return;
    const res = store.importConfigJson(raw);
    if (res.success) {
      importHint.style.color = '#4ade80';
      importHint.textContent = '导入成功并已应用！';
      setTimeout(() => { importHint.textContent = ''; }, 3000);
      if (requestRerender) requestRerender();
    } else {
      importHint.style.color = '#ef4444';
      importHint.textContent = `导入失败: ${res.error}`;
    }
  };

  const resetBtn = card.querySelector('#dsh-btn-reset');
  resetBtn.onclick = () => {
    if (confirm('确定要恢复默认设置吗？您当前的所有色彩与背景调整将被重置。')) {
      store.resetToDefault();
      alert('已成功重置为默认主题！');
      if (requestRerender) requestRerender();
    }
  };

  container.appendChild(card);
}
