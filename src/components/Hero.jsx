const colors = {
  primary: '#DC2626',
  secondary: '#F59E0B',
  dark: '#1F2937',
  light: '#F9FAFB',
  text: '#111827',
};

const styles = {
  section: {
    background:
      'radial-gradient(circle at 20% 20%, rgba(220, 38, 38, 0.35) 0%, rgba(31, 41, 55, 0.95) 45%), linear-gradient(145deg, #111827 0%, #1F2937 60%, #0F172A 100%)',
    color: colors.light,
    padding: '96px 24px 88px',
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: '-120px',
    right: '-140px',
    width: '320px',
    height: '320px',
    borderRadius: '999px',
    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.45), rgba(245, 158, 11, 0))',
    pointerEvents: 'none',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  tag: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '999px',
    border: `1px solid ${colors.secondary}`,
    color: colors.secondary,
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    marginBottom: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  title: {
    fontSize: 'clamp(2rem, 4.8vw, 4rem)',
    lineHeight: 1.1,
    margin: '0 0 18px',
    color: '#FFFFFF',
    textShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
  },
  subtitle: {
    margin: '0 0 32px',
    maxWidth: '780px',
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    lineHeight: 1.7,
    color: '#E5E7EB',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 26px',
    fontSize: '1rem',
    fontWeight: 700,
    color: '#FFFFFF',
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
    boxShadow: '0 12px 24px rgba(220, 38, 38, 0.35)',
    cursor: 'pointer',
  },
};

function Hero() {
  return (
    <section style={styles.section}>
      <div style={styles.glow} />
      <div style={styles.container}>
        <span style={styles.tag}>OFFICE PRESSURE MODE</span>
        <h1 style={styles.title}>Renee 的职场小妙招</h1>
        <p style={styles.subtitle}>
          让偷懒的 AI 无所遁形 — 职场 PUA 驱动的 LLM 质量管控系统
        </p>
        <button type="button" style={styles.button}>
          开始 PUA
        </button>
      </div>
    </section>
  );
}

export default Hero;
