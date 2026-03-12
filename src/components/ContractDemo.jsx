import { useState, useEffect } from 'react';
import { theme } from '../theme';
import reneeStickerDisappointed from '../assets/renee-sticker-disappointed.png';

const flowSteps = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.accent2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: '签订 Contract',
    description: '明确交付物清单、验收标准、截止轮次和失败惩罚条款。',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.accent2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    title: '拆分子项目',
    description: '大项目按模块/层级/里程碑拆成 2-5 个可管理的子合同。',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.accent2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: '派遣 Agent',
    description: '不同 agent 检查不同子项目，交叉审计、独立提交评分。',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.accent2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: '评分验收',
    description: '四维度打分：完整性、正确性、代码质量、主动性，满分 100。',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.danger} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    title: '不达标？PUA！',
    description: '6 大类话术攻击 + 偷懒检测警报 + 要求强制返工。',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: '达标通过',
    description: '"嗯，这次还行，下次注意。" — 然后开始画饼。',
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
        backgroundColor: theme.bg,
        padding: isMobile ? '64px 20px' : '92px 40px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2
          style={{
            margin: '0 0 8px',
            fontSize: isMobile ? '1.6rem' : '2rem',
            color: theme.text,
            fontFamily: theme.font,
            fontWeight: 700,
          }}
        >
          Contract 工作流演示
        </h2>
        <p
          style={{
            margin: '0 0 48px',
            color: theme.muted,
            lineHeight: 1.7,
            fontFamily: theme.font,
            maxWidth: '600px',
          }}
        >
          从签订到验收的全链路流程，确保每一步都可追溯、可追责。
        </p>

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '20px' : '24px',
            padding: '8px 0',
          }}
        >
          {/* Renee sticker - disappointed */}
          {!isMobile && (
            <img
              src={reneeStickerDisappointed}
              alt=""
              className="renee-sticker-contract"
              style={{
                position: 'absolute',
                bottom: '30px',
                right: '-60px',
                height: '180px',
                width: 'auto',
                pointerEvents: 'none',
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
                zIndex: 3,
                opacity: 0.9,
                transform: 'rotate(2deg)',
              }}
            />
          )}
          {/* Timeline line */}
          {!isMobile && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '2px',
                background: `linear-gradient(180deg, ${theme.accent} 0%, ${theme.accent2} 50%, ${theme.danger} 100%)`,
                transform: 'translateX(-50%)',
                opacity: 0.6,
              }}
            />
          )}

          {/* Mobile: thin left line */}
          {isMobile && (
            <div
              style={{
                position: 'absolute',
                left: '19px',
                top: 0,
                bottom: 0,
                width: '2px',
                background: `linear-gradient(180deg, ${theme.accent} 0%, ${theme.accent2} 50%, ${theme.danger} 100%)`,
                opacity: 0.5,
              }}
            />
          )}

          {flowSteps.map((step, index) => {
            const isLeft = index % 2 === 0;
            const isHovered = hoveredIndex === index;
            const isLast = index === flowSteps.length - 1;
            const isFail = index === 4;

            return (
              <div
                key={step.title}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  width: '100%',
                  ...(isMobile
                    ? {
                        paddingLeft: '48px',
                      }
                    : {
                        justifyContent: isLeft ? 'flex-start' : 'flex-end',
                        ...(isLeft
                          ? { paddingRight: 'calc(50% + 32px)' }
                          : { paddingLeft: 'calc(50% + 32px)' }),
                      }),
                }}
              >
                {/* Dot */}
                <span
                  style={{
                    position: 'absolute',
                    left: isMobile ? '12px' : '50%',
                    top: '22px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    transform: isMobile ? 'none' : 'translateX(-50%)',
                    backgroundColor: isFail
                      ? theme.danger
                      : isLast
                        ? theme.accent
                        : theme.accent2,
                    border: `3px solid ${theme.bgSoft}`,
                    boxShadow: `0 0 0 4px ${
                      isFail
                        ? theme.dangerSoft
                        : isLast
                          ? theme.accentSoft
                          : 'rgba(245, 184, 81, 0.15)'
                    }, 0 0 ${isHovered ? '16px' : '8px'} ${
                      isFail
                        ? 'rgba(239, 68, 68, 0.3)'
                        : isLast
                          ? 'rgba(43, 212, 199, 0.2)'
                          : 'rgba(245, 184, 81, 0.15)'
                    }`,
                    zIndex: 2,
                    transition: 'box-shadow 0.3s ease',
                  }}
                />

                {/* Card */}
                <article
                  style={{
                    width: '100%',
                    maxWidth: isMobile ? 'none' : '440px',
                    borderRadius: theme.radiusMd,
                    border: `1px solid ${isHovered ? (isFail ? theme.danger : theme.accent) : theme.stroke}`,
                    backgroundColor: theme.card,
                    padding: '20px 22px',
                    boxShadow: isHovered
                      ? `0 12px 36px rgba(0, 0, 0, 0.35), 0 0 0 1px ${isFail ? 'rgba(239, 68, 68, 0.15)' : theme.accentSoft}`
                      : '0 6px 20px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.28s ease',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                >
                  {/* Step header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '10px',
                    }}
                  >
                    <span style={{ flexShrink: 0 }}>{step.icon}</span>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: isFail ? theme.danger : theme.accent2,
                        fontFamily: theme.font,
                        letterSpacing: '0.06em',
                      }}
                    >
                      STEP {index + 1}
                    </span>
                  </div>

                  <h3
                    style={{
                      margin: '0 0 8px',
                      fontSize: '1.05rem',
                      color: theme.text,
                      fontFamily: theme.font,
                      fontWeight: 600,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: theme.muted,
                      lineHeight: 1.65,
                      fontSize: '0.9rem',
                      fontFamily: theme.font,
                    }}
                  >
                    {step.description}
                  </p>
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
