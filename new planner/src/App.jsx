import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import DailyLog from "./components/DailyLog";
import TopicsTab from "./components/TopicsTab";
import PlannerTab from "./components/PlannerTab";
import InsightsTab from "./components/InsightsTab";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] =
    useState("overview");

  const isMobile =
    window.innerWidth < 768;

  return (
    <div
      style={{
        display: "flex",
        flexDirection:
          isMobile
            ? "column"
            : "row",
        minHeight: "100vh",
        background: "#f3f4f6",
      }}
    >
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding:
            isMobile
              ? 10
              : 20,
        }}
      >
        {activeTab ===
          "overview" && (
          <Overview />
        )}

        {activeTab ===
          "daily" && (
          <DailyLog />
        )}

        {activeTab ===
          "topics" && (
          <TopicsTab />
        )}

        {activeTab ===
          "planner" && (
          <PlannerTab />
        )}

        {activeTab ===
          "insights" && (
          <InsightsTab />
        )}
      </div>
    </div>
  );
}

export default App;