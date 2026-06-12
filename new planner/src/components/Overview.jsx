import React, { useEffect, useState } from "react";
import NotesBoard from "./NotesBoard";

export default function Overview() {
  const [subjects, setSubjects] =
    useState([]);

  const [logs, setLogs] =
    useState([]);

  const isMobile =
  window.innerWidth < 768;

  const [startDateValue, setStartDateValue] =
    useState(
      localStorage.getItem(
        "startDate"
      ) || "2026-06-01"
    );

  const [targetDateValue, setTargetDateValue] =
    useState(
      localStorage.getItem(
        "targetDate"
      ) || "2026-07-31"
    );

  useEffect(() => {
    const savedSubjects =
      JSON.parse(
        localStorage.getItem(
          "plannerSubjects"
        )
      ) || [];

    const savedLogs =
      JSON.parse(
        localStorage.getItem(
          "dailyLogs"
        )
      ) || [];

    setSubjects(savedSubjects);
    setLogs(savedLogs);
  }, []);

  const totalPlanned =
    subjects.reduce(
      (sum, subject) =>
        sum +
        Number(
          subject.totalLectures || 0
        ),
      0
    );

  const totalCompleted =
  subjects.reduce(
    (sum, subject) =>
      sum +
      Number(
        subject.completedLectures || 0
      ),
    0
  );

  const totalRemaining =
    Math.max(
      totalPlanned -
        totalCompleted,
      0
    );

  const progress =
    totalPlanned > 0
      ? Math.round(
          (totalCompleted /
            totalPlanned) *
            100
        )
      : 0;

  const targetDate =
    new Date(
      targetDateValue
    );

  const today = new Date();

  const startDate =
    new Date(startDateValue);

  const daysStudied =
    Math.max(
      Math.ceil(
        (today - startDate) /
          (1000 * 60 * 60 * 24)
      ),
      1
    );

  const daysRemaining =
    Math.max(
      Math.ceil(
        (targetDate -
          today) /
          (1000 *
            60 *
            60 *
            24)
      ),
      0
    );

  const requiredPace =
    daysRemaining > 0
      ? (
          totalRemaining /
          daysRemaining
        ).toFixed(1)
      : "0";

  const currentPace =
    (
      totalCompleted /
      daysStudied
    ).toFixed(1);

  let forecastText =
    "Not enough data";

  let statusText =
    "Start Updating Progress";

  let statusColor =
    "#6b7280";

  if (
    totalCompleted > 0 &&
    Number(currentPace) > 0
  ) {
    const forecastDays =
      Math.ceil(
        totalRemaining /
          Number(
            currentPace
          )
      );

    const forecastDate =
      new Date();

    forecastDate.setDate(
      forecastDate.getDate() +
        forecastDays
    );

    forecastText =
      forecastDate.toLocaleDateString(
        "en-GB"
      );

    if (
      forecastDate <=
      targetDate
    ) {
      statusText =
        "Ahead of Target ✅";

      statusColor =
        "#16a34a";
    } else {
      statusText =
        "Behind Target ⚠️";

      statusColor =
        "#dc2626";
    }
  }

  const saveDates =
    () => {
      localStorage.setItem(
        "startDate",
        startDateValue
      );

      localStorage.setItem(
        "targetDate",
        targetDateValue
      );
    };

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <NotesBoard />

      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 24,
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
          🎯 Study Dates
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile
             ? "column"
             : "row",
             gap: 12,
            marginTop: 16,
          }}
        >
          <input
            type="date"
            value={
              startDateValue
            }
            onChange={(e) =>
              setStartDateValue(
                e.target.value
              )
            }
            style={{
              padding: 12,
              border:
                "1px solid #d1d5db",
              borderRadius: 10,
            }}
          />

          <input
            type="date"
            value={
              targetDateValue
            }
            onChange={(e) =>
              setTargetDateValue(
                e.target.value
              )
            }
            style={{
              padding: 12,
              border:
                "1px solid #d1d5db",
              borderRadius: 10,
            }}
          />

          <button
            onClick={
              saveDates
            }
            style={{
              background:
                "#4f46e5",
              color: "white",
              border: "none",
              padding:
                "12px 20px",
              borderRadius: 10,
              cursor:
                "pointer",
            }}
          >
            Save Dates
          </button>
        </div>
      </div>

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
        <StatCard
          title="Planned"
          value={totalPlanned}
          color="#3b82f6"
        />

        <StatCard
          title="Completed"
          value={totalCompleted}
          color="#10b981"
        />

        <StatCard
          title="Remaining"
          value={totalRemaining}
          color="#f59e0b"
        />

        <StatCard
          title="Progress"
          value={`${progress}%`}
          color="#8b5cf6"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
          isMobile
           ? "1fr 1fr"
            :"repeat(4,1fr)",
          gap: 20,
          marginBottom: 24,
        }}
      >
        <StatCard
          title="Target Date"
          value={new Date(
            targetDateValue
          ).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
            }
          )}
          color="#dc2626"
        />

        <StatCard
          title="Required Pace"
          value={requiredPace}
          color="#f59e0b"
        />

        <StatCard
          title="Current Pace"
          value={currentPace}
          color="#10b981"
        />

        <StatCard
          title="Days Left"
          value={daysRemaining}
          color="#3b82f6"
        />

        <StatCard
          title="Days Studied"
          value={daysStudied}
          color="#14b8a6"
        />
      </div>

      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 24,
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
          🎯 AIR Dashboard
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
            isMobile
             ? "1fr"
             : "1fr 1fr",
            gap: 20,
            marginTop: 16,
          }}
        >
          <div>
            <div
              style={{
                color:
                  "#6b7280",
              }}
            >
              Forecast Completion
            </div>

            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color:
                  "#000",
                marginTop: 8,
              }}
            >
              {forecastText}
            </div>
          </div>

          <div>
            <div
              style={{
                color:
                  "#6b7280",
              }}
            >
              Status
            </div>

            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color:
                  statusColor,
                marginTop: 8,
              }}
            >
              {statusText}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 24,
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
          Overall Progress
        </h2>

        <div
          style={{
            height: 14,
            background:
              "#e5e7eb",
            borderRadius: 20,
            overflow:
              "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg,#3b82f6,#8b5cf6)",
              height:
                "100%",
            }}
          />
        </div>

        <div
          style={{
            marginTop: 12,
            fontWeight: 600,
            color: "#000",
          }}
        >
          {totalCompleted} /{" "}
          {totalPlanned}
          {" "}
          lectures completed
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: 24,
        textAlign: "center",
        boxShadow:
          "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          color,
        }}
      >
        {value}
      </div>

      <div
        style={{
          marginTop: 8,
          color: "#6b7280",
        }}
      >
        {title}
      </div>
    </div>
  );
}
