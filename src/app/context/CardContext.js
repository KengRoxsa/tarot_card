"use client";

import { createContext, useState, useContext } from "react";

const CardContext = createContext();

export const useCard = () => useContext(CardContext);

export const CardProvider = ({ children }) => {
  const [mode, setMode] = useState(null); // "3" หรือ "5"
  const [revealedStates, setRevealedStates] = useState([]); // เก็บว่าไพ่แต่ละใบเปิดยัง

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
      value={{ mode, setMode, revealedStates, initRevealed, revealCard }}
    >
      {children}
    </CardContext.Provider>
  );
};
