import { EuroOutlined, UploadOutlined } from "@ant-design/icons";
import { Typography } from "@mui/material";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { motion } from "framer-motion";

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const SellForm = () => {
  const onFinish = (values) => {
    message.success("آگهی فروش شما با موفقیت ثبت شد!");
    // اینجا می‌توانید اطلاعات را به سرور ارسال کنید
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography
        variant="h6"
        component="h6"
        gutterBottom
        align="center"
        sx={{ mb: 3, color: "#d32f2f" }}
      >
        فرم آگهی فروش
      </Typography>
      <Form
        {...formItemLayout}
        name="sell_form"
        onFinish={onFinish}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name="item_name"
          label="نام کالا/خدمت"
          rules={[
            { required: true, message: "لطفاً نام کالا/خدمت را وارد کنید!" },
          ]}
        >
          <Input placeholder="مثلاً: لپ‌تاپ لنوو مدل ThinkPad X1" />
        </Form.Item>

        <Form.Item
          name="category"
          label="دسته‌بندی"
          rules={[
            { required: true, message: "لطفاً دسته‌بندی را انتخاب کنید!" },
          ]}
        >
          <Select placeholder="یک دسته‌بندی را انتخاب کنید">
            <Option value="electronics">الکترونیک</Option>
            <Option value="vehicles">وسایل نقلیه</Option>
            <Option value="home_appliances">لوازم خانگی</Option>
            <Option value="real_estate">املاک</Option>
            <Option value="services">خدمات</Option>
            <Option value="other">سایر</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
          label="قیمت (تومان)"
          rules={[{ required: true, message: "لطفاً قیمت را وارد کنید!" }]}
        >
          <InputNumber
            min={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
            placeholder="مثلاً: 25,000,000"
            prefix={<EuroOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="توضیحات کالا/خدمت"
          rules={[
            {
              required: true,
              message: "لطفاً توضیحات کالا/خدمت را وارد کنید!",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="توضیحات کامل در مورد کالا/خدمت، ویژگی‌ها، وضعیت، دلایل فروش و..."
          />
        </Form.Item>

        <Form.Item
          name="condition"
          label="وضعیت کالا"
          rules={[
            { required: true, message: "لطفاً وضعیت کالا را انتخاب کنید!" },
          ]}
        >
          <Select placeholder="وضعیت کالای خود را انتخاب کنید">
            <Option value="new">نو</Option>
            <Option value="used_like_new">درحد نو</Option>
            <Option value="used_good">کارکرده (وضعیت خوب)</Option>
            <Option value="used_fair">کارکرده (وضعیت متوسط)</Option>
            <Option value="for_parts">نیازمند تعمیر/برای قطعه</Option>
          </Select>
        </Form.Item>

        <Form.Item name="purchase_date" label="تاریخ خرید (اختیاری)">
          <DatePicker
            style={{ width: "100%" }}
            placeholder="تاریخ خرید را انتخاب کنید"
          />
        </Form.Item>

        <Form.Item
          name="contact_info"
          label="شماره تماس"
          rules={[
            { required: true, message: "لطفاً شماره تماس را وارد کنید!" },
            { pattern: /^[0-9]{11}$/, message: "فرمت شماره تماس صحیح نیست!" },
          ]}
        >
          <Input placeholder="مثلاً: 09123456789" />
        </Form.Item>

        <Form.Item
          name="location"
          label="مکان (استان/شهر)"
          rules={[{ required: true, message: "لطفاً مکان را وارد کنید!" }]}
        >
          <Input placeholder="مثلاً: اصفهان، خیابان چهارباغ" />
        </Form.Item>

        <Form.Item
          name="images"
          label="عکس‌های کالا"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "لطفاً حداقل یک عکس از کالا بارگذاری کنید!",
            },
          ]}
        >
          <Upload name="logo" action="/upload.do" listType="picture-card">
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>بارگذاری</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block danger>
            ثبت آگهی فروش
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default SellForm;
