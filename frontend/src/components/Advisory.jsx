// src/pages/Advisory.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import CropPredictor from "../components/CropPredictor";
import FertilizerSuggest from "../components/FertilizerSuggest";
import IrrigationAdvice from "./IrrigationInsights";

const Advisory = () => {
  const [activeSection, setActiveSection] = useState("crop");

  const renderSection = () => {
    switch (activeSection) {
      case "crop":
        return <CropPredictor />;
      case "fertilizer":
        return <FertilizerSuggest />;
      case "irrigation":
        return <IrrigationAdvice />;
      default:
        return <CropPredictor />;
    }
  };

  return (
    <div className="min-h-screen flex bg-green-50">
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} active={activeSection} />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto mt-16">
        {renderSection()}
      </main>
    </div>
  );
};

export default Advisory;
