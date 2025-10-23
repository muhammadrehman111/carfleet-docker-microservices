import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ReportsPage from "./pages/Reports";
import ReportFormPage from "./pages/ReportForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="py-4">
        <div className="container container-sm">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reports/:carId" element={<ReportsPage />} />
            <Route path="/report/new" element={<ReportFormPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
