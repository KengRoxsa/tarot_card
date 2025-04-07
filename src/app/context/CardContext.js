"use client";

import { createContext, useState, useContext } from "react";

const CardContext = createContext();

export const useCard = () => useContext(CardContext);

export const CardProvider = ({ children }) => {
  // const [mode, setMode] = useState(null); // "3" หรือ "5"
  // const [revealedStates, setRevealedStates] = useState([]); // เก็บว่าไพ่แต่ละใบเปิดยัง

  const [revealedStates, setRevealedStates] = useState([false, false, false, false, false]);
  const [showSummary, setShowSummary] = useState(false);
  const [mode, setMode] = useState("3"); // ตั้งค่า default เป็น 3 เพื่อเลือก 3 ใบ
  const [selectedCards, setSelectedCards] = useState(3); // จำนวนการ์ดที่เลือก (3 หรือ 5)


  const handleRevealCard = (index) => {
    setRevealedStates((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };
  
  const handleShowSummary = () => {
    if (revealedStates.every((state) => state === true)) {
      setShowSummary(true);
    }
  };
  
  const handleModeChange = () => {
    const target = mode === "3" ? "5" : "3"; // ถ้า mode ปัจจุบันเป็น 3 ให้เปลี่ยนเป็น 5 หรือถ้าเป็น 5 ก็ให้เปลี่ยนเป็น 3
    setMode(target);
    setSelectedCards(Number(target)); // ตั้งค่าจำนวนไพ่ตาม mode
    setRevealedStates(new Array(Number(target)).fill(false)); // รีเซ็ตการเปิดไพ่
    setShowSummary(false); // รีเซ็ตสรุป
  };

  // เรียกตอนเปลี่ยน mode เพื่อ reset การเปิดไพ่
  const initRevealed = (count) => {
    setRevealedStates(Array(count).fill(false));
  };

  // เรียกเพื่อเปิดไพ่ทีละใบ
  const revealCard = (index) => {
    setRevealedStates((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <CardContext.Provider
  value={{
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
  }}
>
      {children}
    </CardContext.Provider>
  );
};
