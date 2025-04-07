"use client";
import React, { useState, useEffect } from "react";
import { useCard } from "../context/CardContext"; // นำเข้า useCard
import CardSummary from "./CardSummary"; // นำเข้า CardSummary

const mockCards = [
  {
    name: "The Fool",
    image: "https://tarot-api.s3.amazonaws.com/images/major/1.jpg",
    meaning: "New beginnings, free spirit",
  },
  {
    name: "The Magician",
    image: "https://tarot-api.s3.amazonaws.com/images/major/2.jpg",
    meaning: "Willpower, creation, manifestation",
  },
  {
    name: "The High Priestess",
    image: "https://tarot-api.s3.amazonaws.com/images/major/3.jpg",
    meaning: "Intuition, unconscious, inner voice",
  },
  {
    name: "The Empress",
    image: "https://tarot-api.s3.amazonaws.com/images/major/4.jpg",
    meaning: "Fertility, beauty, nature",
  },
  {
    name: "The Emperor",
    image: "https://tarot-api.s3.amazonaws.com/images/major/5.jpg",
    meaning: "Authority, structure, control",
  },
];

const CardDisplay = () => {
  const [revealedStates, setRevealedStates] = useState([false, false, false, false, false]);
  const [showSummary, setShowSummary] = useState(false);
  const [mode, setMode] = useState("3"); // ตั้งค่า default เป็น 3 เพื่อเลือก 3 ใบ
  const [selectedCards, setSelectedCards] = useState(3); // จำนวนการ์ดที่เลือก (3 หรือ 5)

  const handleRevealCard = (index) => {
    const newRevealedStates = [...revealedStates];
    newRevealedStates[index] = true;
    setRevealedStates(newRevealedStates);
  };

  const handleShowSummary = () => {
    if (revealedStates.every((state) => state === true)) {
      setShowSummary(true);
    }
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setSelectedCards(Number(e.target.value)); // กำหนดจำนวนการ์ดที่แสดงตาม `mode`
    setRevealedStates(new Array(Number(e.target.value)).fill(false)); // รีเซ็ตสถานะการเปิดการ์ด
    setShowSummary(false); // รีเซ็ตสรุป
  };

  useEffect(() => {
    if (mode) {
      const count = parseInt(mode);
      setRevealedStates(new Array(count).fill(false)); // รีเซ็ตสถานะการเปิดการ์ดเมื่อเปลี่ยน `mode`
    }
  }, [mode]);

  const cardsToShow = mockCards.slice(0, selectedCards);
  const labels3 = ["อดีต", "ปัจจุบัน", "อนาคต"];
  const labels5 = ["อดีต", "สิ่งที่ส่งผล", "ปัจจุบัน", "อนาคต", "ผลลัพธ์"];
  const labels = selectedCards === 3 ? labels3 : labels5;

  return (
    <div>
      {/* เลือกจำนวนไพ่ที่ต้องการ */}
      <div className="mt-7 mb-4 text-center">
        <h2 className="text-xl font-semibold mb-4">เลือกจำนวนไพ่ที่ต้องการ</h2>
        <button
          onClick={handleModeChange}
          value="3"
          className={`px-4 py-2 rounded mx-2 ${mode === "3" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
        >
          เลือกแบบ 3 ใบ
        </button>
        <button
          onClick={handleModeChange}
          value="5"
          className={`px-4 py-2 rounded mx-2 ${mode === "5" ? "bg-pink-600 text-white" : "bg-gray-200"}`}
        >
          เลือกแบบ 5 ใบ
        </button>
      </div>

      <div className={`mt-10 max-w-5xl mx-auto gap-6 ${selectedCards === 3 ? "flex justify-center flex-wrap" : "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5"}`}>
        {cardsToShow.map((card, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow rounded text-center border border-purple-200"
          >
            <p className="font-medium text-sm text-purple-700 mb-1">{labels[index]}</p>
            {revealedStates[index] ? (
              <>
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="font-bold mt-2 text-purple-800">{card.name}</h3>
                <p className="text-xs mt-1 text-gray-600 italic">{card.meaning}</p>
              </>
            ) : (
              <>
                <div className="w-full h-40 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                  ไพ่ยังไม่เปิด
                </div>
                <button
                  onClick={() => handleRevealCard(index)}
                  className="mt-2 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                >
                  เปิดไพ่
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* สรุปผลการเปิดไพ่ */}
      <CardSummary
        cardsToShow={cardsToShow}
        labels={labels}
        revealedStates={revealedStates}
        allRevealed={revealedStates.every((state) => state === true)}
        onShowSummary={handleShowSummary}
      />
    </div>
  );
};

export default CardDisplay;
