import './App.css';
import ContractDemo from './components/ContractDemo';
import Features from './components/Features';
import Hero from './components/Hero';
import LazyDetector from './components/LazyDetector';
import PhraseShowcase from './components/PhraseShowcase';
import ScoreBoard from './components/ScoreBoard';

const footerStyles = {
  footer: {
    backgroundColor: '#111827',
    color: '#E5E7EB',
    padding: '28px 24px 36px',
    textAlign: 'center',
  },
  line: {
    margin: '0 0 8px',
    lineHeight: 1.6,
    fontSize: '0.95rem',
  },
  subtle: {
    margin: 0,
    color: '#9CA3AF',
    fontSize: '0.85rem',
    lineHeight: 1.6,
  },
};

function App() {
  return (
    <>
      <Hero />
      <Features />
      <PhraseShowcase />
      <ContractDemo />
      <ScoreBoard />
      <LazyDetector />

      <footer style={footerStyles.footer}>
        <p style={footerStyles.line}>© 2026 Renee 的职场小妙招</p>
        <p style={footerStyles.line}>⚠️ 本工具仅用于“激励” AI 完成任务，如有雷同纯属巧合</p>
        <p style={footerStyles.subtle}>免责声明：页面内容为职场讽刺幽默表达，请勿用于现实管理场景。</p>
      </footer>
    </>
  );
}

export default App;
