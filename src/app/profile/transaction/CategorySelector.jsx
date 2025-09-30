import { Button, Empty, Input, Modal, Row, Steps } from "antd";
import { useState } from "react";

const { Step } = Steps;

const CategorySelector = ({ categories, selected, setSelected, error }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentStep(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (level, category) => {
    if (level === 1) {
      setSelected({ level1: category, level2: null, level3: null });
      setCurrentStep(1);
    } else if (level === 2) {
      setSelected((prev) => ({ ...prev, level2: category, level3: null }));
      setCurrentStep(2);
    } else {
      setSelected((prev) => ({ ...prev, level3: category }));
      closeModal();
    }
  };

  const level1 = categories.filter((c) => c.parentId === "-1");
  const level2 = categories.filter((c) => c.parentId === selected.level1?._id);
  const level3 = categories.filter((c) => c.parentId === selected.level2?._id);

  const getDisplayValue = () => {
    if (selected.level1 && selected.level2 && selected.level3) {
      return `${selected.level1.title} > ${selected.level2.title} > ${selected.level3.title}`;
    }
    return "";
  };

  const renderCards = (items, level) => {
    if (!items.length) {
      return (
        <div style={{ padding: "40px 0" }}>
          <Empty description="هیچ دسته‌بندی‌ای وجود ندارد" />
        </div>
      );
    }

    return (
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <div
            key={item._id}
            onClick={() => handleSelect(level, item)}
            className="w-auto border border-[#0001] rounded-lg p-2 cursor-pointer duration-300 hover:shadow-lg"
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <img
                alt={item.title}
                src={item.img}
                style={{
                  width: "100px",
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </Row>
    );
  };

  return (
    <div>
      <Input
        status={error.category ? "error" : ""}
        size="large"
        readOnly
        value={getDisplayValue()}
        onClick={openModal}
        placeholder="انتخاب دسته‌بندی..."
      />
      {error.category && (
        <span className="text-red-500 text-xs">
          * لطفا دسته بندی را انتخاب نمایید
        </span>
      )}

      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={750}
        zIndex={10000}
        title="انتخاب دسته‌بندی"
      >
        {/* Steps قابل کلیک */}
        <Steps
          current={currentStep}
          size="small"
          style={{ marginBottom: 20 }}
          onChange={(step) => {
            // فقط اجازه بدیم به مراحل قبلی برگرده
            if (step < currentStep) {
              setCurrentStep(step);
            }
          }}
        >
          <Step title="سطح 1" />
          <Step
            title="سطح 2"
            disabled={!selected.level1} // تا وقتی سطح 1 انتخاب نشده فعال نشه
          />
          <Step
            title="سطح 3"
            disabled={!selected.level2} // تا وقتی سطح 2 انتخاب نشده فعال نشه
          />
        </Steps>

        {currentStep === 0 && renderCards(level1, 1)}
        {currentStep === 1 && renderCards(level2, 2)}
        {currentStep === 2 && renderCards(level3, 3)}

        <div style={{ textAlign: "right", marginTop: 20 }}>
          <Button onClick={closeModal}>بستن</Button>
        </div>
      </Modal>
    </div>
  );
};

export default CategorySelector;
