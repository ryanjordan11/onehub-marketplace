# fusion2-clone · 克隆笔记

## 源信息
- 原站 URL: https://fusion2.lovable.app/studio
- 源码仓库: 未找到公开仓库
- 原作者: Lovable (fusion2.lovable.app)
- 许可证: 未明确；所有权利保留（页面无开放源码声明）
- 致谢要求: 原站品牌与内容仅限本地学习复刻，不得公开重新部署

## 技术栈
- 单页 React 18 + Tailwind（抓取到构建产物 `assets/css/fusion2.lovable.app/...css`）
- 图标库: lucide-react（TSX 中导入）
- 无 WebGL/Canvas 重前端
- 本地静态资源已按 manifest 存在 `assets/images/`

## 复刻前预判
- 复杂度等级: L3
- 推荐模式: 忠实复刻首屏 studio 工作区（用户给定 React 组件结构已收敛）
- 可高保真的部分: 布局、暗色主题、CTA/模块结构、颜色、字体、本地化图片引用
- 需要近似或替代的部分: 真实 AI 生成管线与订阅后端（默认前端替身）
- 不克隆的部分: 登录态、支付、账号系统、私有 API
- 主要风险: 字体为系统字体；如引入外部字体 CDN，预览环境可能断链

## 跑起来
```bash
python3 -m http.server 8123
# 打开 http://127.0.0.1:8123/studio.html
```

## 改了什么（对照原版）
- 从 manifest 映射本地图片；保留原图文件名
- 用自托管构建 CSS 做样式基准并叠加必要样式
- 暗色模式/移动菜单为前端模拟态，不接入真实后端

## 原站 vs 克隆站
| 模块 | 原站表现 | 克隆实现 | 差异 / 取舍 | 证据 |
|---|---|---|---|---|
| header | sticky 半透明黑底 + lime accent | 同结构 React 组件 | 无 | RECON/screenshots/original-*.png |
| Upload |  dashed dropzone + range | 可点击上传 + range | 生成无真实后端，前端模拟 | 组件代码 |
| Preset grid | 多列卡片 + 分类 | 同结构 | 无 | 组件代码 |
| Fine tune | select + emotion chips | 同结构 | 无 | 组件代码 |
| Generation | 固定右下提示 | loading -> success | 无后台，前端 2s 模拟 | 组件代码 |

## 复刻评分
- 源证据: 5/5
- 结构保真: 4/5
- 视觉保真: 4/5
- 动效/交互: 3/5
- 响应式: 3/5
- 功能完整: 2/5（前端替身）
- 内容替换: 3/5
- 法务/部署风险: 4/5
- 总评: 4.0/5

## 替换地图（要换什么改哪）
- 文字 -> `studio.html` JSX/节点文案
- 图片/媒体 -> `assets/images/`
- 配色 -> CSS 自定义属性
- 逻辑/配色 -> `studio.html` React 状态

## 验证
- [x] 本地跑通、console 0 error
- [x] 截图对照原站（RECON/screenshots/）
- 验证不了的点：真实 AI 生成/登录/订阅结算（仅前端模拟）
