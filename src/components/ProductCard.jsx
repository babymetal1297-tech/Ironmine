import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ProductCard({ product, onAddToCart }) {
  const { id, title, price, stock, thumbnail, category, rating } = product;
  const [justAdded, setJustAdded] = useState(false);
  const { t, formatPrice } = useLanguage();

  const getStockBadge = (currentStock) => {
    if (currentStock === 0) {
      return {
        label: t.product.stockEmpty,
        className: 'stock-badge stock-badge--empty',
      };
    }
    if (currentStock <= 5) {
      return {
        label: t.product.stockLow,
        className: 'stock-badge stock-badge--low',
      };
    }
    return {
      label: t.product.stockAvailable,
      className: 'stock-badge stock-badge--available',
    };
  };

  const stockBadge = getStockBadge(stock);

  function handleAddClick() {
    onAddToCart?.(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  }

  return (
    <article className="product-card">
      <Link to={`/product/${id}`} className="product-image-wrap">
        <img src={thumbnail} alt={title} className="product-image" loading="lazy" />
        <span className={stockBadge.className}>{stockBadge.label}</span>
      </Link>

      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{category}</span>
          <div className="product-rating">
            <svg
              className="star-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>{typeof rating === 'number' ? rating.toFixed(1) : rating}</span>
          </div>
        </div>

        <h3 className="product-title" title={title}>
          <Link to={`/product/${id}`} className="product-title-link">
            {title}
          </Link>
        </h3>

        <div className="product-footer">
          <div className="product-price-row">
            <span className="product-price">{formatPrice(price)}</span>
            <Link to={`/product/${id}`} className="detail-link">
              {t.product.viewDetail}
            </Link>
          </div>

          <button
            type="button"
            className={`add-to-cart-btn ${justAdded ? 'is-added' : ''}`}
            disabled={stock === 0}
            onClick={handleAddClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
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
            <span>
              {stock === 0
                ? t.product.outOfStock
                : justAdded
                  ? t.product.added
                  : t.product.addToCart}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
