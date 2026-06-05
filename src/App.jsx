import React, { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import DailyLog from "./pages/DailyLog";
import Analytics from "./pages/Analytics";
import Simulator from "./pages/Simulator";
import Settings from "./pages/Settings";

import "./styles/app.css";

const STORAGE_KEY = "ca-inter-command-center-v3";

const defaultData = {
  targetDate: "2026-07-31",

  progress: {
    costing: 0,
    fm: 0,
    gst: 0,
    law: 0,
    audit: 0,
    sm: 0,
  },

  logs: [],
};

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const [appData, setAppData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(appData)
    );
  }, [appData]);

  const updateProgress = (subject, value) => {
    setAppData((prev) => ({
      ...prev,
      progress: {
        ...prev.progress,
        [subject]: value,
      },
    }));
  };

  const addLog = (log) => {
    setAppData((prev) => ({
      ...prev,
      logs: [...prev.logs, log],
    }));
  };
  const deleteLog = (id) => {
  setAppData((prev) => ({
    ...prev,
    logs: prev.logs.filter(
      (log) => log.id !== id
    ),
  }));
};

  const updateTargetDate = (date) => {
    setAppData((prev) => ({
      ...prev,
      targetDate: date,
    }));
  };

  const resetAllData = () => {
    if (
      window.confirm(
        "Reset all CA Inter tracker data?"
      )
    ) {
      setAppData(defaultData);
    }
  };

  const pageProps = {
    appData,
    updateProgress,
    addLog,
    deleteLog,
    updateTargetDate,
    resetAllData,
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard {...pageProps} />;

      case "calendar":
        return <Calendar {...pageProps} />;

      case "dailylog":
        return <DailyLog {...pageProps} />;

      case "analytics":
        return <Analytics {...pageProps} />;

      case "simulator":
        return <Simulator {...pageProps} />;

      case "settings":
        return <Settings {...pageProps} />;

      default:
        return <Dashboard {...pageProps} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}