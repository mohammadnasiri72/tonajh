"use client";
import Link from "next/link";
import { useSelector } from "react-redux";

function CategoryMain() {
const { categorys } = useSelector((state) => state.category);

  return (
    <>
      <h2 className="text-2xl font-bold text-center mt-5 ">
        دسته بندی های اصلی
      </h2>
      <div className="flex flex-wrap justify-center mt-2">
        {categorys.length > 0 &&
          categorys
            .filter((e) => e.parentId === "-1")
            .map((cat) => (
              <div
                key={cat._id}
                className="lg:w-1/5 md:w-1/4 sm:w-1/3 w-1/3 mt-5"
              >
                <Link
                  className="flex flex-col justify-center items-center group"
                  href={cat.url}
                >
                  <img
                    className="sm:w-36 w-20 group-hover:scale-105 duration-300"
                    src={cat.img}
                    alt=""
                  />
                  <p className="font-semibold sm:text-lg text-center">
                    {cat.title}
                  </p>
                </Link>
              </div>
            ))}
      </div>
    </>
  );
}

export default CategoryMain;
