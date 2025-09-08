import { IconButton, Tooltip } from "@mui/material";
import { Button, Input, Modal, Switch, TreeSelect } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import UploaderImg from "./UploaderImg";
import { mainDomain } from "@/utils/mainDomain";

// تنظیمات Toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

export const convertToTreeDataWithDisabledLevel3 = (categories) => {
  const categoryMap = {};
  const level1Categories = [];

  // ابتدا همه دسته‌بندی‌ها را به مپ اضافه می‌کنیم
  categories.forEach((category) => {
    categoryMap[category._id] = {
      value: category._id,
      title: category.title,
      children: [],
      rawData: category,
      disabled: category.level >= 3, // غیرفعال کردن سطح سوم و بالاتر
    };
  });

  // ساختار درختی ایجاد می‌کنیم
  categories.forEach((category) => {
    const treeNode = categoryMap[category._id];

    if (category.level === 1) {
      // دسته‌بندی سطح ۱
      level1Categories.push(treeNode);
    } else if (category.level >= 2) {
      // دسته‌بندی سطح ۲ و ۳ - به والدش اضافه می‌شود
      const parent = categoryMap[category.parentId];
      if (parent) {
        parent.children.push(treeNode);

        // اگر والد غیرفعال است، فرزند هم غیرفعال می‌شود
        if (parent.disabled) {
          treeNode.disabled = true;
        }
      }
    }
  });

  // ایجاد گزینه اصلی
  const mainCategoryOption = {
    value: "-1",
    title: "دسته‌بندی اصلی",
    children: level1Categories,
    rawData: {
      _id: "-1",
      title: "دسته‌بندی اصلی",
      parentId: null,
      isMainCategory: true,
    },
  };

  return [mainCategoryOption];
};

function ModalEditCategory({ setFlag, menuData, categoryEdit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [desc, setDesc] = useState("");
  const [valTreeSelect, setValTreeSelect] = useState("-1");


  useEffect(() => {
    if (isModalOpen) {
      setValTreeSelect(categoryEdit.parentId);
      setTitle(categoryEdit.title);
      setIsActive(categoryEdit.isActive);
      setDesc(categoryEdit.description);
    }
  }, [isModalOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const resetState = () => {
    setTitle("");
    setIsActive(true);
    setDesc("");
    setValTreeSelect("-1");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    resetState();
  };

  const handleOk = () => {
    const data = {
      title,
      parentId: valTreeSelect,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhCZe0e0hWp5eEvMfEsXrAJnl-AxE4IXDOAQ&s",
      description: desc,
      isActive,
    };

    axios
      .put(`${mainDomain}/api/categorys/${categoryEdit._id}`, data)
      .then(() => {
        setFlag((e) => !e);
        Toast.fire({
          icon: "success",
          title: "دسته بندی با موفقیت ویرایش شد",
        });
        handleCancel();
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "انجام نشد",
        });
      });
  };

  return (
    <div>
      {/* <Button size="large" type="primary" onClick={showModal}>
        افزودن دسته‌بندی
      </Button> */}
      <Tooltip
        title="ویرایش"
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
          <FaEdit className="text-xs text-teal-500" />
        </IconButton>
      </Tooltip>
      <Modal
        title="ویرایش دسته بندی "
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel-button" onClick={handleCancel}>
            انصراف
          </Button>,
          <Button key="submit-button" type="primary" onClick={handleOk}>
            ویرایش
          </Button>,
        ]}
      >
        <TreeSelect
          styles={{
            popup: { root: { maxHeight: 400, overflow: "auto" } },
          }}
          placeholder="انتخاب دسته بندی"
          style={{ width: "100%" }}
          treeLine={true}
          treeData={convertToTreeDataWithDisabledLevel3(menuData)}
          treeIcon={false}
          value={valTreeSelect}
          onChange={(e) => {
            setValTreeSelect(e);
          }}
        />

        <div className="mt-3">
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="نام دسته بندی (مثل حبوبات)"
          />
        </div>

        <div className="flex justify-between py-3">
          <UploaderImg />
          <Switch
            size="default"
            checkedChildren="فعال"
            unCheckedChildren="غیر فعال"
            value={isActive}
            onChange={setIsActive}
          />
        </div>
        <TextArea
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          rows={4}
          placeholder="توضیحات"
        />
      </Modal>
    </div>
  );
}

export default ModalEditCategory;
