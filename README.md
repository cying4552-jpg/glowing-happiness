# 海风里的石狮

“我的家乡”互动展示网站 GitHub Pages 完整部署版（V72）。

## 包含内容

- 完整首页、互动地图、NPC、任务引导与“石狮的一天”模块
- 姑嫂塔、洛伽寺、石狮服装城、老街、美食与家乡记忆内容
- 背景音乐、玩家脚步声、六位 NPC 朗读音频
- 图片、视频、放映室及全部视觉动效
- GitHub Actions 自动部署配置

## GitHub Pages 部署

1. 在 GitHub 新建一个空仓库，建议仓库名称使用 `shishi-hometown`。
2. 解压本压缩包，将解压后的全部文件上传到仓库根目录。不要只上传外层文件夹。
3. 确认 `index.html`、`assets`、`.github` 位于仓库根目录。
4. 仓库默认分支使用 `main`。
5. 打开仓库 `Settings → Pages`。
6. 在 `Build and deployment → Source` 中选择 `GitHub Actions`。
7. 打开 `Actions`，等待 `Deploy GitHub Pages` 工作流显示绿色对勾。
8. 返回 `Settings → Pages` 查看公开网站地址。

以后修改文件并推送到 `main` 分支，网站会自动重新部署。

## 注意事项

- 浏览器禁止网页未经交互自动播放有声内容，因此访客需要点击“开启声音入城”或音乐按钮。
- 请保留 `.nojekyll`，避免 GitHub Pages 忽略以下划线开头的资源。
- 所有资源均使用相对路径，可部署在 `用户名.github.io/仓库名/` 子路径下。
- 单个资源均未超过 GitHub 的 100MB 文件限制。
- 若上传时看不到 `.github`，请确认系统已显示隐藏文件。

## 本地预览

建议使用静态服务器预览，而不是直接双击 `index.html`。例如：

```bash
python -m http.server 8080
```

然后访问 `http://localhost:8080`。
