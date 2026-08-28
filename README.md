# 疯狂水世界攻略 H5

一款可在 iOS Safari 上运行的《疯狂水世界》游戏攻略小程序（H5 页面），涵盖角色图鉴、阵容推荐、赛季指南、海兽搭配、徽章装备与技能优先级等内容。

## 功能

- **角色图鉴**：22+ 角色详情，含适配赛季、徽章/装备/海兽推荐、技能优先级
- **阵容推荐**：0氪/微氪 与 氪金阵容分开推荐，覆盖 S1-S7
- **赛季指南**：各赛季特点与海兽搭配方案
- **养成指南**：词条优先级、徽章系统、属性叠加机制说明

## 手机访问（重要）

`http://localhost:8080` **只能在电脑本机打开**，手机访问 `localhost` 指的是手机自己，无法连到开发电脑。

### 方式一：公网临时链接（立即可用）

Cloud Agent 环境可通过 Cloudflare 隧道访问，手机浏览器直接打开即可。

> 注意：临时链接仅在 Agent 运行期间有效，关闭后会失效。

### 方式二：GitHub Pages（推荐，永久免费）

1. 打开 GitHub 仓库 [robertyang0511/zhuzhu](https://github.com/robertyang0511/zhuzhu)
2. 进入 **Settings → Pages**
3. **Build and deployment** 选择 **GitHub Actions**
4. 保存后，每次 push 到 `main` 会自动部署
5. 访问地址：`https://robertyang0511.github.io/zhuzhu/`

### 方式三：本地局域网（同一 WiFi）

电脑和手机连同一 WiFi 时：

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

手机浏览器访问 `http://<你电脑的局域网IP>:8080`（如 `http://192.168.1.100:8080`）

## 本地运行

纯静态页面，无需构建：

```bash
python3 -m http.server 8080
```

浏览器访问 `http://localhost:8080`（仅本机）

## iOS 添加到主屏幕

1. 用 Safari 打开页面
2. 点击底部分享按钮
3. 选择「添加到主屏幕」
4. 即可像 App 一样全屏使用

## 技术栈

- 原生 HTML / CSS / JavaScript
- 移动端优先，支持 iOS safe-area
- PWA manifest 支持添加到主屏幕

## 数据来源

攻略内容整理自公开社区攻略（3DM、游戏宝、游侠网等），覆盖 S1-S7 赛季。游戏版本更新后数据可能需要手动维护。

## 目录结构

```
├── index.html      # 主页面
├── manifest.json   # PWA 配置
├── css/style.css   # 样式
├── js/
│   ├── data.js     # 游戏数据
│   └── app.js      # 交互逻辑
└── assets/         # 图标资源
```
