import { useMemo, useState } from 'react';

const colors = {
  primary: '#DC2626',
  secondary: '#F59E0B',
  dark: '#1F2937',
  light: '#F9FAFB',
  detectorBg: '#F3F4F6',
};

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
  '别再“省略同上”，把关键步骤逐条写清楚。',
];

const severityColorMap = {
  高: '#DC2626',
  中: '#F59E0B',
  低: '#1F2937',
};

const styles = {
  section: {
    backgroundColor: colors.detectorBg,
    padding: '84px 24px',
  },
  container: {
    maxWidth: '980px',
    margin: '0 auto',
  },
  heading: {
    margin: '0 0 12px',
    fontSize: '2rem',
    color: colors.dark,
  },
  subheading: {
    margin: '0 0 24px',
    color: '#4B5563',
    lineHeight: 1.65,
  },
  card: {
    borderRadius: '16px',
    border: '1px solid #E5E7EB',
    backgroundColor: '#FFFFFF',
    padding: '20px',
    boxShadow: '0 8px 24px rgba(31, 41, 55, 0.08)',
  },
  label: {
    display: 'block',
    margin: '0 0 8px',
    fontWeight: 700,
    color: '#374151',
  },
  textarea: {
    width: '100%',
    minHeight: '130px',
    borderRadius: '12px',
    border: '1px solid #D1D5DB',
    padding: '12px',
    resize: 'vertical',
    fontFamily: 'inherit',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: '#111827',
    backgroundColor: '#FFFFFF',
    boxSizing: 'border-box',
  },
  sampleRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '12px',
  },
  sampleBtn: {
    border: '1px solid #D1D5DB',
    borderRadius: '999px',
    backgroundColor: '#FFFFFF',
    color: '#374151',
    padding: '8px 12px',
    fontSize: '0.84rem',
    cursor: 'pointer',
  },
  detectRow: {
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  detectBtn: {
    border: 'none',
    borderRadius: '10px',
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    padding: '10px 14px',
    fontSize: '0.92rem',
    fontWeight: 700,
    cursor: 'pointer',
  },
  summary: {
    margin: 0,
    color: '#4B5563',
    fontSize: '0.9rem',
  },
  outputGrid: {
    marginTop: '20px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
  },
  outputBox: {
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    padding: '12px',
    backgroundColor: colors.light,
  },
  outputTitle: {
    margin: '0 0 8px',
    fontWeight: 700,
    color: colors.dark,
  },
  highlightedText: {
    margin: 0,
    whiteSpace: 'pre-wrap',
    lineHeight: 1.65,
    color: '#111827',
    minHeight: '52px',
  },
  mark: {
    backgroundColor: 'rgba(220, 38, 38, 0.08)',
    color: colors.primary,
    textDecoration: 'underline',
    textDecorationColor: colors.primary,
    textDecorationThickness: '2px',
    textUnderlineOffset: '2px',
    padding: '0 1px',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'grid',
    gap: '8px',
  },
  item: {
    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    padding: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px 12px',
    alignItems: 'center',
  },
  token: {
    padding: '3px 8px',
    borderRadius: '999px',
    fontSize: '0.78rem',
    fontWeight: 700,
  },
  empty: {
    margin: 0,
    color: '#6B7280',
    fontSize: '0.9rem',
  },
  pua: {
    margin: 0,
    color: '#7F1D1D',
    backgroundColor: '#FEE2E2',
    border: '1px solid #FCA5A5',
    borderRadius: '10px',
    padding: '10px 12px',
    lineHeight: 1.6,
    fontWeight: 600,
  },
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');

function LazyDetector() {
  const [inputText, setInputText] = useState('');
  const [matches, setMatches] = useState([]);
  const [checked, setChecked] = useState(false);
  const [puaReply, setPuaReply] = useState('');

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
      return <span style={styles.empty}>请输入或粘贴 LLM 回复后再检测。</span>;
    }

    if (!checked || !highlightRegex) {
      return inputText;
    }

    const parts = inputText.split(highlightRegex);

    return parts.map((part, index) => {
      const isHit = matches.some((item) => item.phrase.toLowerCase() === part.toLowerCase());

      if (isHit) {
        return (
          <span key={`${part}-${index}`} style={styles.mark}>
            {part}
          </span>
        );
      }

      return <span key={`${part}-${index}`}>{part}</span>;
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
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>偷懒检测演示器</h2>
        <p style={styles.subheading}>输入回复后点击检测，系统会标记偷懒模式并给出风险信息。</p>

        <div style={styles.card}>
          <label style={styles.label} htmlFor="lazy-detector-input">
            LLM 回复文本
          </label>
          <textarea
            id="lazy-detector-input"
            style={styles.textarea}
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder="在此输入或粘贴回复内容..."
          />

          <div style={styles.sampleRow}>
            {quickSamples.map((sample) => (
              <button type="button" key={sample} style={styles.sampleBtn} onClick={() => setSample(sample)}>
                {sample}
              </button>
            ))}
          </div>

          <div style={styles.detectRow}>
            <button type="button" style={styles.detectBtn} onClick={runDetection}>
              开始检测
            </button>
            <p style={styles.summary}>
              {checked ? `命中 ${matches.length} 个可疑模式` : '点击“开始检测”查看匹配结果'}
            </p>
          </div>

          <div style={styles.outputGrid}>
            <div style={styles.outputBox}>
              <h3 style={styles.outputTitle}>高亮结果</h3>
              <p style={styles.highlightedText}>{renderHighlightedText()}</p>
            </div>

            <div style={styles.outputBox}>
              <h3 style={styles.outputTitle}>匹配详情（类别 + 严重程度）</h3>
              {checked && matches.length > 0 ? (
                <ul style={styles.list}>
                  {matches.map((item) => (
                    <li key={item.phrase} style={styles.item}>
                      <span style={{ ...styles.token, backgroundColor: '#FEE2E2', color: colors.primary }}>
                        {item.phrase}
                      </span>
                      <span style={{ ...styles.token, backgroundColor: '#FEF3C7', color: '#92400E' }}>
                        类别: {item.category}
                      </span>
                      <span
                        style={{
                          ...styles.token,
                          backgroundColor: 'rgba(229, 231, 235, 0.9)',
                          color: severityColorMap[item.severity],
                        }}
                      >
                        严重程度: {item.severity}
                      </span>
                      <span style={{ ...styles.token, backgroundColor: '#ECFDF5', color: '#047857' }}>
                        命中次数: {item.count}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={styles.empty}>{checked ? '未命中关键词。' : '检测后显示详情。'}</p>
              )}
            </div>

            {checked ? (
              <div style={styles.outputBox}>
                <h3 style={styles.outputTitle}>随机 PUA 回复</h3>
                <p style={styles.pua}>{puaReply}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LazyDetector;
