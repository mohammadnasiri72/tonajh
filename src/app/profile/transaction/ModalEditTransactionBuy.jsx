import { mainDomain } from "@/utils/mainDomain";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
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

function ModalEditTransactionBuy({ setFlag, request }) {
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
  const [desc, setDesc] = useState("");
  const [error, setError] = useState({
    category: false,
    type: false,
    unit: false,
  });
  const token = Cookies.get("token");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError({ category: false, type: false, unit: false });
  };

  useEffect(() => {
    if (request?.categoryId && categorys.length > 0) {
      const cat3 = categorys.find((e) => e._id === request.categoryId);
      const cat2 = categorys.find((e) => e._id === cat3?.parentId);
      const cat1 = categorys.find((e) => e._id === cat2?.parentId);

      setSelected({
        level1: cat1 || null,
        level2: cat2 || null,
        level3: cat3 || null,
      });

      setType(request.type || "");
      setUnit(request.unitAmount?.toLocaleString() || "");
      setDesc(request.description || "");
    }
  }, [categorys, request]);

  useEffect(() => {
    if (selected.level3) {
      setError((prev) => ({ ...prev, category: false }));
    }
  }, [selected]);

  const validateForm = () => {
    const errors = {
      category: !selected.level3,
      type: !type.trim(),
      unit: !unit,
    };
    setError(errors);
    return !Object.values(errors).some(Boolean);
  };

  const buyTransactionHandler = () => {
    if (!validateForm()) {
      Toast.fire({
        icon: "warning",
        title: "لطفا تمام فیلدهای ضروری را پر کنید",
      });
      return;
    }

    setLoading(true);
    const data = {
      categoryId: selected.level3._id,
      categoryTitle: selected.level3.title,
      type: type.trim(),
      unit: selected.level3.unit,
      unitAmount: Number(toEnglishNumber(unit).replace(/,/g, "")),
      description: desc.trim(),
      status: 1,
      statusTitle: 'منتظر تایید',
    };

    axios
      .put(`${mainDomain}/api/transaction/buy/${request._id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        handleClose();
        setFlag((prev) => !prev);
        Toast.fire({
          icon: "success",
          title: "آگهی خرید با موفقیت ویرایش شد",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message || "خطا در ویرایش آگهی",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Tooltip title="ویرایش آگهی" arrow>
        <IconButton
          onClick={handleOpen}
          className="!text-green-600 hover:!text-green-800 hover:!bg-green-50"
          size="small"
        >
          <FaEdit size={16} />
        </IconButton>
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
        <DialogTitle className="bg-gradient-to-r from-blue-500 to-blue-600 text-white !px-3 !py-1 !mb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaEdit />
              <span className="text-lg font-semibold">ویرایش آگهی خرید</span>
            </div>
            <IconButton
              onClick={handleClose}
              className="!text-white hover:bg-white/20"
            >
              <FaTimes />
            </IconButton>
          </div>
        </DialogTitle>

        <DialogContent className="p-6">
          <div className="space-y-4">
            {/* اطلاعات آگهی فعلی */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-blue-800 font-semibold mb-2">آگهی فعلی</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>دسته‌بندی: {request?.categoryTitle}</p>
                <p>نوع محصول: {request?.type}</p>
                <p>
                  میزان نیاز: {request?.unitAmount?.toLocaleString()}{" "}
                  {request?.unit}
                </p>
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

            {/* میزان نیازمندی */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                میزان نیازمندی جدید *
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
                placeholder="میزان نیازمندی محصول"
              />
              {error.unit && (
                <span className="text-red-500 text-xs mt-1">
                  لطفا میزان نیازمندی را وارد کنید
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
                placeholder="توضیحات جدید درباره درخواست خرید..."
                showCount
                maxLength={500}
              />
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
            onClick={buyTransactionHandler}
            className="flex-1 bg-blue-600 hover:bg-blue-700 border-blue-600"
          >
            {loading ? "در حال ویرایش..." : "ویرایش آگهی خرید"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalEditTransactionBuy;
