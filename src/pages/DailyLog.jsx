import React, { useState } from "react";
import { SUBJECTS } from "../data/subjects";

export default function DailyLog({
  addLog,
  deleteLog,
  appData,
}) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [date, setDate] =
    useState(today);

  const [subject, setSubject] =
    useState("costing");

  const [lectures, setLectures] =
    useState(1);

  const [hours, setHours] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const saveLog = () => {
    if (!hours) {
      alert(
        "Please enter hours studied"
      );
      return;
    }

    addLog({
      id: Date.now(),
      date,
      subject,
      lectures:
        Number(lectures),
      hours:
        Number(hours),
      notes,
    });

    setHours("");
    setNotes("");

    alert(
      "Study Log Saved ✅"
    );
  };

  return (
    <div className="page-card">
      <h1>📝 Daily Log</h1>

      <div className="form-group">
        <label>Date</label>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(
              e.target.value
            )
          }
        />
      </div>

      <div className="form-group">
        <label>Subject</label>

        <select
          value={subject}
          onChange={(e) =>
            setSubject(
              e.target.value
            )
          }
        >
          {SUBJECTS.map(
            (subject) => (
              <option
                key={
                  subject.id
                }
                value={
                  subject.id
                }
              >
                {subject.name}
              </option>
            )
          )}
        </select>
      </div>

      <div className="form-group">
        <label>
          Lectures Completed
        </label>

        <input
          type="number"
          min="1"
          value={lectures}
          onChange={(e) =>
            setLectures(
              e.target.value
            )
          }
        />
      </div>

      <div className="form-group">
        <label>
          Hours Studied
        </label>

        <input
          type="number"
          step="0.25"
          value={hours}
          onChange={(e) =>
            setHours(
              e.target.value
            )
          }
        />
      </div>

      <div className="form-group">
        <label>Notes</label>

        <textarea
          rows="5"
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
        />
      </div>

      <button
        className="gold-btn"
        onClick={saveLog}
      >
        Save Study Log
      </button>
      <hr
  style={{
    marginTop: 30,
    marginBottom: 20,
    borderColor: "#333",
  }}
/>

<h2>Saved Logs</h2>

{appData.logs
  .slice()
  .reverse()
  .map((log) => (
    <div
      key={log.id}
      style={{
        background: "#13263d",
        padding: 12,
        marginTop: 12,
        borderRadius: 10,
      }}
    >
      <div>
        <b>{log.subject}</b>
      </div>

      <div>
        Date: {log.date}
      </div>

      <div>
        Lectures: {log.lectures}
      </div>

      <div>
        Hours: {log.hours}
      </div>

      {log.notes && (
        <div>
          Notes: {log.notes}
        </div>
      )}

      <button
        style={{
          marginTop: 10,
          background: "#e74c3c",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: 8,
          cursor: "pointer",
        }}
        onClick={() => {
          if (
            window.confirm(
              "Delete this log?"
            )
          ) {
            deleteLog(log.id);
          }
        }}
      >
        🗑 Delete
      </button>
    </div>
  ))}
    </div>
  );
}