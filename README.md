# napcat-plugin-fun-pack

一个为 NapCat 设计的轻量娱乐插件包。装上之后，你就能在群里直接玩二选一、今天吃什么、今天喝什么、龙图、对吗、`.d20`、`/roll` 这些小功能。

## 适用场景

- 给群聊增加一点轻松互动功能
- 希望导入插件后马上就能玩
- 不想额外配置第三方服务或 API

## 环境要求

- 已部署 NapCat，并了解如何导入插件包 (`.zip`)
- 无需额外依赖或 API 密钥

## 安装步骤

### 1. 下载插件

前往 [Releases](https://github.com/sanxi33/napcat-plugin-fun-pack/releases) 页面，下载最新版本的 `napcat-plugin-fun-pack.zip`。

### 2. 导入 NapCat

在 NapCat 的插件管理界面中导入 zip 文件，并启用插件。

### 3. 默认配置

插件首次运行将使用以下默认配置：

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

一般建议先保持默认值，确认功能跑通后再按需关闭某些子功能。

## 使用方法

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

如果你把 `commandPrefix` 设为空，则可以直接输入命令本体。

## 验证安装

建议先试这 3 条：

```text
球鳖 今天吃什么
球鳖 .d20
球鳖 要奶茶还是咖啡
```

只要有任意一条正常返回，说明插件已经工作了。

## 快捷安装链接

NapCat 版本 ≥ `4.15.19` 时，可点击下方按钮快速跳转至插件安装页面：

<a href="https://napneko.github.io/napcat-plugin-index?pluginId=napcat-plugin-fun-pack" target="_blank">
  <img src="https://github.com/NapNeko/napcat-plugin-index/blob/pages/button.png?raw=true" alt="在 NapCat WebUI 中打开" width="170">
</a>

## 已知限制

- 开源版目前不包含“今天玩什么”功能
- 素材是本地文件，因此 release 包会比普通纯代码插件大一些
- 资源随机逻辑依赖本地文件，不适合极小体积部署场景

## License

MIT
