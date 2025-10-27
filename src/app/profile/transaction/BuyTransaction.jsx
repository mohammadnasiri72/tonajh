import { mainDomain } from "@/utils/mainDomain";
import { UserOutlined } from "@ant-design/icons";
import { Chip, Skeleton } from "@mui/material";
import { Card, Empty, Image, Tooltip } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment-jalaali";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaShoppingCart,
  FaTag,
  FaTimesCircle,
} from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { useSelector } from "react-redux";
import ModalDeleteTransactionBuy from "./ModalDeleteTransactionBuy";
import ModalEditTransactionBuy from "./ModalEditTransactionBuy";
import ModalNewTransactionBuy from "./ModalNewTransactionBuy";

const formatPersianDate = (dateString) => {
  try {
    const persianMonths = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    const date = moment(dateString);
    const day = date.jDate();
    const month = persianMonths[date.jMonth()];
    const year = date.jYear();

    return `${day} ${month} ${year}`;
  } catch (error) {
    return dateString;
  }
};

const getStatusInfo = (status) => {
  switch (status) {
    case 1:
      return {
        color: "warning",
        text: "منتظر تایید",
        icon: <FaClock size={14} />,
      };
    case 2:
      return {
        color: "success",
        text: "تایید شده",
        icon: <FaCheckCircle size={14} />,
      };
    case 3:
      return {
        color: "error",
        text: "رد شده",
        icon: <FaTimesCircle size={14} />,
      };
    default:
      return {
        color: "default",
        text: "نامشخص",
        icon: <FaClock size={14} />,
      };
  }
};

const BuyTransaction = () => {
  const { categorys } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const [listMyRequest, setListMyRequest] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${mainDomain}/api/transaction/buy`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
  }, [flag, token]);

  const formatTime = (dateString) => {
    return moment(dateString).format("HH:mm");
  };

  // تابع برای پیدا کردن عکس دسته‌بندی
  const getCategoryImage = (categoryId) => {
    const category = categorys.find((cat) => cat._id === categoryId);
    return category?.img || null;
  };

  // تابع برای پیدا کردن اطلاعات کامل دسته‌بندی
  const getCategoryInfo = (categoryId) => {
    const category = categorys.find((cat) => cat._id === categoryId);
    return category || null;
  };

  return (
    <div className="space-y-6">
      {/* هدر */}
      <div className="bg-gradient-to-l from-blue-600 to-blue-400 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl">
              <FaShoppingCart size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">آگهی‌های خرید من</h1>
              <p className="text-blue-100 mt-1">
                مدیریت و پیگیری درخواست‌های خرید
              </p>
            </div>
          </div>
          <ModalNewTransactionBuy setFlag={setFlag} />
        </div>
      </div>

      {/* لیست آگهی‌ها */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="rounded-2xl overflow-hidden">
              <Skeleton
                variant="rounded"
                width="100%"
                height={200}
                className="rounded-none"
              />
              <div className="p-4">
                <Skeleton variant="text" width="80%" height={24} />
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="40%" height={20} />
              </div>
            </Card>
          ))}
        </div>
      ) : listMyRequest.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {listMyRequest.map((request) => {
            const statusInfo = getStatusInfo(request.status);
            const categoryImage = getCategoryImage(request.categoryId);
            const categoryInfo = getCategoryInfo(request.categoryId);

            return (
              <Card
                key={request._id}
                hoverable
                className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                cover={
                  categoryImage ? (
                    <div className="h-48 overflow-hidden">
                      <Image
                        alt={request.categoryTitle}
                        src={categoryImage}
                        className="w-full h-full object-cover"
                        preview={false}
                        fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5YzljOWMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPuODouODvOOCuOODquODvOODgTwvdGV4dD48L3N2Zz4="
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                      <FaShoppingCart size={32} className="text-blue-400" />
                    </div>
                  )
                }
                actions={[
                  <ModalEditTransactionBuy
                    key="edit"
                    setFlag={setFlag}
                    request={request}
                  />,
                   <ModalDeleteTransactionBuy
                        setFlag={setFlag}
                        id={request._id}
                        showIcon={true}
                      />,
                ]}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 flex-1 mr-2">
                      خریدار {request.type}
                    </h3>
                    <Chip
                      className="!px-3"
                      icon={statusInfo.icon}
                      label={statusInfo.text}
                      color={statusInfo.color}
                      size="small"
                      variant="outlined"
                    />
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
                        <TbFileDescription
                          size={12}
                          className="text-gray-400"
                        />
                        <span className="line-clamp-2 text-xs">
                          {request.description}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <FaCalendarAlt size={10} />
                        <span>{formatPersianDate(request.createdAt)}</span>
                      </div>
                      {/* <div className="flex items-center gap-1 text-xs text-blue-500">
                        <UserOutlined size={10} />
                        <span>
                          {request.autherName} {request.autherFamily}
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <Empty
            description={
              <div>
                <p className="text-gray-600 text-lg mb-2">
                  هنوز هیچ آگهی خرید ثبت نکرده‌اید
                </p>
                <p className="text-gray-500">
                  برای ثبت اولین آگهی خرید، روی دکمه "ثبت آگهی خرید" کلیک کنید
                </p>
              </div>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      )}
    </div>
  );
};

export default BuyTransaction;
