import React from "react";

const KeamananProfile = ({
  showSupportCardHandler,
  showWhatsAppChatHandler,
  showPoliciesHandler,
  showSupportCard, 
  showWhatsAppChat, 
  showPolicies,
}) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Keamanan dan Bantuan</h3>
      <div className="space-y-2">
        <a className="block w-full text-left py-2 px-2 border rounded hover:bg-gray-100" href="#">
          Ubah Kata Sandi
        </a>
        <a
          className="block w-full text-left py-2 px-2 border rounded hover:bg-gray-100"
          href="#"
          onClick={showSupportCardHandler}
        >
          Hubungi Pusat Bantuan
        </a>
      </div>

      {showSupportCard && (
        <div className="border rounded-lg p-4 mt-4">
          <div id="support-card-content">
            <img
              alt="Support Banner"
              className="w-full rounded-lg mb-4"
              height="200"
              src="/assets/images/PUSATBANTUAN.png"
            />
            <div className="flex space-x-4">
              <a
                className="block w-1/2 text-center py-2 border rounded bg-[#F7CDCF]"
                href="#"
                onClick={showWhatsAppChatHandler}
              >
                <h3 className="font-bold">Kontak Dukungan Pelanggan</h3>
                <h4>klik disini untuk selengkapnya</h4>
              </a>
              <a
                className="block w-1/2 text-center py-2 border rounded bg-[#F7CDCF]"
                href="#"
                onClick={showPoliciesHandler}
              >
                <h3 className="font-bold">Kebijakan dan Ketentuan</h3>
                <h4>klik di sini untuk selengkapnya</h4>
              </a>
            </div>
          </div>
        </div>
      )}

      {showWhatsAppChat && (
        <div className="border rounded-lg p-4 text-center">
          <h3 className="text-lg font-bold mb-4">
            Chat di WhatsApp dengan +62
          </h3>
          <a
            className="block w-1/4 text-center py-2 border rounded bg-[#C62E2E] text-white"
            href="https://wa.me/6281222729155"
            target="_blank"
          >
            Lanjutkan ke chat
          </a>
        </div>
      )}

      {showPolicies && (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-bold mb-4">
            Kebijakan dan Ketentuan
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center border-b py-2">
              <span>Kebijakan Pembayaran</span>
              <i className="fas fa-chevron-down"></i>
            </li>
            <ul className="hidden pl-4 space-y-1">
              <li>Metode Pembayaran yang Diterima</li>
              <li>Proses Pengembalian Dana</li>
            </ul>
            <li className="flex justify-between items-center border-b py-2">
              <span>Kebijakan Pengiriman</span>
              <i className="fas fa-chevron-down"></i>
            </li>
            <ul className="hidden pl-4 space-y-1">
              <li>Waktu Pengiriman</li>
              <li>Biaya Pengiriman</li>
            </ul>
            <li className="flex justify-between items-center border-b py-2">
              <span>Kebijakan Privasi</span>
              <i className="fas fa-chevron-down"></i>
            </li>
            <ul className="hidden pl-4 space-y-1">
              <li>Pengumpulan Data</li>
              <li>Penyimpanan Data</li>
            </ul>
          </ul>
        </div>
      )}
    </div>
  );
};

export default KeamananProfile;
