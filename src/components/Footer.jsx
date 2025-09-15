import {
    FaAward,
    FaEnvelope,
    FaHeadset,
    FaInstagram,
    FaLinkedin,
    FaMapMarkerAlt,
    FaPhone,
    FaShieldAlt,
    FaShippingFast,
    FaTelegram,
    FaTwitter,
    FaWhatsapp
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white rtl">
      {/* بخش اعتماد و امنیت */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-bold text-center mb-8">
            چرا به ما اعتماد کنید؟
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-500 p-3 rounded-full inline-flex items-center justify-center mb-3">
                <FaShieldAlt className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">امنیت بالا</h4>
              <p className="text-gray-400 text-sm">
                حفاظت از اطلاعات و تراکنش‌ها
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 p-3 rounded-full inline-flex items-center justify-center mb-3">
                <FaAward className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">ضمانت کیفیت</h4>
              <p className="text-gray-400 text-sm">تضمین بهترین خدمات</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500 p-3 rounded-full inline-flex items-center justify-center mb-3">
                <FaHeadset className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">پشتیبانی ۲۴/۷</h4>
              <p className="text-gray-400 text-sm">پشتیبانی دائمی</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-500 p-3 rounded-full inline-flex items-center justify-center mb-3">
                <FaShippingFast className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">ارسال سریع</h4>
              <p className="text-gray-400 text-sm">تحویل به موقع</p>
            </div>
          </div>
        </div>
      </div>
      {/* بخش اصلی فوتر */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* بخش درباره ما */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:right-0 after:bottom-0 after:w-12 after:h-1 after:bg-blue-500">
              درباره تناژ مارکت
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              پلتفرم تخصصی خرید و فروش عمده که خریداران و فروشندگان را در یک
              بستر امن و پیشرفته به هم متصل می‌کند.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaTelegram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-300 transition-colors"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* لینک های سریع */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:right-0 after:bottom-0 after:w-12 after:h-1 after:bg-blue-500">
              دسترسی سریع
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  صفحه اصلی
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  درباره ما
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  تماس با ما
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  قوانین و مقررات
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  سوالات متداول
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  وبلاگ
                </a>
              </li>
            </ul>
          </div>

          {/* خدمات مشتریان */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:right-0 after:bottom-0 after:w-12 after:h-1 after:bg-blue-500">
              خدمات مشتریان
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  پشتیبانی فروشندگان
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  راهنمای خریداران
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  روش های پرداخت
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  گزارش مشکلات
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors block"
                >
                  پیگیری سفارشات
                </a>
              </li>
            </ul>
          </div>

          {/* اطلاعات تماس */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-2 after:absolute after:right-0 after:bottom-0 after:w-12 after:h-1 after:bg-blue-500">
              ارتباط با ما
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-400 mt-1 ml-2" />
                <span className="text-gray-400">
                  تهران، خیابان ولیعصر،خیابان حیدری شمالی، کوچه عادل، پلاک ۱۲۳۴
                </span>
              </div>
              <div className="flex items-center">
                <FaPhone className="w-5 h-5 text-blue-400 ml-2" />
                <span className="text-gray-400">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="w-5 h-5 text-blue-400 ml-2" />
                <span className="text-gray-400">info@bazargah.com</span>
              </div>
              <div className="flex items-center">
                <FaWhatsapp className="w-5 h-5 text-green-400 ml-2" />
                <span className="text-gray-400">۰۹۱۲۳۴۵۶۷۸۹</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* بخش پایینی فوتر */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col justify-between items-center">
            <div className="text-center">
              <p className="text-gray-400">
                © تمامی حقوق برای تناژ مارکت محفوظ است.
              </p>
            </div>
           
          </div>
        </div>
      </div>

     
    </footer>
  );
};

export default Footer;
