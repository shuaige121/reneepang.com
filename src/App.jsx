import { useState, useEffect } from 'react';
import { theme } from './theme';
import { useI18n } from './i18n/index.jsx';
import Hero from './components/Hero';
import Features from './components/Features';
import PhraseShowcase from './components/PhraseShowcase';
import ContractDemo from './components/ContractDemo';
import ScoreBoard from './components/ScoreBoard';
import LazyDetector from './components/LazyDetector';
import ModelDetector from './components/ModelDetector';

const NAV_ITEMS = [
  { key: 'nav.features', id: 'features' },
  { key: 'nav.phrases', id: 'phrases' },
  { key: 'nav.contract', id: 'contract' },
  { key: 'nav.score', id: 'score' },
  { key: 'nav.detect', id: 'detect' },
  { key: 'nav.model', id: 'model' },
];

const GITHUB_URL = 'https://github.com/shuaige121/renee-pua-skill';

function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const styles = {
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: scrolled ? 'rgba(16, 24, 38, 0.92)' : 'rgba(16, 24, 38, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${theme.stroke}`,
      transition: 'background-color 0.3s ease',
      fontFamily: theme.font,
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '56px',
    },
    brand: {
      fontSize: '1.15rem',
      fontWeight: 700,
      color: theme.accent,
      letterSpacing: '0.5px',
      cursor: 'pointer',
      flexShrink: 0,
    },
    desktopLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    navLink: {
      color: theme.muted,
      background: 'none',
      border: 'none',
      padding: '6px 12px',
      fontSize: '0.85rem',
      fontFamily: theme.font,
      cursor: 'pointer',
      borderRadius: theme.radiusSm,
      transition: 'color 0.2s, background 0.2s',
      whiteSpace: 'nowrap',
    },
    langToggle: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0',
      background: theme.card,
      borderRadius: '20px',
      border: `1px solid ${theme.stroke}`,
      padding: '2px',
      marginLeft: '8px',
      cursor: 'pointer',
      flexShrink: 0,
    },
    langOption: (active) => ({
      padding: '4px 12px',
      fontSize: '0.78rem',
      fontWeight: 600,
      fontFamily: theme.font,
      borderRadius: '16px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: active ? theme.bg : theme.muted,
      background: active ? theme.accent : 'transparent',
    }),
    hamburgerBtn: {
      display: 'none',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '4px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
    },
    hamburgerLine: {
      width: '20px',
      height: '2px',
      backgroundColor: theme.text,
      borderRadius: '1px',
      transition: 'transform 0.2s, opacity 0.2s',
    },
    mobileMenu: {
      display: menuOpen ? 'flex' : 'none',
      flexDirection: 'column',
      padding: '8px 24px 16px',
      gap: '4px',
      backgroundColor: 'rgba(16, 24, 38, 0.96)',
      borderBottom: `1px solid ${theme.stroke}`,
    },
    mobileLink: {
      color: theme.muted,
      background: 'none',
      border: 'none',
      padding: '10px 0',
      fontSize: '0.95rem',
      fontFamily: theme.font,
      cursor: 'pointer',
      textAlign: 'left',
      borderBottom: `1px solid ${theme.stroke}`,
    },
    githubLink: {
      color: theme.muted,
      textDecoration: 'none',
      padding: '6px 12px',
      fontSize: '0.85rem',
      fontFamily: theme.font,
      borderRadius: theme.radiusSm,
      transition: 'color 0.2s',
    },
  };

  const responsiveCSS = `
    @media (max-width: 768px) {
      .pua-nav-desktop { display: none !important; }
      .pua-nav-hamburger { display: flex !important; }
    }
    @media (min-width: 769px) {
      .pua-nav-mobile { display: none !important; }
    }
  `;

  return (
    <>
      <style>{responsiveCSS}</style>
      <nav style={styles.nav}>
        <div style={styles.container}>
          <span
            style={styles.brand}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Renee PUA
          </span>

          {/* Desktop navigation */}
          <div className="pua-nav-desktop" style={styles.desktopLinks}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                style={styles.navLink}
                onClick={() => handleNav(item.id)}
                onMouseEnter={(e) => {
                  e.target.style.color = theme.text;
                  e.target.style.background = theme.accentSoft;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = theme.muted;
                  e.target.style.background = 'none';
                }}
              >
                {t(item.key)}
              </button>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.githubLink}
              onMouseEnter={(e) => (e.target.style.color = theme.text)}
              onMouseLeave={(e) => (e.target.style.color = theme.muted)}
            >
              {t('nav.github')}
            </a>
            <div style={styles.langToggle}>
              <button
                style={styles.langOption(lang === 'zh')}
                onClick={() => setLang('zh')}
              >
                ZH
              </button>
              <button
                style={styles.langOption(lang === 'en')}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div
            className="pua-nav-hamburger"
            style={{ display: 'none', alignItems: 'center', gap: '8px' }}
          >
            <div style={styles.langToggle}>
              <button
                style={styles.langOption(lang === 'zh')}
                onClick={() => setLang('zh')}
              >
                ZH
              </button>
              <button
                style={styles.langOption(lang === 'en')}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
            <button
              style={{ ...styles.hamburgerBtn, display: 'flex' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span
                style={{
                  ...styles.hamburgerLine,
                  transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
                }}
              />
              <span
                style={{
                  ...styles.hamburgerLine,
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  ...styles.hamburgerLine,
                  transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="pua-nav-mobile" style={styles.mobileMenu}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              style={styles.mobileLink}
              onClick={() => handleNav(item.id)}
            >
              {t(item.key)}
            </button>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...styles.mobileLink,
              textDecoration: 'none',
              color: theme.muted,
              display: 'block',
            }}
          >
            {t('nav.github')}
          </a>
        </div>
      </nav>
    </>
  );
}

function Footer() {
  const { t } = useI18n();

  const styles = {
    footer: {
      backgroundColor: theme.bg,
      borderTop: `1px solid ${theme.stroke}`,
      padding: '32px 24px 40px',
      textAlign: 'center',
      fontFamily: theme.font,
    },
    line: {
      margin: '0 0 8px',
      lineHeight: 1.6,
      fontSize: '0.95rem',
      color: theme.muted,
    },
    subtle: {
      margin: 0,
      color: theme.muted,
      fontSize: '0.82rem',
      lineHeight: 1.6,
      opacity: 0.7,
    },
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.line}>{t('footer.copyright')}</p>
      <p style={styles.line}>{t('footer.disclaimer1')}</p>
      <p style={styles.subtle}>{t('footer.disclaimer2')}</p>
    </footer>
  );
}

function App() {
  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '56px' }}>
        <section id="hero">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="phrases">
          <PhraseShowcase />
        </section>
        <section id="contract">
          <ContractDemo />
        </section>
        <section id="score">
          <ScoreBoard />
        </section>
        <section id="detect">
          <LazyDetector />
        </section>
        <section id="model">
          <ModelDetector />
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default App;
