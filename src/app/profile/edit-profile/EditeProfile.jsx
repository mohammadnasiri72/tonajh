import {
  CameraOutlined,
  EditOutlined,
  EnvironmentOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Switch,
  Upload,
  message,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const { Option } = Select;
const { TextArea } = Input;

const EditeProfile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // داده‌های اولیه کاربر
  const userData = {
    name: "محمد رضایی",
    email: "mohammad@example.com",
    phone: "09123456789",
    bio: "خریدار و فروشنده محصولات صنعتی با سابقه ۵ سال فعالیت در بازارگاه",
    location: "تهران، ایران",
    birthDate: dayjs("1990-01-15"),
    gender: "male",
    notifications: true,
    newsletter: false,
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // شبیه‌سازی ارسال داده به سرور
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success("پروفایل با موفقیت به‌روزرسانی شد");
    } catch (error) {
      message.error("خطا در به‌روزرسانی پروفایل");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (values) => {
    try {
      message.success("رمز عبور با موفقیت تغییر یافت");
      passwordForm.resetFields();
    } catch (error) {
      message.error("خطا در تغییر رمز عبور");
    }
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      setProfileImage(URL.createObjectURL(info.file.originFileObj));
      message.success("تصویر پروفایل با موفقیت آپلود شد");
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("فقط فایل‌های تصویری مجاز هستند");
      }
      return isImage || Upload.LIST_IGNORE;
    },
    showUploadList: false,
    onChange: handleImageUpload,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">ویرایش پروفایل</h1>
          <p className="text-gray-600 mt-2">
            اطلاعات حساب کاربری خود را مدیریت کنید
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* سایدبار */}
          <div className="lg:col-span-1">
            <Card className="sticky shadow-lg border-0">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar
                    size={120}
                    src={profileImage || "/default-avatar.png"}
                    icon={<UserOutlined />}
                    className="border-4 border-white shadow-lg"
                  />
                  <Upload {...uploadProps}>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<CameraOutlined />}
                      size="small"
                      className="absolute bottom-0 left-0 shadow-md"
                    />
                  </Upload>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {userData.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1">{userData.bio}</p>
                <Divider className="my-4" />
                <div className="space-y-2 text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">اعتبار حساب:</span>
                    <span className="font-semibold text-green-600">
                      ۴,۸۵۰,۰۰۰ تومان
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">تعداد معاملات:</span>
                    <span className="font-semibold">۴۷</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">عضویت از:</span>
                    <span className="font-semibold">۱۴۰۲/۰۳/۱۲</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* فرم ویرایش */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <Form
                form={form}
                layout="vertical"
                initialValues={userData}
                onFinish={handleSubmit}
                className="profile-form"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="name"
                    label="نام کامل"
                    rules={[
                      { required: true, message: "لطفا نام خود را وارد کنید" },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="نام و نام خانوادگی"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="ایمیل"
                    rules={[
                      {
                        required: true,
                        message: "لطفا ایمیل خود را وارد کنید",
                      },
                      { type: "email", message: "ایمیل معتبر نیست" },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="example@domain.com"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="شماره تماس"
                    rules={[
                      {
                        required: true,
                        message: "لطفا شماره تماس خود را وارد کنید",
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item name="birthDate" label="تاریخ تولد">
                    <DatePicker
                      className="w-full"
                      size="large"
                      placeholder="انتخاب تاریخ"
                    />
                  </Form.Item>

                  <Form.Item
                    name="gender"
                    label="جنسیت"
                    className="md:col-span-2"
                  >
                    <Select size="large" placeholder="انتخاب جنسیت">
                      <Option value="male">مرد</Option>
                      <Option value="female">زن</Option>
                      <Option value="other">سایر</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="location"
                    label="موقعیت جغرافیایی"
                    className="md:col-span-2"
                  >
                    <Input
                      prefix={<EnvironmentOutlined />}
                      placeholder="شهر، استان"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="bio"
                    label="درباره من"
                    className="md:col-span-2"
                  >
                    <TextArea
                      rows={4}
                      placeholder="توضیح مختصری درباره خود و فعالیت‌هایتان..."
                      maxLength={200}
                      showCount
                    />
                  </Form.Item>
                </div>

                <Divider />

                <h3 className="text-lg font-semibold mb-4">
                  تنظیمات حساب کاربری
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="notifications"
                    label="اعلان‌ها"
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren="فعال"
                      unCheckedChildren="غیرفعال"
                    />
                  </Form.Item>

                  <Form.Item
                    name="newsletter"
                    label="خبرنامه ایمیلی"
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren="فعال"
                      unCheckedChildren="غیرفعال"
                    />
                  </Form.Item>
                </div>

                <Divider />

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Button
                    type="default"
                    size="large"
                    onClick={() => form.resetFields()}
                  >
                    بازنشانی
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    icon={<EditOutlined />}
                    className="min-w-32"
                  >
                    {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
                  </Button>
                </div>
              </Form>
            </Card>

            {/* بخش تغییر رمز عبور - با Form جداگانه */}
            <Card className="shadow-lg border-0 mt-6">
              <Form
                form={passwordForm}
                layout="vertical"
                onFinish={handlePasswordChange}
              >
                <h3 className="text-lg font-semibold mb-4">تغییر رمز عبور</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="currentPassword"
                    label="رمز عبور فعلی"
                    rules={[
                      {
                        required: true,
                        message: "لطفا رمز عبور فعلی را وارد کنید",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="رمز عبور فعلی"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="newPassword"
                    label="رمز عبور جدید"
                    rules={[
                      {
                        required: true,
                        message: "لطفا رمز عبور جدید را وارد کنید",
                      },
                      { min: 6, message: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="رمز عبور جدید"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="تکرار رمز عبور جدید"
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message: "لطفا تکرار رمز عبور را وارد کنید",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("رمز عبورها مطابقت ندارند")
                          );
                        },
                      }),
                    ]}
                    className="md:col-span-2"
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="تکرار رمز عبور جدید"
                      size="large"
                    />
                  </Form.Item>
                </div>
                <Button
                  type="primary"
                  ghost
                  htmlType="submit"
                  size="large"
                  icon={<LockOutlined />}
                >
                  تغییر رمز عبور
                </Button>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditeProfile;
