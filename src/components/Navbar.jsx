import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Navbar({
  brandName,
  cartCount = 0,
  theme = 'light',
  onToggleTheme,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  function handleHomeClick() {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={handleHomeClick}>
          <span className="brand-mark" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 32 32"
              fill="none"
            >
              <polygon
                points="16,2 28,9 28,23 16,30 4,23 4,9"
                fill="currentColor"
                fillOpacity="0.16"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path
                d="M9 10H23V13.2H18.2V18.8H23V22H9V18.8H13.8V13.2H9V10Z"
                fill="#ffffff"
              />
            </svg>
          </span>
          <span className="brand-text-group">
            <span className="brand-title">{brandName}</span>
            <span className="brand-sub">STEEL &amp; SUPPLY</span>
          </span>
        </Link>

        <nav className="navbar-links" aria-label="Main navigation">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={handleHomeClick}
          >
            {t.nav.home}
          </Link>
          <Link
            to="/catalog"
            className={`nav-link ${location.pathname === '/catalog' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.catalog}
          </Link>
          <Link
            to="/articles"
            className={`nav-link ${location.pathname.startsWith('/articles') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.articles}
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.contact}
          </Link>
          <a href="#tentang" className="nav-link">
            {t.nav.about}
          </a>
        </nav>

        <div className="navbar-actions">
          <div className="lang-switcher" role="group" aria-label="Language switcher">
            <button
              type="button"
              className={`lang-btn ${lang === 'id' ? 'active' : ''}`}
              onClick={() => setLang('id')}
              aria-pressed={lang === 'id'}
            >
              ID
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? t.nav.lightMode : t.nav.darkMode}
            title={theme === 'dark' ? t.nav.lightMode : t.nav.darkMode}
          >
            {theme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          <Link
            to="/cart"
            className="cart-button"
            aria-label={`${t.nav.cart}, ${cartCount}`}
          >
            <svg
              className="cart-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-label">{t.nav.cart}</span>
            <span className="cart-badge">{cartCount}</span>
          </Link>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label={t.nav.openMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link
            to="/"
            className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={handleHomeClick}
          >
            {t.nav.home}
          </Link>
          <Link
            to="/catalog"
            className={`mobile-nav-link ${location.pathname === '/catalog' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.catalog}
          </Link>
          <Link
            to="/articles"
            className={`mobile-nav-link ${location.pathname.startsWith('/articles') ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.articles}
          </Link>
          <Link
            to="/contact"
            className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.contact}
          </Link>
          <a
            href="#tentang"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.nav.about}
          </a>
        </nav>
      )}
    </header>
  );
}
