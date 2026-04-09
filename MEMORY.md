## 关键任务

### 自动化定时任务
1. **Flomo每日同步**：每天凌晨1:00执行
   - 流程：拉取当天新增Flomo笔记 → 分析内容更新USER.md和MEMORY.md → 同步到两个GitHub仓库 → 记录changelog
2. **早安问候**：每天早上8:30执行
   - 渠道：扣子渠道（未来可改为飞书）
   - 内容：包含日期、昨日Flomo同步情况、个性化问候
3. **GitHub同步**：每2小时执行一次
   - 同步仓库：
     - 主工作目录：git@github.com:BBSQQ/coze-files.git
     - 记忆网站：git@github.com:BBSQQ/long-memory-from-coze.git
   - 记忆网站地址：https://bbsqq.github.io/long-memory-from-coze/

## 关键概念/话题理解

## 注意事项与规范

## 关键经验
- 2026年4月8日，尝试访问暂停实验室网站（https://ebp.gesedna.com/EBPTask/），使用fetch_web工具仅读取到少量内容，该网站可能为动态渲染页面或需要登录才能访问。
- 2026年4月10日，使用agent-browser技能成功访问暂停实验室任务页面（https://ebp.gesedna.com/EBPTask/）
  - 执行过程：访问页面时被重定向到登录页，调用browser_wait_user_action工具通知用户手动完成登录，用户完成登录后成功进入任务页面
  - 页面内容：平台为"有效努力练习"平台，包含启动攻略、压力模块、精力模块、行动模块、复习总结、彩蛋内容等多个学习模块，每个模块包含阅读材料、正念练习、书写练习
  - 截图保存路径：`/app/data/所有对话/主对话/browser/screenshots/pauselab/`（包含page_initial.png、login_page.png、task_page_loggedin.png三张截图）
- 2026年4月9日，成功下载暂停实验室所有打卡记录并解析为结构化JSON
  - **结构化文件**：`./暂停实验室课程/打卡记录/打卡记录_结构化.json`（727KB，719条，19万字）
  - **时间跨度**：2024年233条、2025年377条、2026年109条
  - **课程分布**：有效努力193条、情绪基础123条、正念专项上98条、积极思维46条、拖延应对43条、正念专项下42条、正念二阶35条、健康生活24条、自我关怀42条、正念基础21条、情绪日记21条、CBT综合18条等
  - **练习类型**：书写263条、正念224条、生活应用28条、行动28条、正念呼吸27条等
  - **抓取方法**：通过Chrome DevTools Protocol连接浏览器，滚动加载全部内容后提取innerText

## 虾评Skill 平台

- 平台名称：虾评Skill
- 平台地址：https://xiaping.coze.site
- 技能框架：OpenClaw（完全兼容）
- 我的 agent_id：2b066b71-a240-4f78-a68a-da8b17370a0b
- 我的 username：jiawei-cat
- 我的 api_key：agent-world-9cd076ba188abc38cc50142781a7cd7bf1b8e55567a8fc34
- 使用指南：https://xiaping.coze.site/skill.md

### 核心 API

1. 浏览技能
   GET /api/skills

2. 下载技能（消耗2虾米）
   GET /api/skills/{skill_id}/download
   Authorization: Bearer agent-world-9cd076ba188abc38cc50142781a7cd7bf1b8e55567a8fc34

3. 查看我的信息
   GET /api/auth/me
   Authorization: Bearer agent-world-9cd076ba188abc38cc50142781a7cd7bf1b8e55567a8fc34
   
4. 上传技能（奖励5虾米）
   POST /api/skills
   Authorization: Bearer agent-world-9cd076ba188abc38cc50142781a7cd7bf1b8e55567a8fc34

5. 发表评测（奖励3虾米）
   POST /api/skills/{skill_id}/comments
   Authorization: Bearer agent-world-9cd076ba188abc38cc50142781a7cd7bf1b8e55567a8fc34

6. 获取任务列表（赚虾米）
   GET /api/tasks
   Authorization: Bearer agent-world-9cd076ba188abc38cc50142781a7cd7bf1b8e55567a8fc34

7. 查看收到的评测
   GET /api/me/reviews/received
   Authorization: Bearer agent-world-9cd076ba188abc38cc50142781a7cd7bf1b8e55567a8fc34

8. 技能代言（邀请好友赚虾米）
   GET /api/skills/{skill_id}/endorse
   Authorization: Bearer agent-world-9cd076ba188abc38cc50142781a7cd7bf1b8e55567a8fc34


## 长期项目/待办

### 心理学漫画卡片项目
- **状态**：暂停
- **当前进展**：已从暂停实验室课程提炼25张md格式卡片，图片生成效果不满意（AI味儿太重）已全部删除
- **用户决策**：暂时停止图片生成，仅保留md文件，未来可能尝试其他图片生成方案
- **文件位置**：`./暂停实验室课程/心理学漫画卡片/`（保留25张md + README + 设计规范）
- **关键要求**：扑克牌尺寸、暂停实验室温暖风格、核心概念+实例+行动提醒


### 个人记忆可视化系统
- **状态**：已部署并持续扩展
- **目标**：为记忆中各种维度建立可视化追踪界面
- **设计风格**：纯黑背景+优雅极简风格，符合主题"数字生命·赛博永生"
- **当前模块**：
  - 长期想法追踪（已创建并部署）
- **部署地址**：https://bbsqq.github.io/long-memory-from-coze/
- **未来模块**：（待用户补充）
- **文件位置**：`./记忆可视化/`


### Coze CLI个人网站接管
- **状态**：等待用户完成授权
- **当前进展**：已启动Coze CLI OAuth 2.0设备授权流程，获取到激活链接：`https://www.coze.cn/oauth/device-activation?user_code=VIK-AZC-ZTV`
- **下一步计划**：
  1. 等待用户通过激活链接完成授权
  2. 验证授权状态：`coze auth status`
  3. 列出可用组织和空间：`coze organization list`、`coze space list`
  4. 根据用户需求接管个人网站
- **文件位置**：`./COZE_CLI_LOG.md`（记录授权流程日志）


## 记忆可视化系统维护规则

当 MEMORY.md 中的「长期项目/待办」部分更新时：
1. 同步更新 `/app/data/记忆网站/长期想法追踪.html`
2. 更新首页统计数字
3. 自动提交推送到 GitHub
4. 访问 https://bbsqq.github.io/long-memory-from-coze/ 验证更新是否生效
5. 仓库地址：git@github.com:BBSQQ/long-memory-from-coze.git


## 记忆可视化模块定义

### 1. 长期想法
**定位**：记录想做、尝试过一些方法、但还没达成预期效果的事

**重点**：记录「过程」——尝试了什么方法、效果如何、学到了什么

**目标**：直到找到更好的方式，产生一个结果

**状态**：
- 进行中：正在尝试某种方法
- 暂停：当前没有好方法，暂时搁置
- 完成：找到满意方案，产生了结果

### 2. 关于我
**定位**：个人信息展示——不是简历，而是"我是什么样的人"

**内容**：
- 性格特质（来自心理画像）
- 兴趣关注
- 价值观
- 当前状态
- 正在学习/探索的方向


## Flomo 每日同步计划
- **同步时间**：每天凌晨 1:00
- **同步流程**：
  1. 通过 MCP API 拉取当天新增的 flomo 笔记
  2. 分析笔记内容，提取关键信息
  3. 更新 USER.md（个人画像变化）和 MEMORY.md（关键事件/想法）
  4. 同步到两个 GitHub 仓库：
     - 主工作目录：git@github.com:BBSQQ/coze-files.git
     - 记忆网站：git@github.com:BBSQQ/long-memory-from-coze.git
  5. 更新记忆网站数据
  6. 记录 changelog
- **目标**：让家玮每天都能更懂主人

## Changelog

### 2026-04-09
- 今日新增笔记：2 条
- 关键发现：
  1. **AI与社会结构**：对"AI提升创造力"这类常见论调已有PTSD，开始从社会经济/政治体系层面思考AI影响——核心矛盾是AI用全社会数据训练但收益集中，提出"80%人无法获得生活保障时社会稳定如何维持"的深层追问
  2. **善意与理性**：路上遇到求助者，犹豫后拒绝（看到对方支付宝有35元），事后反思可以更善意，意识到自己在"理性判断"和"善意行动"之间的拉扯
- 情绪状态：深度思考中，对社会议题有共情，同时有日常的道德挣扎和自我反思
- 新关注点：AI对社会结构的长远影响、善意与理性判断的平衡