---
title: MongoDB
sidebar_position: 7
---

## 用户管理

创建用户：

```shell
use dbname  # 进入数据库

db.createUser({
    user: 'aa',
    pwd: 'aaaaaa',
    roles: ['readWrite', 'dbAdmin', 'userAdmin']
})
```

插入管理员（密码需提前用 bcrypt 加密）：

```shell
db.users.insertOne({
    username: 'aa',
    nickname: 'aa',
    password: '$2b$10$z4WSs5Ox55mPV8BS...',
    createdAt: new Date(),
    updatedAt: new Date()
})
```

## 索引

```shell
db.users.getIndexes()           # 查看所有索引
db.users.dropIndexes()          # 删除所有索引（保留 _id）
db.users.createIndex({name: 1}) # 创建索引
```

> 也可通过 `schema.index()` 或在属性上加 `@Index` 装饰器来管理索引。
