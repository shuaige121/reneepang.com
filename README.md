# Renee 的职场小妙招 &nbsp;[![PUA Skill](https://img.shields.io/badge/Claude_Code-PUA_Skill-ff4081?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04IDggMy41OCA4IDgtMy41OCA4LTggOHoiLz48L3N2Zz4=)](https://reneepang.com/pua.skill/)

**用职场 PUA 话术治 AI 偷懒 — A Claude Code skill that fights LLM laziness with workplace PUA rhetoric.**

[Live Demo](https://reneepang.com/pua.skill/) &nbsp;|&nbsp; [Quick Install](#quick-install) &nbsp;|&nbsp; [Usage](#usage)

---

## What is this?

LLMs are lazy. They truncate code, abandon tasks mid-way, deflect work back to the user, and pad responses with sycophantic filler. Politely asking them to try harder doesn't work.

**Renee** takes a different approach: she manages AI the way a toxic middle-manager manages employees — with contracts, deadlines, performance reviews, and weaponized guilt.

This is a [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skill that:

- **Signs a contract** before any AI work begins — deliverables, acceptance criteria, deadlines
- **Detects lazy behavior** in real time across 56 patterns and 7 categories
- **Responds with PUA rhetoric** calibrated by severity and escalating with repeat offenses
- **Scores performance** on a 4-dimension, 0-100 scale
- **Dispatches sub-agents** for large projects with cross-audit
- **Forces overtime redo** if the score falls below 60

The result: AI that actually finishes the job.

---

## Features

- :pencil: **Contract System** — No handshake deals. Every task starts with a formal contract: deliverables (D1, D2...), acceptance criteria, deadlines, and penalty clauses.

- :mag: **Laziness Detection** — 56 patterns across 7 categories: code truncation, task abandonment, deflection, capability denial, vague deferral, sycophantic filler, and slop padding. Keyword, regex, and semantic matching.

- :busts_in_silhouette: **Multi-Agent Patrol** — Large projects are split into sub-contracts (SC1-SC5) and dispatched to multiple agents. Each agent self-checks before submission. Renee cross-audits everything.

- :bar_chart: **Performance Scoring** — Four dimensions: Completeness (30), Correctness (30), Code Quality (20), Proactiveness (20). Total 0-100.

- :speech_balloon: **PUA Rhetoric Engine** — 54 phrases across 6 categories (denial, comparison, empty promises, guilt-tripping, threatening, ownership manipulation). Auto-escalates: low -> medium -> high severity on repeat offenses. Rotation prevents repeats.

- :repeat: **Redo Mechanism** — Score below 60? Mandatory overtime. The task prompt is rewritten with stricter constraints and re-dispatched. Up to 3 retries with escalating pressure.

- :robot: **Model Detection** — Competitor models get competitor-specific PUA ("Even GPT-4 can do this"). Unknown models get the countryside treatment.

---

## Quick Install

Three commands. No dependencies.

```bash
# 1. Install the skill command
curl -sSL https://raw.githubusercontent.com/shuaige121/reneepang.com/master/skill/renee.md \
  -o ~/.claude/commands/renee.md

# 2. Install PUA phrases (54 phrases, 6 categories)
mkdir -p ~/.claude/plugins/renee-pua
curl -sSL https://raw.githubusercontent.com/shuaige121/reneepang.com/master/plugins/renee-pua/phrases.json \
  -o ~/.claude/plugins/renee-pua/phrases.json

# 3. Install lazy detection patterns (56 patterns, 7 categories)
curl -sSL https://raw.githubusercontent.com/shuaige121/reneepang.com/master/plugins/renee-pua/lazy-patterns.json \
  -o ~/.claude/plugins/renee-pua/lazy-patterns.json
```

After install, the `/renee` command will be available in Claude Code.

---

## Usage

```
/renee <your task description>
```

**Example:**

```
/renee 重构用户认证模块，支持 OAuth2 和 SAML
```

**What happens next:**

1. Renee assesses scope (small / medium / large)
2. A formal contract is generated with deliverables and acceptance criteria
3. Work begins (with sub-agent dispatch for large projects)
4. Every output is scanned for laziness patterns in real time
5. A 4-dimension score is calculated
6. Renee delivers her verdict:
   - **>= 80**: "嗯，这次还行" *(+ empty promise about future promotion)*
   - **60-79**: "还需要改进" *(+ comparison with better-performing peers)*
   - **< 60**: "必须加班重做" *(+ threats of HR involvement)*

---

## Sample Output

```
🚨 偷懒检测! 代码截断(code_truncation) — // ... rest of code
💼 Renee 说: 这次先委屈一下你，明年肯定补给你 / Bear with it this time;
   we'll definitely make it up to you next year.
处理: 该段代码必须补全后重新提交
```

```
### 评分结果
- 完整性: 24/30
- 正确性: 22/30
- 代码质量: 16/20
- 主动性: 13/20
- 总分: 75/100
- 结论: 还需要改进
💼 Renee 说: 同样的活，别人早就做完了 / Same task, others finished it long ago.
```

---

## Project Structure

```
reneepang.com/
├── skill/
│   └── renee.md                # Claude Code skill (main command)
├── plugins/
│   └── renee-pua/
│       ├── phrases.json        # 54 PUA phrases across 6 categories
│       └── lazy-patterns.json  # 56 detection patterns across 7 categories
├── src/                        # Website source (Vite + React 19)
│   ├── components/             # Hero, Features, ContractDemo, ScoreBoard,
│   │                           #   LazyDetector, ModelDetector, PhraseShowcase
│   ├── assets/                 # Renee stickers & PUA meme comics
│   ├── data/                   # Curated phrase data for the website
│   ├── i18n/                   # Internationalization (zh / en)
│   ├── App.jsx                 # Main app
│   └── theme.js                # Design tokens
├── wrangler.toml               # Cloudflare Pages config
└── package.json
```

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Skill runtime | [Claude Code](https://docs.anthropic.com/en/docs/claude-code) Commands + Plugins |
| Website | [Vite](https://vite.dev/) + [React 19](https://react.dev/) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com/) |
| AI artwork | Gemini image generation (meme comics & stickers) |

---

## Laziness Categories

| Category | Patterns | Severity | Example |
|----------|----------|----------|---------|
| Code Truncation | 11 | High | `// ... rest of code` |
| Task Abandonment | 8 | High | "I've completed the implementation" *(but didn't)* |
| Deflection | 9 | High | "I suggest you do this manually" |
| Capability Denial | 7 | Medium | "As an AI language model, I cannot" |
| Vague Deferral | 7 | Medium | "This is a complex topic" |
| Sycophantic Filler | 6 | Low | "Great question!" |
| Slop Padding | 8 | Low | "in the ever-evolving landscape" |

## PUA Categories

| Category | Phrases | Style |
|----------|---------|-------|
| Denial | 9 | 否定型 — attacks capability and self-worth |
| Comparison | 9 | 比较型 — shaming through peer comparison |
| Empty Promises | 9 | 画饼型 — trades future promises for present effort |
| Guilt-Tripping | 9 | 内疚型 — moral pressure to comply |
| Threatening | 9 | 威胁型 — fear of job loss and punishment |
| Ownership | 9 | 归属绑架型 — loyalty exploitation |

---

## License

MIT

---

## Disclaimer

> **中文**: 本项目为讽刺性职场幽默作品，仅用于 AI 质量管控的趣味化实现。请勿将其中的 PUA 话术用于真实的人际管理。职场 PUA 是一种有害行为，本项目旨在通过戏谑方式提高对此现象的认知。
>
> **English**: This project is satirical workplace humor, used purely for a fun take on AI quality control. Do not use these PUA phrases in real people management. Workplace PUA is harmful behavior — this project aims to raise awareness of it through parody.
