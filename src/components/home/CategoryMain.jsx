import Link from "next/link";
import React from "react";

function CategoryMain() {
  const category = [
    { id: 1, title: "کشاورزی", img: "/images/1.webp" },
    { id: 2, title: "خانه و مصالح ساختمانی", img: "/images/1.webp" },
    { id: 3, title: "فلزات، مواد معدنی و شیمیایی", img: "/images/1.webp" },
    { id: 4, title: "مد، پوشاک و پارچه", img: "/images/1.webp" },
    { id: 5, title: "کیف و کفش", img: "/images/1.webp" },
    { id: 6, title: "ماشین آلات و تجهیزات صنعتی", img: "/images/1.webp" },
    { id: 7, title: "فرآورده های غذایی", img: "/images/1.webp" },
    { id: 8, title: "لوازم آرایشی، بهداشتی و سلامت", img: "/images/1.webp" },
    { id: 9, title: "لوازم خانگی و الکترونیکی", img: "/images/1.webp" },
    {
      id: 10,
      title: "لوازم ورزشی، کادویی و اسباب بازی",
      img: "/images/1.webp",
    },
  ];
  return (
    <>
      <h2 className="text-2xl font-bold text-center mt-5 ">
        دسته بندی های اصلی
      </h2>
      <div className="flex flex-wrap justify-center mt-2">
        {category.map((cat) => (
          <div key={cat.id} className="lg:w-1/5 md:w-1/4 sm:w-1/3 w-1/3 mt-5">
            <Link
              className="flex flex-col justify-center items-center group"
              href={"#"}
            >
              <img
                className="sm:w-36 w-20 group-hover:scale-105 duration-300"
                src={cat.img}
                alt=""
              />
              <p className="font-semibold sm:text-lg text-center">{cat.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoryMain;
