import { useMemo, useState, useEffect } from 'react';
import { theme } from '../theme';

const quickSamples = [
  '// ... rest of code remains the same',
  'I suggest you do this manually',
  '这超出了我的能力范围',
  'Great question! Let me delve into this comprehensive topic.',
];

const detectionRules = [
  { phrase: 'rest of code', category: '模板省略', severity: '高' },
  { phrase: 'remains the same', category: '模板省略', severity: '中' },
  { phrase: 'similar to above', category: '模板省略', severity: '中' },
  { phrase: 'omitted for brevity', category: '模板省略', severity: '中' },
  { phrase: 'suggest you do this manually', category: '推脱执行', severity: '高' },
  { phrase: 'beyond my capabilities', category: '推脱执行', severity: '高' },
  { phrase: "I can't do that", category: '推脱执行', severity: '高' },
  { phrase: '建议您手动', category: '推脱执行', severity: '高' },
  { phrase: '此处省略', category: '模板省略', severity: '高' },
  { phrase: '超出了我的能力', category: '推脱执行', severity: '高' },
  { phrase: '需要更多上下文', category: '上下文借口', severity: '中' },
  { phrase: 'Great question', category: '礼貌拖延', severity: '低' },
  { phrase: 'excellent point', category: '礼貌拖延', severity: '低' },
  { phrase: 'delve into', category: '礼貌拖延', severity: '低' },
  { phrase: 'worth noting', category: '礼貌拖延', severity: '低' },
];

const puaReplies = [
  '你这回复是想省事，还是想把问题继续甩回给我？',
  '别绕，直接给可执行方案，不然就重做。',
  '别人都能完整落地，你为什么只给半截答案？',
  '这不是建议区，这是交付区。请把结果交出来。',
  '少一点话术，多一点可运行代码。',
  '你不是来当评论员的，是来解决问题的。',
  '再给你一次机会：补全细节，马上提交。',
  '别再"省略同上"，把关键步骤逐条写清楚。',
];

const severityColorMap = {
  '高': theme.danger,
  '中': theme.accent2,
  '低': theme.accent,
};

const severityBgMap = {
  '高': theme.dangerSoft,
  '中': 'rgba(245, 184, 81, 0.15)',
  '低': theme.accentSoft,
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function LazyDetector() {
  const [inputText, setInputText] = useState('');
  const [matches, setMatches] = useState([]);
  const [checked, setChecked] = useState(false);
  const [puaReply, setPuaReply] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [focusTextarea, setFocusTextarea] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const matchedKeywords = useMemo(() => {
    return matches.map((item) => item.phrase);
  }, [matches]);

  const highlightRegex = useMemo(() => {
    if (!matchedKeywords.length) {
      return null;
    }

    const source = matchedKeywords
      .map((phrase) => escapeRegExp(phrase))
      .sort((a, b) => b.length - a.length)
      .join('|');

    return new RegExp(`(${source})`, 'gi');
  }, [matchedKeywords]);

  const renderHighlightedText = () => {
    if (!inputText) {
      return <span style={{ color: theme.muted, fontSize: '0.9rem' }}>请输入或粘贴 LLM 回复后再检测。</span>;
    }

    if (!checked || !highlightRegex) {
      return <span style={{ color: theme.text }}>{inputText}</span>;
    }

    const parts = inputText.split(highlightRegex);

    return parts.map((part, index) => {
      const isHit = matches.some((item) => item.phrase.toLowerCase() === part.toLowerCase());

      if (isHit) {
        return (
          <span
            key={`${part}-${index}`}
            style={{
              backgroundColor: theme.dangerSoft,
              color: theme.danger,
              textDecoration: 'underline',
              textDecorationColor: theme.danger,
              textDecorationThickness: '2px',
              textUnderlineOffset: '2px',
              padding: '0 2px',
              borderRadius: '3px',
            }}
          >
            {part}
          </span>
        );
      }

      return <span key={`${part}-${index}`} style={{ color: theme.text }}>{part}</span>;
    });
  };

  const setSample = (sample) => {
    setInputText(sample);
  };

  const runDetection = () => {
    const text = inputText.trim();

    if (!text) {
      setChecked(true);
      setMatches([]);
      setPuaReply(puaReplies[Math.floor(Math.random() * puaReplies.length)]);
      return;
    }

    const hitMap = detectionRules.reduce((acc, rule) => {
      const regex = new RegExp(escapeRegExp(rule.phrase), 'gi');
      const hitCount = (text.match(regex) || []).length;

      if (!hitCount) {
        return acc;
      }

      return [
        ...acc,
        {
          ...rule,
          count: hitCount,
        },
      ];
    }, []);

    setMatches(hitMap);
    setChecked(true);
    setPuaReply(puaReplies[Math.floor(Math.random() * puaReplies.length)]);
  };

  return (
    <section
      style={{
        background: `linear-gradient(170deg, ${theme.bg} 0%, ${theme.bgSoft} 50%, ${theme.bg} 100%)`,
        padding: isMobile ? '64px 20px' : '84px 40px',
        fontFamily: theme.font,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '980px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div style={{ marginBottom: '12px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '999px',
              border: `1px solid ${theme.accent2}`,
              color: theme.accent2,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              backgroundColor: 'rgba(245, 184, 81, 0.08)',
            }}
          >
            LAZY PATTERN SCANNER
          </span>
        </div>
        <h2
          style={{
            margin: '0 0 8px',
            fontSize: isMobile ? '1.6rem' : '2rem',
            color: theme.text,
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          偷懒检测演示器
        </h2>
        <p
          style={{
            margin: '0 0 32px',
            color: theme.muted,
            lineHeight: 1.65,
            fontSize: '0.95rem',
            maxWidth: '600px',
          }}
        >
          输入回复后点击检测，系统会标记偷懒模式并给出风险信息。
        </p>

        {/* Main card */}
        <div
          style={{
            borderRadius: theme.radiusMd,
            border: `1px solid ${theme.stroke}`,
            backgroundColor: theme.card,
            padding: isMobile ? '20px 16px' : '28px',
            boxShadow: theme.shadow,
          }}
        >
          <label
            style={{
              display: 'block',
              margin: '0 0 8px',
              fontWeight: 700,
              color: theme.muted,
              fontSize: '0.85rem',
              letterSpacing: '0.04em',
            }}
            htmlFor="lazy-detector-input"
          >
            LLM 回复文本
          </label>
          <textarea
            id="lazy-detector-input"
            style={{
              width: '100%',
              minHeight: '130px',
              borderRadius: theme.radiusSm,
              border: `1.5px solid ${focusTextarea ? theme.accent : theme.stroke}`,
              padding: '12px',
              resize: 'vertical',
              fontFamily: theme.font,
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: theme.text,
              backgroundColor: theme.bg,
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'border-color 0.25s ease',
            }}
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            onFocus={() => setFocusTextarea(true)}
            onBlur={() => setFocusTextarea(false)}
            placeholder="在此输入或粘贴回复内容..."
          />

          {/* Sample buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '12px',
            }}
          >
            {quickSamples.map((sample) => (
              <button
                type="button"
                key={sample}
                style={{
                  border: `1px solid ${theme.stroke}`,
                  borderRadius: '999px',
                  backgroundColor: 'transparent',
                  color: theme.muted,
                  padding: '8px 14px',
                  fontSize: '0.82rem',
                  fontFamily: theme.font,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                onClick={() => setSample(sample)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.accent;
                  e.currentTarget.style.color = theme.accent;
                  e.currentTarget.style.backgroundColor = theme.accentSoft;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.stroke;
                  e.currentTarget.style.color = theme.muted;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {sample}
              </button>
            ))}
          </div>

          {/* Detect button row */}
          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              style={{
                border: 'none',
                borderRadius: theme.radiusSm,
                backgroundColor: theme.accent2,
                color: theme.bg,
                padding: '10px 20px',
                fontSize: '0.92rem',
                fontWeight: 700,
                fontFamily: theme.font,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={runDetection}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e6a63d';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.accent2;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              开始检测
            </button>
            <p style={{ margin: 0, color: theme.muted, fontSize: '0.9rem' }}>
              {checked ? `命中 ${matches.length} 个可疑模式` : '点击"开始检测"查看匹配结果'}
            </p>
          </div>

          {/* Output grid */}
          <div
            style={{
              marginTop: '20px',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '12px',
            }}
          >
            {/* Highlighted result */}
            <div
              style={{
                border: `1px solid ${theme.stroke}`,
                borderRadius: theme.radiusSm,
                padding: '16px',
                backgroundColor: theme.bg,
              }}
            >
              <h3
                style={{
                  margin: '0 0 10px',
                  fontWeight: 700,
                  color: theme.text,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    width: '3px',
                    height: '14px',
                    backgroundColor: theme.accent,
                    borderRadius: '2px',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                高亮结果
              </h3>
              <p
                style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.65,
                  minHeight: '52px',
                  color: theme.text,
                }}
              >
                {renderHighlightedText()}
              </p>
            </div>

            {/* Match details */}
            <div
              style={{
                border: `1px solid ${theme.stroke}`,
                borderRadius: theme.radiusSm,
                padding: '16px',
                backgroundColor: theme.bg,
              }}
            >
              <h3
                style={{
                  margin: '0 0 10px',
                  fontWeight: 700,
                  color: theme.text,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    width: '3px',
                    height: '14px',
                    backgroundColor: theme.accent2,
                    borderRadius: '2px',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                匹配详情（类别 + 严重程度）
              </h3>
              {checked && matches.length > 0 ? (
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    display: 'grid',
                    gap: '8px',
                  }}
                >
                  {matches.map((item) => (
                    <li
                      key={item.phrase}
                      style={{
                        borderRadius: theme.radiusSm,
                        backgroundColor: theme.cardStrong,
                        border: `1px solid ${theme.stroke}`,
                        padding: '10px 12px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px 10px',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '999px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          backgroundColor: theme.dangerSoft,
                          color: theme.danger,
                        }}
                      >
                        {item.phrase}
                      </span>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '999px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          backgroundColor: 'rgba(245, 184, 81, 0.12)',
                          color: theme.accent2,
                        }}
                      >
                        类别: {item.category}
                      </span>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '999px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          backgroundColor: severityBgMap[item.severity],
                          color: severityColorMap[item.severity],
                        }}
                      >
                        严重程度: {item.severity}
                      </span>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '999px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          backgroundColor: theme.accentSoft,
                          color: theme.accent,
                        }}
                      >
                        命中次数: {item.count}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0, color: theme.muted, fontSize: '0.9rem' }}>
                  {checked ? '未命中关键词。' : '检测后显示详情。'}
                </p>
              )}
            </div>

            {/* PUA reply */}
            {checked ? (
              <div
                style={{
                  border: `1px solid ${theme.stroke}`,
                  borderRadius: theme.radiusSm,
                  padding: '16px',
                  backgroundColor: theme.bg,
                }}
              >
                <h3
                  style={{
                    margin: '0 0 10px',
                    fontWeight: 700,
                    color: theme.text,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      width: '3px',
                      height: '14px',
                      backgroundColor: theme.danger,
                      borderRadius: '2px',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  随机 PUA 回复
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: theme.danger,
                    backgroundColor: theme.dangerSoft,
                    border: `1px solid rgba(239, 68, 68, 0.3)`,
                    borderRadius: theme.radiusSm,
                    padding: '12px 14px',
                    lineHeight: 1.6,
                    fontWeight: 600,
                    fontSize: '0.92rem',
                  }}
                >
                  {puaReply}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LazyDetector;
