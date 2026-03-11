---
title: Linux
sidebar_position: 3
---

## 常用命令

删除指定目录下后缀为指定字符的文件

```shell
# 删除一种类型文件
find . -name "*.mp3" -delete

# 删除多种类型文件
find . -name "*.mp4" -or -name "*.pdf" -delete
```

查看最近几条记录

```shell
history -E -10
```


## 快捷键

| 键 | 说明 |
| -- | -- |
| Ctrl + a | 到行首 |
| Ctrl + e | 到行尾 |
| Ctrl + r | 搜索历史命令 |
| Ctrl + w | 删除最近一个单词 |
| Ctrl + u | 删除当前行 |
| Ctrl + y | 粘贴 Ctrl + w 或 Ctrl + u 的值 |
| !xx | 查找最近一条包括 xx 关键字的命令 |
| cd - | 回到上一次所在目录 |
| Ctrl + l | 清屏 |

## SSH

保持与服务端长连接，编辑 `~/.ssh/config`：

```shell
Host *
  ServerAliveInterval 60
  ServerAliveCountMax 3
```

- `ServerAliveInterval`：每隔 60 秒发送一次心跳包
- `ServerAliveCountMax`：无响应时最多重试 3 次后断开

## 网络

查询 IP 地址归属地：

```shell
curl http://www.geoplugin.net/json.gp?ip=xx.xx.xx.xx
```

生成随机字符串：

```shell
openssl rand -base64 32
```
