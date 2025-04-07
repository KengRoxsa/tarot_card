"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const images = ["image/bg1.jpg", "image/bg2.webp"];
const Header = () => {
  return (
    <header className="w-full bg-purple-700 text-white py-4 shadow-md">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🔮 Tarot Insight</h1>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">หน้าแรก</a>
          <a href="#review" className="hover:underline">รีวิว</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
