"use client";
import React from "react";

const CardSummary = ({ cardsToShow = [], labels = [], revealedStates = [], allRevealed = false, onShowSummary }) => {

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 border border-purple-200 rounded shadow">
      <h2 className="text-xl font-semibold text-purple-800 mb-4">สรุปผลไพ่ที่เปิด</h2>

      {!allRevealed ? (
        <>
          <p className="text-gray-700 mb-4">
            เมื่อคุณเปิดไพ่ครบทุกใบแล้ว ให้กดปุ่มด้านล่างเพื่อดูคำทำนายของคุณ
          </p>
          <button
            disabled={!allRevealed}  // ปุ่มจะถูกปิดหากยังไม่เปิดครบทุกใบ
            onClick={onShowSummary}
            className={`px-6 py-2 rounded font-semibold text-white transition ${
              allRevealed
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            อ่านคำทำนาย
          </button>
        </>
      ) : (
        <ul className="space-y-4">
          {cardsToShow.map((card, index) => {
            // แสดงการ์ดที่เปิดแล้วเท่านั้น
            if (!revealedStates[index]) return null;

            return (
              <li
                key={index}
                className="p-4 bg-white border border-gray-200 rounded shadow-sm"
              >
                <p className="text-sm text-purple-600 font-medium mb-1">
                  {labels[index] || `ไพ่ใบที่ ${index + 1}`}
                </p>
                <h3 className="text-lg font-bold text-purple-800">{card.name}</h3>
                <p className="text-sm text-gray-600 italic">{card.meaning}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CardSummary;
