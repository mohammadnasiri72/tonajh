import { Input, Select } from "antd";
import { useState } from "react";
import ModalNewTransactionSell from "./ModalNewTransactionSell";

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const SellForm = () => {
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center border-t-2 border-[#0002] pt-2">
        <h2 className="text-lg font-semibold">لیست آگهی های فروش</h2>
        <ModalNewTransactionSell setFlag={setFlag} />
      </div>
    </>
  );
};

export default SellForm;
