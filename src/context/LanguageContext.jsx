import { createContext, useContext, useState, useEffect } from 'react';

const TRANSLATIONS = {
  id: {
    nav: {
      home: 'Beranda',
      catalog: 'Katalog',
      articles: 'Artikel',
      contact: 'Kontak',
      about: 'Tentang',
      cart: 'Keranjang',
      lightMode: 'Mode Terang',
      darkMode: 'Mode Gelap',
      openMenu: 'Buka menu navigasi',
      contactFaq: 'Kontak & FAQ',
    },
    hero: {
      eyebrow: 'Material Konstruksi SNI',
      title: 'Pasokan Besi & Baja Presisi untuk Proyek Anda.',
      subtitle:
        'Sedia besi beton polos & ulir, baja ringan Galvalume, plat hitam, pipa galvanis, hingga perkakas las dengan ukuran penuh dan siap kirim.',
      cta: 'Jelajahi Katalog',
      buyPrefix: '+ Beli',
      prevSlide: 'Produk sebelumnya',
      nextSlide: 'Produk berikutnya',
    },
    home: {
      stats: [
        { value: '12+', label: 'Material Utama' },
        { value: '4', label: 'Divisi Produk' },
        { value: 'SNI', label: 'Standar Mutu' },
        { value: '1–3 Hari', label: 'Kirim Proyek' },
      ],
      aboutEyebrow: 'Tentang IronMine',
      aboutTitle: 'Distributor Besi, Baja, dan Material Konstruksi Terpercaya.',
      aboutLead:
        'IronMine melayani kebutuhan kontraktor, bengkel las, maupun renovasi rumah dengan stok besi beton, baja ringan, plat, dan pipa berstandar SNI. Kami memastikan ketebalan dan panjang material sesuai spesifikasi.',
      pillars: [
        {
          title: 'Ukuran Penuh & Sertifikasi SNI',
          description:
            'Setiap batang besi beton, kanal C, dan plat baja dicek toleransi diameter serta ketebalannya sebelum dikirim.',
        },
        {
          title: 'Pengiriman Armada Proyek',
          description:
            'Siap kirim langsung ke lokasi proyek atau bengkel las dengan jadwal pengantaran yang terukur dan aman.',
        },
        {
          title: 'Konsultasi Kebutuhan Material',
          description:
            'Tim kami membantu menghitung estimasi batang, lembar, maupun baut yang dibutuhkan melalui halaman Kontak & FAQ.',
        },
      ],
      collectionsEyebrow: 'Divisi Material',
      collectionsTitle: 'Kategori Besi & Baja Tersedia',
      collectionsLink: 'Buka Halaman Katalog →',
      exploreCollection: 'Lihat Material →',
      collections: [
        {
          title: 'Besi Beton & Wiremesh',
          subtitle: 'Structural Rebar',
          categoryKey: 'Besi Beton',
          description: 'Besi polos, besi ulir D13, dan wiremesh M8 standar SNI untuk struktur.',
        },
        {
          title: 'Baja Ringan & Hollow',
          subtitle: 'Light Steel',
          categoryKey: 'Baja Ringan',
          description: 'Kanal C75, reng asimetris, dan hollow galvanis tahan karat.',
        },
        {
          title: 'Plat Besi, Pipa & Siku',
          subtitle: 'Plates & Pipes',
          categoryKey: 'Plat & Pipa',
          description: 'Plat SPHC, pipa galvanis Schedule 40, dan besi siku L serbaguna.',
        },
        {
          title: 'Perkakas, Baut & Las',
          subtitle: 'Hardware & Welding',
          categoryKey: 'Perkakas',
          description: 'Baut roofing SDS, mata gerinda potong 4", dan kawat las E6013.',
        },
      ],
      quote:
        '“Ukuran besi betonnya sesuai sigmat, pengiriman ke lokasi proyek tepat waktu, dan stok baja ringannya lengkap.”',
      quoteAuthor: '— Hendra Wijaya, Kontraktor Bangunan Tangerang',
      ctaEyebrow: 'Pemesanan Material',
      ctaTitle: 'Butuh Pasokan Besi & Baja Hari Ini?',
      ctaDesc:
        'Cek ketersediaan stok, bandingkan spesifikasi, dan pesan langsung melalui katalog IronMine.',
      ctaCatalog: 'Buka Katalog Material',
      ctaContact: 'Hubungi Tim Sales',
    },
    catalog: {
      eyebrow: 'Semua Material',
      title: 'Katalog Besi & Baja IronMine',
      subtitle:
        'Temukan besi beton SNI, baja ringan, plat, pipa, dan perkakas las dengan filter kategori serta pengurutan harga.',
      searchPlaceholder: 'Cari besi, baja, atau perkakas...',
      clearSearch: 'Bersihkan pencarian',
      sortLabel: 'Urutkan',
      sortDefault: 'Paling Sesuai',
      sortPriceAsc: 'Harga Terendah',
      sortPriceDesc: 'Harga Tertinggi',
      sortRatingDesc: 'Rating Tertinggi',
      allCategories: 'Semua',
      errorTitle: 'Gagal Memuat Data',
      emptyTitle: 'Belum Ada Produk',
      emptyDesc: 'Saat ini belum ada material yang tersedia di toko.',
      noMatchTitle: 'Material Tidak Ditemukan',
      noMatchDesc: 'Tidak ada material yang cocok dengan pencarianmu.',
    },
    sidebar: {
      title: 'Filter',
      reset: 'Reset',
      category: 'Kategori',
      allCategories: 'Semua Kategori',
      priceRange: 'Rentang Harga',
      priceRanges: [
        { id: 'all', label: 'Semua Harga' },
        { id: 'under-50', label: 'Di bawah Rp 800.000' },
        { id: '50-200', label: 'Rp 800.000 – Rp 3.200.000' },
        { id: 'above-200', label: 'Di atas Rp 3.200.000' },
      ],
      availability: 'Ketersediaan',
      inStockOnly: 'Hanya stok tersedia',
      showing: 'Menampilkan',
      productsUnit: 'item',
    },
    product: {
      stockEmpty: 'Habis',
      stockLow: 'Menipis',
      stockAvailable: 'Tersedia',
      viewDetail: 'Lihat Detail →',
      addToCart: 'Tambah ke Keranjang',
      added: 'Ditambahkan ✓',
      outOfStock: 'Stok Habis',
    },
    detail: {
      back: '← Kembali ke Katalog',
      errorTitle: 'Material Tidak Dapat Dimuat',
      notFound: 'Material tidak ditemukan.',
      stockRemaining: 'tersisa',
      stockCount: 'stok',
      addToCart: '+ Tambah ke Keranjang',
      added: 'Ditambahkan ke Keranjang ✓',
    },
    cart: {
      emptyTitle: 'Keranjang Belanja Masih Kosong',
      emptyDesc:
        'Belum ada material yang ditambahkan. Jelajahi katalog besi dan baja untuk memilih kebutuhan proyek Anda.',
      startShopping: 'Mulai Belanja',
      continueShopping: '← Lanjut Belanja',
      title: 'Keranjang Material',
      clearAll: 'Kosongkan Keranjang',
      perUnit: '/ unit',
      summaryTitle: 'Ringkasan Pesanan',
      subtotal: 'Subtotal',
      tax: 'Estimasi PPN (10%)',
      shipping: 'Pengiriman',
      free: 'Gratis',
      totalPay: 'Total Bayar',
      checkoutBtn: 'Lanjut ke Pembayaran',
    },
    checkout: {
      emptyTitle: 'Keranjang Anda Masih Kosong',
      emptyDesc:
        'Tambahkan material terlebih dahulu sebelum melanjutkan ke halaman pembayaran.',
      backCatalog: 'Kembali ke Katalog',
      backCart: '← Kembali ke Keranjang',
      title: 'Checkout Proyek',
      contactSection: 'Informasi Pemesan & Lokasi Kirim',
      fullName: 'Nama Lengkap / PIC Proyek',
      fullNamePlaceholder: 'Contoh: Hendra Wijaya',
      email: 'Email',
      address: 'Alamat Pengiriman / Lokasi Proyek',
      addressPlaceholder: 'Nama jalan, nomor proyek, RT/RW',
      city: 'Kota',
      cityPlaceholder: 'Jakarta Selatan',
      postalCode: 'Kode Pos',
      shippingSection: 'Armada Pengiriman',
      shippingOptions: [
        { id: 'regular', label: 'Armada Reguler Toko (2-4 Hari)', priceLabel: 'Rp 0', cost: 0 },
        { id: 'express', label: 'Kirim Kilat Proyek (1 Hari)', priceLabel: 'Rp 240.000', cost: 15 },
      ],
      paymentSection: 'Metode Pembayaran',
      paymentOptions: [
        { id: 'va', label: 'Virtual Account' },
        { id: 'card', label: 'Kartu Kredit/Debit' },
        { id: 'qris', label: 'QRIS Instant' },
      ],
      summaryTitle: 'Ringkasan Pesanan',
      shippingFee: 'Biaya Pengiriman',
      freeZero: 'Gratis (Rp 0)',
      tax: 'Pajak PPN (10%)',
      totalPay: 'Total Bayar',
      payNow: 'Bayar Sekarang',
      successEyebrow: 'Pesanan Dikonfirmasi',
      thanks: 'Terima Kasih',
      successSubtitle: 'Pesanan material Anda sedang disiapkan dan konfirmasi dikirim ke',
      orderNumber: 'Nomor Pesanan',
      paymentMethod: 'Metode Pembayaran',
      courier: 'Armada',
      itemsTitle: 'Rincian Material',
      totalPaid: 'Total Dibayar',
      backHome: 'Kembali ke Beranda',
    },
    contact: {
      eyebrow: 'Layanan Proyek & Gudang',
      title: 'Kontak & FAQ',
      subtitle:
        'Butuh penawaran harga grosir, jadwal armada kirim, atau cek spesifikasi SNI? Hubungi tim kami.',
      storeInfo: 'Gudang & Kantor',
      addressLabel: 'Alamat Gudang',
      hoursLabel: 'Jam Operasional',
      hoursLine1: 'Senin – Jumat: 08.00 – 17.00 WIB',
      hoursLine2: 'Sabtu: 08.00 – 14.00 WIB (Minggu Tutup)',
      contactLabel: 'Email & Telepon',
      faqTitle: 'Pertanyaan Umum (FAQ)',
      faqs: [
        {
          question: 'Apakah besi beton dan baja ringan dijamin sesuai ukuran SNI?',
          answer:
            'Ya, seluruh besi beton polos/ulir dan baja ringan kami memiliki sertifikasi SNI dengan toleransi ketebalan dan diameter yang dapat dicek langsung saat barang tiba.',
        },
        {
          question: 'Bagaimana sistem pengiriman material panjang 6m–12m?',
          answer:
            'Pengiriman menggunakan armada bak terbuka atau truk proyek khusus sehingga besi panjang 6 meter hingga 12 meter tetap lurus dan aman hingga lokasi.',
        },
        {
          question: 'Apakah bisa mengajukan tukar barang jika spesifikasi tidak sesuai?',
          answer:
            'Bisa. Kami memberikan garansi penukaran apabila material yang dikirim tidak sesuai dengan nota pesanan atau mengalami kerusakan pengiriman.',
        },
      ],
      formTitle: 'Minta Penawaran / Kirim Pesan',
      sentTitle: 'Pesan Terkirim!',
      sentDescPrefix: 'Terima kasih,',
      sentDescSuffix: 'Tim sales kami akan menghubungi Anda dalam 1×24 jam kerja.',
      nameLabel: 'Nama Lengkap',
      namePlaceholder: 'Nama Anda',
      emailLabel: 'Email',
      messageLabel: 'Pesan / Daftar Kebutuhan',
      messagePlaceholder: 'Tuliskan daftar material atau pertanyaan Anda di sini...',
      sendBtn: 'Kirim Pesan',
    },
    articles: {
      eyebrow: 'Panduan Konstruksi',
      title: 'Artikel & Edukasi Material',
      subtitle:
        'Panduan praktis memilih besi beton SNI, rangka atap baja ringan, plat besi, dan perawatan material di proyek.',
      allTopics: 'Semua Topik',
      by: 'Oleh',
      readMore: 'Baca Selengkapnya →',
      readShort: 'Baca →',
      backToList: '← Kembali ke Daftar Artikel',
      notFoundTitle: 'Artikel Tidak Ditemukan',
      notFoundDesc: 'Artikel yang Anda cari tidak tersedia atau telah dipindahkan.',
      seeAll: 'Lihat Semua Artikel',
      keyPoints: 'Poin Teknis',
      ctaTitle: 'Siap Memesan Material Proyek?',
      ctaDesc: 'Cek stok besi, baja ringan, dan perkakas las di katalog IronMine.',
      ctaBtn: 'Jelajahi Katalog',
      relatedTitle: 'Artikel Lainnya',
    },
    footer: {
      desc: 'Distributor besi beton SNI, baja ringan, plat, pipa galvanis, dan perlengkapan las terpercaya.',
      navTitle: 'Navigasi',
      serviceTitle: 'Layanan',
      shipping: 'Armada Pengiriman',
      warranty: 'Garansi Spesifikasi',
      rights: 'Seluruh hak cipta dilindungi.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      catalog: 'Catalog',
      articles: 'Articles',
      contact: 'Contact',
      about: 'About',
      cart: 'Cart',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      openMenu: 'Open navigation menu',
      contactFaq: 'Contact & FAQ',
    },
    hero: {
      eyebrow: 'Certified Steel Supply',
      title: 'Precision Iron & Steel for Every Build.',
      subtitle:
        'Stocking SNI-grade rebar, Galvalume light steel channels, black steel plates, galvanized pipes, and welding hardware ready for dispatch.',
      cta: 'Explore Catalog',
      buyPrefix: '+ Buy',
      prevSlide: 'Previous product',
      nextSlide: 'Next product',
    },
    home: {
      stats: [
        { value: '12+', label: 'Core Materials' },
        { value: '4', label: 'Steel Divisions' },
        { value: 'SNI', label: 'Quality Standard' },
        { value: '1–3 Days', label: 'Site Delivery' },
      ],
      aboutEyebrow: 'About IronMine',
      aboutTitle: 'Reliable Iron, Steel & Construction Supply.',
      aboutLead:
        'IronMine serves contractors, fabrication workshops, and home builders with SNI-certified rebar, light steel framing, steel plates, and galvanized pipes—verifying thickness and length on every order.',
      pillars: [
        {
          title: 'Full Gauge & SNI Certified',
          description:
            'Every rebar, C-channel, and steel plate is verified for diameter and thickness tolerance before dispatch.',
        },
        {
          title: 'Direct Site Fleet Delivery',
          description:
            'Scheduled truck delivery straight to your project site or workshop with safe long-bar handling.',
        },
        {
          title: 'Material Estimation Support',
          description:
            'Our team helps estimate bar counts, sheet quantities, and fasteners via Contact & FAQ.',
        },
      ],
      collectionsEyebrow: 'Material Divisions',
      collectionsTitle: 'Iron & Steel Categories',
      collectionsLink: 'Open Catalog Page →',
      exploreCollection: 'View Materials →',
      collections: [
        {
          title: 'Rebar & Wiremesh',
          subtitle: 'Structural Rebar',
          categoryKey: 'Besi Beton',
          description: 'Plain rebar, D13 deformed bars, and M8 wiremesh sheets.',
        },
        {
          title: 'Light Steel & Hollow',
          subtitle: 'Light Steel',
          categoryKey: 'Baja Ringan',
          description: 'C75 Galvalume channels, roof battens, and galvanized hollow.',
        },
        {
          title: 'Steel Plates, Pipes & Angles',
          subtitle: 'Plates & Pipes',
          categoryKey: 'Plat & Pipa',
          description: 'SPHC black plates, Schedule 40 galvanized pipes, and L-angles.',
        },
        {
          title: 'Hardware, Screws & Welding',
          subtitle: 'Hardware & Welding',
          categoryKey: 'Perkakas',
          description: 'SDS roofing screws, 4" cutting discs, and E6013 welding rods.',
        },
      ],
      quote:
        '“Exact rebar diameter on the caliper, on-time truck delivery to our site, and complete light steel stock.”',
      quoteAuthor: '— Hendra Wijaya, Building Contractor',
      ctaEyebrow: 'Order Materials',
      ctaTitle: 'Need Iron & Steel Delivered Today?',
      ctaDesc:
        'Check live warehouse stock, compare specifications, and place your order in the IronMine catalog.',
      ctaCatalog: 'Open Material Catalog',
      ctaContact: 'Contact Sales Team',
    },
    catalog: {
      eyebrow: 'All Materials',
      title: 'IronMine Steel Catalog',
      subtitle:
        'Browse SNI rebar, light steel channels, plates, pipes, and welding hardware with category filters and sorting.',
      searchPlaceholder: 'Search rebar, steel, or tools...',
      clearSearch: 'Clear search',
      sortLabel: 'Sort by',
      sortDefault: 'Featured',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      sortRatingDesc: 'Highest Rated',
      allCategories: 'All',
      errorTitle: 'Failed to Load Data',
      emptyTitle: 'No Materials Yet',
      emptyDesc: 'There are currently no materials available in the store.',
      noMatchTitle: 'No Matching Materials',
      noMatchDesc: 'No materials match your current search or filter criteria.',
    },
    sidebar: {
      title: 'Filters',
      reset: 'Reset',
      category: 'Category',
      allCategories: 'All Categories',
      priceRange: 'Price Range',
      priceRanges: [
        { id: 'all', label: 'All Prices' },
        { id: 'under-50', label: 'Under $50' },
        { id: '50-200', label: '$50 – $200' },
        { id: 'above-200', label: 'Above $200' },
      ],
      availability: 'Availability',
      inStockOnly: 'In stock only',
      showing: 'Showing',
      productsUnit: 'items',
    },
    product: {
      stockEmpty: 'Out of Stock',
      stockLow: 'Low Stock',
      stockAvailable: 'In Stock',
      viewDetail: 'View Details →',
      addToCart: 'Add to Cart',
      added: 'Added ✓',
      outOfStock: 'Out of Stock',
    },
    detail: {
      back: '← Back to Catalog',
      errorTitle: 'Unable to Load Material',
      notFound: 'Material not found.',
      stockRemaining: 'left',
      stockCount: 'in stock',
      addToCart: '+ Add to Cart',
      added: 'Added to Cart ✓',
    },
    cart: {
      emptyTitle: 'Your Material Cart is Empty',
      emptyDesc:
        'No materials have been added yet. Browse our iron and steel catalog for your project needs.',
      startShopping: 'Browse Materials',
      continueShopping: '← Continue Shopping',
      title: 'Material Cart',
      clearAll: 'Clear Cart',
      perUnit: '/ unit',
      summaryTitle: 'Order Summary',
      subtotal: 'Subtotal',
      tax: 'Estimated Tax (10%)',
      shipping: 'Shipping',
      free: 'Free',
      totalPay: 'Total',
      checkoutBtn: 'Proceed to Checkout',
    },
    checkout: {
      emptyTitle: 'Your Cart is Empty',
      emptyDesc:
        'Please add materials to your cart before proceeding to checkout.',
      backCatalog: 'Back to Catalog',
      backCart: '← Back to Cart',
      title: 'Project Checkout',
      contactSection: 'Buyer & Delivery Site Details',
      fullName: 'Full Name / Site PIC',
      fullNamePlaceholder: 'e.g. Hendra Wijaya',
      email: 'Email',
      address: 'Delivery / Project Address',
      addressPlaceholder: 'Street address, project site, block',
      city: 'City',
      cityPlaceholder: 'South Jakarta',
      postalCode: 'Postal Code',
      shippingSection: 'Delivery Fleet',
      shippingOptions: [
        { id: 'regular', label: 'Regular Store Truck (2-4 Days)', priceLabel: '$0.00', cost: 0 },
        { id: 'express', label: 'Express Project Fleet (1 Day)', priceLabel: '$15.00', cost: 15 },
      ],
      paymentSection: 'Payment Method',
      paymentOptions: [
        { id: 'va', label: 'Virtual Account' },
        { id: 'card', label: 'Credit / Debit Card' },
        { id: 'qris', label: 'QRIS Instant' },
      ],
      summaryTitle: 'Order Summary',
      shippingFee: 'Delivery Fee',
      freeZero: 'Free ($0.00)',
      tax: 'VAT Tax (10%)',
      totalPay: 'Total Due',
      payNow: 'Pay Now',
      successEyebrow: 'Order Confirmed',
      thanks: 'Thank You',
      successSubtitle: 'Your steel & hardware order is being prepared. Confirmation sent to',
      orderNumber: 'Order Number',
      paymentMethod: 'Payment Method',
      courier: 'Fleet',
      itemsTitle: 'Material List',
      totalPaid: 'Total Paid',
      backHome: 'Back to Home',
    },
    contact: {
      eyebrow: 'Project & Warehouse Support',
      title: 'Contact & FAQ',
      subtitle:
        'Need bulk quotes, delivery fleet schedules, or SNI specification sheets? Reach out to our team.',
      storeInfo: 'Warehouse & Office',
      addressLabel: 'Warehouse Address',
      hoursLabel: 'Operating Hours',
      hoursLine1: 'Monday – Friday: 08:00 – 17:00 WIB',
      hoursLine2: 'Saturday: 08:00 – 14:00 WIB (Closed on Sundays)',
      contactLabel: 'Email & Phone',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'Are your rebar and light steel channels guaranteed SNI spec?',
          answer:
            'Yes, all our rebar and Galvalume channels are SNI certified with full gauge thickness that can be inspected upon delivery.',
        },
        {
          question: 'How do you deliver 6m–12m long steel bars?',
          answer:
            'We dispatch flatbed and long-bed project trucks so 6-meter and 12-meter bars arrive straight and undamaged.',
        },
        {
          question: 'Can I exchange materials if specifications do not match?',
          answer:
            'Yes. We provide a replacement guarantee if any delivered material differs from your order specification.',
        },
      ],
      formTitle: 'Request Quote / Send Message',
      sentTitle: 'Message Sent!',
      sentDescPrefix: 'Thank you,',
      sentDescSuffix: 'Our sales team will contact you within 1×24 business hours.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your Name',
      emailLabel: 'Email',
      messageLabel: 'Message / Material List',
      messagePlaceholder: 'Write your material list or inquiry here...',
      sendBtn: 'Send Message',
    },
    articles: {
      eyebrow: 'Construction Guides',
      title: 'Steel & Material Articles',
      subtitle:
        'Practical guides on choosing SNI rebar, light steel roof framing, steel plates, and site material storage.',
      allTopics: 'All Topics',
      by: 'By',
      readMore: 'Read Full Article →',
      readShort: 'Read →',
      backToList: '← Back to Articles',
      notFoundTitle: 'Article Not Found',
      notFoundDesc: 'The article you are looking for is unavailable or has been moved.',
      seeAll: 'View All Articles',
      keyPoints: 'Technical Takeaways',
      ctaTitle: 'Ready to Order Project Materials?',
      ctaDesc: 'Browse rebar, light steel, and welding hardware in the IronMine catalog.',
      ctaBtn: 'Explore Catalog',
      relatedTitle: 'More Articles',
    },
    footer: {
      desc: 'Trusted supplier of SNI rebar, light steel framing, steel plates, galvanized pipes, and welding hardware.',
      navTitle: 'Navigation',
      serviceTitle: 'Services',
      shipping: 'Fleet Delivery',
      warranty: 'Spec Guarantee',
      rights: 'All rights reserved.',
    },
  },
};

const LanguageContext = createContext(null);

const USD_TO_IDR = 16000;

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('ironmine-lang');
    return saved === 'en' || saved === 'id' ? saved : 'id';
  });

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('ironmine-lang', lang);
  }, [lang]);

  function formatPrice(usdAmount) {
    const numeric = Number(usdAmount) || 0;
    if (lang === 'id') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(Math.round(numeric * USD_TO_IDR));
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numeric);
  }

  const value = {
    lang,
    setLang,
    t: TRANSLATIONS[lang],
    formatPrice,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
