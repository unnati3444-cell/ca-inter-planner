import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import DailyLog from "./components/DailyLog";
import TopicsTab from "./components/TopicsTab";
import PlannerTab from "./components/PlannerTab";
import InsightsTab from "./components/InsightsTab";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const daysToTarget = 50;
  const totalRemaining = 277;
  const paceNeeded = 5.5;
  const totalDone = 33;
  const totalTotal = 310;

  return (
    <div
      style={{
        display: "flex",
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
          padding: 20,
        }}
      >
        {activeTab === "overview" && (
          <Overview
            />
        )}

        {activeTab === "daily" && <DailyLog />}

        {activeTab === "topics" && <TopicsTab />}

        {activeTab === "planner" && <PlannerTab />}

        {activeTab === "insights" && <InsightsTab />}
      </div>
    </div>
  );
}

export default App;