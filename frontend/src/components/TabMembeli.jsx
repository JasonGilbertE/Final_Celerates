import React, { useState } from "react";

const TabMembeli = ({ tabData }) => {
  const [activeTab, setActiveTab] = useState("deskripsi"); // Tab aktif default

  return (
    <div className="mt-8">
      {/* Tab Header */}
      <div className="border-b border-gray-300">
        <ul className="flex space-x-8">
          {Object.keys(tabData).map((key) => (
            <li key={key} className={`py-2 px-4 cursor-pointer ${activeTab === key ? "text-red-600 border-b-2 border-red-600" : ""}`} onClick={() => setActiveTab(key)}>
              {tabData[key].title}
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        <div
          dangerouslySetInnerHTML={{
            __html: tabData[activeTab].content, // Menampilkan konten tab aktif
          }}
        />
      </div>
    </div>
  );
};

export default TabMembeli;
