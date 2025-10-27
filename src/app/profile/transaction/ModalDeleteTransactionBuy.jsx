import { mainDomain } from "@/utils/mainDomain";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

function ModalDeleteTransactionBuy({ id, setFlag }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`${mainDomain}/api/transaction/buy/${id}`)
      .then(() => {
        setFlag(prev => !prev);
        handleClose();
        Toast.fire({
          icon: "success",
          title: "آگهی خرید با موفقیت حذف شد",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message || "خطا در حذف آگهی",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Tooltip title="حذف آگهی" arrow>
        <IconButton 
          onClick={handleOpen}
          className="!text-red-600 hover:!text-red-800 hover:!bg-red-50"
          size="small"
        >
          <FaTrash size={16} />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle className="bg-gradient-to-r from-red-500 to-red-600 text-white !px-3 !py-1 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaTrash />
              <span className="text-lg font-semibold">حذف آگهی خرید</span>
            </div>
            <IconButton onClick={handleClose} className="!text-white hover:bg-white/20">
              <FaTimes />
            </IconButton>
          </div>
        </DialogTitle>

        <DialogContent className="p-2">
          <div className="text-center py-4">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTrash className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              تایید حذف آگهی
            </h3>
            <p className="text-gray-600 leading-6">
              آیا از حذف این آگهی خرید مطمئن هستید؟
              <br />
              <span className="text-red-500 font-medium">
                این عمل قابل بازگشت نیست.
              </span>
            </p>
          </div>
        </DialogContent>

        <DialogActions className="p-4 gap-2">
          <Button 
            size="large" 
            onClick={handleClose}
            className="flex-1"
            disabled={loading}
          >
            انصراف
          </Button>
          <Button
            size="large"
            type="primary"
            loading={loading}
            onClick={handleDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 border-red-500"
          >
            {loading ? "در حال حذف..." : "حذف آگهی"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalDeleteTransactionBuy;