import { mainDomain } from "@/utils/mainDomain";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import CategorySelector from "./CategorySelector";

// تنظیمات Toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: { container: "toast-modal" },
});

// تابع تبدیل اعداد فارسی به انگلیسی (برای پردازش)
const toEnglishNumber = (number) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return number.toString().replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d));
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
  borderRadius: "20px",
};

function ModalNewTransactionBuy({ setFlag }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const [error, seterror] = useState({
    category: false,
    type: false,
    unit: false,
  });
  const token = Cookies.get("token");

  console.log(unit);

  useEffect(() => {
    if (selected.level3) {
      seterror((prev) => ({
        ...prev,
        category: false,
      }));
    }
  }, [selected]);

  const buyTransactionHandler = () => {
    if (!selected.level3) {
      seterror((prev) => ({
        ...prev,
        category: true,
      }));
    }
    if (!type) {
      seterror((prev) => ({
        ...prev,
        type: true,
      }));
    }
    if (!unit) {
      seterror((prev) => ({
        ...prev,
        unit: true,
      }));
    }

    if (selected.level3 && type && unit) {
      setLoading(true);
      const data = {
        categoryId: selected?.level3?._id,
        categoryTitle: selected?.level3?.title,
        type,
        unit: selected?.level3?.unit,
        unitAmount: Number(unit.replace(/,/g, "")),
        description: desc,
      };
      axios
        .post(`${mainDomain}/api/transaction/buy`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          handleClose();
          if (setFlag) {
            setFlag((e) => !e);
          }
          Toast.fire({
            icon: "success",
            title: "آگهی جدید با موفقیت ثبت شد لطفا منتظر تایید ادمین بمانید",
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: err?.response?.data?.message
              ? err.response.data.message
              : "انجام نشد",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Button size="large" type="primary" onClick={handleOpen}>
        ثبت آگهی خرید
      </Button>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <span className="text-2xl font-semibold">ثبت آگهی جدید</span>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-wrap items-center mt-3 gap-2">
            <div className="w-full">
              <CategorySelector
                categories={categorys}
                selected={selected}
                setSelected={setSelected}
                error={error}
              />
            </div>
            <div className="w-full mt-3">
              <Input
                status={error.type ? "error" : ""}
                size="large"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  seterror((prev) => ({
                    ...prev,
                    type: false,
                  }));
                }}
                placeholder={`نوع محصول ${
                  selected?.level3?.type
                    ? `مثلا (${selected?.level3?.type})`
                    : ""
                }`}
              />
              {error.type && (
                <span className="text-red-500 text-xs">
                  * لطفا نوع محصول را وارد کنید
                </span>
              )}
            </div>
            <div className="w-full mt-3">
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
                    seterror((prev) => ({
                      ...prev,
                      unit: false,
                    }));
                  }
                }}
                placeholder="میزان نیازمندی محصول"
              />
              {error.unit && (
                <span className="text-red-500 text-xs">
                  * لطفا میزان نیازمندی محصول را وارد کنید
                </span>
              )}
            </div>
            <div className="w-full mt-3">
              <TextArea
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                rows={4}
                placeholder="توضیحات (اختیاری)"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="mt-3 w-full">
            <Button
              size="large"
              className="!w-full"
              key="submit"
              type="primary"
              loading={loading}
              onClick={buyTransactionHandler}
            >
              ثبت درخواست
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalNewTransactionBuy;
