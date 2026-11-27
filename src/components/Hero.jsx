import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Hero({
  featuredProducts = [],
  bgProducts = [],
  onAddToCart,
}) {
  const { t, formatPrice } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = featuredProducts.length;
  const safeIndex = totalSlides > 0 ? activeIndex % totalSlides : 0;
  const currentProduct = totalSlides > 0 ? featuredProducts[safeIndex] : null;
  const marqueeItems = bgProducts.length > 0 ? [...bgProducts, ...bgProducts] : [];

  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(timer);
  }, [totalSlides, isPaused]);

  function handlePrev() {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }

  function handleNext() {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }

  return (
    <section className="hero-section">
      {marqueeItems.length > 0 && (
        <div className="hero-bg-marquee" aria-hidden="true">
          <div className="hero-bg-track">
            {marqueeItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="hero-bg-tile">
                <img src={item.thumbnail} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="hero-content">
        <span className="hero-eyebrow">{t.hero.eyebrow}</span>
        <h1>{t.hero.title}</h1>
        <p>{t.hero.subtitle}</p>
        <div className="hero-actions">
          <Link to="/catalog" className="hero-cta-btn">
            {t.hero.cta}
          </Link>
          {currentProduct && (
            <button
              type="button"
              className="hero-secondary-btn"
              onClick={() => onAddToCart?.(currentProduct)}
              disabled={currentProduct.stock === 0}
            >
              {t.hero.buyPrefix} {currentProduct.title}
            </button>
          )}
        </div>
      </div>

      <div
        className="hero-slideshow"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-roledescription="carousel"
        aria-label="Slideshow produk pilihan"
      >
        {currentProduct ? (
          <div className="hero-slide-card">
            <Link
              to={`/product/${currentProduct.id}`}
              className="hero-slide-img-wrap"
            >
              <img
                key={currentProduct.id}
                src={currentProduct.thumbnail}
                alt={currentProduct.title}
                className="hero-slide-img"
              />
              <span className="hero-slide-counter">
                {safeIndex + 1} / {totalSlides}
              </span>
            </Link>

            <div className="hero-slide-meta">
              <div className="hero-slide-info">
                <span className="hero-card-cat">{currentProduct.category}</span>
                <h3>
                  <Link
                    to={`/product/${currentProduct.id}`}
                    className="product-title-link"
                  >
                    {currentProduct.title}
                  </Link>
                </h3>
              </div>
              <strong className="hero-card-price">
                {formatPrice(currentProduct.price)}
              </strong>
            </div>

            {totalSlides > 1 && (
              <div className="hero-slide-controls">
                <button
                  type="button"
                  className="hero-slide-nav-btn"
                  onClick={handlePrev}
                  aria-label={t.hero.prevSlide}
                >
                  ‹
                </button>

                <div className="hero-slide-dots" role="tablist" aria-label="Pilih slide produk">
                  {featuredProducts.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`hero-slide-dot ${
                        idx === safeIndex ? 'active' : ''
                      }`}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Tampilkan ${item.title}`}
                      aria-selected={idx === safeIndex}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="hero-slide-nav-btn"
                  onClick={handleNext}
                  aria-label={t.hero.nextSlide}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hero-slide-card hero-spotlight-placeholder shimmer" />
        )}
      </div>
    </section>
  );
}
