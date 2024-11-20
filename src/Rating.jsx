import React from 'react';
import './rating.css';

const reviews = [
  {
    name: "Andi Wibowo",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/JTzF87jjC2J9CN5KJNmMPiboD7fFdVIVtJpwwHlG1W8Q863JA.jpg",
    reviewText: "Senang sekali bisa menemukan website ini! Koleksi batiknya luar biasa, dengan motif-motif khas Solo dan Pekalongan yang sangat elegan. Belanja jadi cepat, dan pelayanannya cepat. Bangga bisa mendukung produk lokal!"
  },
  {
    name: "Siti Nurjanah",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/S4VlMrCUKHrFBtbKKpPQRbEnAupA51fFgyO79B5QnslN863JA.jpg",
    reviewText: "Pengalaman belanja yang menyenangkan! Barang-barang yang dijual benar-benar mengambarkan budaya Jawa Tengah. Saya beli ukiran dari Jepara, dan hasilnya sangat memuaskan, kualitasnya rapi dan indah. Sangat direkomendasikan!"
  },
  {
    name: "Rina Setyawati",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/R8acdolWMPaGLJFhkbQE4l5YTAVZMNYnfX7KXwOI47SH863JA.jpg",
    reviewText: "Website ini lengkap banget! Produk makanannya bikin nostalgia, dari gethuk hingga intip goreng. Semua datang dalam kondisi segar dan pengemasan rapi. Cocok buat yang kangen cita rasa khas Jawa Tengah!"
  },
  {
    name: "Bagas Prasetyo",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/cXcGfpRi4YVJPqpPvUSWB7iweiB6BxcXOk27NqDoLxQP41vTA.jpg",
    reviewText: "Banyak pilihan produk, dari fashion hingga kerajinan tangan. Batiknya berkualitas dan motifnya bagus! Sangat nyaman belanja di sini, sistemnya mudah dipahami, dan layanan pelanggannya sangat responsif."
  },
  {
    name: "Novi Rahmawati",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/BXVKb8hIaa7sFtdYmR4VCeXZBXWSMDKaj2fxpl97xhJewrfOB.jpg",
    reviewText: "Barang sampai tepat waktu, dan kualitas produk sangat memuaskan! Saya membeli wayang kulit dan batik Solo untuk koleksi pribadi, hasilnya melebihi ekspektasi. Website ini benar-benar surga bagi pecinta budaya Jawa Tengah."
  },
  {
    name: "Dewi Kartika",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/CRmsIjhegfiQ70DXnTbFt3K3f4TAJmIVzTLh2ssgdedWhXfdC.jpg",
    reviewText: "Luar biasa! Saya menemukan berbagai produk seni dari Jawa Tengah yang cantik dan unik. Pesanan sampai dengan cepat, dan kualitasnya sangat baik. Sangat direkomendasikan untuk mendukung pengrajin lokal!"
  },
  {
    name: "Yusuf Adi",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/aZjdDITNBXKzBF0RGhrShVe2ZJbjCICO4mauozH0iwdL863JA.jpg",
    reviewText: " Beli wayang kulit untuk koleksi, dan hasilnya sangat memuaskan! Kualitasnya rapi, dan bahan kulitnya asli. Pengalaman belanja di website ini sangat menyenangkan. Pelayanan cepat dan tanggap. Sangat mudah digunakan."
  },
  {
    name: "Intan Permata",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/ZU5h6eosNk2tAylh1nKCoSP4h7m4ccguDdtvU44UriaJ863JA.jpg",
    reviewText: "Website yang lengkap untuk menemukan kerajinan dan makanan khas Jawa Tengah! Getuk yang saya pesan enak sekali, rasanya otentik. Sangat puas dengan pelayanan dan pengemasannya yang rapi."
  },
  {
    name: "Arif Widodo",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/WJnmElwJaDryBNFAYDn9a2ua8yibtFB0rfKdA2e7R4yY41vTA.jpg",
    reviewText: "Sangat puas dengan produk yang saya beli. Motif batiknya sangat artistik dan unik. Pesanan sampai dengan cepat, dan saya pasti akan merekomendasikannya ke teman-teman."
  },
  {
    name: "Viezh Robert",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/ePtMNssGFzVtbabTNfnJQKj8DdN2IMmqAqzCduybyyxT41vTA.jpg",
    reviewText: "Saya suka sekali dengan aneka produk dekorasi yang dijual di sini. Semua memiliki nilai seni tinggi dan otentik. Terima kasih sudah menyediakan platform yang mudah diakses untuk produk lokal!"
  },
  {
    name: "Fahmi Wirawan",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/mlMfKsALCekwxU19ehuOBdfOJQiTc0fAwJSWvB1Ywa0XDve7E.jpg",
    reviewText: " Pesanan sampai dengan cepat dan kualitas barangnya benar-benar baik! Saya beli blangkon untuk suvenir keluarga, dan mereka semua senang. Senang sekali ada website dengan produk budaya Jawa Tengah yang mudah diakses."
  },
  {
    name: "Rizky Agung",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/JiRi0b5Sk47qLF3Q7XGYN1EqXSLS3I01oAmPoZtLNKQHe63JA.jpg",
    reviewText: "Website ini memberikan pengalaman belanja online yang lancar dan aman. Semua produknya yang saya pesan, dari ukiran kayu hingga batik, datang dalam kondisi prima. Pelayanan ramah dan responsif."
  },
  {
    name: "Bayu Nugroho",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/pXAnIl6sAarbDhpgwfR16l3YeY9TaB83YHPJdAxU5AQQ41vTA.jpg",
    reviewText: "Saya memesan batik cap, dan hasilnya sangat sesuai ekspektasi. Kualitas dan motifnya khas Jawa Tengah banget! Pelayanan juga cepat dan responsif."
  },
  {
    name: "Linda Hartanti",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/ffymxoeWnSBh1JWajsznq6IKJFWj8S5yKUiNOlYHRhAAxrfOB.jpg",
    reviewText: "Suka banget sama peralatan dapur tanah liat yang saya beli! Benar-benar seperti di dapur kampung. Barangnya kokoh dan datang dengan kemasan yang aman."
  },
  {
    name: "Rendy Pratama",
    rating: 4.5,
    imageUrl: "https://storage.googleapis.com/a1aa/image/9gZ9tg62n4rFD5E7uH8pr9bskBkhZ209g1Tks5p32OfL863JA.jpg",
    reviewText: "Belanja di sini terasa lebih dekat dengan budaya Indonesia. Produk kerajinannya keren dan harganya terjangkau. Pelayanan cepat, dan saya pasti akan merekomendasikannya ke teman-teman."
  },

  
];

const ReviewCard = ({ review }) => (
  <div className="review-card">
    <div className="review-header">
      <img alt={`Profile picture of ${review.name}`} height="50" src={review.imageUrl} width="50" />
      <div className="name">{review.name}</div>
      <div className="rating">
        <i className="fas fa-star"></i>
        <span>{review.rating}</span>
      </div>
    </div>
    <div className="review-body">
      {review.reviewText}
    </div>
  </div>
);

const Reviews = () => (
  <div className="content">
    <h1>
      <i className="fas fa-star"></i>
      Ulasan Pelanggan
    </h1>
    <div className="reviews">
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  </div>
);

export default Reviews;
