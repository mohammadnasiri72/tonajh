import { mainDomain } from "@/utils/mainDomain";
import { Chip, IconButton, Skeleton, Tooltip } from "@mui/material";
import { Empty } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment-jalaali";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaTrash } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import ModalDeleteTransactionBuy from "./ModalDeleteTransactionBuy";
import ModalEditTransactionBuy from "./ModalEditTransactionBuy";
import ModalNewTransactionBuy from "./ModalNewTransactionBuy";

const formatPersianDate = (dateString) => {
  try {
    const persianMonths = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    const date = moment(dateString);
    const day = date.jDate();
    const month = persianMonths[date.jMonth()];
    const year = date.jYear();

    return `${day} ${month} ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

const BuyTransaction = () => {
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const [listMyRequest, setListMyRequest] = useState([]);
  const token = Cookies.get("token");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${mainDomain}/api/transaction/buy`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListMyRequest(res.data.items);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [flag]);

  return (
    <>
      <div className="flex justify-between items-center border-t-2 border-[#0002] pt-2">
        <h2 className="text-lg font-semibold">لیست آگهی های خرید</h2>
        <ModalNewTransactionBuy setFlag={setFlag} />
      </div>
      {loading && (
        <div className="mt-2 flex flex-col gap-2">
          <Skeleton variant="rounded" width={"100%"} height={100} />
          <Skeleton variant="rounded" width={"100%"} height={100} />
          <Skeleton variant="rounded" width={"100%"} height={100} />
        </div>
      )}

      {listMyRequest.length > 0 &&
        !loading &&
        listMyRequest.map((request) => (
          <div
            key={request._id}
            className="relative group w-full p-2 mt-3 overflow-hidden rounded-xl bg-white shadow-md border border-[#0002]"
          >
            <div className="flex w-full justify-between items-start">
              <div className="flex flex-wrap gap-0.5 text-lg text-cyan-600 font-semibold">
                <span>خریدار</span>
                <span className=" ">{request.unitAmount}</span>
                <span className="">{request.unit}</span>
                <span>{request.categoryTitle}</span>
                <span>از نوع</span>
                <span>{request.type}</span>
              </div>
              <div className="flex items-center">
                <ModalEditTransactionBuy />
                {/* <Tooltip
                  title="ویرایش"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        fontFamily: '"Yekan", sans-serif !important',
                        direction: "rtl",
                        fontSize: "12px",
                      },
                    },
                  }}
                >
                  <IconButton>
                    <FaEdit className="text-sm text-teal-500" />
                  </IconButton>
                </Tooltip> */}
                <ModalDeleteTransactionBuy setFlag={setFlag} id={request._id}/>
                
              </div>
            </div>
            <div className="text-[#0008]">{request.description}</div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-[#0008] flex items-center gap-5">
                <span className="flex items-center gap-0.5">
                  <FaCalendarAlt />
                  {formatPersianDate(request.createdAt)}
                </span>

                <span className="flex items-center gap-0.5">
                  <MdAccessTimeFilled />
                  {
                    moment(request.createdAt)
                      .format("jYYYY/jMM/jDD HH:mm")
                      .split(" ")[1]
                  }
                </span>
              </span>
              <Chip
                size="small"
                color={
                  request.status === 1
                    ? "warning"
                    : request.status === 2
                    ? "success"
                    : request.status === 3
                    ? "error"
                    : "default"
                }
                label={request.statusTitle}
              />
            </div>
          </div>
        ))}
      {listMyRequest.length === 0 && !loading && (
        <div>
          <Empty />
        </div>
      )}
    </>
  );
};

export default BuyTransaction;
