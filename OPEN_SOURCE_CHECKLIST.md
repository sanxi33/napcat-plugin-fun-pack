# Fun Pack Open Source Checklist

## 1. 数据边界

- 不提交现网配置和日志
- 不保留旧项目绝对路径
- 素材目录改为仓库内置路径

## 2. 文档一致性

- README 必须和当前实现一致
- 不要写“今天玩什么”这类未实现功能

## 3. 发布

- Release zip 包含 `index.mjs`、`package.json`、`assets/today_food/*`
- 注意素材体积较大
- 配置 `INDEX_PAT`

## 4. 验收

- 素材文件在 release 里可见
- 官方索引 PR 已创建
