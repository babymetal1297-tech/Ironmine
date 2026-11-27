export const articles = [
  {
    id: '1',
    category: { id: 'Besi Beton', en: 'Rebar' },
    title: {
      id: 'Perbedaan Besi Beton Polos dan Ulir SNI untuk Struktur Bangunan',
      en: 'Plain vs. Deformed SNI Rebar: Choosing the Right Reinforcement',
    },
    excerpt: {
      id: 'Kenali fungsi besi polos BjTP dan besi ulir BjTS agar struktur kolom, balok, dan fondasi bangunan tetap aman dan efisien.',
      en: 'Understand where plain and deformed rebar excel so your columns, beams, and foundations stay structurally sound.',
    },
    author: 'Ir. Bagus Santoso',
    date: { id: '24 November 2026', en: 'November 24, 2026' },
    readTime: { id: '4 menit baca', en: '4 min read' },
    accentLabel: { id: 'STRUKTUR BETON', en: 'CONCRETE STRUCTURE' },
    paragraphs: {
      id: [
        'Dalam konstruksi bangunan, besi beton berfungsi menahan gaya tarik yang tidak mampu ditahan oleh beton cor. Secara umum terdapat dua jenis utama di pasaran: besi beton polos (BjTP) dan besi beton ulir (BjTS).',
        'Besi polos berdiameter 8mm hingga 12mm banyak dipakai untuk sengkang (begel) dan kolom praktis rumah satu lantai karena mudah ditekuk di lapangan.',
        'Sementara itu, besi ulir seperti D13 memiliki sirip melintang yang mengikat adukan beton jauh lebih kuat, sehingga wajib digunakan sebagai tulangan utama pada bangunan bertingkat dan fondasi berat.',
      ],
      en: [
        'In reinforced concrete construction, steel rebar resists tensile forces that concrete alone cannot handle. The two primary types are plain round bars and deformed (ribbed) bars.',
        'Plain bars in 8mm to 12mm diameters are widely used for stirrups and light single-story columns due to easy bending on site.',
        'Deformed bars such as D13 feature surface ribs that dramatically increase concrete bonding, making them essential for multi-story beams and heavy foundations.',
      ],
    },
    tips: {
      id: [
        'Selalu ukur diameter aktual besi menggunakan sigmat sebelum pemasangan.',
        'Pastikan panjang standar 12 meter per batang dan tidak berkarat parah.',
        'Gunakan kawat bendrat yang kuat saat mengikat tulangan di titik pertemuan.',
      ],
      en: [
        'Always verify actual bar diameter with a caliper before installation.',
        'Ensure standard 12-meter lengths are free from deep flaking rust.',
        'Use quality tie wire at every intersection to keep cages rigid during pouring.',
      ],
    },
  },
  {
    id: '2',
    category: { id: 'Baja Ringan', en: 'Light Steel' },
    title: {
      id: 'Panduan Memilih Ketebalan Kanal C dan Reng Baja Ringan',
      en: 'Guide to Selecting C-Channel and Batten Thickness for Roof Framing',
    },
    excerpt: {
      id: 'Jangan hanya melihat harga per batang. Ketebalan 0.75mm pada Kanal C sangat menentukan daya tahan atap terhadap beban genteng.',
      en: 'Look beyond price per bar—choosing full 0.75mm C-channels determines how safely your roof supports tile loads.',
    },
    author: 'Raka Pratama',
    date: { id: '20 November 2026', en: 'November 20, 2026' },
    readTime: { id: '5 menit baca', en: '5 min read' },
    accentLabel: { id: 'RANGKA ATAP', en: 'ROOF FRAMING' },
    paragraphs: {
      id: [
        'Rangka atap baja ringan semakin diminati karena ringan, anti rayap, dan pemasangannya cepat. Namun kesalahan memilih ketebalan profil dapat membuat rangka melendut.',
        'Untuk penutup atap ringan seperti spandek atau genteng metal, Kanal C 0.75mm dengan reng 0.45mm sudah memadai. Jika menggunakan genteng keramik atau beton yang berat, jarak antar kuda-kuda harus dirapatkan menjadi maksimal 100 cm.',
        'Pastikan lapisan pelindung Galvalume (AZ100) merata agar rangka tahan terhadap korosi di area lembap.',
      ],
      en: [
        'Light steel roof framing is popular for being lightweight, termite-proof, and fast to assemble—but undersized gauges can cause sagging.',
        'For metal sheets, 0.75mm C-channels paired with 0.45mm battens perform reliably. Heavy clay or concrete tiles require tighter truss spacing.',
        'Check for consistent Galvalume (AZ100) coating to protect against corrosion in humid climates.',
      ],
    },
    tips: {
      id: [
        'Gunakan baut roofing SDS khusus baja ringan pada setiap sambungan kuda-kuda.',
        'Hindari mencampur profil tipis non-standar pada bentangan atap lebar.',
        'Pasang alumunium foil di bawah reng untuk meredam panas dan kebisingan hujan.',
      ],
      en: [
        'Use proper SDS self-drilling screws at every truss joint.',
        'Avoid mixing thin non-standard profiles on wide roof spans.',
        'Install radiant barrier foil beneath battens to reduce heat and rain noise.',
      ],
    },
  },
  {
    id: '3',
    category: { id: 'Plat & Pipa', en: 'Plates & Pipes' },
    title: {
      id: 'Mengenal Plat Besi Hitam SPHC vs Pipa Galvanis untuk Bengkel Las',
      en: 'SPHC Black Steel Plates vs. Galvanized Pipes for Fabrication',
    },
    excerpt: {
      id: 'Memilih jenis baja yang tepat antara plat hitam dan pipa galvanis mempermudah proses pengelasan dan pengecatan akhir.',
      en: 'Understanding the welding and finishing characteristics of black steel plates and galvanized pipes saves shop time.',
    },
    author: 'Dimas Wibowo',
    date: { id: '15 November 2026', en: 'November 15, 2026' },
    readTime: { id: '4 menit baca', en: '4 min read' },
    accentLabel: { id: 'FABRIKASI & LAS', en: 'FABRICATION' },
    paragraphs: {
      id: [
        'Bengkel las membutuhkan material yang mudah dipotong, ditekuk, serta menghasilkan sambungan las yang matang. Plat besi hitam (SPHC) menjadi andalan untuk pembuatan pintu besi, bak kendaraan, hingga rangka mesin.',
        'Sebaliknya, pipa galvanis memiliki lapisan seng pelindung yang sangat baik untuk area luar ruangan seperti pagar, tiang kanopi, dan instalasi saluran air.',
        'Saat mengelas material galvanis, pastikan ventilasi bengkel cukup dan bersihkan sisa terak las lalu lapisi dengan cat zinc chromate di titik sambungan.',
      ],
      en: [
        'Fabrication shops rely on materials that cut, bend, and weld cleanly. Hot-rolled SPHC black steel plates are ideal for heavy doors, enclosures, and machine bases.',
        'Galvanized pipes offer superior zinc corrosion resistance for outdoor railings, canopy posts, and plumbing.',
        'When welding galvanized steel, ensure good ventilation and coat weld seams with zinc-rich primer afterward.',
      ],
    },
    tips: {
      id: [
        'Gunakan kawat las E6013 diameter 2.6mm untuk plat ketebalan 2mm agar tidak mudah berlubang.',
        'Lapisi plat hitam dengan cat dasar anti karat segera setelah fabrikasi selesai.',
        'Gunakan mata gerinda potong tipis 1.2mm untuk hasil potongan yang presisi.',
      ],
      en: [
        'Use 2.6mm E6013 electrodes on 2mm plates to prevent burn-through.',
        'Prime black steel immediately after welding to prevent surface rust.',
        'Use 1.2mm thin cutting discs for clean, fast, burr-free cuts.',
      ],
    },
  },
  {
    id: '4',
    category: { id: 'Perkakas', en: 'Hardware' },
    title: {
      id: 'Cara Menyimpan Material Besi di Proyek agar Terhindar dari Karat',
      en: 'How to Store Steel & Iron Materials on Site to Prevent Rust',
    },
    excerpt: {
      id: 'Penyimpanan yang tepat menjaga kualitas permukaan besi beton, hollow, dan kawat las tetap prima sebelum dipasang.',
      en: 'Proper stacking and dry storage keep rebar, hollow sections, and welding rods in top condition before installation.',
    },
    author: 'Siti Rahma',
    date: { id: '10 November 2026', en: 'November 10, 2026' },
    readTime: { id: '3 menit baca', en: '3 min read' },
    accentLabel: { id: 'MANAJEMEN PROYEK', en: 'SITE STORAGE' },
    paragraphs: {
      id: [
        'Material besi yang dibiarkan menyentuh tanah basah secara langsung akan cepat mengalami oksidasi dan korosi, terutama pada bagian bawah tumpukan.',
        'Selalu beri ganjalan balok kayu atau palet setinggi minimal 15 cm dari permukaan tanah dan tutup tumpukan dengan terpal kedap air saat hujan.',
        'Khusus kawat las listrik E6013, simpan di dalam wadah tertutup rapat agar fluks tidak menyerap kelembapan udara.',
      ],
      en: [
        'Steel stacked directly on damp soil quickly develops rust, especially along the bottom layer.',
        'Always elevate bars and sheets at least 15 cm off the ground on timber dunnage and cover them with waterproof tarps during rain.',
        'Keep E6013 welding electrodes sealed in dry containers so the flux coating does not absorb moisture.',
      ],
    },
    tips: {
      id: [
        'Pisahkan tumpukan besi berdasarkan ukuran diameter agar mudah diambil.',
        'Hindari menyimpan baja ringan di dekat bahan kimia asam atau semen basah.',
        'Gunakan prinsip FIFO (First In, First Out) saat memakai stok di gudang.',
      ],
      en: [
        'Sort stacked bars by diameter so crews can pull the right size quickly.',
        'Keep Galvalume channels away from wet cement or acidic chemicals.',
        'Follow First-In, First-Out rotation for warehouse inventory.',
      ],
    },
  },
];
