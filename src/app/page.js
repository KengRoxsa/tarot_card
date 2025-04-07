"use client";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Upper from "./components/Upper";
import { CardProvider } from "./context/CardContext";
import CardDisplay from "./components/CardDisplay";

function Home() {
  return (
    <CardProvider>
      <Header />
      <Upper />
      {/* <CardSelector /> */}
      <CardDisplay />
      {/* <CardSummary /> มันเรียกใช้ใน CardDisplay พร้อมค่าต่างๆไปแล้ว */}
      <Footer />
    </CardProvider>
  );
}

export default Home;
