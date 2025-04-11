"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const images = ["image/bg1.jpg", "image/bg2.webp"];
const Header = () => {
  return (
    <header className="w-full bg-purple-700 text-white py-4 shadow-md">
      <div className="  px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🔮 Tarot Insight</h1>
        <nav className="space-x-4">
        <Link href="/mock" className="hover:underline">หน้าแรก</Link>
          <a href="https://github.com/KengRoxsa" className="hover:underline">Github</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
