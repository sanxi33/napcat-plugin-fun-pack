# napcat-plugin-fun-pack

一个给 NapCat 用的轻量娱乐插件包。装上之后，你就能在群里直接玩二选一、今天吃什么、今天喝什么、龙图、对吗、`.d20`、`/roll` 这些小功能。

## 这份 README 默认把你当作

- 已经装好了 NapCat，会导入插件 zip
- 想先装一个“导入就能玩”的娱乐插件
- 不想自己准备外部 API、模型或者额外脚本

## 这个插件适合谁

适合：

- 想给群里加一点轻松互动功能
- 想安装后马上就能用
- 不想额外配第三方服务

不太适合：

- 想做复杂游戏逻辑的人
- 对素材体积特别敏感的人

## 装之前要准备什么

基本不用准备别的东西。

这个插件自带素材，默认导入后就能用。你真正只需要决定一件事：

- 命令前缀要不要保留默认值 `球鳖`

## 安装

### 1. 下载插件

从 [Releases](https://github.com/sanxi33/napcat-plugin-fun-pack/releases) 下载：

- `napcat-plugin-fun-pack.zip`

### 2. 导入 NapCat

在 NapCat 插件管理里导入 zip，并启用插件。

### 3. 先不改配置直接试

默认配置如下：

```json
{
  "enabled": true,
  "commandPrefix": "球鳖",
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

对于大多数人来说：

- `assetsRoot` 不要改
- 先保留所有功能开启
- 如果你不想带前缀，可以把 `commandPrefix` 设为空

## 怎么用

常见玩法示例：

```text
球鳖 要奶茶还是咖啡
球鳖 今天吃什么
球鳖 今天喝什么
球鳖 龙图
球鳖 对吗
球鳖 .d20
球鳖 /roll
球鳖 下班！
```

如果你把前缀留空，就直接发命令本体。

## 第一次怎么确认自己装好了

建议先试这 3 条：

```text
球鳖 今天吃什么
球鳖 .d20
球鳖 要奶茶还是咖啡
```

只要有任意一条正常返回，说明插件已经工作了。

## 一键跳到 NapCat WebUI 安装页

如果你的 NapCat 版本是 `4.15.19` 或更高，可以直接点下面按钮跳到插件安装界面：

<a href="https://napneko.github.io/napcat-plugin-index?pluginId=napcat-plugin-fun-pack" target="_blank">
  <img src="https://github.com/NapNeko/napcat-plugin-index/blob/pages/button.png?raw=true" alt="在 NapCat WebUI 中打开" width="170">
</a>

## 你可能会关心的事

- 开源版目前不包含“今天玩什么”功能
- 素材是本地文件，所以 release 包会比普通纯代码插件大一些
- 如果你只想关掉某个功能，可以在配置页里把对应布尔开关关掉

## License

MIT
