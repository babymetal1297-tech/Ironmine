import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ContactPage() {
  const { t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  function handleToggleFaq(index) {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedName(name.trim() || 'Guest');
    setName('');
    setEmail('');
    setMessage('');
  }

  return (
    <main className="main-content">
      <div className="contact-page-header">
        <span className="hero-eyebrow">{t.contact.eyebrow}</span>
        <h1 className="cart-page-title">{t.contact.title}</h1>
        <p className="contact-subtitle">{t.contact.subtitle}</p>
      </div>

      <div className="contact-grid">
        <div className="contact-left-col">
          <section className="checkout-card contact-info-card">
            <h2>{t.contact.storeInfo}</h2>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-info-label">{t.contact.addressLabel}</span>
                <p>Jl. Kemang Raya No. 48, Jakarta Selatan 12730, Indonesia</p>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-label">{t.contact.hoursLabel}</span>
                <p>{t.contact.hoursLine1}</p>
                <p>{t.contact.hoursLine2}</p>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-label">{t.contact.contactLabel}</span>
                <p>halo@ironmine.store • (021) 555-0198</p>
              </div>
            </div>
          </section>

          <section className="checkout-card">
            <h2>{t.contact.faqTitle}</h2>
            <div className="faq-accordion">
              {t.contact.faqs.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={item.question}
                    className={`faq-item ${isOpen ? 'is-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="faq-trigger"
                      onClick={() => handleToggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.question}</span>
                      <span className="faq-icon" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && <p className="faq-answer">{item.answer}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <section className="checkout-card">
          <h2>{t.contact.formTitle}</h2>

          {submittedName && (
            <div className="contact-success-banner" role="status">
              <strong>{t.contact.sentTitle}</strong>
              <p>
                {t.contact.sentDescPrefix} {submittedName}.{' '}
                {t.contact.sentDescSuffix}
              </p>
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="contact-name">{t.contact.nameLabel}</label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder={t.contact.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-email">{t.contact.emailLabel}</label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">{t.contact.messageLabel}</label>
              <textarea
                id="contact-message"
                rows="5"
                required
                placeholder={t.contact.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button type="submit" className="checkout-cta-btn">
              {t.contact.sendBtn}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
