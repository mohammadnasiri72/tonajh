"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function NewProductsSlider() {
  const products = [
    {
      id: 1,
      url: "sdfsdfsdf",
      image: "/images/pro.jpeg",
      title: "خیارشور نول و ویژه",
      price: 0,
    },
    {
      id: 2,
      url: "sdfsdfsdf",
      image: "/images/pro.jpeg",
      title: "esdfdf",
      price: 0,
    },
    {
      id: 3,
      url: "sdfsdfsdf",
      image: "/images/pro.jpeg",
      title: "esdfdf",
      price: 0,
    },
    {
      id: 4,
      url: "sdfsdfsdf",
      image: "/images/pro.jpeg",
      title: "esdfdf",
      price: 0,
    },
    {
      id: 5,
      url: "sdfsdfsdf",
      image: "/images/pro.jpeg",
      title: "esdfdf",
      price: 0,
    },
    {
      id: 6,
      url: "sdfsdfsdf",
      image: "/images/pro.jpeg",
      title: "esdfdf",
      price: 0,
    },
    {
      id: 7,
      url: "sdfsdfsdf",
      image: "/images/pro.jpeg",
      title: "esdfdf",
      price: 0,
    },
    {
      id: 8,
      url: "sdfsdfsdf",
      image: "/images/pro.jpeg",
      title: "esdfdf",
      price: 0,
    },
    {
      id: 9,
      url: "sdfsdfsdf",
      image: "/images/pro.jpeg",
      title: "esdfdf",
      price: 0,
    },
    {
      id: 10,
      url: "sdfsdfsdf",
      image: "/images/pro.jpeg",
      title: "esdfdf",
      price: 0,
    },
  ];

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
        <Swiper
          // loop={true}
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
          {products &&
            products.map((product, index) => (
              <SwiperSlide key={product.id}>
                <div className="relative group w-full pb-2 overflow-hidden rounded-xl bg-white shadow-md border border-[#0002]">
                  <Link
                    href={"#"}
                    className="w-full min-h-40 sm:min-h-40 flex items-center justify-center bg-[#fff] overflow-hidden relative"
                  >
                    <Image
                      className={`group-hover:scale-110 scale-100 duration-1000 w-full h-full object-cover`}
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      unoptimized
                    />
                  </Link>
                  <div className="flex flex-col flex-1 justify-between mt-2">
                    <Link
                      href={"#"}
                      className="text-[#333] font-bold px-2 hover:text-[#d1182b] duration-300 cursor-pointer flex items-start"
                    >
                      <h3 className="text-justify line-clamp-1 w-full font-bold text-[16px]">
                        {product.title}
                      </h3>
                    </Link>
                    <Divider style={{ margin: 5, padding: 0 }} />

                    <div className="px-2 duration-300">
                      {product.price !== 0 && (
                        <div className="flex flex-col">
                          <span className="font-bold text-base text-[#333] whitespace-nowrap group-hover:text-[#d1182b] duration-300">
                            {product.price.toLocaleString()} تومان
                          </span>
                        </div>
                      )}
                      {product.price === 0 && (
                        <span className="font-bold text-base text-[#333]">
                          توافقی (تماس بگیرید)
                        </span>
                      )}
                    </div>
                  </div>
                  {/* <ShowUserContact product={product}/> */}
                </div>
              </SwiperSlide>
            ))}

          <div className="sm:hidden flex  items-center justify-between absolute left-0 right-0 bottom-1">
            <div className="custom-prev bg-[#3331] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
              <FaCaretRight className="text-2xl cursor-pointer " />
            </div>
            <div className=" custom-next bg-[#3331] p-1 cursor-pointer z-50 hover:bg-[#d1182b] text-[#666] hover:text-[#fff] duration-300">
              <FaCaretLeft className="text-2xl cursor-pointer" />
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default NewProductsSlider;
