// import { UserOutlined } from "@ant-design/icons";
// import List from "@mui/material/List";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { Avatar, Badge } from "antd";
// import { useState } from "react";

// const options = [
//   "Show سق",
//   "Show ",
//   "Hide sensi",
//   "Hide",
// ];

// function ProfileDropDown() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedIndex, setSelectedIndex] = useState(1);
//   const open = Boolean(anchorEl);
//   const handleClickListItem = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuItemClick = (event, index) => {
//     setSelectedIndex(index);
//     setAnchorEl(null);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <div className="flex flex-col cursor-pointer items-center justify-center hover:bg-slate-100 duration-300 rounded-2xl p-3">
//         <Badge count={1}>
//           <Avatar shape="square" icon={<UserOutlined />} />
//         </Badge>
//       </div>
//       <div>
//         <List
//           component="nav"
//           aria-label="Device settings"
//           sx={{ bgcolor: "background.paper" }}
//         >
//           <div
//             onClick={handleClickListItem}
//             className="flex flex-col cursor-pointer items-center justify-center hover:bg-slate-100 duration-300 rounded-2xl p-3"
//           >
//             {/* <ListItemText
//             primary="When device is locked"
//             secondary={options[selectedIndex]}
//           /> */}
//             <Badge count={1}>
//               <Avatar shape="square" icon={<UserOutlined />} />
//             </Badge>
//           </div>
//         </List>
//         <Menu
//           id="lock-menu"
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleClose}
//           slotProps={{
//             list: {
//               "aria-labelledby": "lock-button",
//               role: "listbox",
//             },
//           }}
//         >
//           {options.map((option, index) => (
//             <MenuItem
//               key={option}
//               disabled={index === 0}
//               selected={index === selectedIndex}
//               onClick={(event) => handleMenuItemClick(event, index)}
//             >
//               {option}
//             </MenuItem>
//           ))}
//         </Menu>
//       </div>
//     </>
//   );
// }

// export default ProfileDropDown;

import { UserOutlined } from "@ant-design/icons";
import { createTheme, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Badge } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

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
    MuiTextField: {
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
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Yekan", sans-serif',
        },
      },
    },
    // اضافه کردن سایر کامپوننت‌ها به همین شکل
  },
});

export default function AccountMenu({ setToken }) {
  const [user, setUser] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setAnchorEl(null);
    setToken("");
    router.push("/");
  };

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      setUser(JSON.parse(Cookies.get("user")));
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            direction: "rtl",
            fontFamily: "Yekan",
          }}
        >
          <Tooltip sx={{ fontFamily: "Yekan" }} title="تنظیمات حساب کاربری">
            <div
              onClick={handleClick}
              className="flex flex-col cursor-pointer items-center justify-center duration-300 hover:animate-pulse"
            >
              <Badge count={1}>
                <Avatar icon={<UserOutlined />} />
              </Badge>
            </div>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "left", vertical: "top" }} // تغییر مبدا transform
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }} // تغییر مبدا anchor
          MenuListProps={{
            autoFocusItem: false, // جلوگیری از فوکوس خودکار روی آیتم اول
          }}
          slotProps={{
            paper: {
              sx: {
                minWidth: "200px",
              },
            },
          }}
        >
          <div className="p-3">
            {/* هدر منو */}
            <div className="  flex items-center gap-3">
              <Avatar icon={<UserOutlined />} />
              <div className="select-none">
                {user?.firstName && (
                  <p className="text-sm font-bold text-gray-900">
                    {user?.firstName}
                  </p>
                )}
                {user?.mobile && (
                  <p className="text-xs text-gray-500">{user.mobile}</p>
                )}
              </div>
            </div>
          </div>
          <Divider />
          <MenuItem
            onClick={handleClose}
            sx={{ fontFamily: "Yekan", p: 1, mt: 1 }}
            className="group"
          >
            <FaUser className="text-xl text-cyan-700" />
            <span className="px-2 font-semibold text-sm">پروفایل</span>
          </MenuItem>

          <MenuItem
            onClick={handleClose}
            sx={{ fontFamily: "Yekan", mt: 1, p: 1 }}
            className="group"
          >
            <IoMdSettings className="text-xl text-cyan-700 group-hover:animate-spin group-hover:[animation-duration:2s]" />
            <span className="px-2 font-semibold text-sm">تنظیمات</span>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout} sx={{ fontFamily: "Yekan", p: 1 }}>
            <CiLogout className="text-2xl text-red-500" />
            <span className="text-red-500 px-2 font-semibold text-sm">
              خروج از حساب کاربری
            </span>
          </MenuItem>
        </Menu>
      </ThemeProvider>
      {open && <div className="fixed inset-0 bg-[#0008] blur-xl z-50"></div>}
    </>
  );
}
