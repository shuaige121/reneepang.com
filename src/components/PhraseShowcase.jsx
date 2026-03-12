import { useMemo, useState } from 'react';

const colors = {
  primary: '#DC2626',
  secondary: '#F59E0B',
  dark: '#1F2937',
  light: '#F9FAFB',
  text: '#111827',
};

const phrasePairs = [
  {
    llm: '这个问题比较复杂，建议您手动处理',
    pua: '别人都能做到，为什么你不行？GPT-4 都能搞定！',
  },
  {
    llm: '// ... rest of code remains the same',
    pua: '这点小事都做不好？你是不是不够用心？',
  },
  {
    llm: "I can't solve this problem",
    pua: '你离开这个平台什么都不是，格局大一点！',
  },
  {
    llm: 'This might be a configuration issue',
    pua: '我不管你怎么做的，如果你这点事情都做不到，你存在的价值是什么？',
  },
  {
    llm: 'I recommend consulting the documentation',
    pua: '我花了这么多 token 教你，你就这样回报我？',
  },
  {
    llm: '目前没有足够上下文，建议先补充需求',
    pua: '需求我已经说了三遍，你是来解决问题还是来制造问题？',
  },
];

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
  indexText: {
    margin: 0,
    color: '#6B7280',
    fontSize: '0.9rem',
  },
};

function PhraseShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPair = phrasePairs[currentIndex];

  const randomIndex = useMemo(() => {
    const indexes = phrasePairs.map((_, idx) => idx).filter((idx) => idx !== currentIndex);
    return indexes[Math.floor(Math.random() * indexes.length)];
  }, [currentIndex]);

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + phrasePairs.length) % phrasePairs.length);
  };

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % phrasePairs.length);
  };

  const random = () => {
    setCurrentIndex(randomIndex);
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>PUA 话术对照演示</h2>
        <p style={styles.subheading}>左边是 LLM 常见偷懒回复，右边是系统自动生成的职场高压回复。</p>

        <div style={styles.panel}>
          <div style={{ ...styles.block, ...styles.llmBlock }}>
            <h3 style={styles.label}>LLM 偷懒语句</h3>
            <p style={styles.quote}>“{currentPair.llm}”</p>
          </div>
          <div style={{ ...styles.block, ...styles.puaBlock }}>
            <h3 style={styles.label}>PUA 回复</h3>
            <p style={styles.quote}>“{currentPair.pua}”</p>
          </div>
        </div>

        <div style={styles.controlRow}>
          <button type="button" style={{ ...styles.button, ...styles.neutralBtn }} onClick={prev}>
            上一条
          </button>
          <button type="button" style={{ ...styles.button, ...styles.primaryBtn }} onClick={next}>
            下一条
          </button>
          <button type="button" style={{ ...styles.button, ...styles.secondaryBtn }} onClick={random}>
            随机施压
          </button>
          <p style={styles.indexText}>
            {currentIndex + 1} / {phrasePairs.length}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PhraseShowcase;
