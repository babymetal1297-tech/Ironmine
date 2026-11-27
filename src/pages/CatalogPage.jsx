import { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { products } from '../data/products.js';

export default function CatalogPage({ onAddToCart }) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleResetFilters() {
    setSelectedCategory('all');
    setPriceRange('all');
    setInStockOnly(false);
    setSearchQuery('');
  }

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesStock = !inStockOnly || product.stock > 0;

      let matchesPrice = true;
      if (priceRange === 'under-50') {
        matchesPrice = product.price < 50;
      } else if (priceRange === '50-200') {
        matchesPrice = product.price >= 50 && product.price <= 200;
      } else if (priceRange === 'above-200') {
        matchesPrice = product.price > 200;
      }

      return matchesSearch && matchesCategory && matchesStock && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      return 0;
    });

  return (
    <>
      <div
        className={`sidebar-hover-dock ${isSidebarOpen ? 'is-open' : ''}`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <button
          type="button"
          className="sidebar-dock-trigger"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          aria-expanded={isSidebarOpen}
          aria-label={t.sidebar.title}
        >
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
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="7" x2="17" y1="12" y2="12" />
            <line x1="10" x2="14" y1="18" y2="18" />
          </svg>
          <span>{t.sidebar.title}</span>
        </button>

        <div className="sidebar-hover-panel">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            priceRange={priceRange}
            onSelectPriceRange={setPriceRange}
            inStockOnly={inStockOnly}
            onToggleInStockOnly={setInStockOnly}
            onResetFilters={handleResetFilters}
            totalFiltered={filteredProducts.length}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
      </div>

      <main className="main-content">
        <div className="catalog-page-header">
          <span className="hero-eyebrow">{t.catalog.eyebrow}</span>
          <h1 className="cart-page-title">{t.catalog.title}</h1>
          <p className="contact-subtitle">{t.catalog.subtitle}</p>
        </div>

        <div id="katalog-produk" className="catalog-layout catalog-layout--full">
          <div className="catalog-main">
            <section className="toolbar" aria-label={t.catalog.title}>
              <div className="toolbar-top">
                <div className="search-box">
                  <svg
                    className="search-icon"
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
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    type="text"
                    className="search-input"
                    placeholder={t.catalog.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label={t.catalog.searchPlaceholder}
                  />
                  {searchQuery !== '' && (
                    <button
                      type="button"
                      className="search-clear-btn"
                      onClick={() => setSearchQuery('')}
                      aria-label={t.catalog.clearSearch}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="sort-control">
                  <label htmlFor="sort-select" className="sort-label">
                    {t.catalog.sortLabel}
                  </label>
                  <select
                    id="sort-select"
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="default">{t.catalog.sortDefault}</option>
                    <option value="price-asc">{t.catalog.sortPriceAsc}</option>
                    <option value="price-desc">{t.catalog.sortPriceDesc}</option>
                    <option value="rating-desc">{t.catalog.sortRatingDesc}</option>
                  </select>
                </div>
              </div>

              <div className="category-pills" role="group" aria-label={t.sidebar.category}>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`pill-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? t.catalog.allCategories : category}
                  </button>
                ))}
              </div>
            </section>

            {products.length === 0 ? (
              <div className="state-box">
                <h2>{t.catalog.emptyTitle}</h2>
                <p>{t.catalog.emptyDesc}</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="state-box">
                <h2>{t.catalog.noMatchTitle}</h2>
                <p>{t.catalog.noMatchDesc}</p>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
