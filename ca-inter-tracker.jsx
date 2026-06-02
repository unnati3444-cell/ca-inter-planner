import { useState, useEffect } from "react";

/* ──────────────────────── Data ──────────────────────── */

const EXAM_DATE = new Date("2027-01-05T09:00:00");

const SUBJECTS = [
  {
    id: "adv_acc", name: "Advanced Accounts", code: "Paper 1", color: "#D4AF37", emoji: "📒",
    topics: [
      "Accounting Standards (AS 1–26)",
      "Final Accounts of Companies",
      "Amalgamation & Absorption of Companies",
      "Internal Reconstruction",
      "Liquidation of Companies",
      "Branch & Departmental Accounts",
      "Partnership Accounts — Dissolution & Special",
      "Hire Purchase & Instalment Sale",
      "Royalty Accounts",
      "Insurance Claims (Loss of Stock & Profit)",
      "Investment Accounts",
      "Accounts from Incomplete Records",
    ]
  },
  {
    id: "corp_law", name: "Corporate & Other Laws", code: "Paper 2", color: "#4A90E2", emoji: "⚖️",
    topics: [
      "Incorporation & Commencement of Business",
      "Memorandum & Articles of Association",
      "Share Capital & Debentures",
      "Acceptance of Deposits",
      "Charges",
      "Management & Administration",
      "Directors — Appointment, Powers & Duties",
      "Meetings & Resolutions",
      "Accounts & Audit (Companies Act)",
      "Dividends",
      "Compromise, Arrangements & Winding Up",
      "LLP Act, 2008",
      "Other Laws: FEMA, PMLA, SARFAESI",
    ]
  },
  {
    id: "dt", name: "Direct Tax", code: "Paper 3A", color: "#E8A838", emoji: "💰",
    topics: [
      "Basic Concepts & Residential Status",
      "Income from Salary",
      "Income from House Property",
      "Profits & Gains from Business / Profession",
      "Capital Gains",
      "Income from Other Sources",
      "Clubbing of Income",
      "Set-off & Carry Forward of Losses",
      "Deductions from GTI (80C–80U)",
      "Assessment of Various Entities",
      "Computation of Tax Liability",
      "Advance Tax, TDS & TCS",
      "Filing of Returns & Assessment Procedure",
    ]
  },
  {
    id: "gst", name: "GST", code: "Paper 3B", color: "#27AE60", emoji: "🧾",
    topics: [
      "Introduction & Constitutional Framework",
      "Concept & Classification of Supply",
      "Charge of GST (CGST / SGST / IGST)",
      "Composition Levy",
      "Exemptions from GST",
      "Place of Supply — Goods",
      "Place of Supply — Services",
      "Time of Supply",
      "Value of Supply",
      "Input Tax Credit (ITC)",
      "Registration under GST",
      "Tax Invoice, Credit & Debit Notes",
      "Returns under GST",
      "Payment of Tax",
      "Refund under GST",
    ]
  },
  {
    id: "costing", name: "Costing", code: "Paper 4", color: "#9B59B6", emoji: "🔢",
    topics: [
      "Introduction to Cost Accounting",
      "Material Cost",
      "Employee (Labour) Cost",
      "Overheads",
      "Activity Based Costing (ABC)",
      "Cost Sheet & Production Account",
      "Job Costing & Batch Costing",
      "Contract Costing",
      "Process & Operation Costing",
      "Joint Products & By-products",
      "Service / Operating Costing",
      "Standard Costing & Variance Analysis",
      "Marginal Costing",
      "Budgetary Control",
      "Integrated & Non-Integrated Accounts",
    ]
  },
  {
    id: "audit", name: "Auditing & Ethics", code: "Paper 5", color: "#E74C3C", emoji: "🔍",
    topics: [
      "Nature, Objective & Scope of Audit",
      "Audit Strategy, Planning & Documentation",
      "Materiality, Risk & Internal Control",
      "Audit Evidence & Procedures",
      "Audit Sampling",
      "Audit of Items of Financial Statements",
      "The Company Audit",
      "Audit Report",
      "Special Features — IT Environment Audit",
      "Standards on Auditing (SAs) — Overview",
      "Professional Ethics & ICAI Code",
    ]
  },
  {
    id: "fm", name: "Financial Management", code: "Paper 6A", color: "#16A085", emoji: "📈",
    topics: [
      "Scope & Objectives of Financial Management",
      "Sources & Types of Finance",
      "Cost of Capital",
      "Capital Structure Theories",
      "Leverages (Operating / Financial / Combined)",
      "Dividend Policy",
      "Capital Budgeting — Methods & Techniques",
      "Risk Analysis in Capital Budgeting",
      "Working Capital Management",
      "Cash & Liquidity Management",
      "Receivables Management",
      "Inventory Management",
    ]
  },
  {
    id: "sm", name: "Strategic Management", code: "Paper 6B", color: "#A08060", emoji: "♟️",
    topics: [
      "Business Environment",
      "Business Policy & Strategic Intent",
      "Strategic Analysis (SWOT, PESTLE, Porter's 5 Forces)",
      "Strategic Planning",
      "Formulation of Functional Strategies",
      "Strategy Implementation & Evaluation",
      "Reaching Strategic Edge (BCG, Ansoff, etc.)",
    ]
  },
];

const PHASES = [
  { label: "Learning Phase",   period: "Jun – Jul 2026",  color: "#4A90E2", emoji: "📚", desc: "Complete all pending lectures & build solid concepts", start: new Date("2026-06-01"), end: new Date("2026-07-31") },
  { label: "Practice Phase",   period: "Aug – Sep 2026",  color: "#E67E22", emoji: "✏️",  desc: "ICAI module questions, past papers & problem solving", start: new Date("2026-08-01"), end: new Date("2026-09-30") },
  { label: "Revision Round 1", period: "October 2026",    color: "#27AE60", emoji: "🔄", desc: "Full revision — 1 subject every 4 days, all 8 papers", start: new Date("2026-10-01"), end: new Date("2026-10-31") },
  { label: "Mock Tests",       period: "November 2026",   color: "#9B59B6", emoji: "📝", desc: "2 full-length papers per week under exam conditions", start: new Date("2026-11-01"), end: new Date("2026-11-30") },
  { label: "Final Sprint",     period: "Dec – Jan 2027",  color: "#E74C3C", emoji: "🎯", desc: "Selective revision of weak areas, formulae & calm mind", start: new Date("2026-12-01"), end: new Date("2027-01-04") },
];

const MONTHLY_PLAN = [
  { month: "June 2026", color: "#4A90E2", tasks: [
    "Finish all pending lectures across all 8 papers",
    "Start Audit & SM theory reading (low-effort, high-return)",
    "Revise DT Salary + House Property + Capital Gains",
    "Create a concise 1-page summary per chapter you complete",
  ]},
  { month: "July 2026", color: "#4A90E2", tasks: [
    "Complete 100% lecture viewing — no backlogs from here",
    "Begin ICAI Study Material exercises for Costing & FM",
    "Do GST from scratch if any gaps remain",
    "Start collecting important AS summaries",
  ]},
  { month: "August 2026", color: "#E67E22", tasks: [
    "50+ questions per day (mix all 8 subjects)",
    "Complete ICAI Practice Manual for DT & Costing fully",
    "3 chapter-wise tests per week — self-evaluate strictly",
    "Heavy focus on Adv. Accounts practical sums",
  ]},
  { month: "September 2026", color: "#E67E22", tasks: [
    "Solve last 5 years' ICAI papers chapter-wise",
    "Complete all MTPs and RTPs released by ICAI",
    "Identify & fill all weak areas identified in practice",
    "Read every section of Companies Act at least once",
  ]},
  { month: "October 2026", color: "#27AE60", tasks: [
    "Revision Round 1: cover all 8 papers systematically",
    "Create master formula sheets & mini revision notes",
    "Revise all Accounting Standards & all SAs",
    "Attempt RTPs released by ICAI for Jan 2027 attempt",
  ]},
  { month: "November 2026", color: "#9B59B6", tasks: [
    "2 full-length mock papers every week (timed)",
    "Analyze every mistake — revise those topics immediately",
    "Focus on answer writing style & presentation",
    "Revise Law sections & memorize key definitions",
  ]},
  { month: "December 2026", color: "#E74C3C", tasks: [
    "Final revision of all formula sheets & crisp notes",
    "Solve most frequently asked exam questions only",
    "One rapid full read of SM & Ethics",
    "Rest well — you've done the work. Trust the process.",
  ]},
];

/* ──────────────────────── Helpers ──────────────────────── */

function getCountdown() {
  const diff = EXAM_DATE - new Date();
  if (diff <= 0) return { days: 0, weeks: 0, months: 0 };
  const days = Math.floor(diff / 86400000);
  return { days, weeks: Math.floor(days / 7), months: Math.floor(days / 30.5) };
}

function hexToRgb(hex) {
  const m = (hex || "#888").replace("#", "").match(/../g);
  if (!m) return "128,128,128";
  return m.map(h => parseInt(h, 16)).join(",");
}

function makeInitialData() {
  const subjects = {};
  SUBJECTS.forEach(s => {
    const topicData = {};
    s.topics.forEach(t => { topicData[t] = { done: false, revised: 0 }; });
    subjects[s.id] = { lecturesTotal: 0, lecturesCompleted: 0, topicData };
  });
  return { subjects };
}

function mergeData(stored) {
  const base = makeInitialData();
  if (!stored || !stored.subjects) return base;
  const merged = { ...base, ...stored };
  SUBJECTS.forEach(s => {
    if (!merged.subjects[s.id]) {
      merged.subjects[s.id] = base.subjects[s.id];
    } else {
      s.topics.forEach(t => {
        if (!merged.subjects[s.id].topicData[t]) {
          merged.subjects[s.id].topicData[t] = { done: false, revised: 0 };
        }
      });
    }
  });
  return merged;
}

function getCurrentPhaseIdx() {
  const now = new Date();
  for (let i = PHASES.length - 1; i >= 0; i--) {
    if (now >= PHASES[i].start) return i;
  }
  return 0;
}

/* ──────────────────────── Sub-components ──────────────────────── */

function Ring({ pct, color, size = 60 }) {
  const r = 23, cx = 30, cy = 30, circ = 2 * Math.PI * r;
  const arc = Math.min(Math.max(pct, 0) / 100, 1) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4.5" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="4.5"
        strokeDasharray={`${arc} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: "stroke-dasharray .6s ease" }} />
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize="10.5" fontWeight="700" fontFamily="inherit">
        {Math.round(pct)}%
      </text>
    </svg>
  );
}

/* ──────────────────────── Main App ──────────────────────── */

export default function CATracker() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("overview");
  const [activeSub, setActiveSub] = useState("adv_acc");
  const [cd, setCd] = useState(getCountdown());
  const [saving, setSaving] = useState(false);

  /* Load */
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("ca-inter-v2");
        setData(r ? mergeData(JSON.parse(r.value)) : makeInitialData());
      } catch { setData(makeInitialData()); }
    })();
  }, []);

  /* Save (debounced) */
  useEffect(() => {
    if (!data) return;
    setSaving(true);
    const t = setTimeout(async () => {
      try { await window.storage.set("ca-inter-v2", JSON.stringify(data)); }
      catch { }
      setSaving(false);
    }, 700);
    return () => clearTimeout(t);
  }, [data]);

  /* Countdown */
  useEffect(() => {
    const i = setInterval(() => setCd(getCountdown()), 30000);
    return () => clearInterval(i);
  }, []);

  if (!data) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080814", color: "#D4AF37", fontFamily: "system-ui", fontSize: 18, gap: 12 }}>
      <span style={{ fontSize: 28 }}>⚡</span> Loading your tracker…
    </div>
  );

  /* ── Computed ── */
  const subProg = id => {
    const sd = data.subjects[id];
    if (!sd) return { done: 0, total: 0, topicPct: 0, lecPct: 0, totalRevisions: 0 };
    const tvs = Object.values(sd.topicData || {});
    const done = tvs.filter(t => t.done).length;
    const topicPct = tvs.length ? (done / tvs.length) * 100 : 0;
    const lecPct = sd.lecturesTotal > 0 ? Math.min((sd.lecturesCompleted / sd.lecturesTotal) * 100, 100) : 0;
    const totalRevisions = tvs.reduce((a, t) => a + (t.revised || 0), 0);
    return { done, total: tvs.length, topicPct, lecPct, totalRevisions };
  };

  const allProg = () => {
    let tot = 0, dn = 0;
    SUBJECTS.forEach(s => { const p = subProg(s.id); tot += p.total; dn += p.done; });
    return tot ? (dn / tot) * 100 : 0;
  };

  const totalRevisions = () => SUBJECTS.reduce((a, s) => a + subProg(s.id).totalRevisions, 0);

  /* ── Mutations ── */
  const setTopicDone = (sid, topic, val) =>
    setData(p => ({ ...p, subjects: { ...p.subjects, [sid]: { ...p.subjects[sid], topicData: { ...p.subjects[sid].topicData, [topic]: { ...p.subjects[sid].topicData[topic], done: val } } } } }));

  const addRevision = (sid, topic) =>
    setData(p => ({ ...p, subjects: { ...p.subjects, [sid]: { ...p.subjects[sid], topicData: { ...p.subjects[sid].topicData, [topic]: { ...p.subjects[sid].topicData[topic], revised: (p.subjects[sid].topicData[topic]?.revised || 0) + 1 } } } } }));

  const setLec = (sid, field, val) =>
    setData(p => ({ ...p, subjects: { ...p.subjects, [sid]: { ...p.subjects[sid], [field]: Math.max(0, parseInt(val) || 0) } } }));

  const asInfo = SUBJECTS.find(s => s.id === activeSub) || SUBJECTS[0];
  const asStore = data.subjects[activeSub] || { lecturesTotal: 0, lecturesCompleted: 0, topicData: {} };
  const asProg = subProg(activeSub);
  const curPhaseIdx = getCurrentPhaseIdx();

  /* ── Colors ── */
  const BG = "#080814";
  const CARD = "#10102A";
  const CARD2 = "#0D0D22";
  const BORDER = "#1E1E40";
  const GOLD = "#D4AF37";
  const TEXT = "#E8E8F5";
  const MUTED = "#60607A";
  const TAB_BG = "#0B0B1E";

  return (
    <div style={{ fontFamily: "'Outfit', system-ui, sans-serif", background: BG, minHeight: "100vh", color: TEXT, fontSize: 14, lineHeight: 1.5 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0B0B1E; }
        ::-webkit-scrollbar-thumb { background: #2A2A55; border-radius: 2px; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }
        .subcard:hover { background: #14143A !important; transform: translateY(-1px); }
        .pill:hover { opacity: 0.85; }
        .topicrow:hover { filter: brightness(1.1); }
      `}</style>

      {/* ── Header ── */}
      <div style={{ background: "#0B0B22", borderBottom: `1px solid ${BORDER}`, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: GOLD, letterSpacing: "0.05em" }}>CA INTER TRACKER</div>
            <div style={{ fontSize: 10, color: MUTED, letterSpacing: "0.07em", textTransform: "uppercase" }}>January 2027 · Both Groups · Target 600/600</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: GOLD, lineHeight: 1 }}>{cd.days}</div>
            <div style={{ fontSize: 10, color: MUTED, textTransform: "uppercase", letterSpacing: "0.06em" }}>Days Left</div>
          </div>
          <div style={{ fontSize: 11, color: saving ? MUTED : "#27AE60", minWidth: 52, transition: "color 0.3s" }}>
            {saving ? "Saving…" : "✓ Saved"}
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ background: TAB_BG, display: "flex", borderBottom: `1px solid ${BORDER}`, overflowX: "auto" }}>
        {[["overview", "📊", "Overview"], ["topics", "📚", "Topics & Lectures"], ["planner", "🗓️", "Study Planner"]].map(([id, em, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            background: "none", outline: "none", cursor: "pointer",
            border: "none", borderBottom: tab === id ? `2px solid ${GOLD}` : "2px solid transparent",
            padding: "10px 18px", color: tab === id ? GOLD : MUTED, fontWeight: tab === id ? 700 : 400,
            fontSize: 13, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
            whiteSpace: "nowrap", transition: "color 0.2s"
          }}>
            <span>{em}</span><span>{label}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 24px", maxWidth: 960, margin: "0 auto" }}>

        {/* ════════════ OVERVIEW ════════════ */}
        {tab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Countdown hero */}
            <div style={{ background: "linear-gradient(135deg, #101038 0%, #181850 100%)", border: `1px solid #2A2A60`, borderRadius: 16, padding: "22px 26px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: MUTED, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 8 }}>🎯 Time Until CA Inter Exam</div>
                  <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                    {[["Days", cd.days], ["Weeks", cd.weeks], ["Months", cd.months]].map(([l, v]) => (
                      <div key={l} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 42, fontWeight: 800, color: GOLD, lineHeight: 1 }}>{v}</div>
                        <div style={{ fontSize: 11, color: MUTED, textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 2 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: MUTED, marginBottom: 6 }}>Overall Topic Progress</div>
                  <div style={{ fontSize: 44, fontWeight: 800, color: allProg() >= 50 ? GOLD : "#4A90E2", lineHeight: 1 }}>{Math.round(allProg())}%</div>
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 999, height: 6, width: 160, marginTop: 10, overflow: "hidden" }}>
                    <div style={{ width: `${allProg()}%`, height: "100%", background: `linear-gradient(90deg, #C9A227, #F0D060)`, borderRadius: 999, transition: "width 0.7s ease" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                ["📚", "Topics Done", `${SUBJECTS.reduce((a, s) => a + subProg(s.id).done, 0)} / ${SUBJECTS.reduce((a, s) => a + subProg(s.id).total, 0)}`, GOLD],
                ["🔄", "Total Revisions", totalRevisions(), "#27AE60"],
                ["📅", "Days Remaining", cd.days, "#4A90E2"],
                ["📖", "Current Phase", PHASES[curPhaseIdx].label, PHASES[curPhaseIdx].color],
              ].map(([em, label, val, color]) => (
                <div key={label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px", flex: "1 1 140px" }}>
                  <div style={{ fontSize: 18 }}>{em}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color, marginTop: 4, lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 3 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Subject cards */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 12 }}>All 8 Papers — Click any to track topics ↓</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                {SUBJECTS.map(s => {
                  const p = subProg(s.id);
                  const sd = data.subjects[s.id];
                  return (
                    <div key={s.id} className="subcard" onClick={() => { setActiveSub(s.id); setTab("topics"); }}
                      style={{ background: CARD, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${s.color}`, borderRadius: 10, padding: "13px 14px", cursor: "pointer", transition: "all 0.2s", display: "flex", gap: 11, alignItems: "center" }}>
                      <Ring pct={p.topicPct} color={s.color} size={52} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, color: s.color, fontWeight: 700, letterSpacing: "0.05em" }}>{s.code}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: MUTED, marginTop: 4 }}>
                          {p.done}/{p.total} topics
                          {sd?.lecturesTotal > 0 ? <span style={{ color: "#555" }}> · {sd.lecturesCompleted}/{sd.lecturesTotal} lec</span> : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend for revisions */}
            <div style={{ background: `rgba(${hexToRgb(GOLD)},0.04)`, border: `1px solid rgba(${hexToRgb(GOLD)},0.15)`, borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: GOLD, marginBottom: 10 }}>🏆 Your Mission: 600 / 600</div>
              <div style={{ fontSize: 12, color: "#BBB", lineHeight: 1.7 }}>
                You have <strong style={{ color: GOLD }}>{cd.weeks} weeks</strong> to master 6 subjects across 8 papers. Track every topic, log every lecture, and aim for <strong style={{ color: "#27AE60" }}>3+ revisions</strong> per topic before the exam. Consistent daily effort beats last-minute cramming every time. <strong style={{ color: GOLD }}>You've got this.</strong>
              </div>
            </div>
          </div>
        )}

        {/* ════════════ TOPICS & LECTURES ════════════ */}
        {tab === "topics" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Subject pills */}
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {SUBJECTS.map(s => {
                const active = activeSub === s.id;
                return (
                  <button key={s.id} className="pill" onClick={() => setActiveSub(s.id)} style={{
                    background: active ? s.color : CARD, color: active ? "#000" : MUTED,
                    border: `1px solid ${active ? s.color : BORDER}`, borderRadius: 20,
                    padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
                    fontFamily: "inherit", transition: "all 0.2s"
                  }}>
                    {s.emoji} {s.code.replace("Paper ", "P")}
                  </button>
                );
              })}
            </div>

            {/* Detail panel */}
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden" }}>

              {/* Subject header */}
              <div style={{ background: `linear-gradient(135deg, rgba(${hexToRgb(asInfo.color)},0.14), rgba(${hexToRgb(asInfo.color)},0.04))`, borderBottom: `1px solid ${BORDER}`, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                <Ring pct={asProg.topicPct} color={asInfo.color} size={62} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: asInfo.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{asInfo.code}</div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: TEXT, marginTop: 2 }}>{asInfo.emoji} {asInfo.name}</div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 3 }}>
                    {asProg.done}/{asProg.total} topics completed · {asProg.totalRevisions} revisions logged
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: asInfo.color, lineHeight: 1 }}>{Math.round(asProg.topicPct)}%</div>
                  <div style={{ fontSize: 10, color: MUTED, marginTop: 2 }}>Topic Progress</div>
                </div>
              </div>

              {/* Lecture tracker */}
              <div style={{ padding: "12px 20px", borderBottom: `1px solid ${BORDER}`, background: CARD2, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>🎥 Lecture Tracker</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <label style={{ fontSize: 12, color: MUTED }}>Completed</label>
                  <input type="number" value={asStore.lecturesCompleted || ""}
                    placeholder="0" onChange={e => setLec(activeSub, "lecturesCompleted", e.target.value)}
                    style={{ background: "#080814", border: `1px solid ${BORDER}`, borderRadius: 6, color: TEXT, fontSize: 15, fontWeight: 700, padding: "5px 10px", width: 62, textAlign: "center", fontFamily: "inherit" }} />
                  <span style={{ color: MUTED, fontWeight: 700 }}>/</span>
                  <input type="number" value={asStore.lecturesTotal || ""}
                    placeholder="Total" onChange={e => setLec(activeSub, "lecturesTotal", e.target.value)}
                    style={{ background: "#080814", border: `1px solid ${BORDER}`, borderRadius: 6, color: TEXT, fontSize: 15, fontWeight: 700, padding: "5px 10px", width: 70, textAlign: "center", fontFamily: "inherit" }} />
                  <label style={{ fontSize: 12, color: MUTED }}>total</label>
                </div>
                {asStore.lecturesTotal > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 120 }}>
                    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 999, height: 7, flex: 1, overflow: "hidden" }}>
                      <div style={{ width: `${asProg.lecPct}%`, height: "100%", background: asInfo.color, borderRadius: 999, transition: "width 0.5s" }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: asInfo.color, minWidth: 36 }}>{Math.round(asProg.lecPct)}%</span>
                  </div>
                )}
                <span style={{ fontSize: 11, color: MUTED, marginLeft: "auto" }}>← Enter your lecture count here</span>
              </div>

              {/* Topics list */}
              <div style={{ padding: "16px 20px" }}>
                <div style={{ fontSize: 11, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10 }}>
                  Topics Checklist — {asProg.done} of {asProg.total} done
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {asInfo.topics.map(topic => {
                    const td = asStore.topicData?.[topic] || { done: false, revised: 0 };
                    const revColor = td.revised >= 3 ? GOLD : td.revised >= 2 ? "#E67E22" : td.revised >= 1 ? "#4A90E2" : BORDER;
                    const revTextColor = td.revised >= 3 ? "#000" : td.revised >= 1 ? "#FFF" : MUTED;
                    return (
                      <div key={topic} className="topicrow"
                        style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: td.done ? `rgba(${hexToRgb(asInfo.color)},0.07)` : "#0A0A20", borderRadius: 8, border: `1px solid ${td.done ? `rgba(${hexToRgb(asInfo.color)},0.22)` : "#181835"}`, transition: "all 0.2s", cursor: "default" }}>
                        <input type="checkbox" checked={!!td.done} onChange={e => setTopicDone(activeSub, topic, e.target.checked)}
                          style={{ width: 16, height: 16, cursor: "pointer", accentColor: asInfo.color, flexShrink: 0 }} />
                        <div style={{ flex: 1, fontSize: 13, color: td.done ? `rgba(${hexToRgb(asInfo.color)},0.85)` : "#D0D0E8", textDecoration: td.done ? "line-through" : "none", opacity: td.done ? 0.72 : 1, transition: "all 0.25s" }}>
                          {topic}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                          <span style={{ fontSize: 10, color: MUTED }}>Rev</span>
                          <span style={{ background: revColor, color: revTextColor, fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 10, minWidth: 22, textAlign: "center", transition: "all 0.2s" }}>
                            {td.revised || 0}
                          </span>
                          <button onClick={() => addRevision(activeSub, topic)}
                            style={{ background: "#181838", border: `1px solid ${BORDER}`, color: MUTED, cursor: "pointer", borderRadius: 5, padding: "2px 7px", fontSize: 11, fontFamily: "inherit", transition: "background 0.15s" }}>+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Revision legend */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", padding: "0 2px" }}>
              <span style={{ fontSize: 12, color: MUTED, fontWeight: 600 }}>Revision key:</span>
              {[["0", "Not revised", BORDER, MUTED], ["1", "Revised once", "#4A90E2", "#FFF"], ["2", "Twice", "#E67E22", "#FFF"], ["3+", "🔥 Mastered", GOLD, "#000"]].map(([n, l, bg, fg]) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ background: bg, color: fg, fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 8 }}>{n}</span>
                  <span style={{ fontSize: 11, color: MUTED }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════ PLANNER ════════════ */}
        {tab === "planner" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Banner */}
            <div style={{ background: "linear-gradient(135deg, #101038, #181855)", border: `1px solid #2A2A60`, borderRadius: 14, padding: "18px 22px" }}>
              <div style={{ fontSize: 11, color: MUTED, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 6 }}>🗓️ 7-Month Battle Plan — Jun 2026 → Jan 2027</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: TEXT }}>Your Road to 600/600</div>
              <div style={{ fontSize: 13, color: "#AAA", marginTop: 4 }}>
                You have <strong style={{ color: GOLD }}>{cd.days} days</strong> ({cd.weeks} weeks) remaining. You are currently in the <strong style={{ color: PHASES[curPhaseIdx].color }}>{PHASES[curPhaseIdx].label}</strong>. Stay focused!
              </div>
            </div>

            {/* Phase timeline */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 12 }}>📌 Study Phases</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PHASES.map((ph, i) => {
                  const isCurrent = i === curPhaseIdx;
                  const isPast = i < curPhaseIdx;
                  return (
                    <div key={i} style={{
                      background: isCurrent ? `rgba(${hexToRgb(ph.color)},0.1)` : CARD,
                      border: `1px solid ${isCurrent ? ph.color : BORDER}`,
                      borderLeft: `4px solid ${isCurrent ? ph.color : isPast ? "#27AE60" : BORDER}`,
                      borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14
                    }}>
                      <div style={{ fontSize: 24, width: 34, textAlign: "center", flexShrink: 0 }}>{isPast ? "✅" : ph.emoji}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: isCurrent ? ph.color : isPast ? "#27AE60" : TEXT }}>{ph.label}</span>
                          {isCurrent && <span style={{ background: ph.color, color: "#000", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 10 }}>YOU ARE HERE</span>}
                          {isPast && <span style={{ background: "#27AE60", color: "#000", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 10 }}>COMPLETED</span>}
                        </div>
                        <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{ph.period}</div>
                        <div style={{ fontSize: 12, color: isCurrent ? "#CCC" : MUTED, marginTop: 3 }}>{ph.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Monthly plan */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 12 }}>📅 Month-by-Month Action Plan</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {MONTHLY_PLAN.map((m, i) => (
                  <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${m.color}`, borderRadius: 10, padding: "13px 16px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: m.color, marginBottom: 8 }}>{m.month}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {m.tasks.map((task, j) => (
                        <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                          <span style={{ color: m.color, flexShrink: 0, marginTop: 1, fontSize: 12 }}>→</span>
                          <span style={{ fontSize: 12, color: "#C0C0D8" }}>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div style={{ background: `rgba(${hexToRgb(GOLD)},0.05)`, border: `1px solid rgba(${hexToRgb(GOLD)},0.2)`, borderRadius: 12, padding: "18px 22px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: GOLD, marginBottom: 12 }}>💡 Golden Rules for 600/600</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 }}>
                {[
                  ["📖", "ICAI Study Material is the Bible — solve every single question"],
                  ["🔄", "Revise each topic minimum 3 times before the exam"],
                  ["✍️", "Practice presentation — neat, structured, point-format answers"],
                  ["📝", "Attempt all RTP & MTP papers released by ICAI"],
                  ["🔢", "Never skip practical questions in Accounts, Costing & FM"],
                  ["📋", "Theory (Law, Audit, SM): build crisp, memorable short notes"],
                  ["💪", "Daily 8-10 hours study — consistency beats last-minute effort"],
                  ["😴", "Sleep 7-8 hrs — your brain consolidates memory during sleep"],
                  ["❌", "Don't ignore SM — easy 100/100 with systematic reading"],
                  ["🎯", "Identify your weak chapters early & give them extra time"],
                ].map(([em, tip], i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 10px", background: "#0A0A20", borderRadius: 8 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{em}</span>
                    <span style={{ fontSize: 12, color: "#C0C0D8", lineHeight: 1.5 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject-wise daily time suggestion */}
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 12 }}>⏱️ Suggested Daily Time Split (10 hrs/day)</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  ["Advanced Accounts", "2.5 hrs", "#D4AF37", "Practical focus — daily sums"],
                  ["Direct Tax + GST", "2.0 hrs", "#E8A838", "DT 1.2 hrs + GST 0.8 hrs"],
                  ["Costing", "1.5 hrs", "#9B59B6", "Practical problems daily"],
                  ["Corporate Law", "1.5 hrs", "#4A90E2", "Section reading + MCQs"],
                  ["Auditing & Ethics", "1.0 hr", "#E74C3C", "Mostly theory + SAs"],
                  ["FM + SM", "1.5 hrs", "#16A085", "FM numericals + SM theory"],
                ].map(([sub, time, color, note]) => (
                  <div key={sub} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 3, height: 32, background: color, borderRadius: 2, flexShrink: 0 }} />
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: TEXT }}>{sub}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color }}>  {time}</div>
                    <div style={{ fontSize: 11, color: MUTED, minWidth: 180, textAlign: "right" }}>{note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
