import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { products } from '../data/products.js';

export default function HomePage({ onAddToCart }) {
  const { t } = useLanguage();
  const storyImages = products.slice(3, 5);

  const getCategoryThumb = (categoryKey) => {
    const match = products.find((item) => item.category === categoryKey);
    return match?.thumbnail || '';
  };

  return (
    <main className="main-content">
      <Hero
        featuredProducts={products}
        bgProducts={products}
        onAddToCart={onAddToCart}
      />

      <section className="home-stats-strip" aria-label={t.home.aboutEyebrow}>
        {t.home.stats.map((stat) => (
          <div key={stat.label} className="home-stat-item">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="home-story-section" aria-labelledby="about-store-heading">
        <div className="home-story-grid">
          <div className="home-story-copy">
            <span className="hero-eyebrow">{t.home.aboutEyebrow}</span>
            <h2 id="about-store-heading">{t.home.aboutTitle}</h2>
            <p className="home-story-lead">{t.home.aboutLead}</p>

            <div className="home-pillar-list">
              {t.home.pillars.map((pillar, index) => (
                <div key={pillar.title} className="home-pillar-row">
                  <span className="pillar-badge">0{index + 1}</span>
                  <div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="home-story-visual" aria-hidden="true">
            <div className="story-collage">
              {storyImages.map((item, idx) => (
                <div
                  key={item.id}
                  className={`story-frame story-frame--${idx + 1}`}
                >
                  <img src={item.thumbnail} alt="" loading="lazy" />
                  <div className="story-frame-caption">
                    <span>{item.category}</span>
                    <strong>{item.title}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-collections-section" aria-labelledby="collections-heading">
        <div className="section-heading-row">
          <div>
            <span className="hero-eyebrow">{t.home.collectionsEyebrow}</span>
            <h2 id="collections-heading">{t.home.collectionsTitle}</h2>
          </div>
          <Link to="/catalog" className="section-text-link">
            {t.home.collectionsLink}
          </Link>
        </div>

        <div className="home-collections-grid">
          {t.home.collections.map((col) => {
            const thumb = getCategoryThumb(col.categoryKey);
            return (
              <Link key={col.categoryKey} to="/catalog" className="home-collection-card">
                <div className="collection-thumb-wrap">
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={col.title}
                      className="collection-thumb"
                      loading="lazy"
                    />
                  ) : (
                    <div className="collection-thumb-placeholder shimmer" />
                  )}
                </div>
                <div className="collection-body">
                  <span className="collection-sub">{col.subtitle}</span>
                  <h3>{col.title}</h3>
                  <p>{col.description}</p>
                  <span className="collection-arrow">{t.home.exploreCollection}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-quote-section">
        <blockquote>{t.home.quote}</blockquote>
        <cite>{t.home.quoteAuthor}</cite>
      </section>

      <section className="home-cta-banner">
        <div>
          <span className="hero-eyebrow">{t.home.ctaEyebrow}</span>
          <h2>{t.home.ctaTitle}</h2>
          <p>{t.home.ctaDesc}</p>
        </div>
        <div className="home-cta-actions">
          <Link to="/catalog" className="hero-cta-btn">
            {t.home.ctaCatalog}
          </Link>
          <Link to="/contact" className="hero-secondary-btn">
            {t.home.ctaContact}
          </Link>
        </div>
      </section>
    </main>
  );
}
