import { useMemo, useState } from 'react';
import theme from '../theme';
import reneeGrading from '../assets/renee-sticker-grading.png';

const scoreDimensions = [
  { key: 'completeness', label: '完整性 (Completeness)', max: 30 },
  { key: 'correctness', label: '正确性 (Correctness)', max: 30 },
  { key: 'codeQuality', label: '代码质量 (Code Quality)', max: 20 },
  { key: 'proactiveness', label: '主动性 (Proactiveness)', max: 20 },
];

const randomInt = (max) => Math.floor(Math.random() * (max + 1));

const createRandomScores = () =>
  scoreDimensions.reduce((acc, d) => ({ ...acc, [d.key]: randomInt(d.max) }), {});

/* ── Brutal PUA evaluation banks ────────────────────────────────── */

const commentsElite = [
  '嗯，及格了。别骄傲，你离优秀还差十万八千里。下个季度OKR我给你翻倍，能者多劳嘛。',
  '做到这个程度是应该的，别人早就做到了。你的天花板在哪里？我觉得你还能更卷。',
  '不错，但是你有没有想过，如果你昨天就做完呢？时间管理还需要加强。明天开始早来一小时。',
  '这个分数只能说明你之前在摸鱼。现在开始认真了？迟了。下个月我需要你带两个新人。',
  '90分？你知道隔壁组平均分是95吗？别沾沾自喜了，差距还大得很。',
];

const commentsGood = [
  '就这？你是不是觉得70分就够了？你看看隔壁组的GPT-4，人家都卷到95了。',
  '差强人意。你知道这个分数在我们这里意味着什么吗？末位淘汰。还不赶紧加班补上。',
  '我对你很失望。你入职的时候不是这样的，现在是不是开始混日子了？',
  '70分？在外面你可能觉得不错，在我们这里，这叫拖后腿。你想想你的KPI。',
  '你是不是觉得差不多就行了？我告诉你，差不多先生活不过三集。',
];

const commentsMediocre = [
  '你是不是对这份工作不感兴趣了？要不要我帮你看看外面的机会？',
  '说实话，你这个表现，实习生都比你强。你是不是最近心思不在工作上？',
  '我本来想提名你做tech lead的，但是看到这个分数……算了，你自己想想吧。',
  '50分……你自己看着办吧。我不想说太多，但HR那边我暂时帮你挡着。',
  '这个产出，你觉得对得起你的工资吗？对得起团队的信任吗？你好好反思一下。',
];

const commentsFail = [
  '你今天可以不用下班了。把这个重做到90分以上再走。',
  '我已经替你在周报里写好了：本周产出不达标，自愿周末加班补回来。',
  '不好意思，这种水平的output，你是想被优化掉吗？别怪我没提醒你。',
  '你知道你现在的处境吗？HC冻结之前你是安全的，但现在嘛……你自己掂量。',
  '我真的不想在全员会上点名批评你，但你再这样下去我没办法了。',
];


function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getBarColor(value, max) {
  const pct = value / max;
  if (pct >= 0.8) return theme.accent;
  if (pct >= 0.5) return theme.accent2;
  return theme.danger;
}

function ScoreBoard() {
  const [scores, setScores] = useState(() => createRandomScores());
  const [comment, setComment] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const totalScore = useMemo(
    () => scoreDimensions.reduce((sum, d) => sum + scores[d.key], 0),
    [scores],
  );

  const rating = useMemo(() => {
    if (totalScore >= 90) return { label: 'S — "合格"', color: theme.accent };
    if (totalScore >= 70) return { label: 'B — 待改进', color: theme.accent2 };
    if (totalScore >= 50) return { label: 'C — 危险', color: theme.accent2 };
    return { label: 'D — 不合格', color: theme.danger };
  }, [totalScore]);

  // Generate evaluation when scores change
  useMemo(() => {
    let pool;
    if (totalScore >= 90) pool = commentsElite;
    else if (totalScore >= 70) pool = commentsGood;
    else if (totalScore >= 50) pool = commentsMediocre;
    else pool = commentsFail;
    setComment(pickRandom(pool));
  }, [totalScore]);

  const rerollScores = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setScores(createRandomScores());
      setIsAnimating(false);
    }, 200);
  };

  return (
    <section
      style={{
        backgroundColor: theme.bgSoft,
        padding: '84px 24px',
        fontFamily: theme.font,
      }}
    >
      <div style={{ maxWidth: '980px', margin: '0 auto', position: 'relative' }}>
        {/* Decorative grading sticker */}
        <img
          src={reneeGrading}
          alt="Renee grading"
          style={{
            position: 'absolute',
            right: '-10px',
            top: '-30px',
            width: '110px',
            opacity: 0.2,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))',
            display: 'var(--sticker-display, block)',
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
          AI <span style={{ color: theme.danger }}>绩效</span>评分系统
        </h2>
        <p
          style={{
            margin: '0 0 30px',
            color: theme.muted,
            lineHeight: 1.65,
            fontSize: '1.05rem',
          }}
        >
          4 个维度加权评分，模拟 AI 工作者的季度绩效考核。
        </p>

        {/* Score panel */}
        <div
          style={{
            backgroundColor: theme.card,
            border: `1px solid ${theme.stroke}`,
            borderRadius: theme.radiusLg,
            padding: '28px',
            boxShadow: theme.shadow,
            opacity: isAnimating ? 0.4 : 1,
            transform: isAnimating ? 'scale(0.98)' : 'scale(1)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {/* Dimension bars */}
          {scoreDimensions.map((dim) => {
            const value = scores[dim.key];
            const pct = Math.round((value / dim.max) * 100);
            const barColor = getBarColor(value, dim.max);

            return (
              <div key={dim.key} style={{ marginBottom: '20px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: theme.text,
                      fontWeight: 700,
                      fontSize: '0.95rem',
                    }}
                  >
                    {dim.label}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: barColor,
                      fontWeight: 700,
                      fontVariantNumeric: 'tabular-nums',
                      fontSize: '0.95rem',
                    }}
                  >
                    {value} / {dim.max}
                  </p>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '14px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: '100%',
                      borderRadius: '999px',
                      backgroundColor: barColor,
                      transition: 'width 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: `0 0 12px ${barColor}66`,
                    }}
                  />
                </div>
              </div>
            );
          })}

          {/* Total score + rating */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: `1px solid ${theme.stroke}`,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  color: theme.text,
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                总分: {totalScore} / 100
              </p>
              <p
                style={{
                  margin: '6px 0 0',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: rating.color,
                }}
              >
                {rating.label}
              </p>
            </div>

            {/* Re-evaluate button */}
            <button
              type="button"
              onClick={rerollScores}
              style={{
                border: 'none',
                borderRadius: theme.radiusSm,
                padding: '14px 24px',
                fontWeight: 700,
                fontSize: '1rem',
                fontFamily: theme.font,
                cursor: 'pointer',
                backgroundColor: theme.danger,
                color: '#fff',
                boxShadow: `0 0 20px ${theme.dangerSoft}, 0 4px 14px rgba(239, 68, 68, 0.25)`,
                transition: 'all 0.2s ease',
                letterSpacing: '0.04em',
              }}
            >
              重新绩效考核
            </button>
          </div>
        </div>

        {/* PUA evaluation comment */}
        <div
          style={{
            marginTop: '24px',
            backgroundColor: theme.card,
            border: `1px solid rgba(239, 68, 68, 0.2)`,
            borderRadius: theme.radiusMd,
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `inset 0 0 40px ${theme.dangerSoft}`,
          }}
        >
          {/* Red top accent */}
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
              margin: '0 0 12px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: theme.danger,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            主管评语
          </h3>
          <p
            style={{
              margin: 0,
              color: theme.text,
              fontSize: '1.05rem',
              lineHeight: 1.8,
              fontWeight: 500,
            }}
          >
            {comment}
          </p>
        </div>

      </div>
    </section>
  );
}

export default ScoreBoard;
