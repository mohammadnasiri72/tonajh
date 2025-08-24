import { mainDomain } from "@/utils/mainDomain";
import { IconButton, Tooltip } from "@mui/material";
import { Button, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

// تنظیمات Toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

function ModalDeleteCategory({ id, setFlag }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    axios
      .delete(`${mainDomain}/api/categorys/${id}`)
      .then(() => {
        setFlag((e) => !e);
        Toast.fire({
          icon: "success",
          title: "دسته بندی با موفقیت حذف شد",
        });
        handleCancel();
      })
      .catch((err) => {
        console.error(err);

        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message
            ? err.response.data.message
            : "مشکلی در حذف دسته بندی به وجود آمده !!!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip
        title="حذف"
        componentsProps={{
          tooltip: {
            sx: {
              fontFamily: '"Yekan", sans-serif !important',
              direction: "rtl",
              fontSize: "12px",
            },
          },
        }}
      >
        <IconButton onClick={showModal}>
          <FaTrash className="text-xs text-red-500" />
        </IconButton>
      </Tooltip>

      <Modal
        footer={[
          <Button key="cancel-button" onClick={handleCancel}>
            انصراف
          </Button>,
          <Button
            style={{ backgroundColor: "#fb2c36 " }}
            key="submit-button"
            type="primary"
            onClick={handleOk}
            loading={loading}
            disabled={loading}
          >
            حذف
          </Button>,
        ]}
        title="حذف دسته بندی"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>آیا از حذف مطمئن هستید؟</p>
      </Modal>
    </>
  );
}

export default ModalDeleteCategory;
