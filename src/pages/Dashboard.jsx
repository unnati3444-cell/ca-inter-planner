import React from "react";
import { SUBJECTS, COMPLETED_SUBJECTS } from "../data/subjects";

export default function Dashboard({
  appData,
  updateProgress,
}) {
  const { progress, targetDate } = appData;

  const remainingLectures = SUBJECTS.reduce(
    (sum, subject) =>
      sum +
      (subject.totalLectures -
        (progress[subject.id] || 0)),
    0
  );

  const remainingHours = SUBJECTS.reduce(
    (sum, subject) =>
      sum +
      (subject.totalLectures -
        (progress[subject.id] || 0)) *
        subject.hoursPerLecture,
    0
  );

  const totalCompleted = SUBJECTS.reduce(
    (sum, subject) =>
      sum + (progress[subject.id] || 0),
    0
  );

  const totalPending = SUBJECTS.reduce(
    (sum, subject) => sum + subject.totalLectures,
    0
  );

  const overallPercent = (
    (totalCompleted / totalPending) *
    100
  ).toFixed(1);

  const daysLeft = Math.max(
    1,
    Math.ceil(
      (new Date(targetDate) - new Date()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const requiredPace = (
    remainingLectures / daysLeft
  ).toFixed(1);

  return (
    <>
      <div className="page-card">
        <h1>⚡ CA Inter Command Center</h1>

        <p style={{ marginTop: 10 }}>
          Target Date: {targetDate}
        </p>

        <div
          style={{
            marginTop: 20,
            height: 18,
            background: "#13263d",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${overallPercent}%`,
              height: "100%",
              background: "#d4af37",
            }}
          />
        </div>

        <p style={{ marginTop: 8 }}>
          Overall Progress: {overallPercent}%
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>📚 Remaining Lectures</h3>
          <h1>{remainingLectures}</h1>
        </div>

        <div className="stat-card">
          <h3>⏱ Remaining Hours</h3>
          <h1>
            {remainingHours.toFixed(0)}
          </h1>
        </div>

        <div className="stat-card">
          <h3>📅 Days Left</h3>
          <h1>{daysLeft}</h1>
        </div>

        <div className="stat-card">
          <h3>🚀 Pace Needed</h3>
          <h1>{requiredPace}/day</h1>
        </div>
      </div>

      <div className="page-card">
        <h2>🏆 June Challenge</h2>

        <p>
          Target: 100 Lectures
        </p>

        <p>
          Completed: {totalCompleted}
        </p>

        <div
          style={{
            marginTop: 10,
            height: 15,
            background: "#13263d",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              width: `${Math.min(
                (totalCompleted / 100) * 100,
                100
              )}%`,
              height: "100%",
              background: "#00C896",
              borderRadius: 10,
            }}
          />
        </div>
      </div>

      <div className="page-card">
        <h2>✅ Completed Subjects</h2>

        {COMPLETED_SUBJECTS.map(
          (subject) => (
            <div
              key={subject.id}
              className="subject-row"
            >
              <b>{subject.name}</b>
              <span>
                {subject.totalLectures} Lectures
              </span>
            </div>
          )
        )}
      </div>

      <div className="page-card">
        <h2>📖 Pending Subjects</h2>

        {SUBJECTS.map((subject) => {
          const completed =
            progress[subject.id] || 0;

          const percent = (
            (completed /
              subject.totalLectures) *
            100
          ).toFixed(1);

          return (
            <div
              key={subject.id}
              style={{
                marginTop: 20,
              }}
            >
              <div className="subject-row">
                <b>{subject.name}</b>

                <span>
                  {completed}/
                  {subject.totalLectures}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max={subject.totalLectures}
                value={completed}
                onChange={(e) =>
                  updateProgress(
                    subject.id,
                    Number(e.target.value)
                  )
                }
                style={{
                  width: "100%",
                  marginTop: 8,
                }}
              />

              <div
                style={{
                  marginTop: 6,
                }}
              >
                {percent}% Complete
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}