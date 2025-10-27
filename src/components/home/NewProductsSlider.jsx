"use client";
import { mainDomain } from "@/utils/mainDomain";
import { Card, CardContent, Skeleton } from "@mui/material";
import { message } from "antd";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCaretLeft,
  FaCaretRight,
  FaImages,
  FaShoppingCart,
  FaStore,
  FaTag,
} from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const formatPrice = (price) => {
  return new Intl.NumberFormat("fa-IR").format(price);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fa-IR");
};

function NewProductsSlider() {
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const [listMyRequest, setListTransaction] = useState([]);

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

  useEffect(() => {
    fetchAds();
  }, [flag]);

  const fetchAds = () => {
    setLoading(true);
    axios
      .get(`${mainDomain}/api/transaction/sell`, {
        params: {
          status: 2,
          pageIndex: 1,
          pageSize: 10,
        },
      })
      .then((res) => {
        setListTransaction(res.data.items || []);
      })
      .catch((err) => {
        console.error(err);
        message.error("خطا در دریافت آگهی‌ها");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="sm:px-10 px-2 py-2">
      <div className="p-2 rounded-lg border border-[#0002]">
        <div className="flex justify-between items-center p-3">
          <h2 className="text-xl font-semibold">جدیدترین محصولات</h2>
          <Link href={"#"}>
            <div className="flex items-center gap-2 rounded-lg text-cyan-700 hover:bg-slate-200 duration-300 px-3 py-1">
              <span className="font-semibold">مشاهده همه</span>
              <FaArrowLeftLong />
            </div>
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </div>
        ) : (
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
              listMyRequest.map((ad) => (
                <SwiperSlide key={ad._id}>
                  <Card className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    {/* بخش تصویر */}
                    {ad.images && ad.images.length > 0 ? (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          alt={ad.categoryTitle}
                          src={`${mainDomain}${ad.images[0]}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                        <FaStore size={32} className="text-gray-400" />
                      </div>
                    )}

                    {/* محتوای کارت */}
                    <CardContent className="flex-1 p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 flex-1 mr-2">
                          {ad.type}
                        </h3>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaTag size={12} className="text-gray-400" />
                          <span>{ad.categoryTitle}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <FaShoppingCart size={12} className="text-gray-400" />
                          <span>
                            میزان فروش:{" "}
                            <strong>{formatPrice(ad.unitAmount)}</strong>{" "}
                            {ad.unit}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <FaShoppingCart size={12} className="text-gray-400" />
                          <span>
                            حداقل فروش:{" "}
                            <strong>{formatPrice(ad.minUnitAmount)}</strong>{" "}
                            {ad.unit}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <FaCalendarAlt size={10} />
                            <span>{formatDate(ad.createdAt)}</span>
                          </div>
                          {ad.images && ad.images.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-blue-500">
                              <FaImages size={10} />
                              <span>{ad.images.length} عکس</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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

export default NewProductsSlider;
