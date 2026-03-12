import { useState, useEffect } from 'react';
import theme from '../theme';

const flowSteps = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.accent2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: '签约',
    desc: '明确交付物、验收标准、失败惩罚',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.accent2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    title: '拆分',
    desc: '按模块拆成2-5个子合同',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.accent2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: '巡查',
    desc: '多个Agent交叉审计、独立提交',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.accent2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: '评分',
    desc: '四维度打分，满分100',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.danger} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    title: 'PUA!',
    desc: '话术攻击+强制返工',
    isDanger: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: '通过',
    desc: '"这次还行，下次注意"',
    isSuccess: true,
  },
];

function ContractDemo() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      style={{
        backgroundColor: theme.bgSoft,
        padding: isMobile ? '56px 20px' : '72px 40px',
        fontFamily: theme.font,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <h2
          style={{
            margin: '0 0 6px',
            fontSize: isMobile ? '1.5rem' : '1.85rem',
            color: theme.text,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          {'从签约到PUA：6步闭环'}
        </h2>
        <p
          style={{
            margin: '0 0 36px',
            color: theme.muted,
            lineHeight: 1.65,
            fontSize: '1rem',
            maxWidth: '520px',
          }}
        >
          {'不是你不努力，是你不知道合同已经签了。'}
        </p>

        {/* Grid layout: 3 columns desktop, 2 columns tablet, 1 column mobile */}
        <div
          className="contract-flow-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '16px',
            position: 'relative',
          }}
        >
          {flowSteps.map((step, index) => {
            const isHovered = hoveredIndex === index;
            const borderColor = step.isDanger
              ? theme.danger
              : step.isSuccess
                ? theme.accent
                : theme.accent2;
            const stepNumColor = step.isDanger
              ? theme.danger
              : step.isSuccess
                ? theme.accent
                : theme.accent2;

            return (
              <div
                key={step.title}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                style={{
                  position: 'relative',
                  backgroundColor: theme.card,
                  borderRadius: theme.radiusSm,
                  border: `1px solid ${isHovered ? borderColor : theme.stroke}`,
                  padding: '20px',
                  transition: 'all 0.25s ease',
                  transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? `0 8px 28px rgba(0, 0, 0, 0.3), 0 0 0 1px ${step.isDanger ? 'rgba(239, 68, 68, 0.12)' : step.isSuccess ? theme.accentSoft : 'rgba(245, 184, 81, 0.12)'}`
                    : '0 2px 8px rgba(0, 0, 0, 0.15)',
                  cursor: 'default',
                }}
              >
                {/* Top row: step number + icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: stepNumColor,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    STEP {index + 1}
                  </span>
                  <span style={{ flexShrink: 0, opacity: 0.9 }}>{step.icon}</span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    margin: '0 0 6px',
                    fontSize: '1.05rem',
                    color: theme.text,
                    fontWeight: 700,
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    margin: 0,
                    color: theme.muted,
                    fontSize: '0.85rem',
                    lineHeight: 1.55,
                  }}
                >
                  {step.desc}
                </p>

                {/* Connector arrow to next card (not on last, not on mobile) */}
                {index < flowSteps.length - 1 && !isMobile && (
                  <div
                    style={{
                      position: 'absolute',
                      right: '-12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                      color: theme.muted,
                      opacity: 0.5,
                      fontSize: '0.85rem',
                      lineHeight: 1,
                      // Hide arrow when it would be at end of row (index 2)
                      display: index === 2 ? 'none' : 'block',
                    }}
                  >
                    <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                      <path d="M1 1l7 6-7 6" stroke={theme.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Connector between row 1 and row 2 (desktop only) */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '-4px 0',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ opacity: 0.4 }}>
              <path d="M1 1l6 7 6-7" stroke={theme.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Responsive: 2 columns on tablet */}
      <style>{`
        @media (min-width: 480px) and (max-width: 767px) {
          .contract-flow-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

export default ContractDemo;
