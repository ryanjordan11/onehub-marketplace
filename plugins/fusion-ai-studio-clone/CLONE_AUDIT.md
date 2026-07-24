# fusion2-react-clone · 复刻审计 / 证据

## 产物
- `NOTES.md`
- `RECON/`（侦察结果、截图、网络捕获、路由图）
- `assets/`（按 asset-manifest 落地的字体/图片）
- `studio.html`（隐藏状态的前端替身页面，含加载、成功提示、结果预览、下拉分类选择）

## 保真度（0–5）
- 结构保真: 4
- 视觉保真: 4
- 动效/交互: 3
- 响应式: 3
- 功能完整: 2（真实 AI 生成/登录为前端模拟）

## 颜色照抄规则
- `body` 照抄 `rgb(26, 26, 26)` --> `#1a1a1a`
- `nav` 照抄 `rgba(0, 0, 0, 0.5)` 半透明 + blur
- `footer`/`button` 常驻 `#CCFF00` accent

## 字体来源
- 原站 `wheel` : `ui-sans-serif, ...`；无自托管字体文件，故 fallback 至系统 `ui-sans-serif`

## 图片/媒体来源
- 全部来自 `RECON/asset-manifest.json` 下的 `assets/images/`，本地引用相对路径
- 未发现 WebGL/Three.js/Canvas 资产下载依赖

## 已知缺口
- 未引入真登录态和订阅后端
- “生成”逻辑为前端模拟，不对应真实 API
