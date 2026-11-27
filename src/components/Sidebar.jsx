import { useLanguage } from '../context/LanguageContext.jsx';

export default function Sidebar({
  categories = ['all'],
  selectedCategory,
  onSelectCategory,
  priceRange,
  onSelectPriceRange,
  inStockOnly,
  onToggleInStockOnly,
  onResetFilters,
  totalFiltered,
  onClose,
}) {
  const { t } = useLanguage();
  const hasActiveFilter =
    selectedCategory !== 'all' || priceRange !== 'all' || inStockOnly;

  return (
    <aside className="sidebar" aria-label={t.sidebar.title}>
      <div className="sidebar-header">
        <h2>{t.sidebar.title}</h2>
        <div className="sidebar-header-actions">
          {hasActiveFilter && (
            <button
              type="button"
              className="sidebar-reset-btn"
              onClick={onResetFilters}
            >
              {t.sidebar.reset}
            </button>
          )}
          {onClose && (
            <button
              type="button"
              className="sidebar-close-btn"
              onClick={onClose}
              aria-label="Close"
              title="Close"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="sidebar-group">
        <h3>{t.sidebar.category}</h3>
        <ul className="sidebar-category-list">
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                className={`sidebar-category-btn ${
                  selectedCategory === category ? 'active' : ''
                }`}
                onClick={() => onSelectCategory(category)}
              >
                <span>
                  {category === 'all' ? t.sidebar.allCategories : category}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-group">
        <h3>{t.sidebar.priceRange}</h3>
        <div className="sidebar-radio-list">
          {t.sidebar.priceRanges.map((range) => (
            <label key={range.id} className="sidebar-option">
              <input
                type="radio"
                name="priceRange"
                value={range.id}
                checked={priceRange === range.id}
                onChange={() => onSelectPriceRange(range.id)}
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="sidebar-group">
        <h3>{t.sidebar.availability}</h3>
        <label className="sidebar-option">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStockOnly(e.target.checked)}
          />
          <span>{t.sidebar.inStockOnly}</span>
        </label>
      </div>

      <p className="sidebar-summary">
        {t.sidebar.showing} <strong>{totalFiltered}</strong>{' '}
        {t.sidebar.productsUnit}
      </p>
    </aside>
  );
}
