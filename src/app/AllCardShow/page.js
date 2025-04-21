"use client";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";

const TarotCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null); // เก็บ index ของการ์ดที่เลือก

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/cards")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.cards)) {
          setCards(data.cards);
        } else {
          console.error("Invalid data format, expected an array:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (index) => {
    setSelectedCardIndex(index === selectedCardIndex ? null : index); // toggle
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div
              key={card.card_index}
              onClick={() => handleCardClick(index)}
              className="cursor-pointer bg-white p-4 rounded-lg flex flex-col items-center justify-center shadow-md hover:shadow-lg transition"
            >
              <img
                src={card.image}
                alt={card.name}
                className="w-48 h-60 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-center mb-2">
                {card.name}
              </h3>
              <p className="text-sm text-gray-600 text-center">{card.summary}</p>

              {selectedCardIndex === index && (
                <div className="mt-4 bg-gray-100 text-gray-800 p-4 rounded w-full text-sm">
                  <p><span className="font-bold">ความหมายเต็ม:</span> {card.full_meaning}</p>
                  <p className="mt-2"><span className="font-bold">ความหมายปกติ:</span> {card.upright}</p>
                  <p><span className="font-bold">กลับหัว:</span> {card.reversed}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No cards available</div>
        )}
      </div>
    </>
  );
};

export default TarotCards;
