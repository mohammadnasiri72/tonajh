"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { FaShoppingCart, FaStore } from "react-icons/fa";
import BuyTransaction from "./BuyTransaction";
import SellTransaction from "./SellTransaction";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: '"Yekan", sans-serif',
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: '"Yekan", sans-serif',
          fontSize: "16px",
          fontWeight: 500,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#3b82f6",
        },
      },
    },
  },
});

export default function TabTransaction() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="آگهی خرید و فروش"
            centered
          >
            <Tab 
              icon={<FaStore className="ml-2" />}
              iconPosition="start"
              label="آگهی‌های فروش من"
            />
            <Tab 
              icon={<FaShoppingCart className="ml-2" />}
              iconPosition="start"
              label="آگهی‌های خرید من"
            />
          </Tabs>
        </div>
      </div>
      
      <div className="min-h-[500px]">
        {value === 0 && <SellTransaction />}
        {value === 1 && <BuyTransaction />}
      </div>
    </ThemeProvider>
  );
}