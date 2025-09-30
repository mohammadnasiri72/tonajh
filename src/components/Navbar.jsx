"use client";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";

function Navbar() {
  const { categorys } = useSelector((state) => state.category);
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredLevel1, setHoveredLevel1] = useState(null);
  const [hoveredLevel2, setHoveredLevel2] = useState(null);
  const [hoveredLevel3, setHoveredLevel3] = useState(null);

  const mainCatRef = useRef(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        setHoveredLevel1(null);
        setHoveredLevel2(null);
        setHoveredLevel3(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset lower levels when higher level changes
  useEffect(() => {
    if (!hoveredLevel1) {
      setHoveredLevel2(null);
      setHoveredLevel3(null);
    }
  }, [hoveredLevel1]);

  useEffect(() => {
    if (!hoveredLevel2) {
      setHoveredLevel3(null);
    }
  }, [hoveredLevel2]);

  return (
    <>
      <div className="sm:px-10 px-2 my-2">
        <div className="flex items-center">
          <div className="flex items-center gap-1 relative" ref={menuRef}>
            <div
              ref={mainCatRef}
              onMouseEnter={() => {
                setShowMenu(true);
              }}
              onMouseLeave={() => {
                setShowMenu(false);
                setHoveredLevel1(null);
                setHoveredLevel2(null);
                setHoveredLevel3(null);
              }}
              className="flex items-center gap-1 group cursor-pointer hover:bg-slate-100 py-1 px-2 duration-300 rounded-lg"
            >
              <IoMdMenu className="text-lg" />
              <span className="font-semibold text-lg">دسته بندی‌ها</span>
            </div>
            <div className="h-8 w-[1px] bg-[#0002] lg:block hidden" />
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="font-semibold text-lg">فروشنده شوید</span>
            </div>

            {/* Level 1 Menu */}
            <div
              onMouseEnter={() => {
                setShowMenu(true);
              }}
              onMouseLeave={() => {
                setShowMenu(false);
                setHoveredLevel1(null);
                setHoveredLevel2(null);
                setHoveredLevel3(null);
              }}
              className={`absolute top-full z-50 bg-white right-0 w-64 h-[calc(100vh-200px)] min-h-96 shadow-2xl duration-300 overflow-hidden rounded-lg border border-[#0002] ${
                showMenu
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              }`}
            >
              <div className="p-4 h-full flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                  دسته‌بندی‌ها
                </h3>
                <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {categorys.length > 0 &&
                    categorys
                      .filter((e) => e.parentId === "-1")
                      .map((item) => (
                        <div
                          key={item._id}
                          onMouseEnter={() => setHoveredLevel1(item)}
                          className={`p-2 rounded-lg cursor-pointer transition-all duration-200 group ${
                            hoveredLevel1?._id === item._id
                              ? "bg-cyan-50 border-r-4 border-cyan-500"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {item?.img && (
                                <img
                                  className="w-6 h-6 rounded-lg object-cover"
                                  src={item.img}
                                  alt={item.title}
                                />
                              )}
                              {!item?.img && (
                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                                  <svg
                                    className="w-4 h-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                  </svg>
                                </div>
                              )}
                              <div>
                                <h4
                                  className={`text-sm font-semibold transition-colors duration-200 ${
                                    hoveredLevel1?.id === item.id
                                      ? "text-cyan-600"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {item.title}
                                </h4>
                                {categorys.filter(
                                  (e) => e.parentId === item?._id
                                ).length > 0 && (
                                  <p className="text-xs text-gray-500">
                                    {
                                      categorys.filter(
                                        (e) => e.parentId === item?._id
                                      ).length
                                    }{" "}
                                    زیردسته
                                  </p>
                                )}
                              </div>
                            </div>
                            {categorys.filter((e) => e.parentId === item?._id)
                              .length > 0 && (
                              <FaChevronRight
                                className={`text-xs transition-all duration-200 ${
                                  hoveredLevel1?.id === item.id
                                    ? "text-cyan-600 rotate-180"
                                    : "text-gray-400 rotate-90"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                  
                </div>
              </div>
            </div>

            {/* Level 2 Menu */}
            {categorys.filter((e) => e.parentId === hoveredLevel1?._id).length >
              0 && (
              <div
                onMouseEnter={() => {
                  setShowMenu(true);
                  setHoveredLevel1(hoveredLevel1);
                }}
                onMouseLeave={() => {
                  setShowMenu(false);
                  setHoveredLevel1(null);
                  setHoveredLevel2(null);
                  setHoveredLevel3(null);
                }}
                className="absolute top-full z-40 bg-white right-64 w-64 h-[calc(100vh-200px)] min-h-96 shadow-2xl duration-300 overflow-hidden rounded-lg border border-[#0002]"
              >
                <div className="p-4 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4 border-b pb-2">
                    {hoveredLevel1?.img && (
                      <img
                        className="w-8 h-8 rounded-lg object-cover"
                        src={hoveredLevel1.img}
                        alt={hoveredLevel1.title}
                      />
                    )}
                    {!hoveredLevel1?.img && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-800">
                      {hoveredLevel1.title}
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                    {categorys
                      .filter((e) => e.parentId === hoveredLevel1._id)
                      .map((subItem) => (
                        <div
                          key={subItem._id}
                          onMouseEnter={() => setHoveredLevel2(subItem)}
                          // onMouseLeave={()=> setHoveredLevel2(null)}
                          className={`p-2 rounded-lg cursor-pointer transition-all duration-200 group ${
                            hoveredLevel2?._id === subItem._id
                              ? "bg-green-50 border-r-4 border-green-500"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {subItem?.img && (
                                <img
                                  className="w-6 h-6 rounded-lg object-cover"
                                  src={subItem.img}
                                  alt={subItem.title}
                                />
                              )}
                              {!subItem?.img && (
                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                                  <svg
                                    className="w-4 h-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                              )}
                              <div>
                                <h4
                                  className={`text-sm font-semibold transition-colors duration-200 ${
                                    hoveredLevel2?.id === subItem.id
                                      ? "text-green-600"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {subItem.title}
                                </h4>
                                {categorys.filter(
                                  (e) => e.parentId === subItem?._id
                                ).length > 0 && (
                                  <p className="text-xs text-gray-500">
                                    {
                                      categorys.filter(
                                        (e) => e.parentId === subItem?._id
                                      ).length
                                    }{" "}
                                    زیردسته
                                  </p>
                                )}
                              </div>
                            </div>
                            {categorys.filter(
                              (e) => e.parentId === subItem?._id
                            ).length > 0 && (
                              <FaChevronRight
                                className={`text-xs transition-all duration-200 ${
                                  hoveredLevel2?._id === subItem._id
                                    ? "text-green-600 rotate-180"
                                    : "text-gray-400 rotate-90"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Level 3 Menu */}
            {categorys.filter((e) => e.parentId === hoveredLevel2?._id).length >
              0 && (
              <div
                onMouseEnter={() => {
                  setShowMenu(true);
                  setHoveredLevel1(hoveredLevel1);
                  setHoveredLevel2(hoveredLevel2);
                }}
                onMouseLeave={() => {
                  setShowMenu(false);
                  setHoveredLevel1(null);
                  setHoveredLevel2(null);
                  setHoveredLevel3(null);
                }}
                className="absolute top-full z-30 bg-white right-[32rem] w-64 h-[calc(100vh-200px)] min-h-96 shadow-2xl duration-300 overflow-hidden rounded-lg border border-[#0002]"
              >
                <div className="p-4 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4 border-b pb-2">
                    {hoveredLevel2?.img && (
                      <img
                        className="w-8 h-8 rounded-lg object-cover"
                        src={hoveredLevel2.img}
                        alt={hoveredLevel2.title}
                      />
                    )}
                    {!hoveredLevel2?.img && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-800">
                      {hoveredLevel2.title}
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                    {categorys
                      .filter((e) => e.parentId === hoveredLevel2?._id)
                      .map((subSubItem) => (
                        <div
                          key={subSubItem._id}
                          onMouseEnter={() => setHoveredLevel3(subSubItem)}
                          // onMouseLeave={()=> setHoveredLevel3(null)}
                          className={`p-2 rounded-lg cursor-pointer transition-all duration-200 group ${
                            hoveredLevel3?._id === subSubItem._id
                              ? "bg-purple-50 border-r-4 border-purple-500"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {subSubItem?.img && (
                                <img
                                  className="w-6 h-6 rounded-lg object-cover"
                                  src={subSubItem.img}
                                  alt={subSubItem.title}
                                />
                              )}
                              {!subSubItem?.img && (
                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                                  <svg
                                    className="w-4 h-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                              )}
                              <div>
                                <h4
                                  className={`text-sm font-semibold transition-colors duration-200 ${
                                    hoveredLevel3?.id === subSubItem.id
                                      ? "text-purple-600"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {subSubItem.title}
                                </h4>
                                {categorys.filter(
                                  (e) => e.parentId === subSubItem?._id
                                ).length > 0 && (
                                  <p className="text-xs text-gray-500">
                                    {
                                      categorys.filter(
                                        (e) => e.parentId === subSubItem?._id
                                      ).length
                                    }{" "}
                                    زیردسته
                                  </p>
                                )}
                              </div>
                            </div>
                            {categorys.filter(
                              (e) => e.parentId === subSubItem?._id
                            ).length > 0 && (
                              <FaChevronRight
                                className={`text-xs transition-all duration-200 ${
                                  hoveredLevel3?._id === subSubItem._id
                                    ? "text-purple-600 rotate-180"
                                    : "text-gray-400 rotate-90"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Level 4 Menu */}
            {categorys.filter((e) => e.parentId === hoveredLevel3?._id).length >
              0 && (
              <div
                onMouseEnter={() => {
                  setShowMenu(true);
                  setHoveredLevel1(hoveredLevel1);
                  setHoveredLevel2(hoveredLevel2);
                  setHoveredLevel3(hoveredLevel3);
                }}
                onMouseLeave={() => {
                  setShowMenu(false);
                  setHoveredLevel1(null);
                  setHoveredLevel2(null);
                  setHoveredLevel3(null);
                }}
                className="absolute top-full z-20 bg-white right-[48rem] w-64 h-[calc(100vh-200px)] min-h-96 shadow-2xl duration-300 overflow-hidden rounded-lg border border-[#0002]"
              >
                <div className="p-4 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4 border-b pb-2">
                    {hoveredLevel3?.img && (
                      <img
                        className="w-8 h-8 rounded-lg object-cover"
                        src={hoveredLevel3.img}
                        alt={hoveredLevel3.title}
                      />
                    )}
                    {!hoveredLevel3?.img && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-800">
                      {hoveredLevel3.title}
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                    {categorys
                      .filter((e) => e.parentId === hoveredLevel3?._id)
                      .map((subSubSubItem) => (
                        <div
                          key={subSubSubItem.id}
                          className="p-2 rounded-lg cursor-pointer transition-all duration-200 group hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            {subSubSubItem?.img && (
                              <img
                                className="w-6 h-6 rounded-lg object-cover"
                                src={subSubSubItem.img}
                                alt={subSubSubItem.title}
                              />
                            )}
                            {!subSubSubItem?.img && (
                              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            )}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors duration-200">
                                {subSubSubItem.title}
                              </h4>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
