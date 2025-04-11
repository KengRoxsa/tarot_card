"use client";
import React, { useEffect, useState } from "react";

function PoseDisplay() {
  const [comments, setComments] = useState([]);
  const [displayComments, setDisplayComments] = useState([]);
  const [index, setIndex] = useState(0);

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

  useEffect(() => {
    if (comments.length > 0) {
      setDisplayComments(comments.slice(0, 3));
      const intervalId = setInterval(() => {
        setIndex((prevIndex) => {
          const nextIndex = (prevIndex + 3) % comments.length;
          setDisplayComments(comments.slice(nextIndex, nextIndex + 3));
          return nextIndex;
        });
      }, 3000); // ทุกๆ 3 วินาที

      return () => clearInterval(intervalId); // Cleanup เมื่อ component ถูก unmount
    }
  }, [comments]);

  return (
    <div className=" w-full overflow-hidden relative">
      <div className="h-6 w-full bg-gradient-to-r from-purple-700 to-pink-500"></div>
      <h2 className="m-8  text-2xl font-bold text-orange-500 text-center mb-4">
        เสียงตอบรับ
      </h2>
      <div className="infinite-scroll">
        {displayComments.map((comment, index) => {
          const randomBackground =
            images[Math.floor(Math.random() * images.length)];

          return (
            <div
              key={index}
              className="m-4 scroll-item p-4 text-white rounded-lg shadow-lg opacity-0 animate-fadeIn"
              style={{
                backgroundImage: `url(${randomBackground})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDelay: `${index * 0.5}s`,
              }}
            >
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-black text-xl text-center">
                  Comment: {comment.comment}
                </p>
                <h3 className=" text-black text-center">By: {comment.name}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PoseDisplay;
