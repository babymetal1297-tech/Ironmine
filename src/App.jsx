import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx';
import { products } from './data/products.js';
import { articles } from './data/articles.js';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ArticlesPage from './pages/ArticlesPage.jsx';
import ArticleDetailPage from './pages/ArticleDetailPage.jsx';

function AppShell() {
  const { lang, t } = useLanguage();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('ironmine-theme');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ironmine-theme', theme);
  }, [theme]);

  useEffect(() => {
    const path = location.pathname;
    let pageTitle =
      lang === 'id'
        ? 'IronMine — Toko Besi & Baja Terpercaya'
        : 'IronMine — Trusted Iron & Steel Store';
    let pageDesc =
      lang === 'id'
        ? 'IronMine adalah distributor besi beton SNI, baja ringan, plat, pipa galvanis, dan perkakas konstruksi berkualitas.'
        : 'IronMine is a trusted supplier of SNI rebar, light steel framing, steel plates, galvanized pipes, and welding hardware.';

    if (path === '/catalog') {
      pageTitle = `${t.catalog.title} | IronMine`;
      pageDesc = t.catalog.subtitle;
    } else if (path.startsWith('/product/')) {
      const id = path.replace('/product/', '');
      const item = products.find((p) => String(p.id) === id);
      if (item) {
        pageTitle = `${item.title} | IronMine`;
        pageDesc = item.description;
      } else {
        pageTitle = `${t.detail.errorTitle} | IronMine`;
      }
    } else if (path === '/cart') {
      pageTitle = `${t.cart.title} | IronMine`;
      pageDesc = t.cart.emptyDesc;
    } else if (path === '/checkout') {
      pageTitle = `${t.checkout.title} | IronMine`;
      pageDesc = t.checkout.contactSection;
    } else if (path === '/contact') {
      pageTitle = `${t.contact.title} | IronMine`;
      pageDesc = t.contact.subtitle;
    } else if (path === '/articles') {
      pageTitle = `${t.articles.title} | IronMine`;
      pageDesc = t.articles.subtitle;
    } else if (path.startsWith('/articles/')) {
      const id = path.replace('/articles/', '');
      const article = articles.find((a) => a.id === id);
      if (article) {
        pageTitle = `${article.title[lang]} | IronMine`;
        pageDesc = article.excerpt[lang];
      } else {
        pageTitle = `${t.articles.notFoundTitle} | IronMine`;
      }
    }

    document.title = pageTitle;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDesc);
  }, [location.pathname, lang, t]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function handleToggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  function addToCart(product, quantity = 1) {
    if (!product || product.stock === 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, product.stock),
              }
            : item
        );
      }
      return [
        ...prev,
        { ...product, quantity: Math.min(quantity, product.stock) },
      ];
    });
  }

  function updateQuantity(productId, newQty) {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(newQty, item.stock ?? newQty) }
          : item
      )
    );
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <div id="top" className="page-shell">
      <Navbar
        brandName="IronMine"
        cartCount={cartCount}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <Routes>
        <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
        <Route
          path="/catalog"
          element={<CatalogPage onAddToCart={addToCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetailPage onAddToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onUpdateQty={updateQuantity}
              onRemove={removeFromCart}
              onClearCart={clearCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} onClearCart={clearCart} />}
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
      </Routes>

      <Footer brandName="IronMine" />

      <Link
        to="/contact"
        className="floating-contact-btn"
        aria-label={t.nav.contactFaq}
        title={t.nav.contactFaq}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
        <span className="floating-contact-label">{t.nav.contactFaq}</span>
      </Link>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
