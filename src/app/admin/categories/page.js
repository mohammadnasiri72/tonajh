"use client";
import { mainDomain } from "@/utils/mainDomain";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import ModalNewCategory from "./ModalNewCategory";
import TableCategory from "./TableCategory";

const calculateCategoryLevels = (categories) => {
  // ایجاد یک مپ برای دسترسی سریع
  const categoryMap = {};
  categories.forEach((category) => {
    categoryMap[category._id] = category;
  });

  // کش برای ذخیره levelهای محاسبه شده
  const levelCache = {};

  // تابع بازگشتی برای محاسبه level
  const calculateLevel = (categoryId) => {
    if (levelCache[categoryId]) {
      return levelCache[categoryId];
    }

    const category = categoryMap[categoryId];
    if (!category) {
      return 0;
    }

    if (category.parentId === "-1") {
      levelCache[categoryId] = 1;
      return 1;
    }

    const parentLevel = calculateLevel(category.parentId);
    const level = parentLevel + 1;
    levelCache[categoryId] = level;
    return level;
  };

  // اضافه کردن level به همه دسته‌بندی‌ها
  return categories.map((category) => ({
    ...category,
    level: calculateLevel(category._id),
  }));
};

export default function CategoriesPage() {
  const [menuData, setMenuData] = useState([]);
  const [flag, setFlag] = useState(false);

  // get list menuData
  useEffect(() => {
    axios
      .get(`${mainDomain}/api/categorys`, {
        params: {},
      })
      .then((res) => {
        const categoriesWithLevel = calculateCategoryLevels(res.data.data);
        setMenuData(categoriesWithLevel);
      })
      .catch((err) => {});
  }, [flag]);

  const [searchTerm, setSearchTerm] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            مدیریت دسته‌بندی‌ها
          </h1>
          <p className="text-gray-600">
            ایجاد، ویرایش و مدیریت دسته‌بندی‌های محصولات
          </p>
        </div>
        <ModalNewCategory setFlag={setFlag} menuData={menuData} />
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
      <TableCategory flag={flag} setFlag={setFlag} menuData={menuData} />
    </div>
  );
}
