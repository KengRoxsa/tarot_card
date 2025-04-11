"use client";
import React, { useState, useEffect } from "react";
import PoseDisplay from "./PoseDisplay";

// อาเรย์ของภาพพื้นหลัง
const images = [
  "/images/bg1.jpg",
  "/images/bg2.webp",
  "/images/bg3.webp",
  "/images/bg4.webp",
];

const CardSummary = ({
  cardsToShow = [],
  labels = [],
  revealedStates = [],
  allRevealed = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [bgImage, setBgImage] = useState(images[0]); // กำหนดภาพพื้นหลังเริ่มต้น
  const [prevBgImage, setPrevBgImage] = useState(images[0]); // เก็บภาพพื้นหลังก่อนหน้า

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // สลับภาพพื้นหลังทุก 5 วินาที
  useEffect(() => {
    if (isVisible) {
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        const newBgImage = images[randomIndex];
        setPrevBgImage(bgImage); // เก็บภาพพื้นหลังก่อนหน้า
        setBgImage(newBgImage); // เปลี่ยนภาพพื้นหลังใหม่
      }, 5000); // ทุก 5 วินาที

      // ทำความสะอาดเมื่อคอมโพเนนต์ถูกลบออก
      return () => clearInterval(intervalId);
    }
  }, [isVisible, bgImage]); // ทำงานใหม่เมื่อ isVisible หรือ bgImage เปลี่ยน

  return (
    <div
      className={` bg-cover bg-center transition-all duration-1000 ease-in-out`}
      style={{
        backgroundImage: isVisible ? `url(${bgImage})` : 'none',
        backgroundOpacity: 0.8, // ความโปร่งใสของพื้นหลัง
      }}
    >
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white bg-opacity-80 border border-purple-200 rounded shadow">
        <button
          onClick={toggleVisibility}
          className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          {isVisible ? "ซ่อน" : "แสดง"} สรุปผลไพ่ที่เปิด
        </button>

        {isVisible && (
          <>
            <h2 className="text-xl font-semibold text-purple-800 mb-4">
              สรุปผลไพ่ที่เปิด
            </h2>

            {!allRevealed ? (
              <>
                <p className="text-gray-700 mb-4">
                  ดวงชะตาของคุณกำลังเดินทาง . . .
                </p>
              </>
            ) : (
              <ul className="space-y-4">
                {cardsToShow.map((card, index) => {
                  if (!revealedStates[index]) return null;

                  return (
                    <li
                      key={index}
                      className="p-4 bg-white border border-gray-200 rounded shadow-sm"
                    >
                      <p className="text-sm text-purple-600 font-medium mb-1">
                        {labels[index] || `ไพ่ใบที่ ${index + 1}`}
                      </p>
                      <h3 className="text-lg font-bold text-purple-800">
                        {card.name}
                      </h3>

                      <p className="text-sm text-gray-600 italic">
                        {card.summary}
                      </p>
                      <div className="mt-4 text-sm text-gray-700">
                        <p className="mb-2 text-lg">
                          <strong>ความหมายเต็ม:</strong>
                          <span className="block mt-1 text-base text-gray-600">
                            {card.full_meaning}
                          </span>
                        </p>

                        <p className="mb-2 text-lg">
                          <strong>Upright:</strong>
                          <span className="block mt-1 text-green-600 font-semibold">
                            {card.upright}
                          </span>
                        </p>

                        <p className="mb-2 text-lg">
                          <strong>Reversed:</strong>
                          <span className="block mt-1 text-red-600 font-semibold">
                            {card.reversed}
                          </span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </div>
      
    </div>
  );
};


export default CardSummary;
