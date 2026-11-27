import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function CheckoutPage({ cart = [], onClearCart }) {
  const { t, formatPrice } = useLanguage();
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [shippingId, setShippingId] = useState('regular');
  const [paymentMethod, setPaymentMethod] = useState('va');
  const [orderSuccess, setOrderSuccess] = useState(null);

  const selectedShipping =
    t.checkout.shippingOptions.find((opt) => opt.id === shippingId) ??
    t.checkout.shippingOptions[0];
  const selectedPayment =
    t.checkout.paymentOptions.find((opt) => opt.id === paymentMethod) ??
    t.checkout.paymentOptions[0];

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + selectedShipping.cost + tax;

  function handleSubmit(event) {
    event.preventDefault();
    if (cart.length === 0) return;

    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    const randomCode = 1000 + (randomArray[0] % 9000);
    const orderData = {
      orderId: `ORD-2026-${randomCode}`,
      customerName: customerName.trim(),
      email: email.trim(),
      shippingLabel: selectedShipping.label,
      shippingCost: selectedShipping.cost,
      paymentLabel: selectedPayment.label,
      subtotal,
      tax,
      total,
      items: cart.map((item) => ({ ...item })),
    };

    setOrderSuccess(orderData);
    onClearCart?.();
  }

  if (orderSuccess) {
    return (
      <main className="main-content">
        <div className="success-invoice-card">
          <div className="success-icon-wrap" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>

          <span className="success-eyebrow">{t.checkout.successEyebrow}</span>
          <h1>
            {t.checkout.thanks}, {orderSuccess.customerName}!
          </h1>
          <p className="success-subtitle">
            {t.checkout.successSubtitle} <strong>{orderSuccess.email}</strong>.
          </p>

          <div className="invoice-meta">
            <div>
              <span>{t.checkout.orderNumber}</span>
              <strong>{orderSuccess.orderId}</strong>
            </div>
            <div>
              <span>{t.checkout.paymentMethod}</span>
              <strong>{orderSuccess.paymentLabel}</strong>
            </div>
            <div>
              <span>{t.checkout.courier}</span>
              <strong>{orderSuccess.shippingLabel}</strong>
            </div>
          </div>

          <div className="invoice-items">
            <h3>{t.checkout.itemsTitle}</h3>
            <ul>
              {orderSuccess.items.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="invoice-totals">
            <div>
              <span>{t.cart.subtotal}</span>
              <span>{formatPrice(orderSuccess.subtotal)}</span>
            </div>
            <div>
              <span>{t.checkout.shippingFee}</span>
              <span>
                {orderSuccess.shippingCost === 0
                  ? t.cart.free
                  : formatPrice(orderSuccess.shippingCost)}
              </span>
            </div>
            <div>
              <span>{t.checkout.tax}</span>
              <span>{formatPrice(orderSuccess.tax)}</span>
            </div>
            <div className="invoice-grand-total">
              <span>{t.checkout.totalPaid}</span>
              <strong>{formatPrice(orderSuccess.total)}</strong>
            </div>
          </div>

          <Link to="/" className="hero-cta-btn">
            {t.checkout.backHome}
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="main-content">
        <div className="state-box" role="alert">
          <h2>{t.checkout.emptyTitle}</h2>
          <p>{t.checkout.emptyDesc}</p>
          <div style={{ marginTop: '1.25rem' }}>
            <Link to="/catalog" className="hero-cta-btn">
              {t.checkout.backCatalog}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="cart-page-header">
        <div>
          <Link to="/cart" className="detail-back-link">
            {t.checkout.backCart}
          </Link>
          <h1 className="cart-page-title">{t.checkout.title}</h1>
        </div>
      </div>

      <form className="checkout-grid" onSubmit={handleSubmit}>
        <div className="checkout-form-col">
          <section className="checkout-card">
            <h2>{t.checkout.contactSection}</h2>

            <div className="form-grid">
              <div className="form-field form-field--full">
                <label htmlFor="customerName">{t.checkout.fullName}</label>
                <input
                  id="customerName"
                  type="text"
                  required
                  placeholder={t.checkout.fullNamePlaceholder}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="form-field form-field--full">
                <label htmlFor="email">{t.checkout.email}</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-field form-field--full">
                <label htmlFor="address">{t.checkout.address}</label>
                <textarea
                  id="address"
                  rows="3"
                  required
                  placeholder={t.checkout.addressPlaceholder}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="city">{t.checkout.city}</label>
                <input
                  id="city"
                  type="text"
                  required
                  placeholder={t.checkout.cityPlaceholder}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="postalCode">{t.checkout.postalCode}</label>
                <input
                  id="postalCode"
                  type="text"
                  required
                  placeholder="12345"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="checkout-card">
            <h2>{t.checkout.shippingSection}</h2>
            <div className="radio-card-list">
              {t.checkout.shippingOptions.map((option) => (
                <label
                  key={option.id}
                  className={`radio-card ${
                    shippingId === option.id ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={shippingId === option.id}
                    onChange={() => setShippingId(option.id)}
                  />
                  <span className="radio-card-label">{option.label}</span>
                  <strong className="radio-card-price">{option.priceLabel}</strong>
                </label>
              ))}
            </div>
          </section>

          <section className="checkout-card">
            <h2>{t.checkout.paymentSection}</h2>
            <div className="radio-card-list">
              {t.checkout.paymentOptions.map((option) => (
                <label
                  key={option.id}
                  className={`radio-card ${
                    paymentMethod === option.id ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.id}
                    checked={paymentMethod === option.id}
                    onChange={() => setPaymentMethod(option.id)}
                  />
                  <span className="radio-card-label">{option.label}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="order-summary-card" aria-label={t.checkout.summaryTitle}>
          <h2>{t.checkout.summaryTitle}</h2>

          <ul className="checkout-summary-items">
            {cart.map((item) => (
              <li key={item.id} className="checkout-summary-item">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </li>
            ))}
          </ul>

          <div className="summary-rows">
            <div className="summary-row">
              <span>{t.cart.subtotal}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>{t.checkout.shippingFee}</span>
              <span>
                {selectedShipping.cost === 0
                  ? t.checkout.freeZero
                  : formatPrice(selectedShipping.cost)}
              </span>
            </div>
            <div className="summary-row">
              <span>{t.checkout.tax}</span>
              <span>{formatPrice(tax)}</span>
            </div>
          </div>

          <div className="summary-total-row">
            <span>{t.checkout.totalPay}</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <button type="submit" className="checkout-cta-btn">
            {t.checkout.payNow} {formatPrice(total)}
          </button>
        </aside>
      </form>
    </main>
  );
}
