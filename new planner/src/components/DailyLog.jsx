import React, { useState, useEffect } from "react";

const subjects = [
"Costing",
"FM",
"SM",
"Audit",
"Law",
"GST",
"DT",
"Accounts",
];

export default function DailyLog() {
const [logs, setLogs] = useState([]);
const [subject, setSubject] = useState("");
const [lectures, setLectures] = useState("");
const [remarks, setRemarks] = useState("");

useEffect(() => {
const saved = localStorage.getItem(
"dailyLogs"
);

if (saved) {
  setLogs(JSON.parse(saved));
}

}, []);

useEffect(() => {
localStorage.setItem(
"dailyLogs",
JSON.stringify(logs)
);
}, [logs]);

const addLog = () => {
if (!subject || !lectures) return;

const newLog = {
  id: Date.now(),
  date:
    new Date().toLocaleDateString(),
  subject,
  lectures: Number(lectures),
  remarks,
};

setLogs([newLog, ...logs]);

setSubject("");
setLectures("");
setRemarks("");

};

const deleteLog = (id) => {
setLogs(
logs.filter(
(log) => log.id !== id
)
);
};

const totalLectures = logs.reduce(
(sum, log) =>
sum + log.lectures,
0
);

const avgLectures =
logs.length > 0
? (
totalLectures /
logs.length
).toFixed(1)
: 0;

return (
<div
style={{
padding: 24,
}}
>
<h1
style={{
marginBottom: 20,
color: "#000",
}}
>
📖 Daily Log </h1>

```
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(2,1fr)",
      gap: 20,
      marginBottom: 24,
    }}
  >
    <div
      style={{
        background: "white",
        padding: 24,
        borderRadius: 16,
        boxShadow:
          "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          color: "#6b7280",
        }}
      >
        Total Lectures
      </div>

      <h1
        style={{
          color: "#000",
          margin: 0,
        }}
      >
        {totalLectures}
      </h1>
    </div>

    <div
      style={{
        background: "white",
        padding: 24,
        borderRadius: 16,
        boxShadow:
          "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          color: "#6b7280",
        }}
      >
        Average / Entry
      </div>

      <h1
        style={{
          color: "#000",
          margin: 0,
        }}
      >
        {avgLectures}
      </h1>
    </div>
  </div>

  <div
    style={{
      background: "white",
      padding: 24,
      borderRadius: 16,
      marginBottom: 24,
      boxShadow:
        "0 4px 12px rgba(0,0,0,.08)",
    }}
  >
    <h2
      style={{
        color: "#000",
        marginTop: 0,
      }}
    >
      Add Study Log
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "1fr 1fr",
        gap: 16,
      }}
    >
      <select
        value={subject}
        onChange={(e) =>
          setSubject(
            e.target.value
          )
        }
        style={{
          padding: 12,
        }}
      >
        <option value="">
          Select Subject
        </option>

        {subjects.map(
          (sub) => (
            <option
              key={sub}
              value={sub}
            >
              {sub}
            </option>
          )
        )}
      </select>

      <input
        type="number"
        placeholder="Lectures Completed"
        value={lectures}
        onChange={(e) =>
          setLectures(
            e.target.value
          )
        }
        style={{
          padding: 12,
        }}
      />
    </div>

    <textarea
      placeholder="Remarks / Completed Topics"
      value={remarks}
      onChange={(e) =>
        setRemarks(
          e.target.value
        )
      }
      rows={4}
      style={{
        width: "100%",
        marginTop: 16,
        padding: 12,
        resize: "vertical",
      }}
    />

    <button
      onClick={addLog}
      style={{
        marginTop: 16,
        background: "#4f46e5",
        color: "white",
        border: "none",
        padding:
          "12px 20px",
        borderRadius: 10,
        cursor: "pointer",
      }}
    >
      Save Study Log
    </button>
  </div>

  {logs.map((log) => (
    <div
      key={log.id}
      style={{
        background: "white",
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
        boxShadow:
          "0 4px 12px rgba(0,0,0,.08)",
        display: "flex",
        justifyContent:
          "space-between",
        alignItems:
          "flex-start",
      }}
    >
      <div>
        <h3
          style={{
            margin: 0,
            color: "#000",
          }}
        >
          {log.subject}
        </h3>

        <div
          style={{
            marginTop: 6,
            color: "#000",
          }}
        >
          📚 {log.lectures} lectures
        </div>

        <div
          style={{
            marginTop: 4,
            color: "#6b7280",
          }}
        >
          📅 {log.date}
        </div>

        {log.remarks && (
          <div
            style={{
              marginTop: 8,
              color:
                "#4b5563",
            }}
          >
            📝 {log.remarks}
          </div>
        )}
      </div>

      <button
        onClick={() =>
          deleteLog(log.id)
        }
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding:
            "10px 14px",
          borderRadius: 10,
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  ))}
</div>

);
}