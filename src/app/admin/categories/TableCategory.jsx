import PersianDateDisplay from "@/components/PersianDateDisplay";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ModalDeleteCategory from "./ModalDeleteCategory";
import ModalEditCategory from "./ModalEditCategory";

function TableCategory({ flag, setFlag, menuData }) {
  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 650,
              fontFamily: '"Yekan", sans-serif !important',
              direction: "rtl",
              "& .MuiTableCell-root": {
                fontFamily: '"Yekan", sans-serif !important',
              },
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">دسته‌بندی</TableCell>
                <TableCell align="center">تعداد زیردسته</TableCell>
                <TableCell align="center">وضعیت</TableCell>
                <TableCell align="center">تاریخ ایجاد</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menuData.map((category) => (
                <TableRow
                  key={category._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    <div className="flex items-center">
                      {category.img && (
                        <img
                          className="w-10 h-10 rounded-lg object-cover ml-3 overflow-hidden"
                          src={category.img}
                          alt={category.title}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {category.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {category.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {
                        menuData.filter((e) => e.parentId === category._id)
                          .length
                      }
                      زیردسته
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        category.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    {category.createdAt ? (
                      <PersianDateDisplay
                        dateString={category.createdAt}
                        format="dddd DD MMMM YYYY"
                      />
                    ) : (
                      "---"
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center gap-1 items-center">
                      <ModalDeleteCategory
                        id={category._id}
                        setFlag={setFlag}
                      />
                      <ModalEditCategory
                        categoryEdit={menuData.find(
                          (e) => e._id === category._id
                        )}
                        setFlag={setFlag}
                        menuData={menuData}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default TableCategory;
