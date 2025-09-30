import { mainDomain } from "@/utils/mainDomain";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { Button } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

// تنظیمات Toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: { container: "toast-modal" },
});

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

function ModalNewTransactionSell({ setFlag }) {
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
  const token = Cookies.get("token");

  const buyTransactionHandler = () => {
    setLoading(true);
    const data = {
      categoryId: selected?.level3?._id,
      categoryTitle: selected?.level3?.title,
      type,
      unit: selected?.level3?.unit,
      unitAmount: unit,
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
  };

  return (
    <>
      <Button size="large" type="primary" onClick={handleOpen}>
        ثبت آگهی فروش
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              ...style,
              width: {
                xs: "95%",
                sm: "auto",
              },
            }}
          >
            <span className="text-2xl font-semibold">ثبت آگهی فروش</span>
            <div className="mt-3">
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
            ,
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default ModalNewTransactionSell;
