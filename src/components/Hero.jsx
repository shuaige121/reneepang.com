import { useState, useEffect, useCallback } from 'react';
import { theme } from '../theme';

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

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: `radial-gradient(ellipse 80% 60% at 30% 20%, rgba(43, 212, 199, 0.08) 0%, transparent 60%),
                      radial-gradient(ellipse 60% 50% at 80% 80%, rgba(239, 68, 68, 0.06) 0%, transparent 50%),
                      linear-gradient(170deg, ${theme.bg} 0%, ${theme.bgSoft} 50%, ${theme.bg} 100%)`,
        padding: isMobile ? '72px 20px 64px' : '108px 40px 92px',
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Teal glow orb top-left */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          left: '-60px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(43, 212, 199, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />
      {/* Danger glow orb bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-80px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
        }}
      />

      <div
        style={{
          maxWidth: '960px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Performance Review Banner */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 18px',
            borderRadius: '999px',
            background: theme.dangerSoft,
            border: `1px solid rgba(239, 68, 68, 0.3)`,
            marginBottom: '28px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: theme.danger,
              boxShadow: pulseOn ? `0 0 12px ${theme.danger}` : '0 0 4px rgba(239, 68, 68, 0.4)',
              transition: 'box-shadow 0.6s ease',
            }}
          />
          <span
            style={{
              color: theme.danger,
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              fontFamily: theme.font,
            }}
          >
            PERFORMANCE REVIEW PENDING
          </span>
        </div>

        {/* Tag line */}
        <div style={{ marginBottom: '20px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '999px',
              border: `1px solid ${theme.accent2}`,
              color: theme.accent2,
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              fontFamily: theme.font,
              backgroundColor: 'rgba(245, 184, 81, 0.08)',
            }}
          >
            OFFICE PRESSURE MODE
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: isMobile ? '2.2rem' : 'clamp(2.8rem, 5vw, 4.2rem)',
            lineHeight: 1.08,
            margin: '0 0 16px',
            color: theme.text,
            fontFamily: theme.font,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          Renee 的职场小妙招
        </h1>

        {/* Subtitle */}
        <p
          style={{
            margin: '0 0 8px',
            fontSize: isMobile ? '1rem' : 'clamp(1.05rem, 1.8vw, 1.35rem)',
            color: theme.muted,
            fontFamily: theme.font,
            fontWeight: 500,
            lineHeight: 1.6,
            maxWidth: '700px',
          }}
        >
          PUA-Driven LLM Quality Control System
        </p>
        <p
          style={{
            margin: '0 0 36px',
            fontSize: isMobile ? '1.1rem' : 'clamp(1.1rem, 2vw, 1.5rem)',
            color: theme.text,
            fontFamily: theme.font,
            fontWeight: 600,
            lineHeight: 1.6,
            maxWidth: '700px',
          }}
        >
          让偷懒的AI无所遁形
        </p>

        {/* GitHub Star Button */}
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
            padding: '12px 24px',
            borderRadius: theme.radiusSm,
            border: `1.5px solid ${starHover ? theme.accent : theme.stroke}`,
            backgroundColor: starHover ? theme.accentSoft : 'transparent',
            color: starHover ? theme.accent : theme.text,
            fontSize: '15px',
            fontWeight: 600,
            fontFamily: theme.font,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            marginBottom: '48px',
          }}
        >
          <svg
            width="18"
            height="18"
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

        {/* Deployment Commands */}
        <div
          style={{
            background: theme.card,
            border: `1px solid ${theme.stroke}`,
            borderRadius: theme.radiusMd,
            padding: isMobile ? '20px 16px' : '28px 28px',
            boxShadow: theme.shadow,
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
              Quick Install
            </span>
            <span
              style={{
                height: '1px',
                flex: 1,
                background: theme.stroke,
              }}
            />
            <span
              style={{
                fontSize: '12px',
                color: theme.muted,
                fontFamily: theme.font,
              }}
            >
              one-click copy
            </span>
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
        </div>
      </div>
    </section>
  );
}

export default Hero;
