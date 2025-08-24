"use client";
import { mainDomain } from "@/utils/mainDomain";
import { Button, Input } from "antd";
import axios from "axios";
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
  const [step, setStep] = useState(0);
  const [loadingStep0, setLoadingStep0] = useState(false);
  const [loadingStep1, setLoadingStep1] = useState(false);
  const [tel, setTel] = useState("");
  const [otp, setOtp] = useState("");
  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;

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

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-auth bg-no-repeat bg-cover">
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
             
             
            </div>
            <div>
              <Button
                loading={loadingStep1}
                // onClick={handleOtp}
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
      </div>
    </>
  );
}
