"use client";

import { createContext, useState, useContext } from "react";
import axios from "axios";

const CardContext = createContext();

export const useCard = () => useContext(CardContext);

export const CardProvider = ({ children }) => {
  const [revealedStates, setRevealedStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [showSummary, setShowSummary] = useState(false);
  const [mode, setMode] = useState("3"); // ตั้งค่า default เป็น 3 เพื่อเลือก 3 ใบ
  const [selectedCards, setSelectedCards] = useState(3); // จำนวนการ์ดที่เลือก (3 หรือ 5)
  const [cards, setCards] = useState([]); // สถานะสำหรับเก็บการ์ดที่ดึงมา
  const [loading, setLoading] = useState(false); // สถานะเพื่อบ่งชี้การโหลดข้อมูล

  // ฟังก์ชันดึงข้อมูลการ์ดแบบสุ่ม
  const fetchRandomCard = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://tarot-sever-backend-production.up.railway.app/api/v1/cards/random",
        {
          excluded: [0], // สามารถปรับค่า excluded ได้ตามต้องการ
        }
      );

      if (response.data && Array.isArray(response.data)) {
        setCards(response.data); // เก็บการ์ดที่ได้รับจาก API
      } else {
        console.error("Expected an array but got", response.data);
      }
    } catch (error) {
      console.error("Error fetching card:", error);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันที่ใช้เปิดการ์ด
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
        cards,
        fetchRandomCard, // ฟังก์ชันดึงการ์ดจาก API
        loading, // สถานะการโหลดข้อมูล
        handleRevealCard,
        handleShowSummary,
        handleModeChange,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
