# napcat-plugin-fun-pack

一个 NapCat 原生娱乐插件，提供随机二选一、今天吃什么、今天喝什么、龙图、对吗、`.d20` 和 `/roll` 等轻量玩法。

## 功能

- 随机选择：`要A还是B`
- 今天吃什么：随机食物图
- 今天喝什么：随机饮料图
- 龙图：随机龙图
- `.d20`：掷 20 面骰
- `/roll`：随机 1-99
- `对吗`：随机“是/否”图片
- `下班！`：下班图

注意：当前开源版不包含“今天玩什么”功能，README 按实际代码行为编写。

## 配置

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

- `assetsRoot` 默认使用仓库内置素材目录 `./assets`
- 其余布尔项分别控制具体功能开关

## 使用示例

```text
球鳖 要奶茶还是咖啡
球鳖 今天吃什么
球鳖 今天喝什么
球鳖 龙图
球鳖 对吗
.d20
/roll
下班！
```

## 安装

1. 下载当前仓库 [Releases](https://github.com/sanxi33/napcat-plugin-fun-pack/releases) 中的 `napcat-plugin-fun-pack.zip`
2. 在 NapCat 插件管理中导入压缩包
3. 启用插件即可使用内置素材

## 发布产物

发布包包含：

- `index.mjs`
- `package.json`
- `assets/today_food/*`

## 已知限制

- 素材包体积较大，Release 下载会比普通插件慢
- 资源随机逻辑依赖本地文件，不适合极小体积部署场景

## 开源流程文档

- [OPEN_SOURCE_CHECKLIST.md](./OPEN_SOURCE_CHECKLIST.md)
- [NAPCAT_PLUGIN_OPEN_SOURCE_WORKFLOW.md](./NAPCAT_PLUGIN_OPEN_SOURCE_WORKFLOW.md)

## License

MIT
