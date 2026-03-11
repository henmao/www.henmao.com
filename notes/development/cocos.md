---
title: Cocos
sidebar_position: 4
---

## 游戏最佳适配

背景可放大适配：`scale: 1.3 1.3`

| 方向 | 分辨率 | 适配方式 |
|---|---|---|
| 横屏 | `1280 x 720` | 适配高度，宽度自适应 |
| 竖屏 | `720 x 1280` | 适配宽度，高度自适应 |

> 音效用 **wav** 模式，背景音乐用 **mp3** 模式。

## 字体提取

用 fonttools 从完整字体中提取游戏所需字符子集，大幅减小体积。

> 参考文档：https://fonttools.readthedocs.io/en/latest/subset/index.html
> 思源黑体（简体）：https://github.com/adobe-fonts/source-han-sans/tree/release/OTF/SimplifiedChinese

```bash
# 安装 fonttools
brew install fonttools

# 提取字体子集
pyftsubset SourceHanSansSC-Regular.otf \
  --text-file=chars.txt \
  --output-file=game.ttf \
  --no-hinting \
  --layout-features=''
```

- `--no-hinting`：移除低分屏优化信息，高分屏无影响，减重明显
- `--layout-features=''`：移除 OpenType 特性（垂直排版等），体积减少约一半
