import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HODDetails from "./components/HODDetails";
import Highlight from "./components/Highlights";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<HODDetails />} />
          <Route path="/components/Highlights" element={<Highlight />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;