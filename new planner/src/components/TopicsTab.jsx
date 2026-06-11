import React, { useEffect, useMemo, useState } from "react";

const syllabus = {
  "Advanced Accounting": [
    "AS 1: Disclosure of Accounting Policies",
    "AS 2: Valuation of Inventories",
    "AS 3: Cash Flow Statements",
    "AS 4: Contingencies and Events Occurring After the Balance Sheet Date",
    "AS 5: Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies",
    "AS 7: Construction Contracts",
    "AS 9: Revenue Recognition",
    "AS 10: Property, Plant and Equipment",
    "AS 11: The Effects of Changes in Foreign Exchange Rates",
    "AS 12: Accounting for Government Grants",
    "AS 13: Accounting for Investments",
    "AS 14: Accounting for Amalgamations",
    "AS 15: Employee Benefits",
    "AS 16: Borrowing Costs",
    "AS 17: Segment Reporting",
    "AS 18: Related Party Disclosures",
    "AS 19: Leases",
    "AS 20: Earnings Per Share",
    "AS 22: Accounting for Taxes on Income",
    "AS 24: Discontinuing Operations",
    "AS 25: Interim Financial Reporting",
    "AS 26: Intangible Assets",
    "AS 28: Impairment of Assets",
    "AS 29: Provisions, Contingent Liabilities and Contingent Assets",
    "Financial Statements of Companies",
    "Buyback of Securities and Equity Shares with Differential Rights",
    "Amalgamation of Companies",
    "Reconstruction of Companies",
    "Accounting for Branches including Foreign Branches",
  ],

  "Corporate & Other Laws": [
    "Preliminary",
    "Incorporation of Company and Matters Incidental Thereto",
    "Prospectus and Allotment of Securities",
    "Share Capital and Debentures",
    "Acceptance of Deposits by Companies",
    "Registration of Charges",
    "Management and Administration",
    "Declaration and Payment of Dividend",
    "Accounts of Companies",
    "Audit and Auditors",
    "Companies Incorporated Outside India",
    "The Foreign Exchange Management Act, 1999",
    "The General Clauses Act, 1897",
    "Interpretation of Statutes",
  ],

  Taxation: [
    "Basic Concepts",
    "Residence and Tax Liability",
    "Incomes Which Do Not Form Part of Total Income",
    "Heads of Income - Salaries",
    "Heads of Income - Income from House Property",
    "Heads of Income - Profits and Gains of Business or Profession",
    "Heads of Income - Capital Gains",
    "Heads of Income - Income from Other Sources",
    "Income of Other Persons Included in Assessee's Total Income",
    "Aggregation of Income, Set-off and Carry Forward of Losses",
    "Deductions from Gross Total Income",
    "Advance Tax, Tax Deduction at Source and Introduction to Tax Collection at Source",
    "Provisions for Filing Return of Income and Self-assessment",
    "Income Tax Authorities",
    "GST in India - An Introduction",
    "Supply under GST",
    "Charge of GST",
    "Place of Supply",
    "Exemptions from GST",
    "Time of Supply",
    "Value of Supply",
    "Input Tax Credit",
    "Registration",
    "Tax Invoice, Credit and Debit Notes",
    "Accounts and Records",
    "E-Way Bill",
    "Payment of Tax",
    "Tax Deduction at Source and Collection of Tax at Source",
    "Returns",
  ],

  "Cost & Management Accounting": [
    "Introduction to Cost and Management Accounting",
    "Material Cost",
    "Employee Cost and Direct Expenses",
    "Overheads - Absorption Costing Method",
    "Activity Based Costing",
    "Cost Sheet",
    "Cost Accounting System",
    "Unit and Batch Costing",
    "Job Costing and Contract Costing",
    "Process and Operation Costing",
    "Joint Products and By-Products",
    "Service Costing",
    "Standard Costing",
    "Marginal Costing",
    "Budget and Budgetary Control",
  ],

  "Auditing & Ethics": [
    "Nature, Objective and Scope of Audit",
    "Audit Strategy, Audit Planning and Audit Programme",
    "Risk Assessment and Internal Control",
    "Audit Evidence",
    "Audit of Items of Financial Statements",
    "Audit Documentation",
    "Completion and Review",
    "Audit Report",
    "Special Features of Audit of Different Types of Entities",
    "Audit of Banks",
    "Ethics and Terms of Audit Engagements",
  ],

  "Financial Management": [
    "Scope and Objectives of Financial Management",
    "Types of Financing",
    "Financial Analysis and Planning - Ratio Analysis",
    "Cost of Capital",
    "Financing Decisions - Capital Structure",
    "Financing Decisions - Leverages",
    "Investment Decisions",
    "Dividend Decisions",
    "Management of Working Capital",
  ],

  "Strategic Management": [
    "Introduction to Strategic Management",
    "Strategic Analysis: External Environment",
    "Strategic Analysis: Internal Environment",
    "Strategic Choices",
    "Strategy Implementation and Evaluation",
  ],
};

export default function TopicsTab() {
  const [expanded, setExpanded] = useState({});
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("caInterTopics");
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "caInterTopics",
      JSON.stringify(progress)
    );
  }, [progress]);

  const totalTopics = useMemo(
    () =>
      Object.values(syllabus).reduce(
        (a, b) => a + b.length,
        0
      ),
    []
  );

  const completedTopics = Object.values(progress).filter(
    (item) => item?.completed
  ).length;

  const toggleComplete = (subject, topic) => {
    const key = `${subject}-${topic}`;

    setProgress((prev) => ({
      ...prev,
      [key]: {
        completed: !prev[key]?.completed,
        revisions: prev[key]?.revisions || 0,
      },
    }));
  };

  const changeRevision = (
    subject,
    topic,
    change
  ) => {
    const key = `${subject}-${topic}`;

    setProgress((prev) => ({
      ...prev,
      [key]: {
        completed: prev[key]?.completed || false,
        revisions: Math.max(
          0,
          (prev[key]?.revisions || 0) + change
        ),
      },
    }));
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>📚 Topics Tracker</h1>

      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <h3>Total Topics</h3>
          <h2>{totalTopics}</h2>
        </div>

        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <h3>Completed</h3>
          <h2>{completedTopics}</h2>
        </div>

        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <h3>Overall Progress</h3>
          <h2>
            {Math.round(
              (completedTopics /
                Math.max(totalTopics, 1)) *
                100
            )}
            %
          </h2>
        </div>
      </div>

      {Object.entries(syllabus).map(
        ([subject, topics]) => {
          const subjectCompleted =
            topics.filter(
              (topic) =>
                progress[
                  `${subject}-${topic}`
                ]?.completed
            ).length;

          return (
            <div
              key={subject}
              style={{
                background: "white",
                borderRadius: 12,
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() =>
                  setExpanded((prev) => ({
                    ...prev,
                    [subject]:
                      !prev[subject],
                  }))
                }
                style={{
                  width: "100%",
                  padding: 18,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  textAlign: "left",
                }}
              >
                {subject} ▼ ({subjectCompleted}/
                {topics.length})
              </button>

              {expanded[subject] && (
                <div style={{ padding: 16 }}>
                  {topics.map((topic) => {
                    const key = `${subject}-${topic}`;
                    const data =
                      progress[key] || {};

                    return (
                      <div
                        key={key}
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems: "center",
                          padding: 12,
                          borderBottom:
                            "1px solid #eee",
                        }}
                      >
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              data.completed ||
                              false
                            }
                            onChange={() =>
                              toggleComplete(
                                subject,
                                topic
                              )
                            }
                          />{" "}
                          {topic}
                        </label>

                        <div>
                          <button
                            onClick={() =>
                              changeRevision(
                                subject,
                                topic,
                                -1
                              )
                            }
                          >
                            -
                          </button>

                          <span
                            style={{
                              margin:
                                "0 10px",
                            }}
                          >
                            {data.revisions ||
                              0}
                          </span>

                          <button
                            onClick={() =>
                              changeRevision(
                                subject,
                                topic,
                                1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}