import fs from 'fs';
import path from 'path';

const stylesContent = fs.readFileSync('lib/styles.js', 'utf8')
  .replace("export const UI_STYLES = `", "")
  .replace(/`;\s*$/, "");

const presetsContent = fs.readFileSync('lib/presets.js', 'utf8')
  .replaceAll('export const ', 'const ');

const engineContent = fs.readFileSync('lib/theme-engine.js', 'utf8')
  .replaceAll('export function ', 'function ')
  .replaceAll('export const ', 'const ');

const storeContent = fs.readFileSync('lib/theme-store.js', 'utf8')
  .replace(/import\s*\{[\s\S]*?\}\s*from\s*['"][^'"]+['"];?/g, "")
  .replaceAll('export const ', 'const ')
  .replaceAll('export class ', 'class ');

const viewContent = fs.readFileSync('lib/customizer-view.js', 'utf8')
  .replace(/import\s*\{[\s\S]*?\}\s*from\s*['"][^'"]+['"];?/g, "")
  .replaceAll('export function ', 'function ');

const launcherContent = fs.readFileSync('lib/floating-launcher.js', 'utf8')
  .replace(/import\s*\{[\s\S]*?\}\s*from\s*['"][^'"]+['"];?/g, "")
  .replaceAll('export function ', 'function ')
  .replaceAll('export let ', 'let ');

const bundle = `// DeepSeek Colorful (Custom theme palettes, frosted glass & background images/videos)
window.__ModuleLoader__.load({
  id: "deepseek-colorful",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    const React = require("react");

    // ==========================================
    // 1. UI 样式表
    // ==========================================
    const UI_STYLES = \`${stylesContent}\`;

    function installUiStyles() {
      if (typeof document === 'undefined') return;
      const tagId = 'dsh-customizer-ui-base-styles';
      if (!document.getElementById(tagId)) {
        const style = document.createElement('style');
        style.id = tagId;
        style.textContent = UI_STYLES;
        document.head.appendChild(style);
      }
    }

    // ==========================================
    // 2. 预设配置与壁纸库
    // ==========================================
    ${presetsContent}

    // ==========================================
    // 3. 样式引擎与背景图管理
    // ==========================================
    ${engineContent}

    // ==========================================
    // 4. 响应式状态管理 (localStorage 持久化)
    // ==========================================
    ${storeContent}

    // ==========================================
    // 5. 视图渲染逻辑
    // ==========================================
    ${viewContent}

    // ==========================================
    // 6. 悬浮快捷球与弹窗面板
    // ==========================================
    ${launcherContent}

    // ==========================================
    // 7. 设置面板 React 组件
    // ==========================================
    function CustomizerSettingsSection(props) {
      const containerRef = React.useRef(null);
      React.useEffect(() => {
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(createCustomizerDom(themeStore));
        }
      }, []);
      return React.createElement('div', {
        ref: containerRef,
        style: { width: '100%', height: '100%', overflowY: 'auto' }
      });
    }

    // ==========================================
    // 8. 插件入口与 Cordis Slot 注入
    // ==========================================
    const inject = ["slots", "theme"];

    function apply(ctx) {
      console.log("[DeepSeek Colorful] Initializing client plugin...");

      installUiStyles();

      themeStore.init(ctx);

      installFloatingLauncher();

      if (ctx.slots && typeof ctx.slots.inject === 'function') {
        ctx.slots.inject("settings.section", () => {
          return ctx.slots.register({
            name: "settings.section",
            id: "deepseek-colorful",
            order: 25,
            label: () => "外观定制",
            locale: "settings.customizer"
          }, CustomizerSettingsSection);
        });
      }

      console.log("[DeepSeek Colorful] Client plugin ready!");
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  }
});
`;

fs.writeFileSync('lib/client.js', bundle, 'utf8');
console.log('Successfully bundled lib/client.js! File size:', bundle.length, 'bytes');
