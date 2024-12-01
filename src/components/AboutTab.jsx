import React from "react";

const AboutTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tentang Akun</h2>
      <div className="space-y-4">
        <p>Selamat datang di aplikasi kami! Di sini, Anda dapat mengelola semua informasi terkait akun Anda, termasuk profil, alamat, dan pengaturan keamanan.</p>
        <p>Kami berkomitmen untuk menjaga privasi dan keamanan data Anda. Semua informasi yang Anda masukkan hanya akan digunakan untuk memfasilitasi pengalaman pengguna terbaik.</p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Kebijakan Privasi</h3>
          <p className="text-sm">Kami mengumpulkan informasi hanya untuk meningkatkan layanan kami. Kebijakan privasi kami dapat diubah sewaktu-waktu, dan kami akan memberitahukan Anda tentang perubahan tersebut.</p>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Hubungi Kami</h3>
          <p className="text-sm">Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami di support@domain.com.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
