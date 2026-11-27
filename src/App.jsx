import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx';
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
  const { t } = useLanguage();
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
