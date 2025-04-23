"use client"; 
import React, { useState, useEffect } from "react"; 
import { useCard } from "../context/CardContext"; 
import CardSummary from "./CardSummary"; 
import axios from "axios";

const fetchCardData = async () => {
  try {
    const response = await axios.post("https://tarot-sever-backend-production.up.railway.app/api/v1/cards/random", {}); 
    console.log("Fetched Data:", response.data); // แสดงข้อมูลที่ดึงมาจาก API
    return response.data.card; // ส่งข้อมูลการ์ดที่สุ่ม
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const CardDisplay = () => {
  const {
    mode,
    setMode,
    revealedStates,
    setRevealedStates,
    showSummary,
    setShowSummary,
    selectedCards,
    setSelectedCards,
    handleRevealCard,
    handleShowSummary,
    handleModeChange,
  } = useCard();
  
  useEffect(() => {
    if (mode) {
      const count = parseInt(mode);
      setRevealedStates(new Array(count).fill(false)); // รีเซ็ตสถานะการเปิดการ์ดเมื่อเปลี่ยน `mode`
    }
  }, [mode]);

  const [cardsToShow, setCardsToShow] = useState([]); // เก็บการ์ดที่สุ่มได้
  const labels3 = ["อดีต", "ปัจจุบัน", "อนาคต"];
  const labels5 = ["อดีต", "สิ่งที่ส่งผล", "ปัจจุบัน", "อนาคต", "ผลลัพธ์"];
  const labels = selectedCards === 3 ? labels3 : labels5;

  // ฟังก์ชันสำหรับเรียกเปิดไพ่
  const handleFetchCard = async (index) => {
    const newCard = await fetchCardData(); // ดึงการ์ดใหม่จาก API
    if (newCard) {
      const updatedCards = [...cardsToShow];
      updatedCards[index] = newCard; // อัปเดตการ์ดที่ถูกเปิด
      setCardsToShow(updatedCards); // อัปเดต state ที่เก็บการ์ด
    }
  };

  return (
    <div>
      {/* เลือกจำนวนไพ่ที่ต้องการ */}
      <div className="mt-10 max-w-6xl mx-auto mb-4 text-center">
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
        {Array.from({ length: selectedCards }).map((_, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow rounded text-center border border-purple-200"
          >
            <p className="font-medium text-sm text-purple-700 mb-1">{labels[index]}</p>
            {revealedStates[index] ? (
              <>
                <img
                  src={cardsToShow[index]?.image}
                  alt={cardsToShow[index]?.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="font-bold mt-2 text-purple-800">{cardsToShow[index]?.name}</h3>
                <p className="text-xs mt-1 text-gray-600 italic">{cardsToShow[index]?.meaning}</p>
              </>
            ) : (
              <>
                <div className="w-full h-40 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                  ไพ่ยังไม่เปิด
                </div>
                <button
                  onClick={() => {
                    handleRevealCard(index);
                    handleFetchCard(index); // เรียก API และแสดงผล
                  }}
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
