"use client";
import { useState } from 'react';
import { 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaFilter,
  FaSort,
  FaImage
} from 'react-icons/fa';

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - در آینده از API دریافت می‌شود
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'لبنیات',
      description: 'محصولات لبنی شامل شیر، پنیر، ماست و...',
      image: 'https://via.placeholder.com/60x60',
      status: 'active',
      productsCount: 45,
      createdAt: '2024-01-15',
      parentId: null
    },
    {
      id: 2,
      name: 'گوشت و پروتئین',
      description: 'انواع گوشت قرمز، سفید و پروتئین‌های گیاهی',
      image: 'https://via.placeholder.com/60x60',
      status: 'active',
      productsCount: 32,
      createdAt: '2024-01-10',
      parentId: null
    },
    {
      id: 3,
      name: 'نوشیدنی‌ها',
      description: 'انواع نوشیدنی‌های سرد و گرم',
      image: 'https://via.placeholder.com/60x60',
      status: 'inactive',
      productsCount: 28,
      createdAt: '2024-01-08',
      parentId: null
    },
    {
      id: 4,
      name: 'خشکبار و آجیل',
      description: 'انواع آجیل، خشکبار و تنقلات',
      image: 'https://via.placeholder.com/60x60',
      status: 'active',
      productsCount: 67,
      createdAt: '2024-01-05',
      parentId: null
    }
  ]);

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || category.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id) => {
    if (confirm('آیا از حذف این دسته‌بندی اطمینان دارید؟')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleStatusToggle = (id) => {
    setCategories(categories.map(cat => 
      cat.id === id 
        ? { ...cat, status: cat.status === 'active' ? 'inactive' : 'active' }
        : cat
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت دسته‌بندی‌ها</h1>
          <p className="text-gray-600">ایجاد، ویرایش و مدیریت دسته‌بندی‌های محصولات</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <FaPlus className="w-4 h-4 ml-2" />
          افزودن دسته‌بندی
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="جستجو در دسته‌بندی‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <FaFilter className="text-gray-400 w-4 h-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  دسته‌بندی
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تعداد محصولات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  وضعیت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاریخ ایجاد
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-lg object-cover ml-3"
                        src={category.image}
                        alt={category.name}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-500">{category.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {category.productsCount} محصول
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusToggle(category.id)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        category.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {category.status === 'active' ? 'فعال' : 'غیرفعال'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(category.createdAt).toLocaleDateString('fa-IR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="مشاهده"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="ویرایش"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="حذف"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <FaImage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">دسته‌بندی‌ای یافت نشد</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'جستجوی شما نتیجه‌ای نداشت.' : 'هنوز دسته‌بندی‌ای ایجاد نشده است.'}
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <FaPlus className="w-4 h-4 ml-2" />
                افزودن دسته‌بندی
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {selectedCategory ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی جدید'}
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نام دسته‌بندی
                </label>
                <input
                  type="text"
                  defaultValue={selectedCategory?.name || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: لبنیات"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  توضیحات
                </label>
                <textarea
                  defaultValue={selectedCategory?.description || ''}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="توضیحات دسته‌بندی..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تصویر
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedCategory(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedCategory ? 'ویرایش' : 'افزودن'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
