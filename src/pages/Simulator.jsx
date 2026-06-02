import React, { useMemo, useState } from "react";
import { SUBJECTS } from "../data/subjects";

export default function Simulator({
  appData,
}) {
  const [pace, setPace] =
    useState(4);

  const remainingLectures =
    SUBJECTS.reduce(
      (sum, subject) =>
        sum +
        (subject.totalLectures -
          (appData.progress[
            subject.id
          ] || 0)),
      0
    );

  const remainingHours =
    SUBJECTS.reduce(
      (sum, subject) =>
        sum +
        (subject.totalLectures -
          (appData.progress[
            subject.id
          ] || 0)) *
          subject.hoursPerLecture,
      0
    );

  const finishDays =
    Math.ceil(
      remainingLectures / pace
    );

  const finishDate =
    useMemo(() => {
      const d =
        new Date();

      d.setDate(
        d.getDate() +
          finishDays
      );

     return d.toLocaleDateString("en-GB");
    }, [finishDays]);

  const hoursPerDay =
    (
      remainingHours /
      finishDays
    ).toFixed(1);

  return (
    <>
      <div className="page-card">
        <h1>
          🎯 Completion Simulator
        </h1>

        <p
          style={{
            marginTop: 10,
          }}
        >
          Adjust your daily
          lecture pace and
          see your expected
          completion date.
        </p>
      </div>

      <div className="page-card">
        <h2>
          Daily Pace
        </h2>

        <input
          type="range"
          min="1"
          max="10"
          value={pace}
          onChange={(e) =>
            setPace(
              Number(
                e.target
                  .value
              )
            )
          }
          style={{
            width: "100%",
            marginTop: 20,
          }}
        />

        <h1
          style={{
            marginTop: 15,
          }}
        >
          {pace} lectures/day
        </h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>
            Remaining Lectures
          </h3>

          <h1>
            {
              remainingLectures
            }
          </h1>
        </div>

        <div className="stat-card">
          <h3>
            Days Needed
          </h3>

          <h1>
            {finishDays}
          </h1>
        </div>

        <div className="stat-card">
          <h3>
            Finish Date
          </h3>

          <h1>
            {finishDate}
          </h1>
        </div>

        <div className="stat-card">
          <h3>
            Hours / Day
          </h3>

          <h1>
            {hoursPerDay}
          </h1>
        </div>
      </div>

      <div className="page-card">
        <h2>
          Quick Reality Check
        </h2>

        <p>
          3 lectures/day →
          Comfortable
        </p>

        <p>
          4 lectures/day →
          Strong Pace
        </p>

        <p>
          5 lectures/day →
          Aggressive
        </p>

        <p>
          6+ lectures/day →
          Difficult to sustain
        </p>
      </div>
    </>
  );
}