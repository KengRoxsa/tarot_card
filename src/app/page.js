"use client";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Upper from "./components/Upper";
import { CardProvider } from "./context/CardContext";
import CardDisplay from "./components/CardDisplay";
import CommendPose from "./components/CommendPose";
import PoseDisplay from "./components/PoseDisplay";

function Home() {
  return (
    <CardProvider>
      <Header />
      <main>
        <Upper />
        <CardDisplay />
        {/* <CardSummary /> มันเรียกใช้ใน CardDisplay พร้อมค่าต่างๆไปแล้ว */}
        <PoseDisplay />
        <CommendPose />
      </main>
      <Footer />
    </CardProvider>
  );
}

export default Home;
