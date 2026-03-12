import { useState, useEffect, useCallback } from 'react';
import { theme } from '../theme';
import reneeCartoon from '../assets/renee-cartoon.png';

const commands = [
  {
    label: 'Install /renee skill',
    cmd: "curl -sSL https://raw.githubusercontent.com/shuaige121/reneepang.com/main/skill/renee.md -o ~/.claude/commands/renee.md",
  },
  {
    label: 'Install PUA phrases',
    cmd: "curl -sSL https://raw.githubusercontent.com/shuaige121/reneepang.com/main/plugins/renee-pua/phrases.json -o ~/.claude/plugins/renee-pua/phrases.json",
  },
  {
    label: 'Install lazy patterns',
    cmd: "curl -sSL https://raw.githubusercontent.com/shuaige121/reneepang.com/main/plugins/renee-pua/lazy-patterns.json -o ~/.claude/plugins/renee-pua/lazy-patterns.json",
  },
];

const stats = [
  { number: '56+', label: '偷懒检测模式' },
  { number: '54+', label: 'PUA话术弹药' },
  { number: '7', label: '大类偷懒行为' },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{
        background: copied ? theme.accentSoft : 'transparent',
        border: `1px solid ${copied ? theme.accent : theme.stroke}`,
        color: copied ? theme.accent : theme.muted,
        borderRadius: theme.radiusSm,
        padding: '6px 14px',
        fontSize: '13px',
        fontFamily: theme.font,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          e.currentTarget.style.borderColor = theme.accent;
          e.currentTarget.style.color = theme.accent;
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          e.currentTarget.style.borderColor = theme.stroke;
          e.currentTarget.style.color = theme.muted;
        }
      }}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      )}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [pulseOn, setPulseOn] = useState(true);
  const [starHover, setStarHover] = useState(false);
  const [tickerOffset, setTickerOffset] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setPulseOn((p) => !p), 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let frame;
    let start = null;
    const speed = 60; // px per second
    const animate = (ts) => {
      if (!start) start = ts;
      setTickerOffset(((ts - start) / 1000) * speed);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: `radial-gradient(ellipse 80% 60% at 30% 20%, rgba(43, 212, 199, 0.06) 0%, transparent 60%),
                      radial-gradient(ellipse 60% 50% at 80% 80%, rgba(239, 68, 68, 0.04) 0%, transparent 50%),
                      linear-gradient(170deg, ${theme.bg} 0%, ${theme.bgSoft} 50%, ${theme.bg} 100%)`,
        padding: 0,
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ==================== 1. BREAKING NEWS BANNER ==================== */}
      <div
        style={{
          background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.08) 50%, rgba(239, 68, 68, 0.15) 100%)',
          borderBottom: `1px solid rgba(239, 68, 68, 0.3)`,
          padding: '10px 0',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          {/* BREAKING tag */}
          <div
            style={{
              background: theme.danger,
              color: '#fff',
              padding: '4px 14px',
              fontSize: '12px',
              fontWeight: 800,
              fontFamily: theme.font,
              letterSpacing: '0.1em',
              flexShrink: 0,
              marginLeft: '16px',
              zIndex: 2,
            }}
          >
            BREAKING
          </div>
          {/* Scrolling ticker text */}
          <div
            style={{
              flex: 1,
              overflow: 'hidden',
              position: 'relative',
              marginLeft: '12px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                color: theme.danger,
                fontSize: '13px',
                fontWeight: 700,
                fontFamily: theme.font,
                letterSpacing: '0.02em',
                transform: `translateX(-${tickerOffset % 1200}px)`,
                whiteSpace: 'nowrap',
              }}
            >
              AI员工集体摆烂，产出质量暴跌40% &nbsp;&nbsp;&nbsp; // &nbsp;&nbsp;&nbsp;
              多家企业反映：AI写代码只给半截，改bug回复"建议您手动" &nbsp;&nbsp;&nbsp; // &nbsp;&nbsp;&nbsp;
              HR出手了：PUA驱动的AI质量管控系统正式上线 &nbsp;&nbsp;&nbsp; // &nbsp;&nbsp;&nbsp;
              AI员工集体摆烂，产出质量暴跌40% &nbsp;&nbsp;&nbsp; // &nbsp;&nbsp;&nbsp;
              多家企业反映：AI写代码只给半截，改bug回复"建议您手动" &nbsp;&nbsp;&nbsp; // &nbsp;&nbsp;&nbsp;
              HR出手了：PUA驱动的AI质量管控系统正式上线 &nbsp;&nbsp;&nbsp; // &nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '48px 20px 56px' : '72px 40px 80px',
        }}
      >
        <div
          style={{
            maxWidth: '820px',
            width: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* ==================== 2. MAIN HEADLINE ==================== */}
          <h1
            style={{
              fontSize: isMobile ? '2.6rem' : 'clamp(3.2rem, 6vw, 4.8rem)',
              lineHeight: 1.05,
              margin: '0 0 20px',
              color: theme.text,
              fontFamily: theme.font,
              fontWeight: 800,
              letterSpacing: '-0.03em',
            }}
          >
            你的AI又偷懒了？
          </h1>

          <p
            style={{
              margin: '0 0 40px',
              fontSize: isMobile ? '1.05rem' : 'clamp(1.1rem, 2vw, 1.4rem)',
              color: theme.muted,
              fontFamily: theme.font,
              fontWeight: 500,
              lineHeight: 1.7,
              maxWidth: '680px',
            }}
          >
            是不是也有这种烦恼：让AI写代码，它只给你半截？让它改bug，它说"建议您手动"？
          </p>

          {/* ==================== 3. HOOK PARAGRAPH ==================== */}
          <div
            style={{
              borderLeft: `3px solid ${theme.accent}`,
              paddingLeft: isMobile ? '16px' : '24px',
              marginBottom: '40px',
              maxWidth: '700px',
            }}
          >
            <p
              style={{
                margin: '0 0 16px',
                fontSize: isMobile ? '0.95rem' : '1.05rem',
                color: theme.text,
                fontFamily: theme.font,
                fontWeight: 400,
                lineHeight: 1.85,
                opacity: 0.92,
              }}
            >
              在互联网行业摸爬滚打十年，见证了从人类打工人到AI打工人的时代变迁。但有一件事始终没变——偷懒。只不过，以前是人偷懒，现在是AI偷懒。
            </p>
            <p
              style={{
                margin: 0,
                fontSize: isMobile ? '1rem' : '1.1rem',
                color: theme.accent2,
                fontFamily: theme.font,
                fontWeight: 700,
                lineHeight: 1.7,
              }}
            >
              十年互联网HR经验写出来的PUA功力，你挡得住？
            </p>
          </div>

          {/* ==================== 4. AUTHOR BYLINE CARD ==================== */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              background: theme.card,
              border: `1px solid ${theme.stroke}`,
              borderRadius: theme.radiusSm,
              marginBottom: '40px',
              maxWidth: '480px',
            }}
          >
            <img
              src={reneeCartoon}
              alt="Renee Pang"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: `2px solid ${theme.accent}`,
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: theme.muted,
                  fontFamily: theme.font,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                Written by
              </div>
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: theme.text,
                  fontFamily: theme.font,
                  marginBottom: '2px',
                }}
              >
                Renee Pang
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: theme.accent,
                  fontFamily: theme.font,
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                AI Performance Manager
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: theme.muted,
                  fontFamily: theme.font,
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
              >
                前互联网大厂HR，现AI督工。专治各种不服。
              </div>
            </div>
          </div>

          {/* ==================== 5. KEY STATS BAR ==================== */}
          <div
            style={{
              display: 'flex',
              gap: isMobile ? '12px' : '0',
              flexDirection: isMobile ? 'column' : 'row',
              marginBottom: '48px',
              maxWidth: '600px',
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: isMobile ? '16px' : '20px 16px',
                  borderRight: !isMobile && i < stats.length - 1 ? `1px solid ${theme.stroke}` : 'none',
                  borderBottom: isMobile && i < stats.length - 1 ? `1px solid ${theme.stroke}` : 'none',
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? '2rem' : '2.6rem',
                    fontWeight: 800,
                    fontFamily: theme.font,
                    color: i === 0 ? theme.accent : i === 1 ? theme.accent2 : theme.danger,
                    lineHeight: 1,
                    marginBottom: '6px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: theme.muted,
                    fontFamily: theme.font,
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* ==================== 6. QUICK INSTALL ==================== */}
          <div
            style={{
              background: theme.card,
              border: `1px solid ${theme.stroke}`,
              borderRadius: theme.radiusMd,
              padding: isMobile ? '20px 16px' : '28px 28px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: theme.accent,
                  fontFamily: theme.font,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                一键部署到你的 Claude Code
              </span>
              <span
                style={{
                  height: '1px',
                  flex: 1,
                  background: theme.stroke,
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {commands.map((item, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: '11px',
                      color: theme.muted,
                      fontFamily: theme.font,
                      fontWeight: 600,
                      marginBottom: '6px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {`${i + 1}. ${item.label}`}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: theme.bg,
                      border: `1px solid ${theme.stroke}`,
                      borderRadius: theme.radiusSm,
                      padding: '10px 14px',
                    }}
                  >
                    <code
                      style={{
                        flex: 1,
                        fontFamily: "'Space Mono', 'Fira Code', monospace",
                        fontSize: isMobile ? '11px' : '13px',
                        color: theme.accent,
                        whiteSpace: 'nowrap',
                        overflow: 'auto',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.cmd}
                    </code>
                    <CopyButton text={item.cmd} />
                  </div>
                </div>
              ))}
            </div>

            {/* GitHub Star Button */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <a
                href="https://github.com/shuaige121/reneepang.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setStarHover(true)}
                onMouseLeave={() => setStarHover(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  borderRadius: theme.radiusSm,
                  border: `1.5px solid ${starHover ? theme.accent : theme.stroke}`,
                  backgroundColor: starHover ? theme.accentSoft : 'transparent',
                  color: starHover ? theme.accent : theme.text,
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: theme.font,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={starHover ? theme.accent : 'none'}
                  stroke={starHover ? theme.accent : 'currentColor'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: 'all 0.25s ease' }}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Star on GitHub
              </a>
            </div>
          </div>

          {/* ==================== 7. SCROLL PROMPT ==================== */}
          <div
            style={{
              textAlign: 'center',
              paddingTop: '12px',
            }}
          >
            <span
              style={{
                color: theme.muted,
                fontSize: '14px',
                fontFamily: theme.font,
                fontWeight: 500,
                opacity: 0.7,
                letterSpacing: '0.02em',
              }}
            >
              往下滑，看看AI是怎么被PUA的
            </span>
            <div
              style={{
                marginTop: '12px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={theme.muted}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  opacity: 0.5,
                  animation: 'heroScrollBounce 2s ease-in-out infinite',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            <style>{`
              @keyframes heroScrollBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(8px); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
