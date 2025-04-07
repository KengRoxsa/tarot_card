"use client";
import React from "react";
import { useCard } from "../context/CardContext";

const CardSelector = () => {
  const { setMode } = useCard();

  return (
    <div className="text-center mt-8">
      <h2 className="text-xl font-semibold mb-4">เลือกจำนวนไพ่</h2>
      <div className="flex justify-center gap-6">
        <button
          onClick={() => setMode("3")}
          className="px-6 py-2 bg-purple-700 text-white rounded shadow hover:bg-purple-800"
        >
          ทำนายแบบ 3 ใบ
        </button>
        <button
          onClick={() => setMode("5")}
          className="px-6 py-2 bg-pink-600 text-white rounded shadow hover:bg-pink-700"
        >
          ทำนายแบบ 5 ใบ
        </button>
      </div>
    </div>
  );
};

export default CardSelector;
