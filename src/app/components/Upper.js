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
    <div className="relative w-full h-64 overflow-hidden">
      {/* กล่องเลื่อนภาพ */}
      <div className="flex w-[200%] animate-slideLoop">
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`bg-${index}`}
            className="w-[25%] h-64 object-cover"
          />
        ))}
      </div>

      {/* Overlay ดำบางๆ */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* ข้อความตรงกลาง */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
        ยินดีต้อนรับสู่โลกแห่งไพ่ทาโรต์
      </div>
    </div>
  );
};

export default Upper;
