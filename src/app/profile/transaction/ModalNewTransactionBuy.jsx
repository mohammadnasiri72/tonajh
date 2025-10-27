"use client";

import { mainDomain } from "@/utils/mainDomain";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Button, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
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

function ModalNewTransactionBuy({ setFlag }) {
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
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelected({ level1: null, level2: null, level3: null });
    setType("");
    setUnit("");
    setDesc("");
    setError({ category: false, type: false, unit: false });
  };

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
      statusTitle: "منتظر تایید",
    };

    axios
      .post(`${mainDomain}/api/transaction/buy`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        handleClose();
        if (setFlag) {
          setFlag((prev) => !prev);
        }
        Toast.fire({
          icon: "success",
          title: "آگهی خرید با موفقیت ثبت شد",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message || "خطا در ثبت آگهی",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {token ? (
        <Button
          type="primary"
          size="large"
          icon={<FaPlus className="ml-2" />}
          onClick={handleOpen}
          className="bg-blue-600 hover:bg-blue-700 border-blue-600"
        >
          ثبت آگهی خرید
        </Button>
      ) : (
        <Button
          type="primary"
          size="large"
          icon={<FaPlus className="ml-2" />}
          onClick={() => {
            router.push("/login");
          }}
          className="bg-blue-600 hover:bg-blue-700 border-blue-600"
        >
          ثبت آگهی خرید
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: { borderRadius: 3 },
          },
        }}
      >
        <DialogTitle className="bg-gradient-to-r from-blue-500 to-blue-600 text-white !px-3 !py-1 !mb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaPlus />
              <span className="text-lg font-semibold">ثبت آگهی خرید جدید</span>
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
            {/* دسته‌بندی */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                دسته‌بندی *
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
                نوع محصول *
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
                میزان نیازمندی *
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
                توضیحات
              </label>
              <TextField
                sx={{
                  fontFamily: "Yekan, sans-serif",
                  "& .MuiInputBase-input": {
                    fontFamily: "Yekan, sans-serif",
                  },
                  "& .MuiFormHelperText-root": {
                    fontFamily: "Yekan, sans-serif",
                  },
                }}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                multiline
                rows={4}
                placeholder="توضیحات اختیاری درباره درخواست خرید..."
                fullWidth
                variant="outlined"
                size="medium"
                slotProps={{
                  htmlInput: {
                    maxLength: 500,
                  },
                  formHelperText: {
                    style: {
                      textAlign: "left",
                      marginLeft: 0,
                      marginRight: 0,
                    },
                  },
                }}
                helperText={`${desc.length}/500`}
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
            {loading ? "در حال ثبت..." : "ثبت آگهی خرید"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalNewTransactionBuy;
