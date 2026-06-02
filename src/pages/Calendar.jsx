import React from "react";

export default function Calendar({
  appData,
}) {
  const logs = appData.logs;

  const groupedLogs =
    logs.reduce(
      (acc, log) => {
        if (!acc[log.date]) {
          acc[log.date] = [];
        }

        acc[log.date].push(log);

        return acc;
      },
      {}
    );

  const dates =
    Object.keys(
      groupedLogs
    ).sort(
      (a, b) =>
        new Date(b) -
        new Date(a)
    );

  return (
    <>
      <div className="page-card">
        <h1>
          📅 Study Calendar
        </h1>

        <p
          style={{
            marginTop: 10,
          }}
        >
          Your study history
        </p>
      </div>

      {dates.length === 0 ? (
        <div className="page-card">
          <h2>
            No Study Logs Yet
          </h2>

          <p>
            Add entries from
            Daily Log.
          </p>
        </div>
      ) : (
        dates.map((date) => {
          const dayLogs =
            groupedLogs[
              date
            ];

          const totalHours =
            dayLogs.reduce(
              (
                sum,
                log
              ) =>
                sum +
                log.hours,
              0
            );

          const totalLectures =
            dayLogs.reduce(
              (
                sum,
                log
              ) =>
                sum +
                log.lectures,
              0
            );

          return (
            <div
              key={date}
              className="page-card"
            >
              <h2>
                {new Date(
                  date
                ).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month:
                      "short",
                    year:
                      "numeric",
                  }
                )}
              </h2>

              <p>
                📚{" "}
                {
                  totalLectures
                }{" "}
                Lectures
              </p>

              <p>
                ⏱{" "}
                {
                  totalHours
                }{" "}
                Hours
              </p>

              <div
                style={{
                  marginTop:
                    15,
                }}
              >
                {dayLogs.map(
                  (
                    log
                  ) => (
                    <div
                      key={
                        log.id
                      }
                      style={{
                        background:
                          "#13263d",
                        padding:
                          "10px",
                        borderRadius:
                          "10px",
                        marginTop:
                          "10px",
                      }}
                    >
                      <b>
                        {
                          log.subject
                        }
                      </b>

                      <div>
                        Lectures:{" "}
                        {
                          log.lectures
                        }
                      </div>

                      <div>
                        Hours:{" "}
                        {
                          log.hours
                        }
                      </div>

                      {log.notes && (
                        <div>
                          📝{" "}
                          {
                            log.notes
                          }
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })
      )}
    </>
  );
}