import { useState } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ArticlesPage() {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(articles.map((a) => a.category[lang]))];

  const activeCategory = categories.includes(selectedCategory)
    ? selectedCategory
    : 'all';

  const filteredArticles =
    activeCategory === 'all'
      ? articles
      : articles.filter((a) => a.category[lang] === activeCategory);

  const featuredArticle = filteredArticles[0];
  const restArticles = filteredArticles.slice(1);

  return (
    <main className="main-content">
      <div className="contact-page-header">
        <span className="hero-eyebrow">{t.articles.eyebrow}</span>
        <h1 className="cart-page-title">{t.articles.title}</h1>
        <p className="contact-subtitle">{t.articles.subtitle}</p>
      </div>

      <div className="category-pills articles-filter-bar" role="group">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`pill-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? t.articles.allTopics : category}
          </button>
        ))}
      </div>

      {featuredArticle && (
        <article className="articles-featured">
          <div className="articles-featured-cover">
            <span className="article-cover-tag">
              {featuredArticle.accentLabel[lang]}
            </span>
            <span className="article-cover-cat">
              {featuredArticle.category[lang]}
            </span>
          </div>

          <div className="articles-featured-body">
            <div className="article-meta-row">
              <span>{featuredArticle.category[lang]}</span>
              <span>•</span>
              <span>{featuredArticle.readTime[lang]}</span>
              <span>•</span>
              <span>{featuredArticle.date[lang]}</span>
            </div>

            <h2>
              <Link to={`/articles/${featuredArticle.id}`}>
                {featuredArticle.title[lang]}
              </Link>
            </h2>
            <p>{featuredArticle.excerpt[lang]}</p>

            <div className="article-footer-row">
              <span className="article-author">
                {t.articles.by} {featuredArticle.author}
              </span>
              <Link
                to={`/articles/${featuredArticle.id}`}
                className="section-text-link"
              >
                {t.articles.readMore}
              </Link>
            </div>
          </div>
        </article>
      )}

      {restArticles.length > 0 && (
        <div className="articles-grid">
          {restArticles.map((article) => (
            <article key={article.id} className="article-card">
              <div className="article-card-banner">
                <span>{article.accentLabel[lang]}</span>
              </div>

              <div className="article-card-body">
                <div className="article-meta-row">
                  <span>{article.category[lang]}</span>
                  <span>•</span>
                  <span>{article.readTime[lang]}</span>
                </div>

                <h3>
                  <Link to={`/articles/${article.id}`}>
                    {article.title[lang]}
                  </Link>
                </h3>
                <p>{article.excerpt[lang]}</p>

                <div className="article-footer-row">
                  <span className="article-author">{article.date[lang]}</span>
                  <Link
                    to={`/articles/${article.id}`}
                    className="section-text-link"
                  >
                    {t.articles.readShort}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
