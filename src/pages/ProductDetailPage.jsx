import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { products } from '../data/products.js';

export default function ProductDetailPage({ onAddToCart }) {
  const { id } = useParams();
  const { t, formatPrice } = useLanguage();
  const product = products.find((item) => String(item.id) === String(id)) ?? null;

  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const images =
    product && Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product?.thumbnail
        ? [product.thumbnail]
        : [];

  const activeImage =
    selectedImage && images.includes(selectedImage)
      ? selectedImage
      : images[0] || '';

  const getStockBadge = (currentStock) => {
    if (currentStock === 0) {
      return {
        label: t.product.stockEmpty,
        className: 'stock-badge stock-badge--empty',
      };
    }
    if (currentStock <= 5) {
      return {
        label: `${t.product.stockLow} (${currentStock} ${t.detail.stockRemaining})`,
        className: 'stock-badge stock-badge--low',
      };
    }
    return {
      label: `${t.product.stockAvailable} (${currentStock} ${t.detail.stockCount})`,
      className: 'stock-badge stock-badge--available',
    };
  };

  function handleDecrease() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  function handleIncrease() {
    if (!product) return;
    setQuantity((prev) => Math.min(product.stock, prev + 1));
  }

  function handleAddToCart() {
    if (!product || product.stock === 0) return;
    onAddToCart?.(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1000);
  }

  return (
    <main className="main-content">
      <Link to="/catalog" className="detail-back-link">
        {t.detail.back}
      </Link>

      {!product ? (
        <div className="state-box state-box--error" role="alert">
          <h2>{t.detail.errorTitle}</h2>
          <p>{t.detail.notFound}</p>
        </div>
      ) : (
        <div className="detail-layout">
          <div className="detail-gallery">
            <div className="detail-main-image-wrap">
              <img
                src={activeImage}
                alt={product.title}
                className="detail-main-image"
              />
            </div>

            {images.length > 1 && (
              <div className="detail-thumbs" role="group">
                {images.map((imgUrl, index) => (
                  <button
                    key={`${imgUrl}-${index}`}
                    type="button"
                    className={`detail-thumb-btn ${
                      activeImage === imgUrl ? 'active' : ''
                    }`}
                    onClick={() => setSelectedImage(imgUrl)}
                  >
                    <img src={imgUrl} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="detail-buy-box">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-title">{product.title}</h1>

            <div className="detail-rating-row">
              <div className="product-rating">
                <svg
                  className="star-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>
                  {typeof product.rating === 'number'
                    ? product.rating.toFixed(1)
                    : product.rating}
                </span>
              </div>

              <span className={getStockBadge(product.stock).className}>
                {getStockBadge(product.stock).label}
              </span>
            </div>

            <div className="detail-price">{formatPrice(product.price)}</div>

            <p className="detail-description">{product.description}</p>

            <div className="detail-purchase-controls">
              <div className="qty-stepper">
                <button
                  type="button"
                  className="qty-stepper-btn"
                  onClick={handleDecrease}
                  disabled={quantity <= 1 || product.stock === 0}
                >
                  −
                </button>
                <span className="qty-stepper-value">{quantity}</span>
                <button
                  type="button"
                  className="qty-stepper-btn"
                  onClick={handleIncrease}
                  disabled={quantity >= product.stock || product.stock === 0}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={`detail-add-btn ${justAdded ? 'is-added' : ''}`}
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                {product.stock === 0
                  ? t.product.outOfStock
                  : justAdded
                    ? t.detail.added
                    : t.detail.addToCart}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
