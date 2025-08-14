"use client";
import { useState } from 'react';
import { 
  FaHome, 
  FaBoxes, 
  FaUsers, 
  FaShoppingCart, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'داشبورد', icon: FaHome, href: '/admin' },
    { name: 'دسته‌بندی‌ها', icon: FaBoxes, href: '/admin/categories' },
    { name: 'محصولات', icon: FaShoppingCart, href: '/admin/products' },
    { name: 'کاربران', icon: FaUsers, href: '/admin/users' },
    { name: 'گزارشات', icon: FaChartBar, href: '/admin/reports' },
    { name: 'تنظیمات', icon: FaCog, href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">پنل ادمین</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5 ml-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 right-4 left-4">
          <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200">
            <FaSignOutAlt className="w-5 h-5 ml-3" />
            خروج
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:mr-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <FaBars className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">ا</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">ادمین</p>
                <p className="text-xs text-gray-500">مدیر سیستم</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
