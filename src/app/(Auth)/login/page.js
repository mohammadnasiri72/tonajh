"use client";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { mainDomain } from "@/utils/mainDomain";
import { BankOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EnterCodeSent from "./EnterCodeSent";
import CountdownTimer from "./TimerLogin";

// تنظیمات Toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

export default function LoginPage() {
  const [step, setStep] = useState(2);
  const [loadingStep0, setLoadingStep0] = useState(false);
  const [loadingStep1, setLoadingStep1] = useState(false);
  const [tel, setTel] = useState("");
  const [otp, setOtp] = useState("");
  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [listProvince, setListProvince] = useState([]);
  const [listCities, setListCities] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState(null);
  const [optionsProvince, setOptionsProvince] = useState([]);

  useEffect(()=>{
    if (listProvince[0].length > 0) {
      setOptionsProvince(listProvince[0].map((item) => ({
    value: item.id,
    label: item.name,
  })))
    }
  },[listProvince])



  console.log(optionsProvince);

  // get list province & cities
  useEffect(() => {
    Promise.all([
      axios.get(`${mainDomain}/api/province`),
      axios.get(`${mainDomain}/api/cities`),
    ]).then((res) => {
      setListProvince([res[0].data.province]);
      setListCities([res[1].data.cities]);
    });
  }, []);

  const router = useRouter();

  useEffect(() => {
    const handleEnterKey = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("btn-login").click();
      }
    };

    document.addEventListener("keydown", handleEnterKey);

    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, []);

  const handleSetMobile = () => {
    setLoadingStep0(true);
    axios
      .post(`${mainDomain}/api/auth/sendOtp`, { mobile: tel })
      .then((res) => {
        setStep(1);
        Toast.fire({
          icon: "success",
          title: res?.data?.message ? res?.data?.message : "کد تایید ارسال شد",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message
            ? err?.response?.data?.message
            : "خطای سرور",
        });
      })
      .finally(() => {
        setLoadingStep0(false);
      });
  };

  const handleOtp = () => {
    setLoadingStep1(true);
    const data = {
      mobile: tel,
      code: otp,
    };
    axios
      .post(`${mainDomain}/api/auth/checkMobile`, data)
      .then((res) => {
        if (res.data.status === "login") {
          Toast.fire({
            icon: "success",
            title: res?.data?.message
              ? res?.data?.message
              : "با موفقیت وارد شدید",
          });
          Cookies.set("token", res.data.token);
          Cookies.set("user", JSON.stringify(res.data.user));
          router.push("/");
        }
        if (res.data.status === "register") {
          Toast.fire({
            icon: "success",
            title: res?.data?.message
              ? res?.data?.message
              : "لطفا برای ثبت نام مشخصات خود را وارد کنید",
          });
          setStep(2);
        }
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err?.response?.data?.message
            ? err?.response?.data?.message
            : "خطای سرور",
        });
      })
      .finally(() => {
        setLoadingStep1(false);
      });
  };

  const handleRegister = () => {
    axios
      .post(`${mainDomain}/api/auth/register`, {
        mobile: tel,
        firstName,
        lastName,
        cityId: "5",
      })
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: res?.data?.message
            ? res?.data?.message
            : "ثبت نام شما با موفقیت انجام شد",
        });
        Cookies.set("token", res.data.token);
        Cookies.set("user", JSON.stringify(res.data.user));
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          {step === 0 && (
            <div className="sm:w-96 w-[95%] h-96 bg-white shadow-lg border border-[#0001] rounded-2xl p-3 flex flex-col justify-between">
              <div>
                <div className="w-full flex justify-center">
                  <img
                    src="/images/logo.png"
                    alt="لوگو"
                    className="h-20 w-20 object-contain"
                  />
                </div>
                <p className="text-lg font-semibold">خوش آمدید!</p>
                <span className="text-[#0009] font-semibold">
                  ۱ میلیون تاجر در تناژ منتظر معامله با شما هستند.
                </span>
                <div className="pt-10">
                  <p className="text-lg font-semibold">شماره موبایل </p>
                  <Input
                    className={`${
                      tel.match(paternMobile)
                        ? "!border-emerald-500"
                        : !tel.match(/^(|\d+)$/)
                        ? "!border-red-500"
                        : ""
                    }`}
                    size="large"
                    placeholder="شماره موبایل"
                    value={tel}
                    onChange={(e) => {
                      setTel(e.target.value);
                    }}
                  />
                  {!tel.match(/^(|\d+)$/) && (
                    <span className="text-xs text-red-500">
                      {" "}
                      لطفا شماره موبایل را به صورت عددی وارد کنید{" "}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Button
                  loading={loadingStep0}
                  onClick={handleSetMobile}
                  id="btn-login"
                  disabled={!tel.match(paternMobile)}
                  size="large"
                  className="w-full"
                  type="primary"
                >
                  ورود
                </Button>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="sm:w-96 w-[95%] h-96 bg-white shadow-lg border border-[#0001] rounded-2xl p-3 flex flex-col justify-between">
              <div>
                <div className="w-full flex justify-center">
                  <img
                    src="/images/logo.png"
                    alt="لوگو"
                    className="h-20 w-20 object-contain"
                  />
                </div>
                <p className="text-lg font-semibold"> کد تایید را وارد کنید </p>
                <span className="text-[#0009] font-semibold">
                  کد تایید برای شماره {tel} پیامک شد.
                </span>
                <div className="pt-10">
                  <EnterCodeSent otp={otp} setOtp={setOtp} />
                  <CountdownTimer />
                </div>
              </div>
              <div>
                <Button
                  loading={loadingStep1}
                  onClick={handleOtp}
                  id="btn-login"
                  disabled={otp.length !== 6}
                  size="large"
                  className="w-full"
                  type="primary"
                >
                  ورود
                </Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="sm:w-96 w-[95%] h-96 bg-white shadow-lg border border-[#0001] rounded-2xl p-3 flex flex-col justify-between">
              <div>
                <div className="w-full flex justify-center">
                  <img
                    src="/images/logo.png"
                    alt="لوگو"
                    className="h-20 w-20 object-contain"
                  />
                </div>
                <p className="text-lg font-semibold">
                  {" "}
                  لطفا مشخصات خود را وارد کنید{" "}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-full">
                    <span className="flex items-center">
                      <span>نام</span>
                      <span className=" text-red-500 ">*</span>
                    </span>
                    <Input
                      size="large"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>
                  <div className="w-full">
                    <span className="flex items-center">
                      <span>نام خانوادگی</span>
                      <span className=" text-red-500 ">*</span>
                    </span>
                    <Input
                      size="large"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      placeholder="نام خانوادگی خود را وارد کنید"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-full">
                    <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                      <BankOutlined className="text-blue-500" />
                      انتخاب استان
                    </h3>
                    <Select
                      placeholder="انتخاب استان"
                      size="large"
                      value={provinceSelected}
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setProvinceSelected(e);
                      }}
                      options={[
                        { value: "1", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                      ]}
                    />
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg font-semibold text-green-600 flex items-center gap-2">
                      <EnvironmentOutlined className="text-green-500" />
                      انتخاب شهر
                    </h3>
                    <Select
                      disabled
                      placeholder="ابتدا استان را انتخاب کنید"
                      size="large"
                      value={provinceSelected}
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setProvinceSelected(e);
                      }}
                      options={[
                        { value: "1", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Button
                  loading={loadingStep1}
                  onClick={handleRegister}
                  id="btn-login"
                  disabled={otp.length !== 6}
                  size="large"
                  className="w-full"
                  type="primary"
                >
                  ثبت نام
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AuroraBackground>
    </>
  );
}
