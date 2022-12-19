import React from "react";
import "./App.css";
import Content from "./components/content/Content";
import NaviBar from "./components/NaviBar";
import "./assets/bootstrap.css";
import HomePage from "./components/homepages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <NaviBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/cars" element={<Content />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
