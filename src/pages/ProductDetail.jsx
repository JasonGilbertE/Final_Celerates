import React, { useState, useEffect } from "react";
import Card from "../components/KategoriCard"; // Pastikan path ini benar
import PopularCard from "../components/PopularCard";
import productData from "../services/ProductData";
import { useParams } from "react-router-dom"; // Untuk mengambil params dari URL
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductDetail = () => {
  const { id } = useParams(); // Mengambil id produk dari URL
  const [mainImage, setMainImage] = useState("/assets/images/P_BLOUSEBIRU.jpeg");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    // Filter produk berdasarkan kategori 'Pakaian' dan tampilkan hanya 4 produk
    const pakaianProducts = productData.filter((product) => product.category === "pakaian").slice(0, 4);
    setCategoryProducts(pakaianProducts);
  }, []);

  const product = productData.find((product) => product.id === parseInt(id));
  if (product) {
    setMainImage("/assets/images/${product.img}");
  } else {
    console.error("Produk tidak ditemukan.");
  }

  const changeImage = (e) => {
    setMainImage(e.target.src);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="bg-white text-gray-800">
      <Header />

      {/* Subheader */}
      <div className="container mt-24 mx-auto flex items-center py-4 px-6 border-b border-black">
        <i className="fas fa-shopping-bag text-2xl mr-2"></i>
        <span className="text-xl font-bold">Membeli</span>
      </div>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-6">
        <div className="flex space-x-8">
          {/* Product Image */}
          <div className="w-1/2">
            <img id="mainImage" alt="Blouse Batik Kekinian" className="w-[500px] h-[500px]" height="600" src={mainImage} />
            
          </div>

          {/* Product Details */}
          <div className="w-1/2">
            <h1 className="text-2xl font-bold">Blouse Batik Kekinian</h1>
            <p className="mt-2">Tampil trendi dengan blouse batik kekinian yang memadukan motif tradisional dengan sentuhan desain modern.</p>
            <div className="flex items-center mt-4">
              <div className="flex items-center text-yellow-500">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="ml-2">(90 Review)</span>
            </div>
            <div className="product-details">
              <div>
                <span>Produk</span>: Pakaian Wanita
              </div>
              <div>
                <span>Warna</span>: Biru
              </div>
              <div>
                <span>Ukuran</span>: L
              </div>
              <div>
                <span>Model</span>: Lengan Panjang
              </div>
              <div>
                <span>Jumlah</span>: 1
              </div>
            </div>
            <div className="mt-4 text-red-600 text-xl font-bold">Rp. 270.000</div>
            <div className="flex items-center mt-4 space-x-2">
              <div className="flex items-center border border-gray-300 rounded-md h-12">
                <button className="bg-gray-200 text-gray-800 px-4 py-2 h-full" onClick={decreaseQuantity}>
                  -
                </button>
                <input className="w-16 text-center border-t border-b border-gray-300 h-full" id="quantity" type="number" value={quantity} readOnly />
                <button className="bg-gray-200 text-gray-800 px-4 py-2 h-full" onClick={increaseQuantity}>
                  +
                </button>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center h-12">Beli Sekarang</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center h-12">
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="border-b border-gray-300">
            <ul className="flex space-x-8">
              <li className={`py-2 px-4 tablinks ${activeTab === "deskripsi" ? "active" : ""}`} onClick={() => openTab("deskripsi")}>
                Deskripsi
              </li>
              <li className={`py-2 px-4 tablinks ${activeTab === "informasi" ? "active" : ""}`} onClick={() => openTab("informasi")}>
                Informasi
              </li>
              <li className={`py-2 px-4 tablinks ${activeTab === "penilaian" ? "active" : ""}`} onClick={() => openTab("penilaian")}>
                Penilaian Produk
              </li>
            </ul>
          </div>

          <div id="deskripsi" className={`tab-content mt-4 ${activeTab === "deskripsi" ? "block" : "hidden"}`}>
            <p>
              Tampil trendi dengan blouse batik kekinian yang memadukan motif tradisional dengan sentuhan desain modern. Blouse ini hadir dalam berbagai model - dari lengan longceng hingga potongan asimetris - cocok untuk berbagai suasana,
              baik santai maupun formal. Dibuat dari bahan berkualitas tinggi yang nyaman di kulit, blouse batik kekinian ini menghadirkan beragam warna dan motif unik yang membuat penampilan Anda semakin stylish sekaligus berbudaya.
            </p>
            <h2 className="mt-4 font-bold">Pengemasan & Pengiriman</h2>
            <p>
              Pengiriman dilakukan melalui mitra logistik terpercaya yang menjangkau seluruh wilayah Indonesia. Setiap pesanan akan diproses dalam waktu 1-2 hari kerja setelah konfirmasi pembayaran, dan nomor resi pengiriman akan kami
              kirimkan agar Anda bisa melacak status pesanan secara real-time. Kami berkomitmen untuk memberikan pengalaman berbelanja yang aman, cepat, dan memuaskan hingga produk sampai di rumah Anda.
            </p>
          </div>

          <div id="informasi" className={`tab-content mt-4 ${activeTab === "informasi" ? "block" : "hidden"}`}>
            <div className="mt-4">
              <table className="w-full text-left">
                <tr>
                  <td className="py-2">Kategori</td>
                  <td className="py-2">Fashion Batik Wanita</td>
                </tr>
                <tr>
                  <td className="py-2">Stok</td>
                  <td className="py-2">50</td>
                </tr>
                <tr>
                  <td className="py-2">Bahan</td>
                  <td className="py-2">Katun Premium</td>
                </tr>
                <tr>
                  <td className="py-2">Ukuran Tersedia</td>
                  <td className="py-2">S, M, L, XL</td>
                </tr>
                <tr>
                  <td className="py-2">Motif</td>
                  <td className="py-2">Batik Khas (motif tradisional Jawa dengan sentuhan modern)</td>
                </tr>
                <tr>
                  <td className="py-2">Model</td>
                  <td className="py-2">Blouse Batik Kekinian dengan variasi lengan panjang</td>
                </tr>
                <tr>
                  <td className="py-2">Warna Tersedia</td>
                  <td className="py-2">Biru, Merah, Kuning</td>
                </tr>
              </table>
            </div>
          </div>

          <div id="penilaian" className={`tab-content mt-4 ${activeTab === "penilaian" ? "block" : "hidden"}`}>
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-red-600 text-xl font-bold">4.8 dari 5</span>
                <button className="border border-red-600 text-red-600 px-2 py-1 rounded-md text-sm">Semua</button>
                <button className="border border-red-600 text-red-600 px-2 py-1 rounded-md text-sm">Bintang 1 (2)</button>
                <button className="border border-red-600 text-red-600 px-2 py-1 rounded-md text-sm">Bintang 2 (3)</button>
                <button className="border border-red-600 text-red-600 px-2 py-1 rounded-md text-sm">Bintang 3 (5)</button>
                <button className="border border-red-600 text-red-600 px-2 py-1 rounded-md text-sm">Bintang 4 (50)</button>
                <button className="border border-red-600 text-red-600 px-2 py-1 rounded-md text-sm">Bintang 5 (75)</button>
              </div>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <button className="border border-red-600 text-red-600 px-2 py-1 rounded-md text-sm">Komentar (3)</button>
                <button className="border border-red-600 text-red-600 px-2 py-1 rounded-md text-sm">Gambar (3)</button>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-red-600 p-4 rounded-md">
                <div className="flex items-center">
                  <img alt="Ayu Prameswari" className="w-12 h-12 rounded-full" height="50" src="https://storage.googleapis.com/a1aa/image/8fZmE5GGzYxdW6vBhHDEXAnv4t4upa7TFLToijKFbTxw664JA.jpg" width="50" />
                  <div className="ml-4">
                    <h3 className="font-bold">Ayu Prameswari</h3>
                    <div className="flex items-center text-yellow-500">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="text-gray-600">4.8</span>
                  </div>
                </div>
                <p className="mt-4">Blouse ini sangat nyaman dipakai dan kualitas bahannya bagus! Desainnya modern tapi tetap mempertahankan motif tradisional. Pengiriman juga cepat. Pasti akan beli lagi di sini!</p>
              </div>
              <div className="border border-red-600 p-4 rounded-md">
                <div className="flex items-center">
                  <img alt="Tina Wijayanti" className="w-12 h-12 rounded-full" height="50" src="https://storage.googleapis.com/a1aa/image/f4eIfcOnoLHrkorNMp0MrNefbIVdXEtHyk4bZyeSH3UzVdd8E.jpg" width="50" />
                  <div className="ml-4">
                    <h3 className="font-bold">Tina Wijayanti</h3>
                    <div className="flex items-center text-yellow-500">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="text-gray-600">4.8</span>
                  </div>
                </div>
                <p className="mt-4">Blouse batik kekinian yang saya terima benar-benar sesuai ekspektasi! Bahannya adem dan motifnya indah. Pengemasan juga rapi. Terima kasih, ini belanja yang memuaskan!</p>
              </div>
              <div className="border border-red-600 p-4 rounded-md">
                <div className="flex items-center">
                  <img alt="Siti Aisyah" className="w-12 h-12 rounded-full" height="50" src="https://storage.googleapis.com/a1aa/image/9jsBlfSFpD1lfEqfSP7Pe7axn78EfFSLXMHL5tklAWtXsuOeE.jpg" width="50" />
                  <div className="ml-4">
                    <h3 className="font-bold">Siti Aisyah</h3>
                    <div className="flex items-center text-yellow-500">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="text-gray-600">4.8</span>
                  </div>
                </div>
                <p className="mt-4">Dengan harga yang ditawarkan, kualitasnya sangat baik. Terasa sepadan dengan harga, bahkan lebih baik dari ekspektasi saya.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Products */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold">Produk Terpopuler</h2>
          <div className="flex space-x-4 mt-4">
            {/* Product Card */}
            <section className="w-4/1">
              <div className="grid grid-cols-4 gap-20">
                {categoryProducts.map((product, index) => (
                  <Card key={index} {...product} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
