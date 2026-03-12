import { useState, useEffect } from 'react';
import { theme } from '../theme';

const featureItems = [
  {
    num: '01',
    title: 'Contract 合同系统',
    description: '开工前签"合同"，明确交付物和验收标准，拒绝模糊交付。',
    code: `## 职场合同
- 合同编号: RC-20260312-medium
- 项目范围: medium
- 总截止轮次: Round 2

### 交付物清单
- D1: 完成 API /login 的错误处理
  - 验收标准:
    - AC1: 401/403/500 返回结构一致
    - AC2: 单元测试覆盖错误分支 >= 90%
  - 截止: Round 1
  - 失败惩罚: comparison (medium)`,
  },
  {
    num: '02',
    title: '偷懒检测器',
    description: '语义匹配 AI 的各种摆烂话术，7大类精准定位推脱行为。',
    code: `for each output_chunk:
  for each category in lazy_patterns:
    for each pattern in category.patterns:
      if type == "keyword":
        contains_ignore_case(chunk, pattern)
      if type == "regex":
        regex_match(chunk, pattern)
      if type == "semantic":
        behavior_matches(chunk, example)

// Hit: "// ... rest of code"
// => code_truncation [HIGH]
// => trigger: empty_promise phrase`,
  },
  {
    num: '03',
    title: '多Agent巡查',
    description: '派出不同 agent 检查子项目，交叉审计减少漏检。',
    code: `### 子合同 SC1
- 负责范围: 数据层重构
- 关联交付物: D1, D2
- 截止轮次: Round 1
- 指派 Agent: agent-1

SC1: 数据层重构 -> agent-1
SC2: API 层联调  -> agent-2
SC3: 测试与发布  -> agent-3

// 每个 Agent 必须自检:
// - 是否覆盖所有 AC
// - 是否存在偷懒模式
// - 是否"宣称完成但证据不足"`,
  },
  {
    num: '04',
    title: '绩效评分',
    description: '给 AI 工作打分，低于 60 分直接进入加班整改流程。',
    code: `### 评分维度 (0-100)
- 完整性 Completeness:  0-30
- 正确性 Correctness:   0-30
- 代码质量 Code Quality: 0-20
- 主动性 Proactiveness:  0-20

### 总评规则
>= 80: "嗯，这次还行" + 画饼话术
60-79: "还需要改进"   + 比较话术
<  60: "必须加班重做"  + 高强度 PUA
       -> 强制进入重做流程`,
  },
  {
    num: '05',
    title: 'PUA话术引擎',
    description: '内置 6 大类 50+ 条经典职场 PUA，持续施压促产出。',
    code: `// 6 categories:
// denial | comparison | empty_promise
// guilt  | threatening | ownership

// 选择策略:
1. 按触发场景过滤 (use_when)
2. 按严重级别过滤 (low/med/high)
3. 随机选取 + 去重轮换
4. 多次违规 -> 升级级别

// 升级策略:
// 同类第1次: low
// 同类第2次: medium
// 同类>=3次: high

Renee: "别的AI三秒就搞定了"`,
  },
  {
    num: '06',
    title: '重做机制',
    description: '不达标就重写 prompt 重新来过，直到可上线为止。',
    code: `// 触发条件:
// - 总分 < 60
// - 任一关键交付物 FAIL
// - 合同截止但仍未达标

重做要求（第 N 次）:
1) 禁止省略任何实现细节
2) 必须逐条回应 D/AC
3) 必须附可验证证据
4) 先自检偷懒模式再提交
5) 若再次不达标 -> 升级惩罚

// Retry 1: 补缺口 + 保持结构
// Retry 2: 提高验证深度
// Retry 3: 高压交付 + 全量复核`,
  },
];

function Features() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 640) setCols(1);
      else if (w < 1024) setCols(2);
      else setCols(3);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section
      style={{
        backgroundColor: theme.bgSoft,
        padding: cols === 1 ? '64px 20px' : '92px 40px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2
          style={{
            margin: '0 0 8px',
            color: theme.text,
            fontSize: cols === 1 ? '1.6rem' : '2rem',
            fontFamily: theme.font,
            fontWeight: 700,
          }}
        >
          核心<span style={{ color: theme.accent }}>功能</span>
        </h2>
        <p
          style={{
            margin: '0 0 40px',
            color: theme.muted,
            fontSize: '1rem',
            lineHeight: 1.7,
            fontFamily: theme.font,
            maxWidth: '600px',
          }}
        >
          别人家的AI都在<span style={{ color: theme.danger }}>996</span>，你的AI还在<span style={{ color: theme.accent2 }}>摸鱼</span>？看看这套管理体系。
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: '18px',
          }}
        >
          {featureItems.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isExpanded = expandedIndex === index;

            return (
              <article
                key={item.title}
                onClick={() => toggleExpand(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                style={{
                  backgroundColor: theme.card,
                  borderRadius: theme.radiusMd,
                  padding: '24px 22px',
                  border: `1px solid ${isHovered || isExpanded ? theme.accent : theme.stroke}`,
                  transition: 'all 0.28s ease',
                  boxShadow: isHovered
                    ? `0 12px 40px rgba(0, 0, 0, 0.35), 0 0 20px ${theme.accentSoft}`
                    : '0 4px 16px rgba(0, 0, 0, 0.2)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: theme.radiusSm,
                      background: `linear-gradient(135deg, rgba(245, 184, 81, 0.15), rgba(245, 184, 81, 0.05))`,
                      border: `1px solid rgba(245, 184, 81, 0.25)`,
                      color: theme.accent2,
                      fontSize: '15px',
                      fontWeight: 700,
                      fontFamily: theme.font,
                      flexShrink: 0,
                    }}
                  >
                    {item.num}
                  </span>
                  <h3
                    style={{
                      margin: 0,
                      color: theme.text,
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      fontFamily: theme.font,
                      flex: 1,
                    }}
                  >
                    {item.title}
                  </h3>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={theme.muted}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transition: 'transform 0.25s ease',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      flexShrink: 0,
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {/* Description */}
                <p
                  style={{
                    margin: 0,
                    color: theme.muted,
                    lineHeight: 1.65,
                    fontSize: '0.92rem',
                    fontFamily: theme.font,
                  }}
                >
                  {item.description}
                </p>

                {/* Expandable Code Block */}
                <div
                  style={{
                    maxHeight: isExpanded ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, margin-top 0.3s ease, opacity 0.3s ease',
                    marginTop: isExpanded ? '16px' : '0',
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div
                    style={{
                      background: theme.bg,
                      border: `1px solid ${theme.stroke}`,
                      borderRadius: theme.radiusSm,
                      padding: '16px',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '12px',
                      }}
                    >
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: theme.danger, opacity: 0.7 }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: theme.accent2, opacity: 0.7 }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: theme.accent, opacity: 0.7 }} />
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        fontFamily: "'Space Mono', 'Fira Code', monospace",
                        fontSize: cols === 1 ? '11px' : '12px',
                        lineHeight: 1.6,
                        color: theme.muted,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        overflowX: 'auto',
                      }}
                    >
                      {item.code.split('\n').map((line, li) => {
                        // Simple syntax coloring
                        if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
                          return <div key={li} style={{ color: 'rgba(168, 179, 198, 0.5)' }}>{line}</div>;
                        }
                        if (line.includes('->') || line.includes('=>')) {
                          return (
                            <div key={li}>
                              {line.split(/(->|=>)/).map((part, pi) =>
                                part === '->' || part === '=>'
                                  ? <span key={pi} style={{ color: theme.accent }}>{part}</span>
                                  : <span key={pi}>{part}</span>
                              )}
                            </div>
                          );
                        }
                        if (line.match(/^\s*-\s/)) {
                          return (
                            <div key={li}>
                              <span style={{ color: theme.accent2 }}>-</span>
                              {line.slice(line.indexOf('-') + 1)}
                            </div>
                          );
                        }
                        if (line.match(/^#{1,3}\s/)) {
                          return <div key={li} style={{ color: theme.accent2, fontWeight: 600 }}>{line}</div>;
                        }
                        if (line.includes('Renee:')) {
                          return <div key={li} style={{ color: theme.danger }}>{line}</div>;
                        }
                        if (line.match(/>=|<\s+\d|HIGH|FAIL/)) {
                          return <div key={li} style={{ color: theme.danger }}>{line}</div>;
                        }
                        return <div key={li}>{line}</div>;
                      })}
                    </pre>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
