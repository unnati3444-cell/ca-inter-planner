import React from "react";

const menuItems = [
  { id: "dashboard", icon: "🏠", label: "Dashboard" },
  { id: "calendar", icon: "📅", label: "Calendar" },
  { id: "dailylog", icon: "📝", label: "Daily Log" },
  { id: "analytics", icon: "📊", label: "Analytics" },
  { id: "simulator", icon: "🎯", label: "Simulator" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        ⚡ CA Inter
      </div>

      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-btn ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => setActivePage(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}