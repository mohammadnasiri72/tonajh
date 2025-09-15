"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaHome,
  FaSignOutAlt,
  FaSpinner,
  FaUser,
} from "react-icons/fa";

const menuItems = [
  {
    id: "dashboard",
    title: "داشبورد",
    icon: FaHome,
    path: "/profile/dashboard",
  },
  {
    id: "edit-profile",
    title: "ویرایش پروفایل",
    icon: FaUser,
    path: "/profile/edit-profile",
  },
  {
    id: "transaction-profile",
    title: "ثبت آگهی",
    icon: FaClipboardList,
    path: "/profile/transaction",
  },
];

export default function ProfileLayout({ children }) {
  const [user, setUser] = useState({});
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const pathname = usePathname();
  //   const user = JSON.parse(Cookies.get("user"));
  const userCookie = Cookies.get("user");

  useEffect(() => {
    if (mounted && userCookie) {
      const userData = JSON.parse(userCookie);
      setUser(userData);
    }
  }, [mounted, userCookie]);

  return (
    <div className="lg:min-h-screen  min-h-auto bg-[#f6f6f6] flex">
      {/* Sidebar */}
      <aside
        className={`
                sticky top-0 h-screen w-64 bg-white shadow-lg z-40 flex-shrink-0
                transform transition-transform duration-300 ease-in-out lg:block hidden
            `}
      >
        <div className="h-full flex flex-col">
          {/* بخش اطلاعات کاربر */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user?.displayName.slice(0, 1)}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-sm">
                    {user?.displayName?.charAt(0) || "?"}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-bold text-gray-800 truncate">
                  {user?.displayName}
                </h2>
                <p className="text-xs text-gray-500 truncate">{user?.userId}</p>
              </div>
            </div>
            <div className="mt-3 p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">کیف پول:</span>
                <span className="font-bold text-cyan-700">
                  {walletBalance !== null
                    ? `${walletBalance.toLocaleString()} تومان`
                    : "در حال بارگذاری..."}
                </span>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className={`
                                        flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                        ${
                                          isActive
                                            ? "bg-cyan-700 text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }
                                    `}
                >
                  <Icon className="text-lg" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
            <div className="">
              <button
                disabled={isLoggingOut}
                className={`
                                    w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg 
                                    transition-colors cursor-pointer
                                    ${
                                      isLoggingOut
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "text-cyan-700 hover:bg-red-50"
                                    }
                                `}
              >
                {isLoggingOut ? (
                  <>
                    <FaSpinner className="text-lg animate-spin" />
                    <span>در حال خروج...</span>
                  </>
                ) : (
                  <>
                    <FaSignOutAlt className="text-lg" />
                    <span>خروج از حساب</span>
                  </>
                )}
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:min-h-screen min-h-auto">
        <div className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
