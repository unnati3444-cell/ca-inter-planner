import React, { useState } from "react";
import { SUBJECTS } from "../data/subjects";

export default function DailyLog({
  addLog,
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
    </div>
  );
}