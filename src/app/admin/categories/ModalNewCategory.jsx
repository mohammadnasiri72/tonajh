"use client";
import { mainDomain } from "@/utils/mainDomain";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Button, Input, message, Select } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaPlus, FaTimes, FaUpload } from "react-icons/fa";
import Swal from "sweetalert2";

const { TextArea } = Input;

const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
});

function ModalNewCategory({ setFlag, menuData }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // حالت‌های ساده‌شده
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("-1"); // پیش‌فرض دسته اصلی
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const token = Cookies.get("token");

  // دریافت دسته‌بندی‌های اصلی (parentId = -1)
  const getMainCategories = () => {
    return menuData.filter((cat) => cat.parentId === "-1");
  };

  // دریافت تمام دسته‌بندی‌ها برای انتخاب والد
  const getAllCategories = () => {
    return menuData;
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const resetState = () => {
    setCategoryName("");
    setParentCategory("-1");
    setDescription("");
    setIsActive(true);
    setSelectedImage(null);
    setImagePreview("");
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${mainDomain}/api/upload/temp`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSelectedImage({
          tempId: response.data.data.tempId,
          url: response.data.data.url,
          filename: response.data.data.filename,
        });
        setImagePreview(response.data.data.url);
        message.success("عکس با موفقیت آپلود شد");
      }
    } catch (error) {
      message.error("خطا در آپلود عکس");
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      message.error("لطفا فقط فایل تصویری انتخاب کنید");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      message.error("حجم فایل باید کمتر از 5MB باشد");
      return;
    }

    handleImageUpload(file);
  };

  const validateForm = () => {
    if (!categoryName.trim()) {
      message.error("لطفا نام دسته‌بندی را وارد کنید");
      return false;
    }
    if (!selectedImage) {
      message.error("لطفا یک عکس برای دسته‌بندی انتخاب کنید");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    // محاسبه level بر اساس والد
    let level = 1;
    if (parentCategory !== "-1") {
      // پیدا کردن والد برای تعیین level
      const parent = menuData.find((cat) => cat._id === parentCategory);
      level = parent ? parent.level + 1 : 2;
    }

    const categoryData = {
      title: categoryName,
      level: level,
      parentId: parentCategory,
      description: description,
      isActive: isActive,
      img: selectedImage.url,
    };

    try {
      await axios.post(`${mainDomain}/api/categorys`, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFlag((prev) => !prev);
      Toast.fire({
        icon: "success",
        title: "دسته‌بندی جدید با موفقیت ایجاد شد",
      });
      handleClose();
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error?.response?.data?.message || "خطا در ایجاد دسته‌بندی",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        size="large"
        type="primary"
        onClick={handleOpen}
        style={{ backgroundColor: "#1976d2", borderColor: "#1976d2" }}
        icon={<FaPlus />}
      >
        افزودن دسته‌بندی جدید
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            padding: "16px 24px",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">ایجاد دسته‌بندی جدید</Typography>
            <IconButton onClick={handleClose} sx={{ color: "white" }}>
              <FaTimes />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* نام دسته‌بندی */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                نام دسته‌بندی *
              </Typography>
              <Input
                placeholder="نام دسته‌بندی را وارد کنید"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                size="large"
              />
            </Box>

            {/* دسته‌بندی والد */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                دسته‌بندی والد
              </Typography>
              <Select
                style={{ width: "100%" }}
                value={parentCategory}
                onChange={setParentCategory}
                size="large"
              >
                <Select.Option value="-1">
                  دسته‌بندی اصلی (بدون والد)
                </Select.Option>
                {getAllCategories().map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.title}{" "}
                    {category.parentId !== "-1" && `(زیرمجموعه)`}
                  </Select.Option>
                ))}
              </Select>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ mt: 1, display: "block" }}
              >
                {parentCategory === "-1"
                  ? "این دسته‌بندی به عنوان دسته اصلی ایجاد خواهد شد"
                  : "این دسته‌بندی به عنوان زیرمجموعه ایجاد خواهد شد"}
              </Typography>
            </Box>

            {/* آپلود عکس */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                تصویر دسته‌بندی *
              </Typography>
              <Box
                sx={{
                  border: "2px dashed",
                  borderColor: "grey.300",
                  borderRadius: 2,
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() =>
                  document.getElementById("category-image-upload").click()
                }
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="category-image-upload"
                />

                {!imagePreview ? (
                  <Box>
                    <FaUpload
                      style={{
                        fontSize: "2rem",
                        color: "grey.400",
                        marginBottom: "0.5rem",
                      }}
                    />
                    <Typography variant="body2" color="grey.600">
                      {uploading
                        ? "در حال آپلود..."
                        : "برای آپلود عکس کلیک کنید"}
                    </Typography>
                    <Typography variant="caption" color="grey.500">
                      فرمت‌های مجاز: JPG, PNG, GIF • حداکثر حجم: 5MB
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        borderRadius: "8px",
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="success.main"
                      sx={{ mt: 1, display: "block" }}
                    >
                      عکس با موفقیت آپلود شد
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* وضعیت فعال/غیرفعال */}
            <Box display="flex" alignItems="center" gap={1}>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                style={{ width: "18px", height: "18px" }}
              />
              <Typography variant="body2">دسته‌بندی فعال باشد</Typography>
            </Box>

            {/* توضیحات */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                توضیحات (اختیاری)
              </Typography>
              <TextArea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="توضیحات درباره این دسته‌بندی..."
                maxLength={500}
                showCount
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            size="large"
            onClick={handleClose}
            style={{ flex: 1 }}
            disabled={loading}
          >
            انصراف
          </Button>
          <Button
            size="large"
            type="primary"
            loading={loading}
            onClick={handleSubmit}
            style={{
              flex: 1,
              backgroundColor: "#1976d2",
              borderColor: "#1976d2",
            }}
          >
            {loading ? "در حال ایجاد..." : "ایجاد دسته‌بندی"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalNewCategory;
