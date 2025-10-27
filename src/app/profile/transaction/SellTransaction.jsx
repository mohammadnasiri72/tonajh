import { mainDomain } from "@/utils/mainDomain";
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { Button, Card, Empty, Image, message, Spin } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaImages,
  FaInfoCircle,
  FaShoppingCart,
  FaStore,
  FaTag,
  FaTimes,
  FaTimesCircle,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { MdClose, MdDescription } from "react-icons/md";
import { createGlobalStyle } from "styled-components";
import ModalEditTransactionSell from "./ModalEditTransactionSell";
import ModalNewTransactionSell from "./ModalNewTransactionSell";

const ImagePreviewStyles = createGlobalStyle`
  .ant-image-preview {
    z-index: 9999 !important;
  }

  .ant-image-preview-mask {
    z-index: 9998 !important;
  }

  .ant-image-preview-wrap {
    z-index: 9999 !important;
  }
`;

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

const SellTransaction = () => {
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const [listMyRequest, setListMyTransaction] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const token = Cookies.get("token");

  useEffect(() => {
    fetchAds();
  }, [flag]);

  const fetchAds = () => {
    setLoading(true);
    axios
      .get(`${mainDomain}/api/transaction/sell`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListMyTransaction(res.data.items || []);
      })
      .catch((err) => {
        console.error(err);
        message.error("خطا در دریافت آگهی‌ها");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleViewDetails = (ad) => {
    setSelectedAd(ad);
    setDetailModalVisible(true);
  };

  const handleDelete = (ad) => {
    setAdToDelete(ad);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (!adToDelete) return;

    setLoading(true);
    axios
      .delete(`${mainDomain}/api/transaction/sell/${adToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        message.success("آگهی با موفقیت حذف شد");
        setDeleteModalVisible(false);
        setAdToDelete(null);
        setFlag((prev) => !prev);
      })
      .catch((err) => {
        console.error(err);
        message.error("خطا در حذف آگهی");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fa-IR");
  };

  // فیلتر کردن آگهی‌ها بر اساس تب فعال
  const filteredAds = listMyRequest.filter((ad) => {
    switch (activeTab) {
      case "pending":
        return ad.status === 1;
      case "approved":
        return ad.status === 2;
      case "rejected":
        return ad.status === 3;
      default:
        return true;
    }
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <ImagePreviewStyles />
      <div className="space-y-6">
        {/* هدر */}
        <div className="bg-gradient-to-l from-emerald-600 to-emerald-400 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <FaStore size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">آگهی‌های فروش من</h1>
                <p className="text-emerald-100 mt-1">
                  مدیریت و پیگیری آگهی‌های فروش
                </p>
              </div>
            </div>
            <ModalNewTransactionSell setFlag={setFlag} />
          </div>
        </div>

        {/* تب‌های فیلتر */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <Box sx={{ width: "100%", direction: "rtl" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                value="all"
                label={
                  <div className="flex items-center gap-2">
                    <FaStore size={16} className="text-blue-500" />
                    <span>همه ({listMyRequest.length})</span>
                  </div>
                }
              />
              <Tab
                value="pending"
                label={
                  <div className="flex items-center gap-2">
                    <FaClock size={16} className="text-orange-500" />
                    <span>
                      در انتظار (
                      {listMyRequest.filter((ad) => ad.status === 1).length})
                    </span>
                  </div>
                }
              />
              <Tab
                value="approved"
                label={
                  <div className="flex items-center gap-2">
                    <FaCheckCircle size={16} className="text-green-500" />
                    <span>
                      تایید شده (
                      {listMyRequest.filter((ad) => ad.status === 2).length})
                    </span>
                  </div>
                }
              />
              <Tab
                value="rejected"
                label={
                  <div className="flex items-center gap-2">
                    <FaTimesCircle size={16} className="text-red-500" />
                    <span>
                      رد شده (
                      {listMyRequest.filter((ad) => ad.status === 3).length})
                    </span>
                  </div>
                }
              />
            </Tabs>
          </Box>
        </div>

        {/* لیست آگهی‌ها */}
        {filteredAds.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <Empty
              description={
                activeTab === "all"
                  ? "هنوز هیچ آگهی فروش ثبت نکرده‌اید"
                  : `هیچ آگهی ${
                      getStatusInfo(
                        activeTab === "pending"
                          ? 1
                          : activeTab === "approved"
                          ? 2
                          : 3
                      ).text
                    } وجود ندارد`
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAds.map((ad) => {
              const statusInfo = getStatusInfo(ad.status);
              return (
                <Card
                  key={ad._id}
                  hoverable
                  className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  cover={
                    ad.images && ad.images.length > 0 ? (
                      <div className="h-48 overflow-hidden">
                        <Image
                          alt={ad.categoryTitle}
                          src={`${mainDomain}${ad.images[0]}`}
                          className="w-full h-full object-cover"
                          preview={false}
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                        <FaStore size={32} className="text-gray-400" />
                      </div>
                    )
                  }
                  actions={[
                    <Tooltip key="view" title="مشاهده جزئیات">
                      <div className="flex items-center justify-center w-full h-full">
                        <FaEye
                          onClick={() => handleViewDetails(ad)}
                          className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
                          size={18}
                        />
                      </div>
                    </Tooltip>,
                    <ModalEditTransactionSell
                      key="edit"
                      setFlag={setFlag}
                      ad={ad}
                    />,
                    <Tooltip key="delete" title="حذف آگهی">
                      <div className="flex items-center justify-center w-full h-full">
                        <FaTrash
                          onClick={() => handleDelete(ad)}
                          className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                          size={18}
                        />
                      </div>
                    </Tooltip>,
                  ]}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 flex-1 mr-2">
                        {ad.type}
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
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* مودال جزئیات */}
        <Dialog
          open={detailModalVisible}
          onClose={() => setDetailModalVisible(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white !px-3 !py-1 !mb-2">
            <div className="flex justify-between items-center">
              <Typography
                variant="h6"
                className="text-white flex items-center gap-2"
              >
                <FaInfoCircle />
                جزئیات آگهی
              </Typography>
              <IconButton
                onClick={() => setDetailModalVisible(false)}
                className="text-white hover:bg-white/20"
              >
                <MdClose />
              </IconButton>
            </div>
          </DialogTitle>

          <DialogContent className="p-6">
            {selectedAd && (
              <div className="space-y-6">
                {/* تصویر اصلی */}
                {selectedAd.images && selectedAd.images.length > 0 && (
                  <div className="flex justify-center">
                    <Image
                      width={300}
                      src={`${mainDomain}${selectedAd.images[0]}`}
                      alt={selectedAd.categoryTitle}
                      className="rounded-xl"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Paper className="p-4 rounded-xl">
                    <Typography
                      variant="h6"
                      className="mb-4 flex items-center gap-2"
                    >
                      <FaShoppingCart className="text-emerald-500" />
                      اطلاعات محصول
                    </Typography>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">دسته‌بندی:</span>
                        <span className="font-semibold">
                          {selectedAd.categoryTitle}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">نوع محصول:</span>
                        <span className="font-semibold">{selectedAd.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">میزان فروش:</span>
                        <span className="font-semibold">
                          {formatPrice(selectedAd.unitAmount)} {selectedAd.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">حداقل فروش:</span>
                        <span className="font-semibold">
                          {formatPrice(selectedAd.minUnitAmount)}{" "}
                          {selectedAd.unit}
                        </span>
                      </div>
                    </div>
                  </Paper>

                  <Paper className="p-4 rounded-xl">
                    <Typography
                      variant="h6"
                      className="mb-4 flex items-center gap-2"
                    >
                      <FaUser className="text-emerald-500" />
                      اطلاعات فروشنده
                    </Typography>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">نام:</span>
                        <span className="font-semibold">
                          {selectedAd.autherName} {selectedAd.autherFamily}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">تاریخ ثبت:</span>
                        <span className="font-semibold">
                          {formatDate(selectedAd.createdAt)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">وضعیت:</span>
                        <Chip
                          className="!px-3"
                          icon={getStatusInfo(selectedAd.status).icon}
                          label={getStatusInfo(selectedAd.status).text}
                          color={getStatusInfo(selectedAd.status).color}
                          size="small"
                        />
                      </div>
                    </div>
                  </Paper>
                </div>

                {selectedAd.description && (
                  <Paper className="p-4 rounded-xl">
                    <Typography
                      variant="h6"
                      className="mb-4 flex items-center gap-2"
                    >
                      <MdDescription className="text-emerald-500" />
                      توضیحات
                    </Typography>
                    <p className="text-gray-700 leading-6">
                      {selectedAd.description}
                    </p>
                  </Paper>
                )}

                {selectedAd.images && selectedAd.images.length > 1 && (
                  <Paper className="p-4 rounded-xl">
                    <Typography
                      variant="h6"
                      className="mb-4 flex items-center gap-2"
                    >
                      <FaImages className="text-emerald-500" />
                      گالری تصاویر ({selectedAd.images.length} عکس)
                    </Typography>
                    <div className="flex gap-2 flex-wrap">
                      {selectedAd.images.map((image, index) => (
                        <Image
                          key={index}
                          width={100}
                          height={100}
                          src={`${mainDomain}${image}`}
                          alt={`عکس ${index + 1}`}
                          className="rounded-lg cursor-pointer"
                        />
                      ))}
                    </div>
                  </Paper>
                )}
              </div>
            )}
          </DialogContent>

          <DialogActions className="p-4">
            <Button onClick={() => setDetailModalVisible(false)}>بستن</Button>
          </DialogActions>
        </Dialog>

        {/* مودال حذف */}
        <Dialog
          open={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle className="bg-gradient-to-r from-red-500 to-red-600 text-white !px-3 !py-1">
            <div className="flex justify-between items-center">
              <Typography
                variant="h6"
                className="text-white flex items-center gap-2"
              >
                <FaTrash />
                تایید حذف آگهی
              </Typography>
              <IconButton
                onClick={() => setDeleteModalVisible(false)}
                className="!text-white hover:bg-white/20"
              >
                <FaTimes />
              </IconButton>
            </div>
          </DialogTitle>

          <DialogContent className="p-6">
            <div className="text-center py-4">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrash className="text-red-500 text-2xl" />
              </div>
              <Typography variant="h6" className="mb-2">
                حذف آگهی "{adToDelete?.type}"
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                آیا از حذف این آگهی مطمئن هستید؟
                <br />
                <span className="text-red-500 font-medium">
                  این عمل قابل بازگشت نیست.
                </span>
              </Typography>
            </div>
          </DialogContent>

          <DialogActions className="p-4 gap-2">
            <Button onClick={() => setDeleteModalVisible(false)}>انصراف</Button>
            <Button
              onClick={confirmDelete}
              loading={loading}
              className="bg-red-500 text-white border-red-500 hover:bg-red-600"
            >
              {loading ? "در حال حذف..." : "حذف آگهی"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default SellTransaction;
