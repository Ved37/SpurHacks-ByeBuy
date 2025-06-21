import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SecondPage from "./SecondPage";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/next" element={<SecondPage />} />
      </Routes>
    </Router>
  );
}

export default App;
