import React from "react";
import { FaUsers } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { IoIosLogIn } from "react-icons/io";

function Header() {
  return (
    <header className="bg-white shadow-md py-2 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/images/logo.png"
          alt="لوگو"
          className="h-10 w-10 object-contain"
        />
        <span className="text-2xl font-bold text-gray-800">تناژ مارکت</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 duration-300 rounded-2xl p-3 w-20">
          <FaUsers className="text-lg" />
          <span className="text-[#333a] font-semibold">فروشندگان</span>
        </div>

        <div className="h-8 w-[1px] bg-[#0002]" />

        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 duration-300 rounded-2xl p-3 w-20">
          <ImUsers className="text-lg" />
          <span className="text-[#333a] font-semibold">خریداران</span>
        </div>

        <div className="h-8 w-[1px] bg-[#0002]" />

        <div className="flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 duration-300 rounded-2xl p-3">
          <IoIosLogIn className="text-xl text-teal-500" />
          <span className="text-[#333a] font-semibold">ورود / ثبت نام</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
