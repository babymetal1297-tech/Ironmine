import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Footer({ brandName = 'IronMine' }) {
  const { t } = useLanguage();

  return (
    <footer id="tentang" className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <span className="footer-brand">{brandName}</span>
            <p>{t.footer.desc}</p>
          </div>

          <div className="footer-col">
            <h4>{t.footer.navTitle}</h4>
            <ul>
              <li><Link to="/">{t.nav.home}</Link></li>
              <li><Link to="/catalog">{t.nav.catalog}</Link></li>
              <li><Link to="/articles">{t.nav.articles}</Link></li>
              <li><Link to="/cart">{t.nav.cart}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t.footer.serviceTitle}</h4>
            <ul>
              <li><Link to="/contact">{t.nav.contactFaq}</Link></li>
              <li><Link to="/contact">{t.footer.shipping}</Link></li>
              <li><Link to="/contact">{t.footer.warranty}</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {brandName} Store. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
