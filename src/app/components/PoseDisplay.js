"use client";
import React, { useEffect, useState } from "react";

function PoseDisplay() {
  const [comments, setComments] = useState([]);
  const [displayComments, setDisplayComments] = useState([]);
  const [index, setIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // อาร์เรย์ของภาพพื้นหลังที่เลือกมาใช้
  const images = [
    "/images/bg1.jpg",
    "/images/bg2.webp",
    "/images/bg3.webp",
    "/images/bg4.webp",
  ];

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/comments")
      .then((response) => response.json())
      .then((data) => setComments(data.comments))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  // ตรวจสอบขนาดหน้าจอ
  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth(); // ตั้งค่าขนาดหน้าจอเมื่อโหลดครั้งแรก
    window.addEventListener("resize", updateWindowWidth); // ตั้งฟังก์ชันที่จะอัพเดตขนาดหน้าจอเมื่อมีการเปลี่ยนแปลง

    return () => {
      window.removeEventListener("resize", updateWindowWidth); // ลบ event listener เมื่อ component unmount
    };
  }, []);

  useEffect(() => {
    if (comments.length > 0) {
      const postsToShow = windowWidth >= 640 ? 3 : 1; // ถ้าความกว้างหน้าจอ >= 640px (sm) จะแสดง 3 โพส, ถ้าน้อยกว่าแสดงแค่ 1 โพส
      setDisplayComments(comments.slice(0, postsToShow));

      const intervalId = setInterval(() => {
        setIndex((prevIndex) => {
          const nextIndex = (prevIndex + postsToShow) % comments.length;
          setDisplayComments(comments.slice(nextIndex, nextIndex + postsToShow));
          return nextIndex;
        });
      }, 3000); // ทุกๆ 3 วินาที

      return () => clearInterval(intervalId); // Cleanup เมื่อ component ถูก unmount
    }
  }, [comments, windowWidth]);

  return (
    <div className="w-full overflow-hidden relative">
      <div className="h-6 w-full bg-gradient-to-r from-purple-700 to-pink-500"></div>
      <h2 className="m-8 text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 text-center mb-4">
        เสียงตอบรับ
      </h2>
      <div className="infinite-scroll grid gap-4 px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {displayComments.map((comment, index) => {
          const randomBackground =
            images[Math.floor(Math.random() * images.length)];

          return (
            <div
              key={index}
              className="scroll-item flex flex-wrap items-center justify-center"
              style={{
                backgroundImage: `url(${randomBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDelay: `${index * 0.5}s`,
              }}
            >
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-black text-xl sm:text-2xl md:text-xl text-center">
                  Comment: {comment.comment}
                </p>
                <h3 className="text-black text-center text-sm sm:text-base md:text-lg">
                  By: {comment.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PoseDisplay;
