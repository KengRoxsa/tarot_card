"use client";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Upper from "./components/Upper";
import { CardProvider } from "./context/CardContext";
import CardSelector from "./components/CardSelector";
import CardDisplay from "./components/CardDisplay";
import CardSummary from "./components/CardSummary";
function Home() {
  return (
    <CardProvider>
      <Header />
      <Upper />
      {/* <CardSelector /> */}
      <CardDisplay />
      {/* <CardSummary /> */}
      <Footer />
    </CardProvider>
  );
}

export default Home;
