# napcat-plugin-fun-pack

群聊里搞气氛用的娱乐功能合集。装上就能玩二选一、今天吃什么、今天喝什么、龙图、对吗、`.d20`、`/roll`、下班！这些，不需要配什么第三方 API，下载 zip 导入 NapCat 就行。

## 下载安装

去 [Releases](https://github.com/sanxi33/napcat-plugin-fun-pack/releases) 下最新的 `napcat-plugin-fun-pack.zip`，在 NapCat 插件管理里导入并启用。

NapCat ≥ `4.15.19` 的话可以直接点这个按钮跳转安装：

<a href="https://napneko.github.io/napcat-plugin-index?pluginId=napcat-plugin-fun-pack" target="_blank">
  <img src="https://github.com/NapNeko/napcat-plugin-index/blob/pages/button.png?raw=true" alt="在 NapCat WebUI 中打开" width="170">
</a>

## 默认配置

首次运行会自动生成以下配置，想关哪个子功能改 `false` 就行：

```json
{
  "enabled": true,
  "commandPrefix": "/",
  "assetsRoot": "./assets",
  "chooseEnabled": true,
  "foodEnabled": true,
  "drinkEnabled": true,
  "longEnabled": true,
  "d20Enabled": true,
  "rollEnabled": true,
  "trueFalseEnabled": true,
  "offWorkEnabled": true
}
```

`commandPrefix` 设成空字符串的话可以直接输命令本体，不用加前缀。

## 支持的命令

```
/要奶茶还是咖啡
/今天吃什么
/今天喝什么
/龙图
/对吗
.d20
/roll
/下班！
```

装好随便发一条 `/今天吃什么` 或者 `.d20`，能正常回复就说明跑通了。

## 已知限制

- 开源版不包含「今天玩什么」功能
- 素材资源在本地，release 包比纯代码插件大一些
- 资源随机逻辑依赖本地文件，极小体积部署场景可能不太合适

## License

MIT
