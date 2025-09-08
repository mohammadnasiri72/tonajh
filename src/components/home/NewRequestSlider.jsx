"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Link from "next/link";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function NewRequestSlider() {
  const requests = [
    {
      id: 1,
      url: "sdfsdfsdf",
      amount: "2",
      unit: "تن",
      title: "برنج",
      type: "پاکستانی طبیعت",
      fullName: "یاسر خدایاری",
      createFa: "1404/06/12",
    },
    {
      id: 2,
      url: "sdfsdfsdf",
      amount: "2",
      unit: "تن",
      title: "برنج",
      type: "پاکستانی طبیعت",
      fullName: "یاسر خدایاری",
      createFa: "1404/06/12",
    },
    {
      id: 3,
      url: "sdfsdfsdf",
      amount: "2",
      unit: "تن",
      title: "برنج",
      type: "پاکستانی طبیعت",
      fullName: "یاسر خدایاری",
      createFa: "1404/06/12",
    },
    {
      id: 4,
      url: "sdfsdfsdf",
      amount: "2",
      unit: "تن",
      title: "برنج",
      type: "پاکستانی طبیعت",
      fullName: "یاسر خدایاری",
      createFa: "1404/06/12",
    },
    {
      id: 5,
      url: "sdfsdfsdf",
      amount: "2",
      unit: "تن",
      title: "برنج",
      type: "پاکستانی طبیعت",
      fullName: "یاسر خدایاری",
      createFa: "1404/06/12",
    },
    {
      id: 6,
      url: "sdfsdfsdf",
      amount: "2",
      unit: "تن",
      title: "برنج",
      type: "پاکستانی طبیعت",
      fullName: "یاسر خدایاری",
      createFa: "1404/06/12",
    },
  ];

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
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 10,
            },
            850: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 8,
            },
            100: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 5,
            },
          }}
        >
          {requests &&
            requests.map((request) => (
              <SwiperSlide key={request.id}>
                <Link href={"#"}>
                  <div className="relative group w-full p-2 overflow-hidden rounded-xl bg-white shadow-md border border-[#0002]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Avatar size={30} icon={<UserOutlined />} />
                        <span className="text-lg font-semibold">
                          {request.fullName}
                        </span>
                      </div>
                      <span className="text-xs text-[#0008]">{request.createFa}</span>
                    </div>
                    <div className="flex flex-wrap gap-0.5 text-lg">
                        <span>خریدار</span>
                        <span className="text-cyan-600 font-semibold">{request.amount}</span>
                        <span className="text-cyan-600 font-semibold">{request.unit}</span>
                        <span>{request.title}</span>
                        <span>از نوع</span>
                        <span>{request.type}</span>
                        <span>هستم</span>
                    </div>
                  </div>
                </Link>
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

export default NewRequestSlider;
