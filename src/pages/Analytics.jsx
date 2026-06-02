import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { SUBJECTS } from "../data/subjects";

export default function Analytics({
  appData,
}) {
  const { logs, progress } = appData;

  const totalHours = logs.reduce(
    (sum, log) => sum + log.hours,
    0
  );

  const totalLectures = logs.reduce(
    (sum, log) =>
      sum + log.lectures,
    0
  );

  const chartData =
    SUBJECTS.map((subject) => ({
      name: subject.name,
      value:
        progress[
          subject.id
        ] || 0,
      color:
        subject.color,
    }));

  return (
    <>
      <div className="page-card">
        <h1>📊 Analytics</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>
            Total Hours Logged
          </h3>

          <h1>
            {totalHours.toFixed(
              1
            )}
          </h1>
        </div>

        <div className="stat-card">
          <h3>
            Total Lectures Logged
          </h3>

          <h1>
            {totalLectures}
          </h1>
        </div>

        <div className="stat-card">
          <h3>
            Total Study Sessions
          </h3>

          <h1>
            {logs.length}
          </h1>
        </div>
      </div>

      <div className="page-card">
        <h2>
          Subject Progress
        </h2>

        <div
          style={{
            width: "100%",
            height: 400,
          }}
        >
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={
                  chartData
                }
                dataKey="value"
                nameKey="name"
                outerRadius={
                  120
                }
              >
                {chartData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={
                        index
                      }
                      fill={
                        entry.color
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="page-card">
        <h2>
          Subject Breakdown
        </h2>

        {SUBJECTS.map(
          (subject) => {
            const completed =
              progress[
                subject.id
              ] || 0;

            const percent =
              (
                (completed /
                  subject.totalLectures) *
                100
              ).toFixed(
                1
              );

            return (
              <div
                key={
                  subject.id
                }
                style={{
                  marginTop:
                    16,
                }}
              >
                <div className="subject-row">
                  <b>
                    {
                      subject.name
                    }
                  </b>

                  <span>
                    {
                      percent
                    }
                    %
                  </span>
                </div>

                <div
                  style={{
                    height: 12,
                    background:
                      "#13263d",
                    borderRadius: 8,
                    overflow:
                      "hidden",
                    marginTop: 6,
                  }}
                >
                  <div
                    style={{
                      width: `${percent}%`,
                      height:
                        "100%",
                      background:
                        subject.color,
                    }}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
}