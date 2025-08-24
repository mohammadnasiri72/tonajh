import { Button } from "antd";
import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // تبدیل ثانیه به فرمت دقیقه:ثانیه
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setTimeLeft(10);
    setIsActive(true);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {timeLeft !== 0 && (
        <div
          style={{
            fontWeight: "bold",
            color: timeLeft > 10 ? "#2c3e50" : "#e74c3c",
            marginBottom: "20px",
          }}
        >
          {formatTime(timeLeft)} مانده تا دریافت مجدد کد
        </div>
      )}

      {timeLeft === 0 && (
        <Button 
        type="primary"
          onClick={resetTimer}
         
        >
          دریافت مجدد کد
        </Button>
      )}
    </div>
  );
};

export default CountdownTimer;
