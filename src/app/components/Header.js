"use client";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-purple-700 text-white py-4 shadow-md">
      <div className="px-4 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-0">
          🔮 Tarot Insight
        </Link>
        <nav className="space-x-2 sm:space-x-4 text-sm sm:text-base">
          <Link href="/mock" className="hover:underline">
            หน้าสงสัย
          </Link>
          <Link href="/AllCardShow" className="hover:underline">
            Cards Meaning
          </Link>
          <a href="https://github.com/KengRoxsa" className="hover:underline">
            Github
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
