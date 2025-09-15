import { createTheme, ThemeProvider } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import BuyTransaction from "./BuyTransaction";
import SellTransaction from "./SellTransaction";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: '"Yekan", sans-serif',
    allVariants: {
      fontFamily: '"Yekan", sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Yekan", sans-serif',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          fontFamily: '"Yekan", sans-serif',
          "& .MuiInputLabel-root": {
            fontFamily: '"Yekan", sans-serif',
          },
          "& .MuiInputBase-input": {
            fontFamily: '"Yekan", sans-serif',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: '"Yekan", sans-serif',
        },
      },
    },
    // اضافه کردن سایر کامپوننت‌ها به همین شکل
  },
});

export default function TabTransaction() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full mx-auto text-center flex justify-center items-center mb-2">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="آگهی خرید و فروش"
        >
          <Tab sx={{ fontSize: "20px" }} value={1} label="آگهی فروش" />
          <Tab sx={{ fontSize: "20px" }} value={2} label="آگهی خرید" />
        </Tabs>
      </div>
      <div>
        {value === 1 && <SellTransaction />}
        {value === 2 && <BuyTransaction />}
      </div>
    </ThemeProvider>
  );
}

