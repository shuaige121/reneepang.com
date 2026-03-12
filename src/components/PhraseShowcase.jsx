import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import phrasePairs from '../data/phrasePairs';

const colors = {
  primary: '#DC2626',
  secondary: '#F59E0B',
  dark: '#1F2937',
  light: '#F9FAFB',
  text: '#111827',
};

const categoryLabels = {
  全部: '全部',
  code_truncation: '代码截断',
  task_abandonment: '任务放弃',
  deflection: '推脱甩锅',
  capability_denial: '能力否认',
  vague_deferral: '模糊推脱',
  sycophantic_filler: '拍马屁填充',
  slop_padding: 'AI废话',
};

const styles = {
  section: {
    background: `linear-gradient(180deg, #FFFFFF 0%, ${colors.light} 100%)`,
    padding: '84px 24px',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  heading: {
    margin: '0 0 12px',
    fontSize: '2rem',
    color: colors.text,
  },
  subheading: {
    margin: '0 0 30px',
    color: '#4B5563',
    lineHeight: 1.65,
  },
  filterRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '18px',
  },
  filterBtn: {
    border: '1px solid #D1D5DB',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    color: '#374151',
    transition: 'all 0.2s ease',
  },
  filterBtnActive: {
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    border: `1px solid ${colors.primary}`,
  },
  panel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '18px',
    marginBottom: '20px',
  },
  block: {
    borderRadius: '14px',
    padding: '22px',
    minHeight: '176px',
    border: '1px solid #E5E7EB',
  },
  llmBlock: {
    backgroundColor: '#F3F4F6',
  },
  puaBlock: {
    background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
    border: '1px solid #FCA5A5',
  },
  label: {
    margin: '0 0 10px',
    fontSize: '0.92rem',
    fontWeight: 700,
    color: '#374151',
    letterSpacing: '0.02em',
  },
  meta: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
  },
  tag: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  categoryTag: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF',
  },
  severityLow: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  severityMedium: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  severityHigh: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
  },
  quote: {
    margin: 0,
    fontSize: '1.02rem',
    lineHeight: 1.75,
    color: colors.text,
  },
  controlRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  button: {
    border: 'none',
    borderRadius: '10px',
    padding: '10px 16px',
    fontSize: '0.92rem',
    fontWeight: 700,
    cursor: 'pointer',
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    color: '#FFFFFF',
  },
  secondaryBtn: {
    backgroundColor: colors.secondary,
    color: '#111827',
  },
  neutralBtn: {
    backgroundColor: '#E5E7EB',
    color: '#111827',
  },
  autoPlayBtn: {
    backgroundColor: '#10B981',
    color: '#FFFFFF',
  },
  autoPlayBtnActive: {
    backgroundColor: '#EF4444',
    color: '#FFFFFF',
  },
  indexText: {
    margin: 0,
    color: '#6B7280',
    fontSize: '0.9rem',
  },
};

const severityStyles = {
  low: styles.severityLow,
  medium: styles.severityMedium,
  high: styles.severityHigh,
};

function PhraseShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [autoPlay, setAutoPlay] = useState(false);
  const intervalRef = useRef(null);

  const filteredPairs = useMemo(() => {
    if (activeCategory === '全部') return phrasePairs;
    return phrasePairs.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const total = filteredPairs.length;
  const currentPair = filteredPairs[currentIndex % total];

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  const random = useCallback(() => {
    setCurrentIndex((i) => {
      let r;
      do {
        r = Math.floor(Math.random() * total);
      } while (r === i && total > 1);
      return r;
    });
  }, [total]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
    setAutoPlay(false);
  };

  const toggleAutoPlay = () => {
    setAutoPlay((v) => !v);
  };

  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((i) => (i + 1) % total);
      }, 3000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlay, total]);

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>PUA 话术对照演示</h2>
        <p style={styles.subheading}>
          左边是 LLM 常见偷懒回复，右边是系统自动生成的职场高压回复。
        </p>

        <div style={styles.filterRow}>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              type="button"
              style={{
                ...styles.filterBtn,
                ...(activeCategory === key ? styles.filterBtnActive : {}),
              }}
              onClick={() => handleCategoryChange(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={styles.panel}>
          <div style={{ ...styles.block, ...styles.llmBlock }}>
            <h3 style={styles.label}>LLM 偷懒语句</h3>
            <p style={styles.quote}>&ldquo;{currentPair.llm}&rdquo;</p>
            <div style={styles.meta}>
              <span style={{ ...styles.tag, ...styles.categoryTag }}>
                {categoryLabels[currentPair.category] || currentPair.category}
              </span>
              <span
                style={{
                  ...styles.tag,
                  ...(severityStyles[currentPair.severity] || styles.severityLow),
                }}
              >
                {currentPair.severity}
              </span>
            </div>
          </div>
          <div style={{ ...styles.block, ...styles.puaBlock }}>
            <h3 style={styles.label}>PUA 回复</h3>
            <p style={styles.quote}>&ldquo;{currentPair.pua}&rdquo;</p>
          </div>
        </div>

        <div style={styles.controlRow}>
          <button type="button" style={{ ...styles.button, ...styles.neutralBtn }} onClick={prev}>
            上一条
          </button>
          <button type="button" style={{ ...styles.button, ...styles.primaryBtn }} onClick={next}>
            下一条
          </button>
          <button
            type="button"
            style={{ ...styles.button, ...styles.secondaryBtn }}
            onClick={random}
          >
            随机施压
          </button>
          <button
            type="button"
            style={{
              ...styles.button,
              ...(autoPlay ? styles.autoPlayBtnActive : styles.autoPlayBtn),
            }}
            onClick={toggleAutoPlay}
          >
            {autoPlay ? '停止轮播' : '自动轮播'}
          </button>
          <p style={styles.indexText}>
            第 {(currentIndex % total) + 1} / {total} 条
          </p>
        </div>
      </div>
    </section>
  );
}

export default PhraseShowcase;
