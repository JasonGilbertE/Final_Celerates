import React from "react";

const HeaderLogo = () => {
  return (
    <header className="bg-[#C62E2E] text-white p-4 flex fixed top-0 w-full z-10 border-b-2 border-gray-300">
      <div className="logo text-xl font-bold font-ribeye flex-shrink-0 pl-5 flex flex-col justify-center items-center">
        <span>CENTRAL</span>
        <span>JAVA</span>
      </div>
    </header>
  );
};

export default HeaderLogo;
