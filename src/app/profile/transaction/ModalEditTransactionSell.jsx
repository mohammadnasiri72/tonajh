import { mainDomain } from "@/utils/mainDomain";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Tooltip as AntTooltip,
  Button,
  Input,
  message,
  Spin,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaEdit, FaStar, FaTimes, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import CategorySelector from "./CategorySelector";

const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const toEnglishNumber = (number) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return number.toString().replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d));
};

const uploadTempImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file.originFileObj || file);

  try {
    const response = await fetch(`${mainDomain}/api/upload/temp`, {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: "خطا در اتصال به سرور" };
  }
};

const convertExistingImagesToFileList = (images, imageIds) => {
  return images.map((imageUrl, index) => ({
    uid: `existing-${imageIds[index]}-${Date.now()}`,
    name: imageUrl.split("/").pop(),
    status: "done",
    url: `${mainDomain}${imageUrl}`,
    existingImageId: imageIds[index],
    isExisting: true,
    uploadedData: {
      url: imageUrl,
      filename: imageUrl.split("/").pop(),
      tempId: imageIds[index],
    },
    thumbUrl: `${mainDomain}${imageUrl}`,
  }));
};

function ModalEditTransactionSell({ setFlag, ad }) {
  const [open, setOpen] = useState(false);
  const { categorys } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({
    level1: null,
    level2: null,
    level3: null,
  });
  const [type, setType] = useState("");
  const [unit, setUnit] = useState("");
  const [unitMin, setUnitMin] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState({
    category: false,
    type: false,
    unit: false,
    unitMin: false,
  });
  const [fileList, setFileList] = useState([]);
  const [mainImageIdx, setMainImageIdx] = useState(0);
  const token = Cookies.get("token");

  const handleOpen = () => {
    setOpen(true);
    const level3 = categorys.find((e) => e._id === ad.categoryId);
    const level2 = categorys.find((e) => e._id === level3?.parentId);
    const level1 = categorys.find((e) => e._id === level2?.parentId);

    setSelected({
      level1: level1 || null,
      level2: level2 || null,
      level3: level3 || null,
    });
    setType(ad.type || "");
    setUnit(ad.unitAmount?.toString() || "");
    setUnitMin(ad.minUnitAmount?.toString() || "");
    setDesc(ad.description || "");

    if (ad.images && ad.images.length > 0 && ad.imageIds) {
      const existingFileList = convertExistingImagesToFileList(
        ad.images,
        ad.imageIds
      );
      setFileList(existingFileList);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFileList([]);
    setMainImageIdx(0);
    setError({ category: false, type: false, unit: false, unitMin: false });
  };

  useEffect(() => {
    if (selected.level3) {
      setError((prev) => ({ ...prev, category: false }));
    }
  }, [selected]);

  const handleAutoUpload = async (file) => {
    if (file.isExisting) return;

    setFileList((prev) =>
      prev.map((item) =>
        item.uid === file.uid ? { ...item, status: "uploading" } : item
      )
    );

    const result = await uploadTempImage(file);

    if (result.success) {
      setFileList((prev) =>
        prev.map((item) =>
          item.uid === file.uid
            ? {
                ...item,
                uploadedData: {
                  tempId: result.data.tempId,
                  url: result.data.url,
                  filename: result.data.filename,
                },
                status: "done",
              }
            : item
        )
      );
      message.success("عکس با موفقیت آپلود شد");
    } else {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
      message.error(result.message || "خطا در آپلود عکس");
    }
  };

  useEffect(() => {
    fileList.forEach((file) => {
      if (
        !file.uploadedData &&
        !file.isExisting &&
        file.status !== "uploading"
      ) {
        handleAutoUpload(file);
      }
    });
  }, [fileList]);

  const handleRemoveImage = async (img) => {
    if (img.uploadedData?.tempId && !img.isExisting) {
      try {
        await fetch(
          `${mainDomain}/api/upload/temp/${img.uploadedData.tempId}`,
          {
            method: "DELETE",
          }
        );
      } catch (error) {
        console.error("Error deleting temp image:", error);
      }
    }

    const newFileList = fileList.filter((item) => item.uid !== img.uid);
    setFileList(newFileList);
    if (mainImageIdx >= newFileList.length) {
      setMainImageIdx(0);
    }
  };

  const handleSetMainImage = (idx) => {
    setMainImageIdx(idx);
  };

  const validateForm = () => {
    const errors = {
      category: !selected.level3,
      type: !type.trim(),
      unit: !unit,
      unitMin: !unitMin,
    };
    setError(errors);

    if (fileList.length === 0) {
      message.error("لطفا حداقل یک عکس آپلود کنید");
      return false;
    }

    const pendingUploads = fileList.filter(
      (file) => !file.uploadedData && !file.isExisting
    );
    if (pendingUploads.length > 0) {
      message.warning("لطفا منتظر بمانید تا همه عکس‌های جدید آپلود شوند");
      return false;
    }

    return !Object.values(errors).some(Boolean);
  };

  const sellTransactionHandler = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const allImageIds = fileList
      .map((file) => {
        if (file.isExisting && file.existingImageId) {
          return file.existingImageId;
        }
        if (file.uploadedData?.tempId) {
          return file.uploadedData.tempId;
        }
        return null;
      })
      .filter(Boolean);

    const data = {
      categoryId: selected.level3._id,
      categoryTitle: selected.level3.title,
      type: type.trim(),
      unit: selected.level3.unit,
      unitAmount: Number(toEnglishNumber(unit).replace(/,/g, "")),
      minUnitAmount: Number(toEnglishNumber(unitMin).replace(/,/g, "")),
      description: desc.trim(),
      images: allImageIds,
      status: 1,
      statusTitle: "منتظر تایید",
    };

    try {
      const response = await axios.put(
        `${mainDomain}/api/transaction/sell/${ad._id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        handleClose();
        setFlag((prev) => !prev);
        Toast.fire({
          icon: "success",
          title: "آگهی فروش با موفقیت ویرایش شد",
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: err?.response?.data?.message || "خطا در ویرایش آگهی",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    listType: "picture-card",
    fileList,
    onChange: ({ fileList: newFileList }) => setFileList(newFileList),
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("فقط فایل تصویری مجاز است!");
        return Upload.LIST_IGNORE;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("حجم عکس باید کمتر از 5MB باشد!");
        return Upload.LIST_IGNORE;
      }

      if (fileList.length >= 10) {
        message.error("حداکثر 10 عکس می‌توانید آپلود کنید");
        return Upload.LIST_IGNORE;
      }

      const newFile = { ...file, status: "uploading" };
      setFileList((prev) => [...prev, newFile]);
      return false;
    },
    onRemove: handleRemoveImage,
    multiple: true,
    showUploadList: false,
  };

  const allImagesReady =
    fileList.length > 0 &&
    fileList.every((file) => file.uploadedData || file.isExisting);

  return (
    <>
      <Tooltip title="ویرایش آگهی" arrow>
        <div className="flex items-center justify-center w-full h-full">
          <FaEdit
            onClick={handleOpen}
            className="text-emerald-500 hover:text-emerald-700 transition-colors cursor-pointer"
            size={18}
          />
        </div>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white !mb-2 !px-3 !py-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaEdit />
              <span className="text-lg font-semibold">ویرایش آگهی فروش</span>
            </div>
            <IconButton
              onClick={handleClose}
              className="text-white hover:bg-white/20"
            >
              <FaTimes />
            </IconButton>
          </div>
        </DialogTitle>

        <DialogContent className="p-6">
          <div className="space-y-4">
            {/* اطلاعات آگهی فعلی */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="text-emerald-800 font-semibold mb-2">آگهی فعلی</h4>
              <div className="text-sm text-emerald-700 space-y-1">
                <p>دسته‌بندی: {ad?.categoryTitle}</p>
                <p>نوع محصول: {ad?.type}</p>
                <p>
                  میزان فروش: {ad?.unitAmount?.toLocaleString()} {ad?.unit}
                </p>
                <p>
                  حداقل فروش: {ad?.minUnitAmount?.toLocaleString()} {ad?.unit}
                </p>
                <p>تعداد عکس: {ad?.images?.length || 0}</p>
              </div>
            </div>

            {/* دسته‌بندی */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                دسته‌بندی جدید *
              </label>
              <CategorySelector
                categories={categorys}
                selected={selected}
                setSelected={setSelected}
                error={error}
              />
              {error.category && (
                <span className="text-red-500 text-xs mt-1">
                  لطفا دسته‌بندی را انتخاب کنید
                </span>
              )}
            </div>

            {/* نوع محصول */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نوع محصول جدید *
              </label>
              <Input
                status={error.type ? "error" : ""}
                size="large"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setError((prev) => ({ ...prev, type: false }));
                }}
                placeholder={`مثلاً ${selected?.level3?.type || "..."}`}
              />
              {error.type && (
                <span className="text-red-500 text-xs mt-1">
                  لطفا نوع محصول را وارد کنید
                </span>
              )}
            </div>

            {/* میزان فروش */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                میزان فروش جدید *
              </label>
              <Input
                status={error.unit ? "error" : ""}
                size="large"
                addonAfter={selected?.level3?.unit || ""}
                value={unit}
                onChange={(e) => {
                  const raw = toEnglishNumber(e.target.value).replace(/,/g, "");
                  if (/^[1-9][0-9]*$/.test(raw) || raw === "") {
                    const formatted =
                      raw === "" ? "" : Number(raw).toLocaleString();
                    setUnit(formatted);
                    setError((prev) => ({ ...prev, unit: false }));
                  }
                }}
                placeholder="میزان فروش محصول"
              />
              {error.unit && (
                <span className="text-red-500 text-xs mt-1">
                  لطفا میزان فروش را وارد کنید
                </span>
              )}
            </div>

            {/* حداقل میزان فروش */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                حداقل میزان فروش جدید *
              </label>
              <Input
                status={error.unitMin ? "error" : ""}
                size="large"
                addonAfter={selected?.level3?.unit || ""}
                value={unitMin}
                onChange={(e) => {
                  const raw = toEnglishNumber(e.target.value).replace(/,/g, "");
                  if (/^[1-9][0-9]*$/.test(raw) || raw === "") {
                    const formatted =
                      raw === "" ? "" : Number(raw).toLocaleString();
                    setUnitMin(formatted);
                    setError((prev) => ({ ...prev, unitMin: false }));
                  }
                }}
                placeholder="حداقل میزان فروش محصول"
              />
              {error.unitMin && (
                <span className="text-red-500 text-xs mt-1">
                  لطفا حداقل میزان فروش را وارد کنید
                </span>
              )}
            </div>

            {/* توضیحات */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                توضیحات جدید
              </label>
              <TextArea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                placeholder="توضیحات جدید درباره محصول..."
                showCount
                maxLength={500}
              />
            </div>

            {/* آپلود عکس‌ها */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-emerald-500 transition-colors">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                تصاویر محصول *
                <span className="text-gray-500 text-xs mr-2">
                  (حداکثر 10 عکس)
                </span>
              </label>

              <div className="flex flex-wrap gap-3 justify-center">
                {fileList.map((file, idx) => (
                  <div key={file.uid} className="relative">
                    <div
                      className={`w-24 h-24 border-2 rounded-lg overflow-hidden cursor-pointer ${
                        mainImageIdx === idx
                          ? "border-emerald-500"
                          : "border-gray-200"
                      }`}
                    >
                      {file.originFileObj ? (
                        <img
                          src={URL.createObjectURL(file.originFileObj)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : file.url ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : null}

                      {!file.uploadedData && !file.isExisting && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                          <Spin size="small" />
                        </div>
                      )}

                      <AntTooltip title="حذف عکس">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(file);
                          }}
                          className="absolute top-1 left-1 bg-white/90 rounded-full p-1 text-red-500 hover:bg-red-100 border border-red-100"
                        >
                          <FaTrash size={10} />
                        </button>
                      </AntTooltip>

                      <AntTooltip
                        title={
                          mainImageIdx === idx
                            ? "عکس اصلی"
                            : "انتخاب به عنوان عکس اصلی"
                        }
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetMainImage(idx);
                          }}
                          className={`absolute top-1 right-1 bg-white/90 rounded-full p-1 border ${
                            mainImageIdx === idx
                              ? "text-yellow-500 border-yellow-500"
                              : "text-gray-500 border-gray-200 hover:text-yellow-500"
                          }`}
                        >
                          <FaStar size={10} />
                        </button>
                      </AntTooltip>

                      {(file.uploadedData || file.isExisting) && (
                        <div
                          className={`absolute bottom-1 left-1 right-1 text-white text-xs px-1 py-0.5 rounded text-center ${
                            file.isExisting ? "bg-blue-500" : "bg-emerald-500"
                          }`}
                        >
                          {file.isExisting ? "موجود" : "✓"}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {fileList.length < 10 && (
                  <Upload {...uploadProps}>
                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 bg-gray-50 hover:bg-emerald-50 transition-colors">
                      <FaEdit className="text-emerald-500 text-xl mb-1" />
                      <span className="text-emerald-500 text-xs">
                        افزودن عکس
                      </span>
                    </div>
                  </Upload>
                )}
              </div>

              <div className="text-xs text-gray-500 mt-3 space-y-1">
                <p>• عکس‌های موجود با پس‌زمینه آبی نشان داده می‌شوند</p>
                <p>• عکس‌های جدید با پس‌زمینه سبز نشان داده می‌شوند</p>
                <p>• اولین عکس به عنوان عکس اصلی نمایش داده می‌شود</p>
                <p>• حجم هر عکس باید کمتر از 5MB باشد</p>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions className="p-4 gap-2">
          <Button size="large" onClick={handleClose} className="flex-1">
            انصراف
          </Button>
          <Button
            size="large"
            type="primary"
            loading={loading}
            onClick={sellTransactionHandler}
            disabled={!allImagesReady || fileList.length === 0}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 border-emerald-600"
          >
            {loading ? "در حال ویرایش..." : "ویرایش آگهی فروش"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalEditTransactionSell;
