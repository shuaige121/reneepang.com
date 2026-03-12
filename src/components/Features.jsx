import { useState } from 'react';

const colors = {
  primary: '#DC2626',
  secondary: '#F59E0B',
  dark: '#1F2937',
  light: '#F9FAFB',
  text: '#111827',
};

const featureItems = [
  {
    icon: '📋',
    title: 'Contract 合同系统',
    description: '开工前签“合同”，完不成要追责，拒绝模糊交付。',
  },
  {
    icon: '🔍',
    title: '偷懒检测器',
    description: '语义匹配 AI 的各种摆烂话术，精准定位推脱行为。',
  },
  {
    icon: '👥',
    title: '多 Agent 巡查',
    description: '派出不同 agent 检查子项目，交叉审计减少漏检。',
  },
  {
    icon: '⭐',
    title: '绩效评分',
    description: '给 AI 工作打分，低于 60 分直接进入加班整改流程。',
  },
  {
    icon: '💬',
    title: 'PUA 话术引擎',
    description: '内置 6 大类 50+ 条经典职场 PUA，持续施压促产出。',
  },
  {
    icon: '🔄',
    title: '重做机制',
    description: '不达标就重写 prompt 重新来过，直到可上线为止。',
  },
];

const styles = {
  section: {
    backgroundColor: colors.light,
    padding: '84px 24px',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  heading: {
    margin: '0 0 10px',
    color: colors.text,
    fontSize: '2rem',
  },
  subheading: {
    margin: '0 0 36px',
    color: '#4B5563',
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '18px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '14px',
    padding: '22px 18px',
    border: '1px solid #E5E7EB',
    transition: 'transform 0.22s ease, box-shadow 0.22s ease',
    boxShadow: '0 6px 18px rgba(17, 24, 39, 0.05)',
  },
  icon: {
    fontSize: '1.6rem',
    marginBottom: '12px',
  },
  title: {
    margin: '0 0 10px',
    color: colors.text,
    fontSize: '1.05rem',
  },
  desc: {
    margin: 0,
    color: '#4B5563',
    lineHeight: 1.65,
    fontSize: '0.95rem',
  },
};

function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>核心功能</h2>
        <p style={styles.subheading}>从合同约束到绩效追责，建立完整的 AI 职场管理闭环。</p>
        <div style={styles.grid}>
          {featureItems.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <article
                key={item.title}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                style={{
                  ...styles.card,
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? '0 14px 30px rgba(17, 24, 39, 0.14)'
                    : styles.card.boxShadow,
                  borderColor: isHovered ? '#FECACA' : '#E5E7EB',
                }}
              >
                <div style={styles.icon} aria-hidden="true">
                  {item.icon}
                </div>
                <h3 style={styles.title}>{item.title}</h3>
                <p style={styles.desc}>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
