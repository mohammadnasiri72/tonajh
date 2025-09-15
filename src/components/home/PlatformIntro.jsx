import Link from "next/link";
import {
  FaAngleLeft,
  FaChartLine,
  FaComments,
  FaHandshake,
  FaRegClock,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

const PlatformIntro = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            پلتفرم تخصصی خرید و فروش عمده
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            خریداران و فروشندگان حرفه‌ای در یک بستر امن و پیشرفته گرد هم می‌آیند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* بخش خریداران */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
            <div className="bg-blue-600 py-4 px-6">
              <h3 className="text-xl font-bold text-white text-center">
                خریدار هستید؟
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaUsers className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaChartLine className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="mr-2 text-gray-700">
                    دسترسی به صدها فروشنده معتبر
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaShieldAlt className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="mr-2 text-gray-700">تضمین امنیت معاملات</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaComments className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="mr-2 text-gray-700">
                    مذاکره مستقیم با فروشندگان
                  </p>
                </li>
              </ul>
              <div className="text-center">
               
                <Link
                  href={"/profile/transaction"}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                >
                  <span>ثبت آگهی خرید</span>
                  <FaAngleLeft />
                </Link>
              </div>
            </div>
          </div>

          {/* بخش فروشندگان */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
            <div className="bg-green-600 py-4 px-6">
              <h3 className="text-xl font-bold text-white text-center">
                فروشنده هستید؟
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <FaHandshake className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaUsers className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="mr-2 text-gray-700">
                    دسترسی به هزاران خریدار متقاضی
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaChartLine className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="mr-2 text-gray-700">
                    افزایش فروش و گسترش بازار
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaRegClock className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="mr-2 text-gray-700">
                    صرفه‌جویی در زمان یافتن مشتری
                  </p>
                </li>
              </ul>
              <div className="text-center">
               
                 <Link
                  href={"/profile/transaction"}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
                >
                  <span>ثبت آگهی فروش</span>
                  <FaAngleLeft />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* بخش ویژگی‌های پلتفرم */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            چرا تناژ مارکت{" "}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <FaShieldAlt className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                امنیت معاملات
              </h4>
              <p className="text-gray-600">
                سیستم تضمین امنیت مالی برای کلیه معاملات
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <FaHandshake className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                ارتباط مستقیم
              </h4>
              <p className="text-gray-600">
                امکان مذاکره و ارتباط مستقیم بین خریدار و فروشنده
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <FaChartLine className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                توسعه کسب‌وکار
              </h4>
              <p className="text-gray-600">
                افزایش فرصت‌های تجاری برای هر دو طرف معامله
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformIntro;
