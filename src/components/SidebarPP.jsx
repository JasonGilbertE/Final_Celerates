import React from "react";

const SidebarPP = () => (
  <aside className="w-1/4 space-y-4">
    <div className="bg-red-600 text-white p-4 rounded-lg">
      <div className="flex items-center space-x-2">
        <div className="bg-white text-red-600 rounded-full w-8 h-8 flex items-center justify-center">J</div>
        <span>Jihan Aprilia</span>
      </div>
    </div>
    <div className="bg-pink-200 p-4 rounded-lg text-center">
      <button className="w-full text-center">Akun</button>
    </div>
    <div className="bg-pink-200 p-4 rounded-lg text-center">
      <a className="w-full text-center" href="#">
        Daftar Transaksi
      </a>
    </div>
  </aside>
);

export default SidebarPP;
