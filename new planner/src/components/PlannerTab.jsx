import React, { useState, useEffect } from "react";

const subjectOptions = [
  "Costing",
  "FM",
  "SM",
  "Audit",
  "Law",
  "GST",
  "DT",
  "Accounts",
];

export default function PlannerTab() {
  const [subjects, setSubjects] = useState([]);
  const [logs, setLogs] = useState([]);

  const [name, setName] = useState("");
  const [totalLectures, setTotalLectures] =
    useState("");
  const [completedLectures, setCompletedLectures] =
    useState("");
  const isMobile =
  window.innerWidth < 768;

  useEffect(() => {
    const savedSubjects =
      JSON.parse(
        localStorage.getItem(
          "plannerSubjects"
        )
      ) || [];

    const savedLogs =
      JSON.parse(
        localStorage.getItem("dailyLogs")
      ) || [];

    setSubjects(savedSubjects);
    setLogs(savedLogs);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "plannerSubjects",
      JSON.stringify(subjects)
    );
  }, [subjects]);

  const addSubject = () => {
    if (!name || !totalLectures) return;

    const alreadyExists =
      subjects.some(
        (subject) =>
          subject.name === name
      );

    if (alreadyExists) {
      alert(
        "Subject already exists."
      );
      return;
    }

    const newSubject = {
      id: Date.now(),
      name,
      totalLectures: Number(
        totalLectures
      ),
      completedLectures: Number(
        completedLectures || 0
      ),
    };

    setSubjects([
      ...subjects,
      newSubject,
    ]);

    setName("");
    setTotalLectures("");
    setCompletedLectures("");
  };

  const deleteSubject = (id) => {
    setSubjects(
      subjects.filter(
        (subject) =>
          subject.id !== id
      )
    );
  };

  const totalPlannerLectures =
    subjects.reduce(
      (sum, subject) =>
        sum +
        Number(
          subject.totalLectures || 0
        ),
      0
    );

  const totalCompletedLectures =
    subjects.reduce(
      (sum, subject) => {
        const dailyLogCompleted =
          logs
            .filter(
              (log) =>
                log.subject ===
                subject.name
            )
            .reduce(
              (
                lectureSum,
                log
              ) =>
                lectureSum +
                Number(
                  log.lectures || 0
                ),
              0
            );

        return (
          sum +
          subject.completedLectures +
          dailyLogCompleted
        );
      },
      0
    );

  const totalRemainingLectures =
    Math.max(
      totalPlannerLectures -
        totalCompletedLectures,
      0
    );

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <h1
        style={{
          color: "#000",
          marginBottom: 24,
        }}
      >
        📅 Planner
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
  isMobile
    ? "1fr 1fr"
    : "repeat(4,1fr)",
          gap: 20,
          marginBottom: 24,
        }}
      >
        <Card
          title="Subjects"
          value={subjects.length}
        />

        <Card
          title="Total Lectures"
          value={totalPlannerLectures}
        />

        <Card
          title="Completed"
          value={totalCompletedLectures}
        />

        <Card
          title="Remaining"
          value={totalRemainingLectures}
        />
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
            marginTop: 0,
            color: "#000",
          }}
        >
          Add Subject
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
  isMobile
    ? "1fr"
    : "2fr 1fr 1fr auto",
            gap: 12,
          }}
        >
          <select
            value={name}
            onChange={(e) =>
              setName(
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

            {subjectOptions.map(
              (subject) => (
                <option
                  key={subject}
                  value={subject}
                >
                  {subject}
                </option>
              )
            )}
          </select>

          <input
            type="number"
            placeholder="Total"
            value={totalLectures}
            onChange={(e) =>
              setTotalLectures(
                e.target.value
              )
            }
            style={{
              padding: 12,
            }}
          />

          <input
            type="number"
            placeholder="Starting Completed"
            value={
              completedLectures
            }
            onChange={(e) =>
              setCompletedLectures(
                e.target.value
              )
            }
            style={{
              padding: 12,
            }}
          />

          <button
            onClick={addSubject}
            style={{
              background:
                "#4f46e5",
              color: "white",
              border: "none",
              padding:
                "12px 18px",
              borderRadius: 10,
              cursor:
                "pointer",
            }}
          >
            Add
          </button>
        </div>
      </div>

      {subjects.map(
        (subject) => {
          const dailyLogCompleted =
            logs
              .filter(
                (log) =>
                  log.subject ===
                  subject.name
              )
              .reduce(
                (
                  sum,
                  log
                ) =>
                  sum +
                  Number(
                    log.lectures || 0
                  ),
                0
              );

          const completed =
            subject.completedLectures +
            dailyLogCompleted;

          const remaining =
            Math.max(
              subject.totalLectures -
                completed,
              0
            );

          const progress =
            subject.totalLectures >
            0
              ? Math.round(
                  (completed /
                    subject.totalLectures) *
                    100
                )
              : 0;

          return (
            <div
              key={subject.id}
              style={{
                background:
                  "white",
                padding: 20,
                borderRadius: 16,
                marginBottom: 16,
                boxShadow:
                  "0 4px 12px rgba(0,0,0,.08)",
              }}
            >
              <div
                style={{
                  display:
  "flex",
flexDirection:
  isMobile
    ? "column"
    : "row",
justifyContent:
  "space-between",
alignItems:
  isMobile
    ? "stretch"
    : "center",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      color:
                        "#000",
                    }}
                  >
                    {
                      subject.name
                    }
                  </h3>

                  <div
                    style={{
                      marginTop: 8,
                      color:
                        "#6b7280",
                    }}
                  >
                    Total:{" "}
                    {
                      subject.totalLectures
                    }
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      color:
                        "#6b7280",
                    }}
                  >
                    Starting Completed:{" "}
                    {
                      subject.completedLectures
                    }
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      color:
                        "#6b7280",
                    }}
                  >
                    Daily Log:{" "}
                    {
                      dailyLogCompleted
                    }
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      color:
                        "#6b7280",
                    }}
                  >
                    Remaining:{" "}
                    {remaining}
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      fontWeight: 700,
                      color:
                        "#000",
                    }}
                  >
                    Completed:{" "}
                    {completed}
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      fontWeight: 600,
                    }}
                  >
                    Progress:{" "}
                    {progress}%
                  </div>
                </div>

                <button
                  onClick={() =>
                    deleteSubject(
                      subject.id
                    )
                  }
                  style={{
                    background:
                      "#ef4444",
                    marginTop:
  isMobile ? 12 : 0,

width:
  isMobile
    ? "100%"
    : "auto",
                    color:
                      "white",
                    border:
                      "none",
                    padding:
                      "10px 14px",
                    borderRadius:
                      10,
                    cursor:
                      "pointer",
                  }}
                >
                  Delete
                </button>
              </div>

              <div
                style={{
                  marginTop: 16,
                  height: 12,
                  background:
                    "#e5e7eb",
                  borderRadius:
                    999,
                  overflow:
                    "hidden",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(
                      progress,
                      100
                    )}%`,
                    height:
                      "100%",
                    background:
                      "linear-gradient(90deg,#3b82f6,#8b5cf6)",
                  }}
                />
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

function Card({
  title,
  value,
}) {
  return (
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
        {title}
      </div>

      <h1
        style={{
          margin: 0,
          color: "#000",
        }}
      >
        {value}
      </h1>
    </div>
  );
}