const colors = {
  primary: '#DC2626',
  secondary: '#F59E0B',
  dark: '#1F2937',
  light: '#F9FAFB',
  text: '#111827',
};

const flowSteps = [
  {
    icon: '📝',
    title: '签订 Contract',
    description: '明确交付物和验收标准',
  },
  {
    icon: '🔀',
    title: '拆分子项目',
    description: '大项目拆成可管理的小块',
  },
  {
    icon: '🤖',
    title: '派遣 Agent',
    description: '不同 agent 检查不同子项目',
  },
  {
    icon: '📊',
    title: '评分验收',
    description: '逐项检查，打分评级',
  },
  {
    icon: '❌',
    title: '不达标？PUA！',
    description: '话术攻击 + 要求重做',
  },
  {
    icon: '✅',
    title: '达标通过',
    description: '“嗯，这次还行，下次注意”',
  },
];

const styles = {
  section: {
    backgroundColor: colors.dark,
    padding: '92px 24px',
    color: colors.light,
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  heading: {
    margin: '0 0 10px',
    fontSize: '2rem',
    color: '#FFFFFF',
  },
  subheading: {
    margin: '0 0 40px',
    color: '#D1D5DB',
    lineHeight: 1.7,
  },
  timeline: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    padding: '8px 0',
  },
  line: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: '3px',
    background: `linear-gradient(180deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
    transform: 'translateX(-50%)',
    opacity: 0.9,
  },
  row: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  rowLeft: {
    justifyContent: 'flex-start',
    paddingRight: '52%',
  },
  rowRight: {
    justifyContent: 'flex-end',
    paddingLeft: '52%',
  },
  card: {
    width: '100%',
    maxWidth: '460px',
    borderRadius: '14px',
    border: '1px solid rgba(245, 158, 11, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(2px)',
    padding: '18px 18px 16px',
    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.22)',
  },
  dot: {
    position: 'absolute',
    left: '50%',
    top: '18px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: colors.secondary,
    border: `3px solid ${colors.primary}`,
    boxShadow: '0 0 0 8px rgba(220, 38, 38, 0.2)',
    zIndex: 1,
  },
  topLine: {
    margin: '0 0 8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 700,
    color: '#FDE68A',
  },
  title: {
    margin: '0 0 8px',
    fontSize: '1.06rem',
    color: '#FFFFFF',
  },
  desc: {
    margin: 0,
    color: '#D1D5DB',
    lineHeight: 1.65,
  },
};

function ContractDemo() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Contract 工作流演示</h2>
        <p style={styles.subheading}>从签订到验收的全链路流程，确保每一步都可追溯、可追责。</p>

        <div style={styles.timeline}>
          <div style={styles.line} />
          {flowSteps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={step.title}
                style={{
                  ...styles.row,
                  ...(isLeft ? styles.rowLeft : styles.rowRight),
                }}
              >
                <span style={styles.dot} aria-hidden="true" />
                <article style={styles.card}>
                  <p style={styles.topLine}>
                    <span aria-hidden="true">{step.icon}</span>
                    <span>步骤 {index + 1}</span>
                  </p>
                  <h3 style={styles.title}>{step.title}</h3>
                  <p style={styles.desc}>{step.description}</p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ContractDemo;
