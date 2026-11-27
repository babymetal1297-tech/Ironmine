import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function CartPage({ cart = [], onUpdateQty, onRemove, onClearCart }) {
  const { t, formatPrice } = useLanguage();
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const finalTotal = subtotal + tax;

  if (cart.length === 0) {
    return (
      <main className="main-content">
        <div className="cart-empty-state">
          <svg
            className="cart-empty-illustration"
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h1>{t.cart.emptyTitle}</h1>
          <p>{t.cart.emptyDesc}</p>
          <Link to="/catalog" className="hero-cta-btn">
            {t.cart.startShopping}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="cart-page-header">
        <div>
          <Link to="/catalog" className="detail-back-link">
            {t.cart.continueShopping}
          </Link>
          <h1 className="cart-page-title">{t.cart.title}</h1>
        </div>
        {onClearCart && (
          <button
            type="button"
            className="cart-clear-all-btn"
            onClick={onClearCart}
          >
            {t.cart.clearAll}
          </button>
        )}
      </div>

      <div className="cart-layout">
        <section className="cart-items-col" aria-label={t.cart.title}>
          {cart.map((item) => {
            const itemSubtotal = item.price * item.quantity;
            return (
              <article key={item.id} className="cart-item">
                <Link to={`/product/${item.id}`} className="cart-item-thumb-wrap">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="cart-item-thumb"
                  />
                </Link>

                <div className="cart-item-details">
                  <span className="cart-item-category">{item.category}</span>
                  <Link to={`/product/${item.id}`} className="cart-item-title">
                    {item.title}
                  </Link>
                  <p className="cart-item-unit-price">
                    {formatPrice(item.price)} {t.cart.perUnit}
                  </p>
                </div>

                <div className="cart-item-controls">
                  <div className="qty-stepper">
                    <button
                      type="button"
                      className="qty-stepper-btn"
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="qty-stepper-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-stepper-btn"
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      disabled={
                        typeof item.stock === 'number' && item.quantity >= item.stock
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-subtotal">
                    {formatPrice(itemSubtotal)}
                  </div>

                  <button
                    type="button"
                    className="cart-trash-btn"
                    onClick={() => onRemove(item.id)}
                    aria-label={item.title}
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
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        <aside className="order-summary-card" aria-label={t.cart.summaryTitle}>
          <h2>{t.cart.summaryTitle}</h2>

          <div className="summary-rows">
            <div className="summary-row">
              <span>{t.cart.subtotal}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>{t.cart.tax}</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="summary-row">
              <span>{t.cart.shipping}</span>
              <span className="summary-free">{t.cart.free}</span>
            </div>
          </div>

          <div className="summary-total-row">
            <span>{t.cart.totalPay}</span>
            <strong>{formatPrice(finalTotal)}</strong>
          </div>

          <Link to="/checkout" className="checkout-cta-btn">
            {t.cart.checkoutBtn}
          </Link>
        </aside>
      </div>
    </main>
  );
}
