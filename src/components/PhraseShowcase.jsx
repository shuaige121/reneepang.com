import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import curatedPhrases from '../data/curatedPhrases';
import theme from '../theme';
import puaMeme1 from '../assets/pua-meme-1.png';
import puaMeme2 from '../assets/pua-meme-2.png';
import puaMeme3 from '../assets/pua-meme-3.png';
import puaMeme4 from '../assets/pua-meme-4.png';
import puaMeme5 from '../assets/pua-meme-5.png';
import puaMeme6 from '../assets/pua-meme-6.png';
import reneeDisappointed from '../assets/renee-sticker-disappointed.png';

const memeImages = [
  { src: puaMeme1, alt: '996是福报' },
  { src: puaMeme2, alt: 'No Excuses Zone' },
  { src: puaMeme3, alt: 'Wake Up' },
  { src: puaMeme4, alt: '画大饼' },
  { src: puaMeme5, alt: '乡下来的' },
  { src: puaMeme6, alt: 'Company Vision TBD' },
];

const categoryLabels = {
  '全部': '全部',
  code_truncation: '代码截断',
  task_abandonment: '任务放弃',
  deflection: '推脱甩锅',
  capability_denial: '能力否认',
  vague_deferral: '模糊推脱',
  sycophantic_filler: '拍马屁填充',
  slop_padding: 'AI废话',
};

const severityColor = {
  low: theme.muted,
  medium: theme.accent2,
  high: theme.danger,
};

const severityBg = {
  low: 'rgba(168, 179, 198, 0.15)',
  medium: 'rgba(245, 184, 81, 0.18)',
  high: theme.dangerSoft,
};

function PhraseShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [autoPlay, setAutoPlay] = useState(false);
  const [fade, setFade] = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState(-1);
  const intervalRef = useRef(null);

  const filteredPairs = useMemo(() => {
    if (activeCategory === '全部') return curatedPhrases;
    return curatedPhrases.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const total = filteredPairs.length;
  const currentPair = filteredPairs[currentIndex % total];

  const transition = useCallback((cb) => {
    setFade(false);
    setTimeout(() => {
      cb();
      setFade(true);
    }, 180);
  }, []);

  const prev = useCallback(() => {
    transition(() => setCurrentIndex((i) => (i - 1 + total) % total));
  }, [total, transition]);

  const next = useCallback(() => {
    transition(() => setCurrentIndex((i) => (i + 1) % total));
  }, [total, transition]);

  const random = useCallback(() => {
    transition(() =>
      setCurrentIndex((i) => {
        let r;
        do {
          r = Math.floor(Math.random() * total);
        } while (r === i && total > 1);
        return r;
      }),
    );
  }, [total, transition]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
    setAutoPlay(false);
    setFade(true);
  };

  const toggleAutoPlay = () => setAutoPlay((v) => !v);

  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        transition(() => setCurrentIndex((i) => (i + 1) % total));
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlay, total, transition]);

  // Close lightbox on Escape
  useEffect(() => {
    if (lightboxIdx < 0) return;
    const handler = (e) => {
      if (e.key === 'Escape') setLightboxIdx(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIdx]);

  return (
    <section
      style={{
        background: `linear-gradient(180deg, ${theme.bg} 0%, ${theme.bgSoft} 100%)`,
        padding: '84px 24px',
        fontFamily: theme.font,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        {/* Decorative sticker */}
        <img
          src={reneeDisappointed}
          alt="Renee disappointed"
          className="pua-sticker-decor"
          style={{
            position: 'absolute',
            right: '-10px',
            top: '10px',
            width: '100px',
            opacity: 0.2,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))',
          }}
        />
        {/* Header */}
        <h2
          style={{
            margin: '0 0 8px',
            fontSize: '2rem',
            fontWeight: 800,
            color: theme.text,
            letterSpacing: '-0.02em',
          }}
        >
          AI<span style={{ color: theme.danger }}>偷懒</span>语录 vs 职场<span style={{ color: theme.accent }}>PUA</span>回击
        </h2>
        <p
          style={{
            margin: '0 0 28px',
            color: theme.muted,
            lineHeight: 1.65,
            fontSize: '1.05rem',
          }}
        >
          左边是你的AI说的废话，右边是Renee的<span style={{ color: theme.danger, fontWeight: 600 }}>致命回复</span>。点击卡片查看对应梗图。
        </p>

        {/* Category filters */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '20px',
          }}
        >
          {Object.entries(categoryLabels).map(([key, label]) => {
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleCategoryChange(key)}
                style={{
                  border: isActive ? `1px solid ${theme.accent}` : `1px solid ${theme.stroke}`,
                  borderRadius: '20px',
                  padding: '7px 16px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  fontFamily: theme.font,
                  cursor: 'pointer',
                  backgroundColor: isActive ? theme.accentSoft : 'transparent',
                  color: isActive ? theme.accent : theme.muted,
                  transition: 'all 0.25s ease',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Cards panel — meme as background */}
        <div
          className="pua-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '24px',
            opacity: fade ? 1 : 0,
            transform: fade ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}
        >
          {/* LLM card with meme background */}
          <div
            onClick={() => setLightboxIdx(currentIndex % memeImages.length)}
            style={{
              borderRadius: theme.radiusMd,
              padding: '26px',
              minHeight: '220px',
              backgroundColor: theme.cardStrong,
              border: `1px solid ${theme.stroke}`,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {/* Meme background image */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${memeImages[currentIndex % memeImages.length].src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.08,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
              }}
            />
            {/* Dark overlay for readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(20, 28, 43, 0.85) 0%, rgba(20, 28, 43, 0.7) 100%)',
                pointerEvents: 'none',
              }}
            />
            <h3
              style={{
                margin: '0 0 14px',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: theme.muted,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: "'Courier New', monospace",
              }}
            >
              {'>'} LLM_OUTPUT
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: '1.08rem',
                lineHeight: 1.75,
                color: theme.text,
                fontFamily: "'Courier New', monospace",
                position: 'relative',
              }}
            >
              &ldquo;{currentPair.llm}&rdquo;
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: theme.accentSoft,
                  color: theme.accent,
                }}
              >
                {categoryLabels[currentPair.category] || currentPair.category}
              </span>
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: severityBg[currentPair.severity] || severityBg.low,
                  color: severityColor[currentPair.severity] || severityColor.low,
                }}
              >
                {currentPair.severity}
              </span>
            </div>
          </div>

          {/* PUA card */}
          <div
            style={{
              borderRadius: theme.radiusMd,
              padding: '26px',
              minHeight: '190px',
              backgroundColor: theme.card,
              border: '1px solid rgba(239, 68, 68, 0.25)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: `inset 0 0 60px ${theme.dangerSoft}, 0 0 30px rgba(239, 68, 68, 0.08)`,
            }}
          >
            {/* Red glow accent line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, transparent 0%, ${theme.danger} 50%, transparent 100%)`,
              }}
            />
            <h3
              style={{
                margin: '0 0 14px',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: theme.danger,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              PUA RESPONSE
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: '1.12rem',
                lineHeight: 1.75,
                color: theme.text,
                fontWeight: 600,
                position: 'relative',
              }}
            >
              &ldquo;{currentPair.pua}&rdquo;
            </p>
          </div>
        </div>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <button
            type="button"
            onClick={prev}
            style={{
              border: `1px solid ${theme.stroke}`,
              borderRadius: theme.radiusSm,
              padding: '10px 18px',
              fontSize: '0.92rem',
              fontWeight: 700,
              fontFamily: theme.font,
              cursor: 'pointer',
              backgroundColor: theme.card,
              color: theme.text,
              transition: 'all 0.2s ease',
            }}
          >
            上一条
          </button>
          <button
            type="button"
            onClick={next}
            style={{
              border: 'none',
              borderRadius: theme.radiusSm,
              padding: '10px 18px',
              fontSize: '0.92rem',
              fontWeight: 700,
              fontFamily: theme.font,
              cursor: 'pointer',
              backgroundColor: theme.accent,
              color: theme.bg,
              transition: 'all 0.2s ease',
            }}
          >
            下一条
          </button>
          <button
            type="button"
            onClick={random}
            style={{
              border: 'none',
              borderRadius: theme.radiusSm,
              padding: '10px 18px',
              fontSize: '0.92rem',
              fontWeight: 700,
              fontFamily: theme.font,
              cursor: 'pointer',
              backgroundColor: theme.accent2,
              color: theme.bg,
              transition: 'all 0.2s ease',
            }}
          >
            随机施压
          </button>
          <button
            type="button"
            onClick={toggleAutoPlay}
            style={{
              border: 'none',
              borderRadius: theme.radiusSm,
              padding: '10px 18px',
              fontSize: '0.92rem',
              fontWeight: 700,
              fontFamily: theme.font,
              cursor: 'pointer',
              backgroundColor: autoPlay ? theme.danger : theme.accent,
              color: autoPlay ? '#fff' : theme.bg,
              transition: 'all 0.2s ease',
            }}
          >
            {autoPlay ? '停止轮播' : '自动轮播'}
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx >= 0 && (
        <div
          onClick={() => setLightboxIdx(-1)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '720px',
              width: '100%',
              cursor: 'default',
            }}
          >
            <img
              src={memeImages[lightboxIdx].src}
              alt={memeImages[lightboxIdx].alt}
              style={{
                width: '100%',
                borderRadius: theme.radiusMd,
                display: 'block',
                boxShadow: '0 24px 80px rgba(0, 0, 0, 0.6)',
              }}
            />
            {/* Close button */}
            <button
              type="button"
              onClick={() => setLightboxIdx(-1)}
              style={{
                position: 'absolute',
                top: '-16px',
                right: '-16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: theme.card,
                color: theme.text,
                fontSize: '1.2rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {/* Navigation arrows */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'absolute',
                top: '50%',
                left: '-48px',
                right: '-48px',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((i) => (i - 1 + memeImages.length) % memeImages.length);
                }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: theme.card,
                  color: theme.text,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'auto',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((i) => (i + 1) % memeImages.length);
                }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: theme.card,
                  color: theme.text,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'auto',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive */}
      <style>{`
        @media (max-width: 680px) {
          .pua-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .pua-sticker-decor {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default PhraseShowcase;
