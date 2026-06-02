import React, { useState } from "react";

export default function Settings({
  appData,
  updateTargetDate,
  resetAllData,
}) {
  const [targetDate, setTargetDate] =
    useState(appData.targetDate);

  const saveTargetDate = () => {
    updateTargetDate(targetDate);

    alert(
      "Target Date Updated ✅"
    );
  };

  const exportBackup = () => {
    const dataStr =
      JSON.stringify(
        appData,
        null,
        2
      );

    const blob =
      new Blob(
        [dataStr],
        {
          type: "application/json",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;

    a.download =
      "ca-inter-backup.json";

    a.click();
  };

  return (
    <>
      <div className="page-card">
        <h1>
          ⚙️ Settings
        </h1>
      </div>

      <div className="page-card">
        <h2>
          🎯 Target Date
        </h2>

        <input
          type="date"
          value={targetDate}
          onChange={(e) =>
            setTargetDate(
              e.target.value
            )
          }
          style={{
            marginTop: 15,
            padding: 12,
            width: "100%",
            background:
              "#13263d",
            color:
              "white",
            border:
              "none",
            borderRadius:
              "10px",
          }}
        />

        <button
          className="gold-btn"
          onClick={
            saveTargetDate
          }
        >
          Save Target Date
        </button>
      </div>

      <div className="page-card">
        <h2>
          💾 Backup
        </h2>

        <button
          className="gold-btn"
          onClick={
            exportBackup
          }
        >
          Export Data
        </button>
      </div>

      <div className="page-card">
        <h2>
          🚨 Danger Zone
        </h2>

        <button
          className="danger-btn"
          onClick={
            resetAllData
          }
        >
          Reset Everything
        </button>
      </div>
    </>
  );
}