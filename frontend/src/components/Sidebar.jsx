import React from "react";

const Sidebar = ({ setActiveSection, active }) => {
  const menu = [
    // { key: "visual", label: "Visual Trends 📊" },
    { key: "crop", label: "Crop Prediction 🌱" },
    { key: "fertilizer", label: "Fertilizer Advice 💊" },
    { key: "irrigation", label: "Irrigation Tips 💧" },
  ];

  return (
    <aside className="w-60 bg-green-900 text-white flex flex-col p-4 space-y-4">
      <h2 className="text-xl font-bold text-center border-b pb-2">Advisory</h2>
      {menu.map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveSection(item.key)}
          className={`text-left px-4 py-2 rounded-md transition-all duration-200 hover:bg-green-700 ${
            active === item.key ? "bg-green-700" : ""
          }`}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
