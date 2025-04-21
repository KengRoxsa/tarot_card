"use client";
import React from "react";

const images = [
  "/images/bg1.jpg",
  "/images/bg2.webp",
  "/images/bg3.webp",
  "/images/bg4.webp",
];

const Upper = () => {
  return (
    <div className="relative w-full h-32 sm:min-h-32 sm:h-32 md:h-32 lg:h-[13rem] overflow-hidden">
      {/* กล่องเลื่อนภาพ */}
      <div className="flex w-[200%]  h-full animate-slideLoop">
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`bg-${index}`}
            className="w-[25%] h-full object-cover"
          />
        ))}
      </div>

      {/* Overlay ดำบางๆ */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* ข้อความตรงกลาง */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center px-4">
        ยินดีต้อนรับสู่โลกแห่งไพ่ทาโรต์
      </div>
    </div>
  );
};

export default Upper;
