import React, { useEffect, useMemo, useState } from "react";

export default function InsightsTab() {
  const [logs, setLogs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState({});

  useEffect(() => {
    const savedLogs =
      JSON.parse(localStorage.getItem("dailyLogs")) ||
      [];

    const savedSubjects =
      JSON.parse(
        localStorage.getItem("plannerSubjects")
      ) || [];

    const savedTopics =
      JSON.parse(
        localStorage.getItem("caInterTopics")
      ) || {};

    setLogs(savedLogs);
    setSubjects(savedSubjects);
    setTopics(savedTopics);
  }, []);

  const totalLectures = useMemo(() => {
    return logs.reduce(
      (sum, log) =>
        sum + Number(log.lectures || 0),
      0
    );
  }, [logs]);

  const totalPlannerLectures = useMemo(() => {
    return subjects.reduce(
      (sum, subject) =>
        sum +
        Number(subject.totalLectures || 0),
      0
    );
  }, [subjects]);

  const completedTopics = useMemo(() => {
    return Object.values(topics).filter(
      (item) => item?.completed
    ).length;
  }, [topics]);

  const totalTopics = useMemo(() => {
    return Object.keys(topics).length;
  }, [topics]);

  const subjectStats = useMemo(() => {
    const stats = {};

    logs.forEach((log) => {
      if (!stats[log.subject]) {
        stats[log.subject] = 0;
      }

      stats[log.subject] += Number(
        log.lectures || 0
      );
    });

    return Object.entries(stats).sort(
      (a, b) => b[1] - a[1]
    );
  }, [logs]);

  const averagePerDay =
    logs.length > 0
      ? (
          totalLectures / logs.length
        ).toFixed(1)
      : 0;

  return (
    <div style={{ padding: 24 }}>
      <h1
        style={{
          marginBottom: 24,
        }}
      >
        📈 Insights Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <Card
          title="Lectures Completed"
          value={totalLectures}
        />

        <Card
          title="Planned Lectures"
          value={totalPlannerLectures}
        />

        <Card
          title="Average / Day"
          value={averagePerDay}
        />

        <Card
          title="Topics Completed"
          value={`${completedTopics}/${totalTopics}`}
        />
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
        <h2
          style={{
            marginTop: 0,
          }}
        >
          Subject-wise Lecture Progress
        </h2>

        {subjectStats.length === 0 ? (
          <p>No lecture data yet.</p>
        ) : (
          subjectStats.map(
            ([subject, count]) => (
              <div
                key={subject}
                style={{
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span>
                    {subject}
                  </span>

                  <strong>
                    {count}
                  </strong>
                </div>

                <div
                  style={{
                    height: 10,
                    background:
                      "#e5e7eb",
                    borderRadius: 999,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(
                        (count /
                          Math.max(
                            totalLectures,
                            1
                          )) *
                          100,
                        100
                      )}%`,
                      background:
                        "#4f46e5",
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

function Card({ title, value }) {
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
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <h1
        style={{
          margin: 0,
        }}
      >
        {value}
      </h1>
    </div>
  );
}