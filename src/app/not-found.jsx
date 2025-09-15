"use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FaHome, FaArrowRight } from "react-icons/fa";
// import Image from "next/image";

// export default function NotFound() {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center relative z-50">
//         <div className="mb-8">
//           <Image
//             src="/images/gallery/404.png"
//             alt="404 Illustration"
//             width={256}
//             height={256}
//             className="mx-auto"
//             priority
//           />
//         </div>
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">صفحه مورد نظر یافت نشد</h1>
//         <p className="text-gray-600 mb-8">
//           متأسفانه صفحه ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
//           >
//             <FaArrowRight className="rotate-180" />
//             بازگشت
//           </button>
//           <Link
//             href="/"
//             className="flex items-center justify-center gap-2 bg-[#d1182b] text-white px-6 py-3 rounded-lg hover:bg-[#b31524] transition-colors"
//           >
//             <FaHome />
//             صفحه اصلی
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 rtl">
      <div className="text-center">
        {/* انیمیشن اصلی */}
        <div className="relative mb-8 mx-auto w-64 h-64">
          {/* دایره های متحدالمرکز */}
          <div className="absolute inset-0 rounded-full border-8 border-blue-200 opacity-30"></div>
          <div className="absolute inset-8 rounded-full border-6 border-blue-300 opacity-50"></div>
          <div className="absolute inset-16 rounded-full border-4 border-blue-400"></div>

          {/* عدد ۴۰۴ با افکت */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <span className="text-7xl font-bold text-blue-600 opacity-90">
                404
              </span>
              <div className="absolute -inset-4 bg-blue-100 rounded-full opacity-20 -z-10 animate-pulse"></div>
            </div>
          </div>

          {/* آیکون راهنمایی */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <svg
              className="w-10 h-10 text-red-400 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
        </div>

        {/* متن */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          صفحه مورد نظر یافت نشد
        </h1>
        <p className="text-gray-600 mb-10 max-w-md mx-auto">
          ممکن است صفحه حذف شده باشد یا آدرس را اشتباه وارد کرده باشید.
        </p>

        {/* دکمه بازگشت به خانه */}
        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <svg
            className="ml-2 w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          بازگشت به صفحه اصلی
        </Link>

        {/* المان تزئینی پایین صفحه */}
        <div className="mt-16 text-gray-400">
          <p>تناژ مارکت © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
