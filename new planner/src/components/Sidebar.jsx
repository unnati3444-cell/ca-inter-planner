import React from "react";

const tabs = [
  { id: "overview", label: "📊 Overview" },
  { id: "daily", label: "✍️ Daily Log" },
  { id: "topics", label: "📚 Topics" },
  { id: "planner", label: "📅 Planner" },
  { id: "insights", label: "📈 Insights" },
];

export default function Sidebar({
  activeTab,
  setActiveTab,
}) {
  return (
    <div
      style={{
        width: 260,
        background:
          "linear-gradient(180deg,#111827,#1f2937)",
        color: "white",
        minHeight: "100vh",
        padding: 24,
        position: "sticky",
        top: 0,
      }}
    >
      <div
        style={{
          marginBottom: 35,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 28,
          }}
        >
          🎯 AIR Planner
        </h1>

        <p
          style={{
            opacity: 0.7,
            marginTop: 8,
            fontSize: 13,
          }}
        >
          CA Inter Jan 2027
        </p>
      </div>

      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() =>
            setActiveTab(tab.id)
          }
          style={{
            width: "100%",
            padding: "14px 16px",
            marginBottom: 12,
            border: "none",
            borderRadius: 12,
            cursor: "pointer",
            fontSize: 15,
            fontWeight: 600,

            background:
              activeTab === tab.id
                ? "#4f46e5"
                : "#374151",

            color: "white",

            textAlign: "left",
          }}
        >
          {tab.label}
        </button>
      ))}

      <div
        style={{
          marginTop: 40,
          padding: 16,
          background: "#1e293b",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            fontSize: 12,
            opacity: 0.7,
          }}
        >
          AIR TARGET
        </div>

        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginTop: 6,
          }}
        >
          31 July
        </div>

        <div
          style={{
            color: "#22c55e",
            marginTop: 6,
          }}
        >
          Stay Consistent 🚀
        </div>
      </div>
    </div>
  );
}