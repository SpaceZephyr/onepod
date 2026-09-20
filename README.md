<h1 align="center">Onepod</h1>

<p align="center"><code>onepod</code></p>

<p align="center"><em>「每天把海外科技播客，变成更快读完的中文判断」</em></p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black" />
  <img alt="Cloudflare Workers" src="https://img.shields.io/badge/Cloudflare-Workers-f38020" />
  <img alt="Feishu" src="https://img.shields.io/badge/Feishu-Wiki-3370ff" />
</p>

<p align="center">
  Private project · Node.js 20+ · onepod.site
</p>

Onepod 是一个面向中文读者的海外科技播客阅读站。它从飞书知识库读取已经整理好的播客文章，把 YouTube 封面、频道、嘉宾、时间、核心观点和原文内容渲染成一个适合浏览和分享的网站。

它不是再做一个播客播放器。它更像一份持续更新的“播客速读库”：先看非共识判断、金句和核心观点，再决定要不要进入详情页深读，或跳回 YouTube 看原视频。

后台同步由 Cloudflare Worker 定时读取飞书 Wiki 子文档，并写入 KV；前端优先读取 KV，保留本地 JSON 作为构建和开发兜底。站点同时提供播客首页与「OnePod 日报」：日报从飞书多维表格同步到同一 KV 命名空间的独立 key。

## Quick Start

```bash
npm install
npm run dev -- --port 3001
```

打开 [http://localhost:3001](http://localhost:3001) 查看播客首页，[http://localhost:3001/news/](http://localhost:3001/news/) 查看 OnePod 日报。

## Sync Content

本地刷新飞书播客数据：

```bash
npm run sync:feishu
```

需要在 `.env.local` 提供：

```bash
FEISHU_APP_ID=...
FEISHU_APP_SECRET=...
```

线上播客与日报都由 Worker `onepod-feishu-sync` 写入 KV `ONEPOD_CACHE`：

| Key | 内容 |
| --- | --- |
| `podcasts` | Wiki 播客列表 |
| `podcasts:meta` | 播客同步元信息 |
| `news` | 日报条目数组 |
| `news:meta` | 日报同步元信息 |

Cron 仍为每 5 分钟一次：先同步播客，再同步日报。日报失败不会阻断播客写入。也可单独 `POST /sync/news`（同样需要 `SYNC_TOKEN`）。

### 日报（Feishu Bitable）

公开地址：[https://onepod.site/news/](https://onepod.site/news/)（`/daily/` 会跳转到这里）。

Worker 使用已有的 `FEISHU_APP_ID` / `FEISHU_APP_SECRET` 换取 tenant token，再读取多维表格记录：

- Base token 默认 `JcmvbVeYNas2d9sIqfmctq3Gnyw`（可用 `NEWS_BASE_TOKEN` 覆盖）
- Table id 默认 `tbllPX4DJwPsW1L9`（可用 `NEWS_TABLE_ID` 覆盖）
- KV key 默认 `news`（可用 `NEWS_CACHE_KEY` 覆盖）

字段映射：`item_id` → id，`标题`，`来源`（并尽量推导 author），`原文链接`，`原文时间`，`分类`，`翻译全文` → body，`日报日期`，`备注`。条目按 `time` 倒序写入。

**飞书开放平台需要额外开通 Base / 多维表格权限**，仅有 Wiki 权限不够：

1. 打开飞书开放平台里的应用，在权限管理中开通 **base / bitable** 只读范围（例如 `base:record:read`、`bitable:app:readonly`，或「查看、评论和编辑多维表格」）。仅有 Wiki 权限时记录接口会 403。
2. 把「OnePod 日报」Base 分享给该应用的机器人（添加为协作者）。
3. 在 Cloudflare Worker `onepod-feishu-sync` 上确认 secrets / vars：

```bash
# secrets（已有，不要提交到仓库）
npx wrangler secret put FEISHU_APP_ID --config wrangler.sync.jsonc
npx wrangler secret put FEISHU_APP_SECRET --config wrangler.sync.jsonc
npx wrangler secret put SYNC_TOKEN --config wrangler.sync.jsonc

# vars 已写在 wrangler.sync.jsonc，部署时生效：
# NEWS_BASE_TOKEN=JcmvbVeYNas2d9sIqfmctq3Gnyw
# NEWS_TABLE_ID=tbllPX4DJwPsW1L9
# NEWS_CACHE_KEY=news
```

主站 Worker 读取同一 KV 的 `news` key；KV 为空时回退到仓库里的 `src/news.json` 种子数据。

## Deploy

部署主站：

```bash
npm run cf:deploy
```

部署飞书同步 Worker（播客 Wiki + 日报 Bitable）：

```bash
npm run cf:sync:deploy
```

Cloudflare 配置文件：

- `wrangler.deploy.jsonc`：Onepod 主站 Worker
- `wrangler.sync.jsonc`：飞书定时同步 Worker

日报上线后请确认：主站 `NEWS_CACHE_KEY=news`，同步 Worker 已开通 bitable 权限并把 Base 分享给应用机器人，然后 `cf:sync:deploy`。无需改动播客首页 `/`、`/p/*`、`/sources`。

## Capabilities

- 首页瀑布流展示播客卡片，支持 YouTube 封面、频道、创建时间和 100-200 字摘要。
- 详情页展示左侧目录、中间正文、播客元信息和飞书原文链接。
- 支持普通长图分享和小红书 3:4 切图分享。
- 播客列表页列出当前追踪的频道，支持查看每个频道已采集的文章，并提供提交信源和用户群入口。
- `/news/` 杂志式日报卡片（无封面）：标题、来源、日期与正文预览；点击打开中文 Markdown 详情。
- Cloudflare KV 缓存飞书同步结果，减少线上实时请求飞书。

## Boundaries

- 飞书是内容源，网站只负责展示和分发；如果飞书应用没有某个文档或表格权限，前端不会凭空读到它。
- YouTube 元信息是增强信息，获取失败时会回退到飞书文档里的正文和标题。
- `.env.local`、Cloudflare token、飞书 secret 都不要提交到仓库。
