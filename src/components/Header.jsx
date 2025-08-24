import Link from "next/link";
import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { IoIosLogIn } from "react-icons/io";
import { IoClose, IoSearchSharp } from "react-icons/io5";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {};
  return (
    <header className="bg-white shadow-md py-2 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <img
              src="/images/logo.png"
              alt="لوگو"
              className="h-10 w-10 object-contain"
            />
          </div>
          <span className="text-2xl font-bold text-gray-800 hidden lg:inline">
            تناژ مارکت
          </span>
        </div>
        <div>
          <div className="px-3 flex items-center justify-start rounded-lg bg-slate-200 lg:w-96 w-full">
            <IoSearchSharp className="text-2xl cursor-pointer" />
            <input
              className="bg-transparent border-none outline-none p-2 w-full"
              type="text"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchTerm.length >= 2 && setShowResults(true)}
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setResults([]);
                  setShowResults(false);
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <IoClose className="text-xl" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="lg:flex hidden flex-col items-center justify-center cursor-pointer hover:bg-slate-100 duration-300 rounded-2xl p-3 w-20">
          <FaUsers className="text-lg" />
          <span className="text-[#333a] font-semibold">فروشندگان</span>
        </div>

        <div className="h-8 w-[1px] bg-[#0002] lg:block hidden" />

        <div className="lg:flex hidden flex-col items-center justify-center cursor-pointer hover:bg-slate-100 duration-300 rounded-2xl p-3 w-20">
          <ImUsers className="text-lg" />
          <span className="text-[#333a] font-semibold">خریداران</span>
        </div>

        <div className="h-8 w-[1px] bg-[#0002] lg:block hidden" />

        <Link href='/login'>
        
        <div className="flex flex-col items-center justify-center hover:bg-slate-100 duration-300 rounded-2xl p-3">
          <IoIosLogIn className="text-xl text-teal-500" />
          <span className="text-[#333a] font-semibold whitespace-nowrap">
            ورود / ثبت نام
          </span>
        </div>
        </Link>

      </div>
    </header>
  );
}

export default Header;
