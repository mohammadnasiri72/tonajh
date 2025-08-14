"use client";
import { 
  FaUsers, 
  FaShoppingCart, 
  FaBoxes, 
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaPlus,
  FaChartBar
} from 'react-icons/fa';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'کل کاربران',
      value: '1,234',
      change: '+12%',
      changeType: 'increase',
      icon: FaUsers,
      color: 'bg-blue-500'
    },
    {
      title: 'کل محصولات',
      value: '567',
      change: '+8%',
      changeType: 'increase',
      icon: FaShoppingCart,
      color: 'bg-green-500'
    },
    {
      title: 'دسته‌بندی‌ها',
      value: '45',
      change: '+3%',
      changeType: 'increase',
      icon: FaBoxes,
      color: 'bg-purple-500'
    },
    {
      title: 'درآمد ماهانه',
      value: '۱۲,۳۴۵,۰۰۰ تومان',
      change: '+15%',
      changeType: 'increase',
      icon: FaDollarSign,
      color: 'bg-orange-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      message: 'کاربر جدید ثبت نام کرد',
      time: '2 دقیقه پیش',
      user: 'علی احمدی'
    },
    {
      id: 2,
      type: 'product',
      message: 'محصول جدید اضافه شد',
      time: '15 دقیقه پیش',
      user: 'محمد رضایی'
    },
    {
      id: 3,
      type: 'category',
      message: 'دسته‌بندی جدید ایجاد شد',
      time: '1 ساعت پیش',
      user: 'فاطمه کریمی'
    },
    {
      id: 4,
      type: 'order',
      message: 'سفارش جدید ثبت شد',
      time: '2 ساعت پیش',
      user: 'حسن محمدی'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">داشبورد</h1>
          <p className="text-gray-600">خوش آمدید! اینجا خلاصه‌ای از فعالیت‌های سیستم را مشاهده می‌کنید.</p>
        </div>
        <div className="flex space-x-3 space-x-reverse">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <FaPlus className="w-4 h-4 ml-2" />
            افزودن محصول
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <FaEye className="w-4 h-4 ml-2" />
            مشاهده گزارش
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.changeType === 'increase' ? (
                  <FaArrowUp className="w-4 h-4 text-green-500 ml-1" />
                ) : (
                  <FaArrowDown className="w-4 h-4 text-red-500 ml-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 mr-2">از ماه گذشته</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">فروش ماهانه</h3>
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
              <option>آخرین 7 روز</option>
              <option>آخرین 30 روز</option>
              <option>آخرین 3 ماه</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">نمودار فروش اینجا نمایش داده می‌شود</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">فعالیت‌های اخیر</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 space-x-reverse">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'product' ? 'bg-green-500' :
                  activity.type === 'category' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{activity.user}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
            مشاهده همه فعالیت‌ها
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">عملیات سریع</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <FaPlus className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-sm font-medium text-gray-900">افزودن محصول</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <FaBoxes className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-sm font-medium text-gray-900">مدیریت دسته‌بندی</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <FaUsers className="w-8 h-8 text-purple-500 mb-2" />
            <span className="text-sm font-medium text-gray-900">مدیریت کاربران</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <FaChartBar className="w-8 h-8 text-orange-500 mb-2" />
            <span className="text-sm font-medium text-gray-900">گزارشات</span>
          </button>
        </div>
      </div>
    </div>
  );
}
