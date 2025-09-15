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

const BuyForm = () => {
  const onFinish = (values) => {
    message.success("آگهی خرید شما با موفقیت ثبت شد!");
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
        sx={{ mb: 3, color: "#3f51b5" }}
      >
        فرم آگهی خرید
      </Typography>
      <Form
        {...formItemLayout}
        name="buy_form"
        onFinish={onFinish}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name="item_name"
          label="نام کالا/خدمت مورد نیاز"
          rules={[
            { required: true, message: "لطفاً نام کالا/خدمت را وارد کنید!" },
          ]}
        >
          <Input placeholder="مثلاً: گوشی موبایل آیفون 15" />
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

        <Form.Item name="min_price" label="حداکثر بودجه (تومان)">
          <InputNumber
            min={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
            placeholder="مثلاً: 50,000,000"
            prefix={<EuroOutlined />}
          />
        </Form.Item>

        <Form.Item name="description" label="توضیحات تکمیلی">
          <TextArea
            rows={4}
            placeholder="توضیحات بیشتر در مورد کالای مورد نیاز، ویژگی‌ها، وضعیت و..."
          />
        </Form.Item>

        <Form.Item
          name="condition"
          label="وضعیت مورد نظر"
          rules={[
            { required: true, message: "لطفاً وضعیت مورد نظر را انتخاب کنید!" },
          ]}
        >
          <Select placeholder="وضعیت کالای مورد نیاز">
            <Option value="new">نو</Option>
            <Option value="used_like_new">درحد نو</Option>
            <Option value="used_good">کارکرده (وضعیت خوب)</Option>
            <Option value="used_fair">کارکرده (وضعیت متوسط)</Option>
          </Select>
        </Form.Item>

        <Form.Item name="preferred_date" label="تاریخ تحویل/خرید مورد نظر">
          <DatePicker
            style={{ width: "100%" }}
            placeholder="تاریخ را انتخاب کنید"
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

        <Form.Item name="location" label="مکان مورد نظر (استان/شهر)">
          <Input placeholder="مثلاً: تهران، منطقه 5" />
        </Form.Item>

        <Form.Item
          name="images"
          label="عکس (اختیاری)"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>انتخاب عکس</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            ثبت آگهی خرید
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default BuyForm;
