import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const article = articles.find((item) => item.id === id);

  if (!article) {
    return (
      <main className="main-content">
        <Link to="/articles" className="detail-back-link">
          {t.articles.backToList}
        </Link>
        <div className="state-box" role="alert">
          <h2>{t.articles.notFoundTitle}</h2>
          <p>{t.articles.notFoundDesc}</p>
          <div style={{ marginTop: '1.25rem' }}>
            <Link to="/articles" className="hero-cta-btn">
              {t.articles.seeAll}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const relatedArticles = articles
    .filter((item) => item.id !== article.id)
    .slice(0, 3);

  return (
    <main className="main-content">
      <Link to="/articles" className="detail-back-link">
        {t.articles.backToList}
      </Link>

      <article className="article-detail">
        <header className="article-detail-header">
          <span className="hero-eyebrow">{article.category[lang]}</span>
          <h1>{article.title[lang]}</h1>
          <div className="article-meta-row">
            <span>
              {t.articles.by} {article.author}
            </span>
            <span>•</span>
            <span>{article.date[lang]}</span>
            <span>•</span>
            <span>{article.readTime[lang]}</span>
          </div>
        </header>

        <div className="article-detail-lead">
          <p>{article.excerpt[lang]}</p>
        </div>

        <div className="article-detail-content">
          {article.paragraphs[lang].map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {Array.isArray(article.tips[lang]) && article.tips[lang].length > 0 && (
          <aside className="article-tips-box">
            <h3>{t.articles.keyPoints}</h3>
            <ul>
              {article.tips[lang].map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </aside>
        )}

        <div className="article-detail-cta">
          <div>
            <h3>{t.articles.ctaTitle}</h3>
            <p>{t.articles.ctaDesc}</p>
          </div>
          <Link to="/catalog" className="hero-cta-btn">
            {t.articles.ctaBtn}
          </Link>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="related-articles-section" aria-label={t.articles.relatedTitle}>
          <h2>{t.articles.relatedTitle}</h2>
          <div className="articles-grid">
            {relatedArticles.map((item) => (
              <article key={item.id} className="article-card">
                <div className="article-card-body">
                  <div className="article-meta-row">
                    <span>{item.category[lang]}</span>
                    <span>•</span>
                    <span>{item.readTime[lang]}</span>
                  </div>
                  <h3>
                    <Link to={`/articles/${item.id}`}>{item.title[lang]}</Link>
                  </h3>
                  <p>{item.excerpt[lang]}</p>
                  <div className="article-footer-row">
                    <span className="article-author">{item.date[lang]}</span>
                    <Link to={`/articles/${item.id}`} className="section-text-link">
                      {t.articles.readShort}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
