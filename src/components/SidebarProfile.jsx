import React from "react";

const SidebarProfile = () => {
  return (
    <aside className="w-1/4 space-y-4">
      <div className="bg-[#C62E2E] text-white p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="bg-white text-[#000000] rounded-full w-8 h-8 flex items-center justify-center">J</div>
          <span>Jihan Aprilia</span>
        </div>
      </div>
      <div className="bg-[#F7CDCF] p-4 rounded-lg text-center">
        <button className="w-full text-center">Akun</button>
      </div>
      <div className="bg-[#F7CDCF] p-4 rounded-lg text-center">
        <a className="w-full text-center" href="#">
          Daftar Transaksi
        </a>
      </div>
    </aside>
  );
};

export default SidebarProfile;
