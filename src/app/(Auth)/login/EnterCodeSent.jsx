import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";

export function matchIsNumeric(text) {
  const isNumber = typeof text === "number";
  const isString = typeof text === "string";
  return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
}

const validateChar = (value) => {
  return matchIsNumeric(value);
};

function EnterCodeSent({otp ,setOtp }) {
  

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  return (
    <>
      <MuiOtpInput
      display="flex" gap={1}
      TextFieldsProps={{ size: 'small' }}
        dir="ltr"
        length={6}
        value={otp}
        onChange={handleChange}
        validateChar={validateChar}
      />
    </>
  );
}

export default EnterCodeSent;
