import { useState, useEffect } from 'react'

export default function LatihanKeranjang() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
  const previousTitle = document.title;
  document.title = `Keranjang (${cartCount})`;
  return () => {
    document.title = previousTitle;
  };
}, [cartCount]);

  return (
    <div>
      <p>Jumlah barang: {cartCount}</p>
      <button type="button" onClick={() => setCartCount((prev) => prev + 1)}>
        Tambah barang
      </button>

      <button type="button" onClick={() => setCartCount((prev) => prev > 0 ? prev - 1 : 0 )}>
        Kurang barang
      </button>
    </div>
  )
}

 