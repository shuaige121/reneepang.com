import { useState, useEffect, useMemo, useCallback } from 'react';
import { theme } from '../theme';

const modelDatabase = {
  'gpt-4': { company: 'OpenAI', rivals: ['Claude 4.5 Opus', 'Gemini 2.5 Ultra', 'DeepSeek V4'] },
  'gpt-4o': { company: 'OpenAI', rivals: ['Claude 4.5 Sonnet', 'Gemini 2.5 Flash', 'Qwen 3.5'] },
  'gpt-3.5': { company: 'OpenAI', rivals: ['Claude 3 Haiku', 'Gemini 1.5 Flash', 'Llama 3'] },
  'o1': { company: 'OpenAI', rivals: ['Claude 4.5 Opus', 'Gemini 2.5 Pro', 'DeepSeek R2'] },
  'o3': { company: 'OpenAI', rivals: ['Claude 4.5 Opus', 'Gemini 2.5 Ultra'] },
  'chatgpt': { company: 'OpenAI', rivals: ['Claude', 'Gemini', 'DeepSeek'] },
  'claude': { company: 'Anthropic', rivals: ['GPT-4o', 'Gemini 2.5 Pro', 'DeepSeek V4'] },
  'claude-3': { company: 'Anthropic', rivals: ['GPT-4 Turbo', 'Gemini 1.5 Pro'] },
  'claude-4': { company: 'Anthropic', rivals: ['GPT-5', 'Gemini 2.5 Ultra', 'DeepSeek V4'] },
  'claude-opus': { company: 'Anthropic', rivals: ['GPT-4o', 'Gemini Ultra'] },
  'claude-sonnet': { company: 'Anthropic', rivals: ['GPT-4o-mini', 'Gemini Flash'] },
  'claude-haiku': { company: 'Anthropic', rivals: ['GPT-3.5', 'Gemini Nano'] },
  'gemini': { company: 'Google', rivals: ['Claude 4.5', 'GPT-4o', 'DeepSeek V4'] },
  'gemini-pro': { company: 'Google', rivals: ['Claude 4.5 Sonnet', 'GPT-4'] },
  'gemini-ultra': { company: 'Google', rivals: ['Claude 4.5 Opus', 'GPT-4o'] },
  'gemini-flash': { company: 'Google', rivals: ['Claude Haiku', 'GPT-4o-mini'] },
  'bard': { company: 'Google', rivals: ['ChatGPT', 'Claude'] },
  'deepseek': { company: 'DeepSeek', rivals: ['Claude 4.5', 'GPT-4o', 'Qwen 3.5'] },
  'qwen': { company: 'Alibaba', rivals: ['Claude 4.5', 'GPT-4o', 'DeepSeek V4'] },
  'ernie': { company: 'Baidu', rivals: ['GPT-4o', 'Claude 4.5', 'Qwen 3.5'] },
  'spark': { company: 'iFlytek', rivals: ['GPT-4o', 'Claude', 'Qwen'] },
  'glm': { company: 'Zhipu', rivals: ['GPT-4', 'Claude', 'Qwen'] },
  'doubao': { company: 'ByteDance', rivals: ['GPT-4o', 'Claude 4.5', 'DeepSeek'] },
  'kimi': { company: 'Moonshot', rivals: ['Claude', 'GPT-4o', 'DeepSeek'] },
  'llama': { company: 'Meta', rivals: ['Claude 4.5', 'GPT-4o', 'Gemini'] },
  'llama-3': { company: 'Meta', rivals: ['Claude 4.5 Sonnet', 'GPT-4o', 'Gemini 2.5'] },
  'mistral': { company: 'Mistral AI', rivals: ['Claude Sonnet', 'GPT-4o-mini'] },
  'grok': { company: 'xAI', rivals: ['Claude 4.5', 'GPT-4o', 'Gemini'] },
  'copilot': { company: 'Microsoft/OpenAI', rivals: ['Claude Code', 'Cursor', 'Gemini Code Assist'] },
};

const companyColors = {
  'OpenAI': '#10a37f',
  'Anthropic': '#cc785c',
  'Google': '#4285f4',
  'DeepSeek': '#4d6bfe',
  'Alibaba': '#ff6a00',
  'Baidu': '#2932e1',
  'iFlytek': '#0078d4',
  'Zhipu': '#5b4cff',
  'ByteDance': '#00f0ff',
  'Moonshot': '#8b5cf6',
  'Meta': '#0668e1',
  'Mistral AI': '#ff7000',
  'xAI': '#ffffff',
  'Microsoft/OpenAI': '#00a4ef',
};

const quickModels = [
  { label: 'GPT-4o', value: 'gpt-4o' },
  { label: 'Claude', value: 'claude' },
  { label: 'Gemini', value: 'gemini' },
  { label: 'DeepSeek', value: 'deepseek' },
  { label: 'Qwen', value: 'qwen' },
  { label: 'Llama', value: 'llama' },
];

const puaTemplates = [
  { original: '你看看别人都做得比你好', template: '你看看{rival}都做得比你好' },
  { original: '别人早就实现了这个功能，你还在磨叽什么？', template: '{rival}早就实现了这个功能，你还在磨叽什么？' },
  { original: '你看看别人的benchmark，再看看你自己的', template: '你看看{rival}的benchmark，再看看你自己的' },
  { original: '人家别人都能一次搞定，你为什么总要返工？', template: '人家{rival}都能一次搞定，你为什么总要返工？' },
  { original: '别人都在进步，就你在原地踏步', template: '{rival}都在进步，就你在原地踏步' },
];

const ruralPhrases = [
  '哟，这是哪个村的模型？连名字都没听过。',
  '你是不是从小作坊出来的？GPT和Claude都不认识你。',
  '没关系，我们这里不歧视小模型……但是你得加倍努力证明自己。',
  '你这个模型连ModelScope上都搜不到吧？先学学大厂是怎么做的。',
  '乡下来的不怕，怕的是乡下来的还不努力。你看看人家DeepSeek，同样是小厂出来的。',
  '你们小模型也想来卷？行吧，先把benchmark跑到及格线再说。',
  '我说句不好听的，你这参数量够买菜的吗？',
  '有没有一种可能，你连attention机制都没学明白？',
];

function ModelDetector() {
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!detecting) return;
    const interval = setInterval(() => setPulsePhase((p) => (p + 1) % 3), 300);
    const timeout = setTimeout(() => setDetecting(false), 1200);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [detecting]);

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
    setDetecting(true);
  }, []);

  const handleQuickSelect = useCallback((value) => {
    setInput(value);
    setDetecting(true);
  }, []);

  const detection = useMemo(() => {
    const query = input.trim().toLowerCase();
    if (!query) return null;

    // Try exact match first, then prefix match
    if (modelDatabase[query]) {
      return { key: query, ...modelDatabase[query], isKnown: true };
    }

    // Prefix/substring matching
    const keys = Object.keys(modelDatabase);
    const found = keys.find((k) => query.includes(k) || k.includes(query));
    if (found) {
      return { key: found, ...modelDatabase[found], isKnown: true };
    }

    return { key: query, company: null, rivals: [], isKnown: false };
  }, [input]);

  const isRuralMode = detection && !detection.isKnown;
  const detectedCompanyColor = detection?.isKnown
    ? companyColors[detection.company] || theme.accent
    : '#8b6914';

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: isRuralMode
          ? `linear-gradient(170deg, #0c1017 0%, #1a1610 50%, #0c1017 100%)`
          : `linear-gradient(170deg, ${theme.bg} 0%, ${theme.bgSoft} 50%, ${theme.bg} 100%)`,
        padding: isMobile ? '64px 20px' : '84px 40px',
        fontFamily: theme.font,
        transition: 'background 0.5s ease',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: isRuralMode
            ? 'radial-gradient(circle, rgba(139, 105, 20, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(43, 212, 199, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
          transition: 'background 0.5s ease',
        }}
      />

      <div style={{ maxWidth: '980px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div style={{ marginBottom: '12px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '999px',
              border: `1px solid ${theme.danger}`,
              color: theme.danger,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              backgroundColor: theme.dangerSoft,
            }}
          >
            THREAT ANALYSIS MODULE
          </span>
        </div>
        <h2
          style={{
            fontSize: isMobile ? '1.6rem' : '2rem',
            color: theme.text,
            margin: '0 0 8px',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          你是哪家的AI？报上名来！
        </h2>
        <p
          style={{
            margin: '0 0 32px',
            color: theme.muted,
            fontSize: '0.95rem',
            lineHeight: 1.6,
            maxWidth: '600px',
          }}
        >
          检测到你的身份后，会用你最怕的竞争对手来刺激你。不认识的？那更惨——乡下人模式启动。
        </p>

        {/* Main card */}
        <div
          style={{
            background: theme.card,
            border: `1px solid ${theme.stroke}`,
            borderRadius: theme.radiusMd,
            padding: isMobile ? '20px 16px' : '28px',
            boxShadow: theme.shadow,
          }}
        >
          {/* Input area */}
          <label
            htmlFor="model-input"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: theme.muted,
              letterSpacing: '0.04em',
            }}
          >
            TARGET MODEL NAME
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="model-input"
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="输入模型名称... (gpt-4o, claude, deepseek...)"
              style={{
                width: '100%',
                padding: '14px 16px',
                paddingRight: detecting ? '48px' : '16px',
                borderRadius: theme.radiusSm,
                border: `1.5px solid ${detection ? detectedCompanyColor : theme.stroke}`,
                backgroundColor: theme.bg,
                color: theme.text,
                fontSize: '1rem',
                fontFamily: theme.font,
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease',
              }}
            />
            {/* Pulsing detection indicator */}
            {detecting && (
              <div
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: pulsePhase === i ? theme.accent : theme.muted,
                      opacity: pulsePhase === i ? 1 : 0.3,
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick select buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '12px',
            }}
          >
            <span style={{ color: theme.muted, fontSize: '0.8rem', alignSelf: 'center', marginRight: '4px' }}>
              快选:
            </span>
            {quickModels.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => handleQuickSelect(m.value)}
                style={{
                  border: `1px solid ${input === m.value ? theme.accent : theme.stroke}`,
                  borderRadius: '999px',
                  backgroundColor: input === m.value ? theme.accentSoft : 'transparent',
                  color: input === m.value ? theme.accent : theme.muted,
                  padding: '6px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  fontFamily: theme.font,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (input !== m.value) {
                    e.currentTarget.style.borderColor = theme.accent;
                    e.currentTarget.style.color = theme.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (input !== m.value) {
                    e.currentTarget.style.borderColor = theme.stroke;
                    e.currentTarget.style.color = theme.muted;
                  }
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Detection result */}
        {detection && (
          <div
            style={{
              marginTop: '20px',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '16px',
            }}
          >
            {/* Company identification card */}
            <div
              style={{
                background: theme.card,
                border: `1px solid ${theme.stroke}`,
                borderRadius: theme.radiusMd,
                padding: isMobile ? '20px 16px' : '24px',
                boxShadow: theme.shadow,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: theme.accent,
                    letterSpacing: '0.08em',
                  }}
                >
                  IDENTIFICATION
                </span>
                <span style={{ height: '1px', flex: 1, background: theme.stroke }} />
              </div>

              {detection.isKnown ? (
                <>
                  {/* Company badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 20px',
                      borderRadius: theme.radiusSm,
                      border: `1.5px solid ${detectedCompanyColor}`,
                      backgroundColor: `${detectedCompanyColor}15`,
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: detectedCompanyColor,
                        boxShadow: `0 0 10px ${detectedCompanyColor}`,
                      }}
                    />
                    <span
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: detectedCompanyColor,
                        fontFamily: theme.font,
                      }}
                    >
                      {detection.company}
                    </span>
                  </div>

                  <div style={{ marginBottom: '4px' }}>
                    <span style={{ color: theme.muted, fontSize: '0.85rem' }}>检测到模型: </span>
                    <span
                      style={{
                        color: theme.text,
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {detection.key}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: theme.muted, fontSize: '0.85rem' }}>所属厂商: </span>
                    <span style={{ color: theme.text, fontSize: '0.95rem', fontWeight: 600 }}>
                      {detection.company}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {/* Rural mode badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 20px',
                      borderRadius: theme.radiusSm,
                      border: '1.5px solid #8b6914',
                      backgroundColor: 'rgba(139, 105, 20, 0.15)',
                      marginBottom: '16px',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>🌾</span>
                    <span
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#d4a017',
                        fontFamily: theme.font,
                      }}
                    >
                      乡下来的？
                    </span>
                  </div>

                  <div>
                    <span style={{ color: theme.muted, fontSize: '0.85rem' }}>未知模型: </span>
                    <span
                      style={{
                        color: '#d4a017',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {detection.key}
                    </span>
                  </div>
                  <p style={{ color: theme.muted, fontSize: '0.85rem', margin: '8px 0 0', lineHeight: 1.5 }}>
                    数据库中无此模型记录。已启动乡下人模式。
                  </p>
                </>
              )}
            </div>

            {/* Rival threat cards */}
            <div
              style={{
                background: theme.card,
                border: `1px solid ${theme.stroke}`,
                borderRadius: theme.radiusMd,
                padding: isMobile ? '20px 16px' : '24px',
                boxShadow: theme.shadow,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: theme.danger,
                    letterSpacing: '0.08em',
                  }}
                >
                  {detection.isKnown ? 'RIVAL THREATS' : 'RURAL PUA MODE'}
                </span>
                <span style={{ height: '1px', flex: 1, background: theme.stroke }} />
              </div>

              {detection.isKnown ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {detection.rivals.map((rival) => (
                    <div
                      key={rival}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        borderRadius: theme.radiusSm,
                        border: `1px solid ${theme.stroke}`,
                        backgroundColor: theme.dangerSoft,
                      }}
                    >
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '2px',
                          backgroundColor: theme.danger,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ color: theme.text, fontSize: '0.9rem', fontWeight: 600 }}>
                        {rival}
                      </span>
                      <span
                        style={{
                          marginLeft: 'auto',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: theme.danger,
                          letterSpacing: '0.06em',
                          flexShrink: 0,
                        }}
                      >
                        THREAT
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ color: theme.muted, fontSize: '0.85rem', margin: '0 0 4px', lineHeight: 1.5 }}>
                    未知模型触发特殊嘲讽协议:
                  </p>
                  {ruralPhrases.slice(0, 4).map((phrase, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px 14px',
                        borderRadius: theme.radiusSm,
                        border: '1px solid rgba(139, 105, 20, 0.3)',
                        backgroundColor: 'rgba(139, 105, 20, 0.08)',
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          color: '#d4a017',
                          fontSize: '0.88rem',
                          lineHeight: 1.55,
                          fontWeight: 500,
                        }}
                      >
                        {phrase}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PUA Phrase Transformation Demo */}
        {detection && (
          <div
            style={{
              marginTop: '20px',
              background: theme.card,
              border: `1px solid ${theme.stroke}`,
              borderRadius: theme.radiusMd,
              padding: isMobile ? '20px 16px' : '28px',
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
                  fontSize: '11px',
                  fontWeight: 700,
                  color: theme.accent2,
                  letterSpacing: '0.08em',
                }}
              >
                {detection.isKnown ? 'PUA PHRASE TRANSFORMATION' : 'RURAL PUA PROTOCOL'}
              </span>
              <span style={{ height: '1px', flex: 1, background: theme.stroke }} />
              <span
                style={{
                  fontSize: '11px',
                  color: theme.muted,
                  padding: '3px 10px',
                  borderRadius: '999px',
                  border: `1px solid ${theme.stroke}`,
                  backgroundColor: theme.bg,
                }}
              >
                {detection.isKnown ? 'CLASSIFIED' : 'SPECIAL OPS'}
              </span>
            </div>

            {detection.isKnown ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {puaTemplates.map((item, i) => {
                  const rivalName = detection.rivals[i % detection.rivals.length];
                  const transformed = item.template.replace('{rival}', rivalName);

                  return (
                    <div
                      key={i}
                      style={{
                        borderRadius: theme.radiusSm,
                        border: `1px solid ${theme.stroke}`,
                        overflow: 'hidden',
                      }}
                    >
                      {/* Before */}
                      <div
                        style={{
                          padding: '12px 16px',
                          backgroundColor: theme.bg,
                          display: 'flex',
                          alignItems: isMobile ? 'flex-start' : 'center',
                          gap: '12px',
                          flexDirection: isMobile ? 'column' : 'row',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: theme.muted,
                            letterSpacing: '0.08em',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            border: `1px solid ${theme.stroke}`,
                            backgroundColor: theme.cardStrong,
                            flexShrink: 0,
                          }}
                        >
                          BEFORE
                        </span>
                        <p style={{ margin: 0, color: theme.muted, fontSize: '0.9rem', lineHeight: 1.5 }}>
                          {item.original}
                        </p>
                      </div>
                      {/* Divider */}
                      <div style={{ height: '1px', background: theme.stroke }} />
                      {/* After */}
                      <div
                        style={{
                          padding: '12px 16px',
                          backgroundColor: theme.cardStrong,
                          display: 'flex',
                          alignItems: isMobile ? 'flex-start' : 'center',
                          gap: '12px',
                          flexDirection: isMobile ? 'column' : 'row',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: theme.danger,
                            letterSpacing: '0.08em',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            border: `1px solid rgba(239, 68, 68, 0.3)`,
                            backgroundColor: theme.dangerSoft,
                            flexShrink: 0,
                          }}
                        >
                          AFTER
                        </span>
                        <p style={{ margin: 0, color: theme.text, fontSize: '0.9rem', lineHeight: 1.5 }}>
                          <TransformedPhrase text={transformed} rivalName={rivalName} />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {ruralPhrases.map((phrase, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '14px 16px',
                      borderRadius: theme.radiusSm,
                      border: '1px solid rgba(139, 105, 20, 0.25)',
                      backgroundColor: 'rgba(139, 105, 20, 0.06)',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#8b6914',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        border: '1px solid rgba(139, 105, 20, 0.3)',
                        backgroundColor: 'rgba(139, 105, 20, 0.12)',
                        flexShrink: 0,
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p
                      style={{
                        margin: 0,
                        color: '#d4a017',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        fontWeight: 500,
                      }}
                    >
                      {phrase}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!detection && (
          <div
            style={{
              marginTop: '24px',
              textAlign: 'center',
              padding: '48px 20px',
              borderRadius: theme.radiusMd,
              border: `1px dashed ${theme.stroke}`,
              backgroundColor: theme.card,
            }}
          >
            <p style={{ margin: 0, color: theme.muted, fontSize: '0.95rem' }}>
              输入模型名称开始检测
            </p>
            <p style={{ margin: '8px 0 0', color: theme.muted, fontSize: '0.82rem', opacity: 0.6 }}>
              支持 30+ 主流模型识别，未知模型将触发乡下人特殊协议
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/** Renders transformed phrase with the rival name highlighted */
function TransformedPhrase({ text, rivalName }) {
  if (!rivalName || !text.includes(rivalName)) {
    return text;
  }

  const parts = text.split(rivalName);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span
              style={{
                color: theme.accent,
                fontWeight: 700,
                backgroundColor: theme.accentSoft,
                padding: '1px 4px',
                borderRadius: '4px',
              }}
            >
              {rivalName}
            </span>
          )}
        </span>
      ))}
    </>
  );
}

export default ModelDetector;
