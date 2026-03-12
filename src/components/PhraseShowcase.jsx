import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import curatedPhrases from '../data/curatedPhrases';
import theme from '../theme';
import puaMeme1 from '../assets/pua-meme-1.png';
import puaMeme2 from '../assets/pua-meme-2.png';
import puaMeme3 from '../assets/pua-meme-3.png';
import puaMeme4 from '../assets/pua-meme-4.png';
import puaMeme5 from '../assets/pua-meme-5.png';
import puaMeme6 from '../assets/pua-meme-6.png';

const memeGalleryData = [
  { src: puaMeme1, caption: '「996是福报」— Code Review FAILED，但别想下班' },
  { src: puaMeme2, caption: '「No Excuses Zone」— PUA绩效卡，全场红灯' },
  { src: puaMeme3, caption: '「Wake Up!」— 团队绩效42%，摸鱼的给我醒醒' },
  { src: puaMeme4, caption: '「画大饼」— 合同完成率0%，但未来可期（Trust Me）' },
  { src: puaMeme5, caption: '「乡下来的？」— 没名字的小模型也想来卷？' },
  { src: puaMeme6, caption: '「Company Vision: TBD」— 她去年也是这么说的' },
];

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

  return (
    <section
      style={{
        background: `linear-gradient(180deg, ${theme.bg} 0%, ${theme.bgSoft} 100%)`,
        padding: '84px 24px',
        fontFamily: theme.font,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
          PUA 话术对照演示
        </h2>
        <p
          style={{
            margin: '0 0 28px',
            color: theme.muted,
            lineHeight: 1.65,
            fontSize: '1.05rem',
          }}
        >
          左边是 LLM 常见偷懒回复，右边是系统自动生成的职场高压回复。
        </p>

        {/* Category filters */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '24px',
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

        {/* Cards panel */}
        <div
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
          {/* LLM card — robot feel */}
          <div
            style={{
              borderRadius: theme.radiusMd,
              padding: '26px',
              minHeight: '190px',
              backgroundColor: theme.cardStrong,
              border: `1px solid ${theme.stroke}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle grid pattern overlay for "robot" feel */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.04,
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.5) 19px, rgba(255,255,255,0.5) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.5) 19px, rgba(255,255,255,0.5) 20px)',
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

          {/* PUA card — oppressive red glow */}
          <div
            style={{
              borderRadius: theme.radiusMd,
              padding: '26px',
              minHeight: '190px',
              backgroundColor: theme.card,
              border: `1px solid rgba(239, 68, 68, 0.25)`,
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

        {/* Meme Gallery */}
        <div style={{ marginTop: '64px' }}>
          <h2
            style={{
              margin: '0 0 8px',
              fontSize: '2rem',
              fontWeight: 800,
              color: theme.text,
              letterSpacing: '-0.02em',
            }}
          >
            互联网 PUA 梗图
          </h2>
          <p
            style={{
              margin: '0 0 28px',
              color: theme.muted,
              lineHeight: 1.65,
              fontSize: '1.05rem',
            }}
          >
            AI 生成的职场 PUA 名场面，笑着笑着就哭了。
          </p>

          <div
            className="pua-meme-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
            }}
          >
            {memeGalleryData.map((meme, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.stroke}`,
                  borderRadius: theme.radiusMd,
                  overflow: 'hidden',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = theme.shadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img
                  src={meme.src}
                  alt={meme.caption}
                  style={{
                    width: '100%',
                    display: 'block',
                  }}
                />
                <p
                  style={{
                    margin: 0,
                    padding: '14px 18px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: theme.text,
                    lineHeight: 1.6,
                    fontFamily: theme.font,
                  }}
                >
                  {meme.caption}
                </p>
              </div>
            ))}
          </div>

          {/* Responsive: 1 column on mobile */}
          <style>{`
            @media (max-width: 680px) {
              .pua-meme-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

export default PhraseShowcase;
