---
title: Claude Code
sidebar_position: 10
---

# Claude Code 常用手册

Claude Code 是 Anthropic 官方 CLI 工具，用于在终端中与 Claude 协作完成编程任务。

---

## 1. 常用斜杠命令 (Slash Commands)

### 会话管理

| 命令 | 说明 |
|---|---|
| `/clear` | 清空对话历史，释放上下文 |
| `/compact [说明]` | 压缩对话历史，可附加保留重点的说明 |
| `/context` | 可视化查看当前上下文用量（彩色网格） |
| `/cost` | 查看本次会话的 Token 用量统计 |

### 模型切换

| 命令 | 说明 |
|---|---|
| `/model` | 打开模型选择界面 |
| `/model opus` | 切换到 Claude Opus 模型 |
| `/model sonnet` | 切换到 Claude Sonnet 模型 |
| `/model haiku` | 切换到 Claude Haiku 模型 |
| `/model opusplan` | 计划模式用 Opus，执行阶段自动降回 Sonnet（省钱又聪明） |
| `/fast` | 切换 Fast 模式（更快的输出） |

### 任务模式

| 命令 | 说明 |
|---|---|
| `/plan` | 进入计划模式（先规划再执行） |
| `/vim` | 切换 Vim 编辑模式 |

### 记忆与配置

| 命令 | 说明 |
|---|---|
| `/memory` | 编辑 CLAUDE.md 记忆文件 |
| `/init` | 初始化项目，生成 CLAUDE.md |
| `/config` | 打开设置界面（主题、模型、输出风格等） |

### 代码与 Git

| 命令 | 说明 |
|---|---|
| `/diff` | 打开交互式 diff 查看器 |
| `/security-review` | 对当前分支改动做安全审查 |
| `/pr-comments [PR]` | 拉取 GitHub PR 的评论 |

### 其他实用命令

| 命令 | 说明 |
|---|---|
| `/help` | 查看帮助文档 |
| `/doctor` | 检查 Claude Code 安装状态 |
| `/status` | 查看版本、账户、连接状态 |
| `/skills` | 列出所有可用 Skill |
| `/release-notes` | 查看更新日志 |

---

## 2. 键盘快捷键

| 快捷键 | 说明 |
|---|---|
| `Ctrl + G` | 在默认编辑器中编辑当前提示词 |
| `Ctrl + C` | 取消当前输入或停止生成 |
| `Ctrl + D` | 退出 Claude Code |
| `Ctrl + L` | 清屏（保留对话历史） |
| `Ctrl + R` | 反向搜索历史命令 |
| `Ctrl + O` | 切换详细输出（显示工具调用详情） |
| `Ctrl + B` | 将当前任务移到后台运行 |
| `Ctrl + T` | 切换任务列表显示 |
| `Esc + Esc` | 回退对话（Rewind）到上一个检查点 |
| `Shift + Tab` | 切换权限模式（自动批准 / 计划 / 普通） |
| `Option + P` (macOS) | 快速切换模型 |
| `Option + T` (macOS) | 切换扩展思考（Extended Thinking） |
| `Ctrl + V` / `Cmd + V` | 从剪贴板粘贴图片 |

### 多行输入

| 方式 | 快捷键 |
|---|---|
| 快速换行 | `\` + `Enter` |
| macOS 默认 | `Option + Enter` |
| 支持的终端（iTerm2 等） | `Shift + Enter` |
| 通用控制序列 | `Ctrl + J` |

---

## 3. 输入前缀

| 前缀 | 说明 |
|---|---|
| `!` | Bash 模式：直接执行 Shell 命令，输出加入对话 |
| `/` | 斜杠命令或 Skill |
| `@` | 文件路径补全（引用文件） |

**示例：**

```bash
! git log --oneline -10   # 直接运行 git 命令
@src/components/Button    # 引用文件路径
```

---

## 4. 权限模式

通过 `Shift + Tab` 循环切换：

| 模式 | 说明 |
|---|---|
| **Normal** | 每次工具调用都需要确认（默认） |
| **Auto-Accept** | 自动批准所有操作（高风险，慎用） |
| **Plan** | 先展示计划，确认后再执行 |

---

## 5. 启动参数 (CLI Flags)

```bash
# 基础用法
claude                          # 启动交互模式
claude "帮我优化这段代码"        # 带初始提示启动
claude -p "查询"                 # 执行后退出（SDK 模式）
cat file.txt | claude -p "总结" # 处理管道输入

# 会话管理
claude -c                       # 继续上次会话
claude -r "session-name"        # 恢复指定会话

# 模型与权限
claude --model claude-opus-4-6  # 指定模型
claude --permission-mode plan   # 以计划模式启动

# 工作目录
claude --add-dir ../other-repo  # 添加额外工作目录
claude -w feature-branch        # 在独立 git worktree 中启动
```

---

## 6. 常用工作流

### 快速提问不污染上下文
```
/btw 这个函数的时间复杂度是多少？
```

### 压缩上下文但保留重点
```
/compact 重点保留 API 接口设计和数据库 schema
```

### 在编辑器中精心编写长提示
按 `Ctrl + G` 打开编辑器，写完保存后自动填入输入框。

### 查看当前上下文使用情况
```
/context
```

### 回退到上一步
按 `Esc + Esc`，选择恢复代码还是仅回滚对话。

---

## 7. Skills（技能）

Skills 是可复用的自定义提示词，通过 `/skill-name` 调用，用于将常用操作封装成一键命令。

**内置 Skill 示例：**

```
/commit          # 自动生成规范的 git commit message 并提交
/review-pr 123   # 对 PR #123 做 code review
```

**自定义 Skill：**

在 `.claude/skills/` 目录下创建 Markdown 文件即可：

```markdown
# .claude/skills/deploy.md
将代码构建并部署到测试环境：先运行 npm run build，再 scp 到服务器 /var/www/。
```

之后直接输入 `/deploy` 触发。用 `/skills` 查看所有可用 Skill。

---

## 8. MCP（Model Context Protocol）

MCP 是连接外部工具和数据源的协议，让 Claude 能操作数据库、调用 API、读写第三方服务等。

**配置方式：** 在项目根目录创建 `.mcp.json`：

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "your_token" }
    }
  }
}
```

**常用命令：**

```
/mcp          # 查看已连接的 MCP 服务器状态
```

**典型用途：**
- 连接 GitHub：直接读写 Issues、PR
- 连接数据库：查询 PostgreSQL / SQLite
- 连接 Slack：发消息、读取频道

---

## 9. Rules（规则）

Rules 是放在 `.claude/rules/` 目录下的规则文件，按文件路径匹配自动加载，用于对特定目录或文件类型补充约束。

**示例：** 只对 `src/` 目录生效的规则

```markdown
# .claude/rules/frontend.md
- 使用 TypeScript，禁止 any 类型
- 组件用函数式写法，不用 class
- 样式只用 Tailwind，不写 CSS 文件
```

与根目录 `CLAUDE.md` 的区别：`CLAUDE.md` 全局生效，Rules 按路径精确匹配，适合 monorepo 或多模块项目。

---

## 10. Agent 与 Subagent

### Agent
Claude Code 本身就是一个 Agent —— 它能自主规划步骤、调用工具、读写文件、执行命令，完成多步骤任务，不需要你每步都确认。

**示例：**
```
帮我找出项目里所有未使用的 npm 依赖，并删除它们
```
Claude 会自动：读 package.json → 搜索代码引用 → 执行 npm uninstall → 验证结果。

### Subagent
执行复杂任务时，Claude 会自动派生 Subagent 并行处理独立子任务，提升效率。你也可以在自定义 Skill 中显式声明使用 Subagent。

**典型场景：**
```
同时对 src/api/ 和 src/ui/ 两个模块做 code review
```
Claude 会启动两个 Subagent 并行分析，最后汇总结果。

---

## 11. 远程连接（Remote Control）

通过 Remote Control，可以在 claude.ai 网页端控制本地终端中运行的 Claude Code 会话，适合在手机或其他设备上随时接入。

**开启远程控制：**

```bash
claude --remote-control   # 启动时开启
# 或会话中输入
/rc
```

执行后会显示一个连接链接，在 claude.ai 打开即可远程操控本地会话。

**反向：将本地会话移到云端**

```bash
claude --remote "我的开发会话"   # 在 claude.ai 创建云端会话
```

**将网页会话拉回本地终端：**

```bash
claude --teleport   # 把 claude.ai 上的会话同步到本地继续
```
