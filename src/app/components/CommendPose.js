"use client";
import React, { useState } from "react";

const CommendPose = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const toggleForm = () => setIsOpen(!isOpen);
  const handleSubmitPose = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("https://tarot-sever-backend-production.up.railway.app/api/v1/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          comment,
        }),
      });
      if (!res.ok) throw new Error("ส่งไม่สำเร็จ");
      const data = await res.json();
    //   console.log("✅ ส่ง pose สำเร็จ:", data);
      setName("");
      setComment("");
      setIsOpen(false);
    } catch (err) {
      console.error("❌ ส่งผิดพลาด:", err);
    }
  };

  return (
    <>
      {/* ปุ่มลอย */}
      <button
        onClick={toggleForm}
        className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 transition"
      >
        💬 แสดงความคิดเห็น
      </button>

      {/* ฟอร์มลอย */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 bg-white border border-gray-300 p-4 rounded-xl shadow-xl w-80 animate-fadeIn">
          <form onSubmit={handleSubmitPose}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อของคุณ:
            </label>
            <input
              type="text"
              className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="กรอกชื่อ (หรือนามแฝง)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              ความคิดเห็น:
            </label>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="อยากบอกอะไรกับเรา..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />

            <div className="flex justify-between mt-3">
              <button
                type="button"
                onClick={toggleForm}
                className="text-sm text-gray-500 hover:underline"
              >
                ❌ ยกเลิก
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
              >
                ส่ง
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CommendPose;
