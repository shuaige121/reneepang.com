import { useMemo, useState } from 'react';

const colors = {
  primary: '#DC2626',
  secondary: '#F59E0B',
  success: '#10B981',
  dark: '#1F2937',
  light: '#F9FAFB',
};

const scoreDimensions = [
  {
    key: 'completeness',
    label: '完整性 (Completeness)',
    max: 30,
    color: colors.success,
  },
  {
    key: 'correctness',
    label: '正确性 (Correctness)',
    max: 30,
    color: colors.secondary,
  },
  {
    key: 'codeQuality',
    label: '代码质量 (Code Quality)',
    max: 20,
    color: colors.primary,
  },
  {
    key: 'proactiveness',
    label: '主动性 (Proactiveness)',
    max: 20,
    color: colors.success,
  },
];

const styles = {
  section: {
    backgroundColor: '#FFFFFF',
    padding: '84px 24px',
  },
  container: {
    maxWidth: '980px',
    margin: '0 auto',
  },
  heading: {
    margin: '0 0 12px',
    fontSize: '2rem',
    color: colors.dark,
  },
  subheading: {
    margin: '0 0 30px',
    color: '#4B5563',
    lineHeight: 1.65,
  },
  panel: {
    backgroundColor: colors.light,
    border: '1px solid #E5E7EB',
    borderRadius: '16px',
    padding: '22px',
    boxShadow: '0 10px 30px rgba(31, 41, 55, 0.08)',
  },
  row: {
    marginBottom: '16px',
  },
  rowTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    gap: '12px',
  },
  dimensionLabel: {
    margin: 0,
    color: colors.dark,
    fontWeight: 700,
  },
  dimensionScore: {
    margin: 0,
    color: '#4B5563',
    fontWeight: 700,
    fontVariantNumeric: 'tabular-nums',
  },
  track: {
    width: '100%',
    height: '14px',
    borderRadius: '999px',
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  footer: {
    marginTop: '22px',
    paddingTop: '18px',
    borderTop: '1px solid #D1D5DB',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
  },
  total: {
    margin: 0,
    color: colors.dark,
    fontWeight: 800,
    fontSize: '1.08rem',
  },
  grade: {
    margin: '6px 0 0',
    fontWeight: 700,
  },
  button: {
    border: 'none',
    borderRadius: '10px',
    padding: '11px 16px',
    fontWeight: 700,
    fontSize: '0.94rem',
    cursor: 'pointer',
    backgroundColor: colors.primary,
    color: '#FFFFFF',
  },
};

const randomInt = (max) => Math.floor(Math.random() * (max + 1));

const createRandomScores = () => {
  return scoreDimensions.reduce((acc, item) => {
    return {
      ...acc,
      [item.key]: randomInt(item.max),
    };
  }, {});
};

function ScoreBoard() {
  const [scores, setScores] = useState(() => createRandomScores());

  const totalScore = useMemo(() => {
    return scoreDimensions.reduce((sum, item) => sum + scores[item.key], 0);
  }, [scores]);

  const rating = useMemo(() => {
    if (totalScore >= 80) {
      return {
        label: '合格 — 嗯，这次还行，下次继续保持',
        color: colors.success,
      };
    }

    if (totalScore >= 60) {
      return {
        label: '待改进 — 你看看别人都做得比你好',
        color: colors.secondary,
      };
    }

    return {
      label: '不合格 — 必须加班重做！',
      color: colors.primary,
    };
  }, [totalScore]);

  const rerollScores = () => {
    setScores(createRandomScores());
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>AI 绩效评分系统</h2>
        <p style={styles.subheading}>4 个维度加权评分，点击按钮可模拟重新评审。</p>

        <div style={styles.panel}>
          {scoreDimensions.map((item) => {
            const value = scores[item.key];
            const widthPercent = Math.round((value / item.max) * 100);

            return (
              <div key={item.key} style={styles.row}>
                <div style={styles.rowTop}>
                  <p style={styles.dimensionLabel}>{item.label}</p>
                  <p style={styles.dimensionScore}>
                    {value} / {item.max}
                  </p>
                </div>
                <div style={styles.track}>
                  <div
                    style={{
                      width: `${widthPercent}%`,
                      height: '100%',
                      borderRadius: '999px',
                      backgroundColor: item.color,
                      transition: 'width 360ms ease',
                    }}
                  />
                </div>
              </div>
            );
          })}

          <div style={styles.footer}>
            <div>
              <p style={styles.total}>总分: {totalScore} / 100</p>
              <p style={{ ...styles.grade, color: rating.color }}>{rating.label}</p>
            </div>

            <button type="button" style={styles.button} onClick={rerollScores}>
              重新评分
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScoreBoard;
