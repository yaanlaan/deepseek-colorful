import { createCustomizerDom } from './customizer-view.js';
import { themeStore } from './theme-store.js';

const LAUNCHER_BTN_ID = 'dsh-floating-customizer-btn';
const MODAL_ID = 'dsh-floating-customizer-modal';

let isModalOpen = false;
let hideTimer = null;

export function installFloatingLauncher() {
  if (typeof document === 'undefined') return;

  // 1. 如果按钮已存在则无需重复创建
  if (document.getElementById(LAUNCHER_BTN_ID)) return;

  // 2. 创建悬浮按钮 (纯矢量图标风格)
  const btn = document.createElement('button');
  btn.id = LAUNCHER_BTN_ID;
  btn.title = 'UI 调色与磨砂背景定制 (点击打开)';
  btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`;

  btn.onclick = () => {
    toggleModal();
  };

  // 3. 智能完全隐藏逻辑：
  // 鼠标离开或无操作 2 秒后自动完全透明隐形（opacity: 0, 缩小，且 pointer-events: none，屏幕边缘 100% 干净，不遮挡任何界面元素）
  // 鼠标移动到屏幕右下角区域 (距离右边缘与下边缘 110px 以内) 时瞬间完全显形唤醒！
  function scheduleAutoHide() {
    if (isModalOpen) return;
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!isModalOpen) {
        btn.classList.add('dsh-btn-autohide');
      }
    }, 2000);
  }

  function wakeUpButton() {
    if (hideTimer) clearTimeout(hideTimer);
    btn.classList.remove('dsh-btn-autohide');
    scheduleAutoHide();
  }

  btn.onmouseenter = () => {
    if (hideTimer) clearTimeout(hideTimer);
    btn.classList.remove('dsh-btn-autohide');
  };

  btn.onmouseleave = () => {
    scheduleAutoHide();
  };

  // 监听全屏鼠标活动，当鼠标进入屏幕右下角感应区时瞬间唤醒
  window.addEventListener('mousemove', (e) => {
    const fromRight = window.innerWidth - e.clientX;
    const fromBottom = window.innerHeight - e.clientY;
    if (fromRight < 110 && fromBottom < 110) {
      wakeUpButton();
    }
  }, { passive: true });

  document.body.appendChild(btn);
  scheduleAutoHide();
}

export function openModal() {
  if (typeof document === 'undefined') return;
  let modal = document.getElementById(MODAL_ID);
  const btn = document.getElementById(LAUNCHER_BTN_ID);
  if (btn) {
    btn.classList.remove('dsh-btn-autohide');
    if (hideTimer) clearTimeout(hideTimer);
  }

  if (modal) {
    modal.style.display = 'flex';
    isModalOpen = true;
    return;
  }

  modal = document.createElement('div');
  modal.id = MODAL_ID;

  // Header
  const header = document.createElement('div');
  header.className = 'dsh-modal-header';
  header.innerHTML = `
    <div class="dsh-modal-header-title">
      <span>外观设计器</span>
    </div>
    <button class="dsh-modal-close-btn" title="关闭">✕</button>
  `;

  header.querySelector('.dsh-modal-close-btn').onclick = () => {
    closeModal();
  };

  // Body
  const body = document.createElement('div');
  body.className = 'dsh-modal-body';
  body.appendChild(createCustomizerDom(themeStore));

  modal.appendChild(header);
  modal.appendChild(body);
  document.body.appendChild(modal);

  isModalOpen = true;
}

export function closeModal() {
  if (typeof document === 'undefined') return;
  const modal = document.getElementById(MODAL_ID);
  if (modal) {
    modal.style.display = 'none';
  }
  isModalOpen = false;

  const btn = document.getElementById(LAUNCHER_BTN_ID);
  if (btn) {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      btn.classList.add('dsh-btn-autohide');
    }, 2000);
  }
}

export function toggleModal() {
  if (isModalOpen) {
    closeModal();
  } else {
    openModal();
  }
}
