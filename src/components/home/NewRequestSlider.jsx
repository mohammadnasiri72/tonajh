"use client";
import { mainDomain } from "@/utils/mainDomain";
import { Card, Skeleton } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCaretLeft,
  FaCaretRight,
  FaShoppingCart,
  FaTag,
} from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TbFileDescription } from "react-icons/tb";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fa-IR");
};

function NewRequestSlider() {
  const { categorys } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(true);
  const [listMyRequest, setListMyRequest] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${mainDomain}/api/transaction/buy`, {
        params: {
          status: 2,
          pageIndex: 1,
          pageSize: 10,
        },
      })
      .then((res) => {
        setListMyRequest(res.data.items || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getCategoryImage = (categoryId) => {
    const category = categorys.find((cat) => cat._id === categoryId);
    return category?.img || null;
  };

  // کامپوننت اسکلتون
  const SkeletonCard = () => (
    <Card
      className="border border-gray-200 rounded-2xl overflow-hidden p-3 hover:shadow-lg transition-all duration-300"
      sx={{
        cursor: "pointer",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <div className="space-y-3">
        {/* اسکلتون تصویر */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={192}
          className="rounded-lg"
          animation="wave"
        />

        {/* اسکلتون عنوان */}
        <Skeleton
          variant="text"
          width="80%"
          height={28}
          className="mr-2"
          animation="wave"
        />

        <div className="space-y-3">
          {/* اسکلتون دسته بندی */}
          <div className="flex items-center gap-2">
            <Skeleton
              variant="circular"
              width={16}
              height={16}
              animation="wave"
            />
            <Skeleton variant="text" width="60%" height={20} animation="wave" />
          </div>

          {/* اسکلتون میزان نیاز */}
          <div className="flex items-center gap-2">
            <Skeleton
              variant="circular"
              width={16}
              height={16}
              animation="wave"
            />
            <Skeleton variant="text" width="70%" height={20} animation="wave" />
          </div>

          {/* اسکلتون توضیحات */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton
                variant="circular"
                width={16}
                height={16}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width="40%"
                height={16}
                animation="wave"
              />
            </div>
            <Skeleton
              variant="text"
              width="100%"
              height={16}
              animation="wave"
            />
            <Skeleton variant="text" width="80%" height={16} animation="wave" />
          </div>

          {/* اسکلتون تاریخ */}
          <div className="flex items-center gap-2">
            <Skeleton
              variant="circular"
              width={14}
              height={14}
              animation="wave"
            />
            <Skeleton variant="text" width={100} height={18} animation="wave" />
          </div>
        </div>
      </div>
    </Card>
  );

  // کامپوننت کارت واقعی
  const RequestCard = ({ request }) => (
    <Card
      className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
      sx={{
        cursor: "pointer",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <div className="h-48 overflow-hidden">
        {getCategoryImage(request.categoryId) ? (
          <img
            alt={request.categoryTitle}
            src={getCategoryImage(request.categoryId)}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5YzljOWMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPuODouODvOOCuOODquODvOODgTwvdGV4dD48L3N2Zz4=";
            }}
          />
        ) : (
          <div className="h-48 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
            <FaShoppingCart size={32} className="text-blue-400" />
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 flex-1 mr-2">
            خریدار {request.type}
          </h3>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <FaTag size={12} className="text-gray-400" />
            <span>{request.categoryTitle}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FaShoppingCart size={12} className="text-gray-400" />
            <span>
              میزان نیاز:{" "}
              <strong>{request.unitAmount?.toLocaleString()}</strong>{" "}
              {request.unit}
            </span>
          </div>

          {request.description && (
            <div className="flex items-center gap-2 text-gray-600">
              <TbFileDescription size={12} className="text-gray-400" />
              <span className="line-clamp-2 text-xs">
                {request.description}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <FaCalendarAlt size={10} />
              <span>{formatDate(request.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="sm:px-10 px-2 py-2">
      <div className="p-2 rounded-lg border border-[#0002]">
        <div className="flex justify-between items-center p-3">
          <h2 className="text-xl font-semibold">جدیدترین درخواست های خرید</h2>
          <Link href={"#"}>
            <div className="flex items-center gap-2 rounded-lg text-cyan-700 hover:bg-slate-200 duration-300 px-3 py-1">
              <span className="font-semibold">مشاهده همه</span>
              <FaArrowLeftLong />
            </div>
          </Link>
        </div>

        {loading ? (
          // حالت لودینگ - نمایش باکس‌های اسکلتون بدون Swiper
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </div>
        ) : (
          // حالت عادی - نمایش داده‌ها با Swiper
          <Swiper
            grabCursor={true}
            modules={[Pagination, Navigation]}
            className="mySwiperProduct"
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            pagination={{
              clickable: true,
            }}
            speed={1000}
            breakpoints={{
              1724: {
                slidesPerView: 7,
                slidesPerGroup: 7,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                slidesPerGroup: 5,
                spaceBetween: 10,
              },
              850: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 8,
              },
              100: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 5,
              },
            }}
          >
            {listMyRequest.length > 0 &&
              listMyRequest.map((request) => (
                <SwiperSlide key={request._id}>
                  <RequestCard request={request} />
                </SwiperSlide>
              ))}

            <div className="sm:hidden flex items-center justify-between absolute left-0 right-0 bottom-1">
              <div className="custom-prev bg-[#3331] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
                <FaCaretRight className="text-2xl cursor-pointer" />
              </div>
              <div className="custom-next bg-[#3331] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
                <FaCaretLeft className="text-2xl cursor-pointer" />
              </div>
            </div>
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default NewRequestSlider;
