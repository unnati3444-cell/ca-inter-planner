import { useState, useEffect, useCallback } from "react";

const SUBJECTS = [
  {id:'idt',     name:'IDT',     fullName:'Taxation (IDT)',         group:1, total:40,  baseCompleted:6,  color:'#10b981', emoji:'📋'},
  {id:'law',     name:'Law',     fullName:'Corp. & Other Law',      group:1, total:35,  baseCompleted:0,  color:'#3b82f6', emoji:'⚖️'},
  {id:'costing', name:'Costing', fullName:'Cost & Mgmt Accounting', group:2, total:102, baseCompleted:17, color:'#f59e0b', emoji:'🔢'},
  {id:'fm',      name:'FM',      fullName:'Financial Management',   group:2, total:60,  baseCompleted:10, color:'#8b5cf6', emoji:'💰'},
  {id:'sm',      name:'SM',      fullName:'Strategic Management',   group:2, total:30,  baseCompleted:0,  color:'#ec4899', emoji:'🧠'},
  {id:'audit',   name:'Audit',   fullName:'Audit & Ethics',         group:2, total:43,  baseCompleted:0,  color:'#06b6d4', emoji:'🔍'},
];

const TOPIC_MAP = {
  idt:['Introduction & Constitutional Framework','Concept & Classification of Supply','Charge of GST (CGST/SGST/IGST)','Composition Levy','Exemptions from GST','Place of Supply — Goods','Place of Supply — Services','Time of Supply','Value of Supply','Input Tax Credit (ITC)','Registration under GST','Tax Invoice, Credit & Debit Notes','Returns under GST','Payment of Tax','Refund under GST'],
  law:['Incorporation & Commencement of Business','Memorandum & Articles of Association','Share Capital & Debentures','Acceptance of Deposits','Charges','Management & Administration','Directors — Appointment, Powers & Duties','Meetings & Resolutions','Accounts & Audit (Companies Act)','Dividends','Compromise, Arrangements & Winding Up','LLP Act, 2008','Other Laws (FEMA, PMLA, SARFAESI)'],
  costing:['Introduction to Cost Accounting','Material Cost','Employee (Labour) Cost','Overheads','Activity Based Costing (ABC)','Cost Sheet & Production Account','Job Costing & Batch Costing','Contract Costing','Process & Operation Costing','Joint Products & By-products','Service / Operating Costing','Standard Costing & Variance Analysis','Marginal Costing','Budgetary Control','Integrated & Non-Integrated Accounts'],
  fm:['Scope & Objectives of FM','Sources & Types of Finance','Cost of Capital','Capital Structure Theories','Leverages (Operating/Financial/Combined)','Dividend Policy','Capital Budgeting — Methods & Techniques','Risk Analysis in Capital Budgeting','Working Capital Management','Cash & Liquidity Management','Receivables Management','Inventory Management'],
  sm:['Business Environment','Business Policy & Strategic Intent',"Strategic Analysis (SWOT, PESTLE, Porter's 5 Forces)",'Strategic Planning','Formulation of Functional Strategies','Strategy Implementation & Evaluation','Reaching Strategic Edge (BCG, Ansoff, etc.)'],
  audit:['Nature, Objective & Scope of Audit','Audit Strategy, Planning & Documentation','Materiality, Risk & Internal Control','Audit Evidence & Procedures','Audit Sampling','Audit of Items of Financial Statements','The Company Audit','Audit Report','Special Features — IT Environment Audit','Standards on Auditing (SAs) — Overview','Professional Ethics & ICAI Code'],
};

const WEEK_RANGES = {1:['2026-06-10','2026-06-17'],2:['2026-06-18','2026-06-24'],3:['2026-06-25','2026-07-01'],4:['2026-07-02','2026-07-08'],5:['2026-07-09','2026-07-15'],6:['2026-07-16','2026-07-22'],7:['2026-07-23','2026-07-29'],8:['2026-07-30','2026-07-31']};
const WEEKLY_PLAN = [
  {week:1,label:'Jun 10–17',target:40,note:'Pre-exam sprint 🔥',isExam:false},
  {week:2,label:'Jun 18–24',target:18,note:'College exams — 2-3/day min',isExam:true},
  {week:3,label:'Jun 25–Jul 1',target:25,note:'Post-exam ramp-up ⬆️',isExam:false},
  {week:4,label:'Jul 2–8',target:42,note:'July acceleration 🚀',isExam:false},
  {week:5,label:'Jul 9–15',target:42,note:'Stay consistent 💪',isExam:false},
  {week:6,label:'Jul 16–22',target:42,note:'Final push!',isExam:false},
  {week:7,label:'Jul 23–29',target:42,note:'Last full week of July',isExam:false},
  {week:8,label:'Jul 30–31',target:26,note:'🏁 Finish all lectures!',isExam:false},
];

const AIR_MS = [
  {id:1,label:'IDT & Law both started',deadline:'Jun 15',g:'lecture'},
  {id:2,label:'IDT fully completed (40/40)',deadline:'Jul 10',g:'lecture'},
  {id:3,label:'Law fully completed (35/35)',deadline:'Jul 15',g:'lecture'},
  {id:4,label:'Costing fully completed (102/102)',deadline:'Jul 25',g:'lecture'},
  {id:5,label:'FM fully completed (60/60)',deadline:'Jul 28',g:'lecture'},
  {id:6,label:'SM & Audit both completed',deadline:'Jul 31',g:'lecture'},
  {id:7,label:'✅ ALL 277 lectures done!',deadline:'Jul 31',g:'lecture'},
  {id:8,label:'ICAI Study Material read (all subjects)',deadline:'Sep 30',g:'revision'},
  {id:9,label:'All RTPs solved',deadline:'Oct 15',g:'revision'},
  {id:10,label:'All MTPs solved',deadline:'Oct 31',g:'revision'},
  {id:11,label:'Question Bank completed',deadline:'Oct 31',g:'revision'},
  {id:12,label:'First revision complete',deadline:'Oct 31',g:'revision'},
  {id:13,label:'Second revision done',deadline:'Nov 30',g:'revision'},
  {id:14,label:'3+ full mock tests done',deadline:'Dec 31',g:'mocks'},
  {id:15,label:'Formula sheets & mistake register reviewed',deadline:'Dec 31',g:'mocks'},
];

const PHASES = [
  {name:'📚 Lecture Phase',range:'Jun 10 – Jul 31, 2026',color:'#3b82f6'},
  {name:'🔄 First Revision',range:'Aug – Oct 2026',color:'#10b981'},
  {name:'📝 Second Revision',range:'November 2026',color:'#f59e0b'},
  {name:'🎯 Mock Tests',range:'December 2026',color:'#ec4899'},
  {name:'✍️ Exam',range:'January 2027',color:'#ef4444'},
];

const MONTHLY_PLAN = [
  {month:'June 2026',color:'#3b82f6',tasks:['Maintain 4-5 lectures/day before college exams','Start IDT & Law — do not postpone theory','Target 65–75 lectures for the month','Solve all class illustrations while watching']},
  {month:'July 2026',color:'#6366f1',tasks:['Main acceleration month — 6 lectures/day','Complete ALL 277 lectures — zero backlog','Begin ICAI SM for Costing & FM','Finish IDT & Law as top priority']},
  {month:'August 2026',color:'#f59e0b',tasks:['Start first revision immediately','ICAI Study Material — solve every question','50+ questions/day mixing all subjects','Heavy focus on Costing & FM practical sums']},
  {month:'September 2026',color:'#f97316',tasks:['Last 5 years ICAI papers chapter-by-chapter','Complete all MTPs & RTPs from ICAI','Identify & fill every weak area found','Read Companies Act sections at least once']},
  {month:'October 2026',color:'#10b981',tasks:['Complete first revision of all 6 subjects','Create master formula sheets & mini notes','Revise all SAs for Audit thoroughly','Attempt RTPs released for Jan 2027']},
  {month:'November 2026',color:'#8b5cf6',tasks:['Second revision — all subjects','2 full-length timed mocks every week','Analyze every mistake immediately','Focus on answer writing: neat & structured']},
  {month:'December 2026',color:'#ef4444',tasks:['Final revision of formula sheets & notes','Solve most frequently asked exam questions','One rapid full read of SM & Ethics','Rest well — you\'ve done the work 💪']},
];

const GOLDEN_RULES = [
  ['📖','ICAI Study Material is the Bible — solve every question in it'],
  ['🔄','Revise each topic minimum 3 times before the exam'],
  ['✍️','Practice presentation — neat, structured, point-format answers'],
  ['📝','Attempt all RTPs & MTPs released by ICAI'],
  ['🔢','Never skip practical questions in Costing & FM'],
  ['📋','Theory (Law, Audit, SM): build crisp, memorable short notes'],
  ['💪','Consistency beats cramming — study every single day without fail'],
  ['😴','Sleep 7–8 hrs — brain consolidates memory during sleep'],
  ['❌','Do not ignore SM — easy marks with systematic reading'],
  ['🎯','Identify weak chapters early & give them double the time'],
];

const TIME_SPLIT = [
  {sub:'Costing',hrs:'1.5 hrs',color:'#f59e0b',note:'Numericals daily'},
  {sub:'IDT (GST)',hrs:'1.0 hr',color:'#10b981',note:'Theory + case questions'},
  {sub:'Corp. & Other Law',hrs:'1.0 hr',color:'#3b82f6',note:'Section reading + MCQs'},
  {sub:'Financial Management',hrs:'1.0 hr',color:'#8b5cf6',note:'FM numericals daily'},
  {sub:'Strategic Management',hrs:'0.5 hr',color:'#ec4899',note:"Very scoring — don't skip"},
  {sub:'Audit & Ethics',hrs:'1.0 hr',color:'#06b6d4',note:'Theory + SAs overview'},
];

// Full CA Inter paper structure for simulator
const SIM_PAPERS = [
  {id:'acc',  name:'Accounts',  paper:'P1',  group:1, max:100, done:true,  color:'#D4AF37'},
  {id:'law2', name:'Law',       paper:'P2',  group:1, max:100, done:false, color:'#3b82f6'},
  {id:'dt2',  name:'DT',        paper:'P3A', group:1, max:60,  done:true,  color:'#E8A838'},
  {id:'idt2', name:'IDT',       paper:'P3B', group:1, max:40,  done:false, color:'#10b981'},
  {id:'cos2', name:'Costing',   paper:'P4',  group:2, max:100, done:false, color:'#f59e0b'},
  {id:'aud2', name:'Audit',     paper:'P5',  group:2, max:100, done:false, color:'#06b6d4'},
  {id:'fm2',  name:'FM',        paper:'P6A', group:2, max:60,  done:false, color:'#8b5cf6'},
  {id:'sm2',  name:'SM',        paper:'P6B', group:2, max:40,  done:false, color:'#ec4899'},
];

const initTopics = () => Object.fromEntries(SUBJECTS.map(s=>[s.id, Object.fromEntries(TOPIC_MAP[s.id].map(t=>[t,{done:false,revised:0}]))]));
const getTodayStr = () => new Date().toISOString().split('T')[0];

function PBar({pct,color,h=7}){
  return <div style={{height:h,background:'#e5e7eb',borderRadius:4,overflow:'hidden',marginTop:4}}>
    <div style={{height:'100%',width:`${Math.min(100,Math.max(0,pct))}%`,background:color,borderRadius:4,transition:'width .5s'}}/>
  </div>;
}

const Cd = {background:'var(--bg-200,#f9fafb)',borderRadius:12,padding:14,marginBottom:12,border:'1px solid var(--border-color,#e5e7eb)'};

export default function CAPlanner(){
  const [tab,setTab]=useState('overview');
  const [completed,setCompleted]=useState(Object.fromEntries(SUBJECTS.map(s=>[s.id,s.baseCompleted])));
  const [dailyLogs,setDailyLogs]=useState([]);
  const [milestones,setMilestones]=useState(Object.fromEntries(AIR_MS.map(m=>[m.id,false])));
  const [topicData,setTopicData]=useState(initTopics());
  const [todayInput,setTodayInput]=useState(Object.fromEntries(SUBJECTS.map(s=>[s.id,''])));
  const [targetDate,setTargetDate]=useState('2026-07-31');
  const [loading,setLoading]=useState(true);
  const [saveMsg,setSaveMsg]=useState('');
  const [jumpTo,setJumpTo]=useState(null);

  useEffect(()=>{
    (async()=>{
      try{
        let r=null;
        try{ r=await window.storage.get('ca_planner_v5'); }catch{}
        if(!r){ try{ r=await window.storage.get('ca_planner_v4'); }catch{} }
        if(r){
          const d=JSON.parse(r.value);
          if(d.completed) setCompleted(d.completed);
          if(d.dailyLogs) setDailyLogs(d.dailyLogs.map((l,i)=>({...l,id:l.id||(Date.now()+i)})));
          if(d.milestones) setMilestones(d.milestones);
          if(d.targetDate) setTargetDate(d.targetDate);
          if(d.topicData){
            const m={};
            SUBJECTS.forEach(s=>{ m[s.id]={}; TOPIC_MAP[s.id].forEach(t=>{ m[s.id][t]=d.topicData[s.id]?.[t]||{done:false,revised:0}; }); });
            setTopicData(m);
          }
        }
      }catch{}
      setLoading(false);
    })();
  },[]);

  const persist=useCallback(async(c,logs,ms,td,tgt)=>{
    try{
      await window.storage.set('ca_planner_v5',JSON.stringify({completed:c,dailyLogs:logs,milestones:ms,topicData:td,targetDate:tgt}));
      setSaveMsg('Saved ✓'); setTimeout(()=>setSaveMsg(''),1500);
    }catch{ setSaveMsg('Save failed'); }
  },[]);

  const logLectures=()=>{
    const entries=SUBJECTS.map(s=>[s.id,parseInt(todayInput[s.id])||0]);
    const total=entries.reduce((a,[,v])=>a+v,0);
    if(!total)return;
    const nc={...completed}; entries.forEach(([id,v])=>{ nc[id]=(nc[id]||0)+v; });
    const nl=[...dailyLogs,{date:getTodayStr(),logs:Object.fromEntries(entries),total,id:Date.now()}];
    setCompleted(nc); setDailyLogs(nl);
    setTodayInput(Object.fromEntries(SUBJECTS.map(s=>[s.id,''])));
    persist(nc,nl,milestones,topicData,targetDate);
  };

  const deleteLog=(lid)=>{
    const lg=dailyLogs.find(l=>l.id===lid); if(!lg)return;
    const nc={...completed}; SUBJECTS.forEach(s=>{ nc[s.id]=Math.max(s.baseCompleted,(nc[s.id]||0)-(lg.logs[s.id]||0)); });
    const nl=dailyLogs.filter(l=>l.id!==lid); setCompleted(nc); setDailyLogs(nl);
    persist(nc,nl,milestones,topicData,targetDate);
  };

  const editCompleted=(sid,val)=>{
    const s=SUBJECTS.find(x=>x.id===sid);
    const v=Math.min(s.total,Math.max(s.baseCompleted,parseInt(val)||s.baseCompleted));
    const nc={...completed,[sid]:v}; setCompleted(nc);
    persist(nc,dailyLogs,milestones,topicData,targetDate);
  };

  const toggleTopic=(sid,topic)=>{
    const nt={...topicData,[sid]:{...topicData[sid],[topic]:{...topicData[sid][topic],done:!topicData[sid][topic].done}}};
    setTopicData(nt); persist(completed,dailyLogs,milestones,nt,targetDate);
  };
  const changeRev=(sid,topic,delta)=>{
    const curr=topicData[sid][topic].revised||0;
    const nt={...topicData,[sid]:{...topicData[sid],[topic]:{...topicData[sid][topic],revised:Math.max(0,curr+delta)}}};
    setTopicData(nt); persist(completed,dailyLogs,milestones,nt,targetDate);
  };
  const resetSubject=(sid)=>{
    if(!confirm(`Reset ALL topics & revisions for ${SUBJECTS.find(s=>s.id===sid).fullName}?`))return;
    const nt={...topicData,[sid]:Object.fromEntries(TOPIC_MAP[sid].map(t=>[t,{done:false,revised:0}]))};
    setTopicData(nt); persist(completed,dailyLogs,milestones,nt,targetDate);
  };
  const resetAllData=()=>{
    if(!confirm('Reset ALL planner data? This cannot be undone.'))return;
    const c=Object.fromEntries(SUBJECTS.map(s=>[s.id,s.baseCompleted]));
    const ms=Object.fromEntries(AIR_MS.map(m=>[m.id,false]));
    const td=initTopics();
    setCompleted(c); setDailyLogs([]); setMilestones(ms); setTopicData(td); setTargetDate('2026-07-31');
    persist(c,[],ms,td,'2026-07-31');
  };
  const toggleMs=(id)=>{
    const ms={...milestones,[id]:!milestones[id]}; setMilestones(ms);
    persist(completed,dailyLogs,ms,topicData,targetDate);
  };
  const updateTargetDate=(d)=>{ setTargetDate(d); persist(completed,dailyLogs,milestones,topicData,d); };

  // Derived
  const totalDone=SUBJECTS.reduce((a,s)=>a+(completed[s.id]||0),0);
  const totalTotal=SUBJECTS.reduce((a,s)=>a+s.total,0);
  const now=new Date();
  const daysToTarget=Math.max(0,Math.ceil((new Date(targetDate+'T00:00:00')-now)/86400000));
  const daysToExam=Math.ceil((new Date('2027-01-13')-now)/86400000);
  const paceNeeded=daysToTarget>0?((totalTotal-totalDone)/daysToTarget).toFixed(1):'0';
  const last7avg=(()=>{ const d=new Date(),ds=[]; for(let i=6;i>=0;i--){const x=new Date(d);x.setDate(d.getDate()-i);ds.push(x.toISOString().split('T')[0]);} return(dailyLogs.filter(l=>ds.includes(l.date)).reduce((a,l)=>a+l.total,0)/7).toFixed(1); })();
  const todayLogged=dailyLogs.filter(l=>l.date===getTodayStr()).reduce((a,l)=>a+l.total,0);
  const totalRevisions=SUBJECTS.reduce((a,s)=>a+Object.values(topicData[s.id]||{}).reduce((b,t)=>b+(t.revised||0),0),0);
  const totalTopicsDone=SUBJECTS.reduce((a,s)=>a+Object.values(topicData[s.id]||{}).filter(t=>t.done).length,0);
  const phaseIdx=(()=>{ const t=now.getTime(); if(t<new Date('2026-08-01').getTime())return 0; if(t<new Date('2026-11-01').getTime())return 1; if(t<new Date('2026-12-01').getTime())return 2; if(t<new Date('2027-01-01').getTime())return 3; return 4; })();
  const weeklyData=WEEKLY_PLAN.map(w=>{ const[s,e]=WEEK_RANGES[w.week]; const actual=dailyLogs.filter(l=>l.date>=s&&l.date<=e).reduce((a,l)=>a+l.total,0); return{...w,actual,isCurrent:now>=new Date(s)&&now<=new Date(e+'T23:59:59'),isPast:now>new Date(e+'T23:59:59')}; });

  if(loading)return<div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'Inter,sans-serif',fontSize:16}}>Loading... 📚</div>;

  return(
   <div
  style={{
    fontFamily:"'Inter',-apple-system,sans-serif",
    width:'100%',
    minHeight:'100vh',
    background:'var(--background-color)',
    color:'var(--text-color)',
    paddingBottom:72
  }}
>
      <div style={{background:'linear-gradient(135deg,#1e3a8a,#5b21b6)',padding:'18px 16px 20px',color:'#fff'}}>
        <div style={{fontSize:11,opacity:.7,letterSpacing:2,textTransform:'uppercase',marginBottom:2}}>CA Inter Jan 2027 • Both Groups</div>
        <div style={{fontSize:22,fontWeight:800}}>AIR Planner 🎯</div>
        <div style={{display:'flex',gap:8,marginTop:14}}>
          {[{l:'Days to target',v:daysToTarget,c:'#fbbf24'},{l:'Lecs Remaining',v:totalTotal-totalDone,c:'#34d399'},{l:'Need / Day',v:paceNeeded,c:'#a78bfa'}].map(x=>(
            <div key={x.l} style={{flex:1,background:'rgba(255,255,255,.13)',borderRadius:10,padding:'10px 6px',textAlign:'center'}}>
              <div style={{fontSize:20,fontWeight:800,color:x.c}}>{x.v}</div>
              <div style={{fontSize:10,opacity:.8,marginTop:2}}>{x.l}</div>
            </div>
          ))}
        </div>
        {saveMsg&&<div style={{fontSize:11,marginTop:8,textAlign:'right',opacity:.85}}>{saveMsg}</div>}
      </div>

      <div style={{padding:'14px 14px 0'}}>
        {tab==='overview'&&<Overview completed={completed} totalDone={totalDone} totalTotal={totalTotal} phaseIdx={phaseIdx} paceNeeded={paceNeeded} last7avg={last7avg} todayLogged={todayLogged} totalRevisions={totalRevisions} totalTopicsDone={totalTopicsDone} milestones={milestones} toggleMs={toggleMs} goToSubject={(sid)=>{setJumpTo(sid);setTab('topics');}} daysToExam={daysToExam} topicData={topicData}/>}
        {tab==='daily'&&<DailyLog todayInput={todayInput} setTodayInput={setTodayInput} logLectures={logLectures} dailyLogs={dailyLogs} completed={completed} todayLogged={todayLogged} deleteLog={deleteLog}/>}
        {tab==='topics'&&<TopicsTab topicData={topicData} completed={completed} toggleTopic={toggleTopic} changeRev={changeRev} editCompleted={editCompleted} resetSubject={resetSubject} jumpTo={jumpTo} clearJump={()=>setJumpTo(null)}/>}
        {tab==='planner'&&<PlannerTab weeklyData={weeklyData}/>}
        {tab==='insights'&&<InsightsTab dailyLogs={dailyLogs} completed={completed} topicData={topicData} totalRevisions={totalRevisions} targetDate={targetDate} updateTargetDate={updateTargetDate} resetAllData={resetAllData} daysToExam={daysToExam}/>}
      </div>

      <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:500,background:'var(--background-color)',borderTop:'1px solid var(--border-color,#e5e7eb)',display:'flex',zIndex:100}}>
        {[{id:'overview',icon:'📊',label:'Overview'},{id:'daily',icon:'✍️',label:'Daily'},{id:'topics',icon:'📚',label:'Topics'},{id:'planner',icon:'📅',label:'Planner'},{id:'insights',icon:'📈',label:'Insights'}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:'9px 2px 7px',border:'none',background:'transparent',color:tab===t.id?'#3b82f6':'var(--text-color)',cursor:'pointer',fontSize:9.5,fontWeight:tab===t.id?700:400,opacity:tab===t.id?1:.55}}>
            <div style={{fontSize:18,marginBottom:1}}>{t.icon}</div>{t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── OVERVIEW ───────────────────────────────
function Overview({completed,totalDone,totalTotal,phaseIdx,paceNeeded,last7avg,todayLogged,totalRevisions,totalTopicsDone,milestones,toggleMs,goToSubject,daysToExam,topicData}){
  const pct=Math.round((totalDone/totalTotal)*100);
  const behind=parseFloat(paceNeeded)>parseFloat(last7avg);
  const msDone=AIR_MS.filter(m=>milestones[m.id]).length;
  return(
    <div>
      <div style={Cd}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontWeight:700,fontSize:15}}>Overall Lecture Progress</span>
          <span style={{fontWeight:800,fontSize:18,color:'#3b82f6'}}>{pct}%</span>
        </div>
        <PBar pct={pct} color="linear-gradient(90deg,#3b82f6,#8b5cf6)" h={10}/>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginTop:6,opacity:.6}}><span>{totalDone} done</span><span>{totalTotal-totalDone} remaining</span></div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:12}}>
        {[{l:'Today',v:todayLogged,c:'#3b82f6'},{l:'7-day avg',v:last7avg,c:'#10b981'},{l:'Need/day',v:paceNeeded,c:behind?'#ef4444':'#10b981'},{l:'Revisions',v:totalRevisions,c:'#f59e0b'},{l:'Topics Done',v:totalTopicsDone,c:'#ec4899'},{l:'AIR Track',v:`${msDone}/15`,c:'#d97706'}].map(x=>(
          <div key={x.l} style={{...Cd,marginBottom:0,textAlign:'center',padding:'10px 6px'}}>
            <div style={{fontSize:22,fontWeight:800,color:x.c}}>{x.v}</div>
            <div style={{fontSize:10,opacity:.6,marginTop:2}}>{x.l}</div>
          </div>
        ))}
      </div>

      {behind&&<div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:8,padding:'8px 12px',fontSize:12,color:'#b91c1c',marginBottom:12,fontWeight:600}}>⚠️ Below target pace — push to {paceNeeded} lectures/day to finish by target date.</div>}

      {/* Clickable subject cards */}
      <div style={Cd}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>📚 Subject Cards — tap to track topics</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {SUBJECTS.map(s=>{
            const done=completed[s.id]||0;
            const lecPct=Math.round((done/s.total)*100);
            const topicsDone=Object.values(topicData[s.id]||{}).filter(t=>t.done).length;
            const topicsTotal=TOPIC_MAP[s.id].length;
            return(
              <div key={s.id} onClick={()=>goToSubject(s.id)} style={{background:'var(--background-color)',borderRadius:10,padding:'10px 12px',border:`1px solid var(--border-color,#e5e7eb)`,borderLeft:`3px solid ${s.color}`,cursor:'pointer',transition:'all .15s'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontSize:12,fontWeight:700,color:s.color}}>{s.emoji} {s.name}</span>
                  <span style={{fontSize:14,fontWeight:800,color:s.color}}>{lecPct}%</span>
                </div>
                <div style={{fontSize:10,opacity:.5,marginTop:2}}>{done}/{s.total} lec · {topicsDone}/{topicsTotal} topics</div>
                <PBar pct={lecPct} color={s.color} h={4}/>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase roadmap */}
      <div style={Cd}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>📍 Phase Roadmap</div>
        {PHASES.map((p,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
            <div style={{width:11,height:11,borderRadius:'50%',background:i===phaseIdx?p.color:i<phaseIdx?'#10b981':'#d1d5db',flexShrink:0,boxShadow:i===phaseIdx?`0 0 0 3px ${p.color}30`:'none'}}/>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:i===phaseIdx?700:400,color:i===phaseIdx?p.color:'inherit'}}>{p.name}</div><div style={{fontSize:11,opacity:.5}}>{p.range}</div></div>
            {i===phaseIdx&&<span style={{fontSize:10,background:p.color,color:'#fff',padding:'2px 8px',borderRadius:99,fontWeight:700}}>NOW</span>}
            {i<phaseIdx&&<span style={{color:'#10b981'}}>✓</span>}
          </div>
        ))}
      </div>

      {/* Compact AIR milestones */}
      <div style={Cd}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <span style={{fontWeight:700,fontSize:15}}>🏆 AIR Milestones</span>
          <span style={{fontSize:12,fontWeight:700,color:'#d97706'}}>{msDone}/15</span>
        </div>
        <PBar pct={Math.round((msDone/15)*100)} color="linear-gradient(90deg,#f59e0b,#d97706)" h={5}/>
        <div style={{marginTop:10}}>
          {AIR_MS.slice(0,7).map((m,idx)=>(
            <div key={m.id} onClick={()=>toggleMs(m.id)} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 0',borderBottom:idx<6?'1px solid var(--border-color,#f3f4f6)':'none',cursor:'pointer'}}>
              <div style={{width:18,height:18,borderRadius:5,border:milestones[m.id]?'none':'2px solid #d1d5db',background:milestones[m.id]?'#10b981':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all .2s'}}>
                {milestones[m.id]&&<span style={{color:'#fff',fontSize:11,fontWeight:800}}>✓</span>}
              </div>
              <span style={{flex:1,fontSize:12,textDecoration:milestones[m.id]?'line-through':'none',opacity:milestones[m.id]?.4:1}}>{m.label}</span>
              <span style={{fontSize:10,color:'#9ca3af',whiteSpace:'nowrap'}}>📅 {m.deadline}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:8,fontSize:11,opacity:.45,textAlign:'center'}}>Full checklist in Planner tab →</div>
      </div>

      {/* Motivational banner */}
      <div style={{...Cd,background:'rgba(212,175,55,.06)',borderColor:'rgba(212,175,55,.28)'}}>
        <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
          <span style={{fontSize:26}}>🏆</span>
          <div>
            <div style={{fontWeight:800,fontSize:15,color:'#d97706'}}>Your Mission: AIR in CA Inter Jan 2027</div>
            <div style={{fontSize:12,opacity:.75,lineHeight:1.7,marginTop:4}}>
              You have <strong style={{color:'#d97706'}}>{daysToExam} days</strong> left. Track every topic, log every lecture, aim for <strong style={{color:'#10b981'}}>3+ revisions</strong> per topic. Consistent daily effort beats last-minute cramming — <strong style={{color:'#d97706'}}>every single time. 💪</strong>
            </div>
          </div>
        </div>
      </div>

      <div style={{...Cd,background:'#eff6ff',borderColor:'#bfdbfe'}}>
        <div style={{fontWeight:700,fontSize:14,color:'#1e40af',marginBottom:8}}>📌 Recommended Daily Mix</div>
        {[{s:'🔢 Costing',c:'2 lectures',col:'#f59e0b'},{s:'💰 FM  or  📋 IDT',c:'1 lecture',col:'#8b5cf6'},{s:'🔍 Audit  or  ⚖️ Law',c:'1 lecture',col:'#06b6d4'}].map((m,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:13,padding:'6px 0',borderBottom:i<2?'1px solid #dbeafe':'none'}}>
            <span style={{fontWeight:600,color:m.col}}>{m.s}</span><span style={{opacity:.7}}>{m.c}</span>
          </div>
        ))}
        <div style={{fontSize:11,marginTop:8,color:'#1e40af',opacity:.7,fontStyle:'italic'}}>4/day minimum · 6/day target in July 🚀</div>
      </div>
    </div>
  );
}

// ─── DAILY LOG ──────────────────────────────
function DailyLog({todayInput,setTodayInput,logLectures,dailyLogs,completed,todayLogged,deleteLog}){
  const tStr=getTodayStr();
  const inputTotal=SUBJECTS.reduce((a,s)=>a+(parseInt(todayInput[s.id])||0),0);
  const recent=[...dailyLogs].reverse().slice(0,20);
  const dayLabel=(dt)=>{ if(dt===tStr)return'Today'; const y=new Date();y.setDate(y.getDate()-1); if(dt===y.toISOString().split('T')[0])return'Yesterday'; return new Date(dt).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'}); };
  return(
    <div>
      <div style={Cd}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:3}}>📝 Log Today's Lectures</div>
        <div style={{fontSize:12,opacity:.6,marginBottom:14}}>{new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>
        {['Group 1','Group 2'].map((grp,gi)=>(
          <div key={grp}>
            <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:1,opacity:.45,marginBottom:8,marginTop:gi?4:0}}>{grp}</div>
            {SUBJECTS.filter(s=>s.group===gi+1).map(s=>{
              const done=completed[s.id]||0;
              return(
                <div key={s.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10,padding:'8px 10px',background:'var(--background-color)',borderRadius:8,border:'1px solid var(--border-color,#e5e7eb)'}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:600}}>{s.emoji} {s.name}</div>
                    <div style={{fontSize:11,marginTop:1}}><span style={{color:s.color,fontWeight:700}}>{done}</span><span style={{opacity:.5}}>/{s.total} · {s.total-done} left</span></div>
                  </div>
                  <input type="number" min="0" max="15" value={todayInput[s.id]} onChange={e=>setTodayInput(p=>({...p,[s.id]:e.target.value}))} style={{width:52,padding:'7px 4px',border:'1px solid var(--border-color,#d1d5db)',borderRadius:8,textAlign:'center',background:'var(--bg-200,#f9fafb)',color:'var(--text-color)',fontSize:15,fontWeight:600}} placeholder="0"/>
                </div>
              );
            })}
          </div>
        ))}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12,paddingTop:12,borderTop:'1px solid var(--border-color,#e5e7eb)'}}>
          <div>
            <div style={{fontWeight:700}}>To add: {inputTotal} lecture{inputTotal!==1?'s':''}</div>
            {todayLogged>0&&<div style={{fontSize:12,color:'#10b981',marginTop:2}}>✅ {todayLogged} already logged today</div>}
          </div>
          <button onClick={logLectures} disabled={!inputTotal} style={{background:inputTotal?'#3b82f6':'#9ca3af',color:'#fff',border:'none',borderRadius:8,padding:'10px 18px',fontWeight:700,cursor:inputTotal?'pointer':'not-allowed',fontSize:14}}>Log Lectures</button>
        </div>
      </div>

      {recent.length>0&&(
        <div style={Cd}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>📅 Log History</div>
          <div style={{fontSize:11,opacity:.5,marginBottom:12}}>Tap 🗑️ to delete entry and reverse its lecture count</div>
          {recent.map(log=>{
            const detail=SUBJECTS.filter(s=>(log.logs[s.id]||0)>0).map(s=>`${s.emoji}×${log.logs[s.id]}`).join(' ');
            return(
              <div key={log.id} style={{display:'flex',alignItems:'center',gap:8,padding:'9px 0',borderBottom:'1px solid var(--border-color,#f3f4f6)'}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:log.date===tStr?700:500,color:log.date===tStr?'#3b82f6':'inherit'}}>{dayLabel(log.date)}</div>
                  <div style={{fontSize:11,opacity:.5,marginTop:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{detail||'—'}</div>
                </div>
                <div style={{display:'flex',gap:3,flexShrink:0}}>
                  {[1,2,3,4,5,6,7].map(i=><div key={i} style={{width:6,height:6,borderRadius:2,background:i<=log.total?'#3b82f6':'#e5e7eb'}}/>)}
                </div>
                <span style={{fontWeight:700,fontSize:13,color:log.total>=5?'#10b981':log.total>=3?'#f59e0b':'#ef4444',minWidth:18,textAlign:'center'}}>{log.total}</span>
                <button onClick={()=>deleteLog(log.id)} title="Delete entry" style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:6,padding:'4px 7px',cursor:'pointer',fontSize:13,color:'#ef4444',flexShrink:0}}>🗑️</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── TOPICS TAB ─────────────────────────────
function TopicsTab({topicData,completed,toggleTopic,changeRev,editCompleted,resetSubject,jumpTo,clearJump}){
  const [activeSub,setActiveSub]=useState(jumpTo||'costing');
  const [editMode,setEditMode]=useState(false);
  const [editVal,setEditVal]=useState('');
  useEffect(()=>{ if(jumpTo){setActiveSub(jumpTo);clearJump();} },[jumpTo]);

  const sub=SUBJECTS.find(s=>s.id===activeSub);
  const topics=TOPIC_MAP[activeSub];
  const subTD=topicData[activeSub]||{};
  const doneCnt=Object.values(subTD).filter(t=>t.done).length;
  const totalRev=Object.values(subTD).reduce((a,t)=>a+(t.revised||0),0);
  const lecDone=completed[activeSub]||0;
  const lecPct=Math.round((lecDone/sub.total)*100);
  const revStyle=(n)=>n>=3?{background:'#f59e0b',color:'#000'}:n>=2?{background:'#f97316',color:'#fff'}:n>=1?{background:'#3b82f6',color:'#fff'}:{background:'#e5e7eb',color:'#9ca3af'};

  return(
    <div>
      <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:14}}>
        {SUBJECTS.map(s=><button key={s.id} onClick={()=>{setActiveSub(s.id);setEditMode(false);}} style={{padding:'5px 11px',borderRadius:20,fontSize:12,fontWeight:700,cursor:'pointer',border:`1px solid ${activeSub===s.id?s.color:'var(--border-color,#e5e7eb)'}`,background:activeSub===s.id?s.color:'transparent',color:activeSub===s.id?'#fff':'var(--text-color)',transition:'all .15s'}}>{s.emoji} {s.name}</button>)}
      </div>

      <div style={{...Cd,borderLeft:`3px solid ${sub.color}`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
          <div><div style={{fontWeight:800,fontSize:16}}>{sub.emoji} {sub.fullName}</div><div style={{fontSize:12,opacity:.6,marginTop:3}}>{doneCnt}/{topics.length} topics · {totalRev} total revisions</div></div>
          <div style={{textAlign:'right'}}><div style={{fontSize:20,fontWeight:800,color:sub.color}}>{Math.round((doneCnt/topics.length)*100)}%</div><div style={{fontSize:10,opacity:.5}}>topics</div></div>
        </div>
        <div style={{padding:'8px 10px',background:'var(--background-color)',borderRadius:8,border:'1px solid var(--border-color,#e5e7eb)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
            <span style={{fontSize:12,fontWeight:600}}>🎥 Lectures: <span style={{color:sub.color,fontWeight:800}}>{lecDone}</span>/{sub.total}</span>
            {!editMode
              ?<button onClick={()=>{setEditMode(true);setEditVal(String(lecDone));}} style={{fontSize:11,background:'transparent',border:'1px solid var(--border-color,#e5e7eb)',borderRadius:6,padding:'3px 8px',cursor:'pointer',color:'var(--text-color)'}}>✏️ Edit Count</button>
              :<div style={{display:'flex',gap:5,alignItems:'center'}}>
                <input type="number" value={editVal} onChange={e=>setEditVal(e.target.value)} autoFocus style={{width:58,padding:'3px 6px',border:`1px solid ${sub.color}`,borderRadius:6,textAlign:'center',background:'var(--bg-200,#f9fafb)',color:'var(--text-color)',fontWeight:700,fontSize:14}}/>
                <button onClick={()=>{editCompleted(activeSub,editVal);setEditMode(false);}} style={{fontSize:11,background:sub.color,border:'none',borderRadius:6,padding:'4px 10px',cursor:'pointer',color:'#fff',fontWeight:700}}>Save</button>
                <button onClick={()=>setEditMode(false)} style={{fontSize:11,background:'transparent',border:'1px solid var(--border-color,#e5e7eb)',borderRadius:6,padding:'4px 7px',cursor:'pointer',color:'var(--text-color)'}}>✕</button>
              </div>
            }
          </div>
          <PBar pct={lecPct} color={sub.color} h={5}/>
        </div>
        <button onClick={()=>resetSubject(activeSub)} style={{marginTop:10,width:'100%',padding:'7px',background:'transparent',border:'1px solid #fecaca',borderRadius:8,cursor:'pointer',fontSize:12,color:'#ef4444',fontWeight:600}}>🔄 Reset All Topics & Revisions for {sub.name}</button>
      </div>

      <div style={Cd}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>Topics Checklist</div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:12,padding:'8px 10px',background:'var(--background-color)',borderRadius:8,border:'1px solid var(--border-color,#e5e7eb)'}}>
          <span style={{fontSize:11,opacity:.6,fontWeight:600,alignSelf:'center'}}>Revision:</span>
          {[[0,'None','#e5e7eb','#9ca3af'],[1,'Once','#3b82f6','#fff'],[2,'Twice','#f97316','#fff'],[3,'3+🔥','#f59e0b','#000']].map(([n,lbl,bg,col])=>(
            <span key={n} style={{fontSize:10,fontWeight:800,padding:'2px 8px',borderRadius:10,background:bg,color:col}}>{n}{n===3?'+':''} {lbl}</span>
          ))}
        </div>
        {topics.map((topic,i)=>{
          const td=subTD[topic]||{done:false,revised:0};
          const rev=td.revised||0;
          const rs=revStyle(rev);
          return(
            <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'9px 10px',marginBottom:6,background:td.done?`${sub.color}0f`:'var(--background-color)',borderRadius:8,border:`1px solid ${td.done?sub.color+'25':'var(--border-color,#e5e7eb)'}`}}>
              <input type="checkbox" checked={td.done} onChange={()=>toggleTopic(activeSub,topic)} style={{width:16,height:16,cursor:'pointer',flexShrink:0,accentColor:sub.color}}/>
              <span style={{flex:1,fontSize:13,lineHeight:1.4,textDecoration:td.done?'line-through':'none',opacity:td.done?.55:1}}>{topic}</span>
              <div style={{display:'flex',alignItems:'center',gap:3,flexShrink:0}}>
                <button onClick={()=>changeRev(activeSub,topic,-1)} style={{background:'var(--bg-200,#f3f4f6)',border:'1px solid var(--border-color,#e5e7eb)',borderRadius:5,width:22,height:22,cursor:'pointer',fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',opacity:rev===0?.3:1,color:'var(--text-color)'}}>−</button>
                <span style={{fontSize:10,fontWeight:800,padding:'2px 6px',borderRadius:10,minWidth:22,textAlign:'center',...rs}}>{rev}</span>
                <button onClick={()=>changeRev(activeSub,topic,1)} style={{background:sub.color,border:'none',borderRadius:5,width:22,height:22,cursor:'pointer',fontSize:13,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PLANNER TAB ────────────────────────────
function PlannerTab({weeklyData}){
  const [sec,setSec]=useState('weekly');
  const cumT=weeklyData.reduce((acc,w,i)=>{acc.push((acc[i-1]||0)+w.target);return acc;},[]);
  const now=new Date();
  const groups=[{label:'📚 Lecture Phase Milestones',key:'lecture'},{label:'🔄 Revision Milestones',key:'revision'},{label:'🎯 Mock & Final',key:'mocks'}];

  return(
    <div>
      <div style={{display:'flex',gap:6,marginBottom:14,overflowX:'auto',paddingBottom:2}}>
        {[['weekly','📅 Weekly'],['monthly','🗓️ Monthly'],['air','🏆 AIR Track'],['tips','💡 Rules'],['time','⏱️ Time Split']].map(([id,lbl])=>(
          <button key={id} onClick={()=>setSec(id)} style={{padding:'5px 11px',borderRadius:20,fontSize:12,fontWeight:700,cursor:'pointer',border:'1px solid var(--border-color,#e5e7eb)',background:sec===id?'#3b82f6':'transparent',color:sec===id?'#fff':'var(--text-color)',whiteSpace:'nowrap',flexShrink:0,transition:'all .15s'}}>{lbl}</button>
        ))}
      </div>

      {sec==='weekly'&&(
        <div>
          <div style={{...Cd,background:'#eff6ff',borderColor:'#bfdbfe'}}><div style={{fontWeight:700,fontSize:14,color:'#1e40af'}}>📚 Lecture Phase: Jun 10 – Jul 31</div><div style={{fontSize:12,opacity:.7,marginTop:4}}>277 lectures · 51 days · ~5.4/day avg needed</div></div>
          {weeklyData.map((w,i)=>{
            const pct=w.target>0?Math.round((w.actual/w.target)*100):0;
            const over=w.actual>=w.target;
            return(
              <div key={w.week} style={{...Cd,border:w.isCurrent?'2px solid #3b82f6':'1px solid var(--border-color,#e5e7eb)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <span>{over&&w.isPast?'✅':w.isCurrent?'🔵':w.isPast?'⚠️':'⏳'}</span>
                      <span style={{fontWeight:700,fontSize:14}}>Week {w.week}</span>
                      {w.isCurrent&&<span style={{fontSize:10,background:'#3b82f6',color:'#fff',padding:'1px 7px',borderRadius:99,fontWeight:700}}>NOW</span>}
                    </div>
                    <div style={{fontSize:12,opacity:.6,marginTop:2}}>{w.label}</div>
                    {w.isExam&&<div style={{fontSize:11,color:'#d97706',marginTop:2}}>🏫 College Exams Week</div>}
                  </div>
                  <div style={{textAlign:'right'}}><span style={{fontWeight:800,fontSize:17,color:over?'#10b981':'#3b82f6'}}>{w.actual}</span><span style={{opacity:.4,fontSize:13}}>/{w.target}</span><div style={{fontSize:11,opacity:.5}}>lectures</div></div>
                </div>
                <PBar pct={pct} color={over?'#10b981':w.isCurrent?'#3b82f6':'#9ca3af'} h={6}/>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:11,opacity:.6}}><span style={{fontStyle:'italic'}}>{w.note}</span><span>Cum: {cumT[i]}</span></div>
              </div>
            );
          })}
          <div style={{...Cd,background:'#f0fdf4',borderColor:'#bbf7d0'}}>
            <div style={{fontWeight:700,fontSize:14,color:'#16a34a',marginBottom:10}}>⚡ Post-Lecture Phases</div>
            {[['First Revision + RTP/MTP/QB','Aug–Oct 2026'],['Second Revision','November 2026'],['Full Mock Tests + Final Rev.','December 2026'],['✍️ Exam Execution','January 2027']].map(([p,t],i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:i<3?'1px solid #bbf7d0':'none',fontSize:13}}><span style={{fontWeight:600}}>{p}</span><span style={{opacity:.6,fontSize:12}}>{t}</span></div>
            ))}
          </div>
        </div>
      )}

      {sec==='monthly'&&(
        <div>
          <div style={{...Cd,background:'linear-gradient(135deg,#eff6ff,#f5f3ff)',borderColor:'#bfdbfe'}}>
            <div style={{fontWeight:800,fontSize:16}}>🗓️ Month-by-Month Action Plan</div>
            <div style={{fontSize:12,opacity:.6,marginTop:4}}>Jun 2026 → Jan 2027 · Your 7-Month Battle Plan</div>
          </div>
          {MONTHLY_PLAN.map((m,mi)=>(
            <div key={mi} style={{...Cd,borderLeft:`3px solid ${m.color}`}}>
              <div style={{fontWeight:700,fontSize:14,color:m.color,marginBottom:8}}>{m.month}</div>
              {m.tasks.map((task,ti)=>(
                <div key={ti} style={{display:'flex',gap:8,alignItems:'flex-start',marginBottom:6}}>
                  <span style={{color:m.color,flexShrink:0,fontSize:12,marginTop:1}}>→</span>
                  <span style={{fontSize:13,lineHeight:1.5}}>{task}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {sec==='air'&&(
        <div>
          <div style={{...Cd,background:'linear-gradient(135deg,#fef3c7,#fef9ee)',borderColor:'#fde68a'}}>
            <div style={{fontWeight:800,fontSize:16}}>🏆 Full AIR Milestone Checklist</div>
            <div style={{fontSize:12,opacity:.65,marginTop:4}}>Track all 15 milestones to stay on AIR path</div>
          </div>
          {[{label:'📚 Lecture Phase',key:'lecture'},{label:'🔄 Revision Phase',key:'revision'},{label:'🎯 Mock & Final',key:'mocks'}].map(g=>{
            const items=AIR_MS.filter(m=>m.g===g.key);
            return(
              <div key={g.key} style={Cd}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>{g.label} <span style={{fontSize:11,opacity:.5,fontWeight:400}}>({items.length} milestones)</span></div>
                {items.map((m,idx)=>(
                  <div key={m.id} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 0',borderBottom:idx<items.length-1?'1px solid var(--border-color,#f3f4f6)':'none',fontSize:13}}>
                    <div style={{width:22,height:22,borderRadius:6,border:'2px solid #d1d5db',background:'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <span style={{fontSize:11,opacity:.4}}>○</span>
                    </div>
                    <span style={{flex:1}}>{m.label}</span>
                    <span style={{fontSize:11,color:'#9ca3af',whiteSpace:'nowrap'}}>📅 {m.deadline}</span>
                  </div>
                ))}
              </div>
            );
          })}
          <div style={{...Cd,background:'#eff6ff',borderColor:'#bfdbfe'}}>
            <div style={{fontWeight:700,fontSize:13,color:'#1e40af',marginBottom:6}}>⚡ Mark milestones done in Overview tab →</div>
            <div style={{fontSize:12,opacity:.7}}>Tap any milestone checkbox in the Overview tab's AIR section to mark it complete.</div>
          </div>
        </div>
      )}

      {sec==='tips'&&(
        <div>
          <div style={{...Cd,background:'rgba(212,175,55,.06)',borderColor:'rgba(212,175,55,.3)'}}>
            <div style={{fontWeight:800,fontSize:16,color:'#d97706',marginBottom:12}}>💡 Golden Rules for AIR</div>
            {GOLDEN_RULES.map(([icon,text],i)=>(
              <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',padding:'8px 10px',background:'var(--background-color)',borderRadius:8,marginBottom:8}}>
                <span style={{fontSize:16,flexShrink:0}}>{icon}</span>
                <span style={{fontSize:13,lineHeight:1.5}}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {sec==='time'&&(
        <div style={Cd}>
          <div style={{fontWeight:800,fontSize:16,marginBottom:4}}>⏱️ Suggested Daily Time Split</div>
          <div style={{fontSize:12,opacity:.6,marginBottom:14}}>For a ~6-hour focused study session</div>
          {TIME_SPLIT.map((t,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:i<TIME_SPLIT.length-1?'1px solid var(--border-color,#f3f4f6)':'none'}}>
              <div style={{width:3,height:32,borderRadius:2,background:t.color,flexShrink:0}}/>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{t.sub}</div><div style={{fontSize:11,opacity:.5,marginTop:2}}>{t.note}</div></div>
              <div style={{fontWeight:800,fontSize:15,color:t.color,minWidth:50,textAlign:'right'}}>{t.hrs}</div>
            </div>
          ))}
          <div style={{marginTop:12,fontSize:12,opacity:.6,fontStyle:'italic',textAlign:'center'}}>Scale up as you approach July — aim for 8–10 hrs/day 🔥</div>
        </div>
      )}
    </div>
  );
}

// ─── INSIGHTS TAB ───────────────────────────
function InsightsTab({dailyLogs,completed,totalRevisions,targetDate,updateTargetDate,resetAllData,daysToExam}){
  const [sec,setSec]=useState('chart');
  const [simScores,setSimScores]=useState({acc:75,law2:65,dt2:70,idt2:60,cos2:60,aud2:65,fm2:55,sm2:70});

  // 14-day chart
  const chartData=[];
  for(let i=13;i>=0;i--){
    const d=new Date();d.setDate(d.getDate()-i);
    const ds=d.toISOString().split('T')[0];
    const total=dailyLogs.filter(l=>l.date===ds).reduce((a,l)=>a+l.total,0);
    chartData.push({ds,total,label:d.toLocaleDateString('en-IN',{day:'numeric',month:'short'}),isToday:i===0});
  }
  const maxVal=Math.max(1,...chartData.map(x=>x.total));

  // 63-day calendar
  const calData=[];
  for(let i=62;i>=0;i--){
    const d=new Date();d.setDate(d.getDate()-i);
    const ds=d.toISOString().split('T')[0];
    const total=dailyLogs.filter(l=>l.date===ds).reduce((a,l)=>a+l.total,0);
    calData.push({ds,total,dow:d.getDay(),isToday:i===0});
  }
  const firstDow=calData[0].dow;
  const calCells=[...Array(firstDow).fill(null),...calData];
  const heatCol=(n)=>n===0?'#e5e7eb':n<=2?'#bfdbfe':n<=4?'#3b82f6':'#1d4ed8';

  // Simulator
  const g1Score=SIM_PAPERS.filter(s=>s.group===1).reduce((a,s)=>a+Math.round(simScores[s.id]*s.max/100),0);
  const g2Score=SIM_PAPERS.filter(s=>s.group===2).reduce((a,s)=>a+Math.round(simScores[s.id]*s.max/100),0);
  const total=g1Score+g2Score;
  const verdict=total>=450?'🔥 AIR potential range!':total>=350?'✅ Solid pass — push for AIR!':total>=300?'⚠️ Just clearing — more prep needed':'🔴 Significantly more prep needed';

  return(
    <div>
      <div style={{display:'flex',gap:6,marginBottom:14,overflowX:'auto',paddingBottom:2}}>
        {[['chart','📊 Chart'],['calendar','🗓️ Calendar'],['simulator','🎯 Simulator'],['settings','⚙️ Settings']].map(([id,lbl])=>(
          <button key={id} onClick={()=>setSec(id)} style={{padding:'5px 11px',borderRadius:20,fontSize:12,fontWeight:700,cursor:'pointer',border:'1px solid var(--border-color,#e5e7eb)',background:sec===id?'#3b82f6':'transparent',color:sec===id?'#fff':'var(--text-color)',whiteSpace:'nowrap',flexShrink:0,transition:'all .15s'}}>{lbl}</button>
        ))}
      </div>

      {sec==='chart'&&(
        <div>
          <div style={Cd}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:16}}>📊 Last 14 Days — Lectures Logged</div>
            <div style={{display:'flex',alignItems:'flex-end',gap:3,height:130,padding:'0 2px'}}>
              {chartData.map((d,i)=>{
                const h=Math.max(4,Math.round((d.total/maxVal)*110));
                const col=d.isToday?'#3b82f6':d.total>=5?'#10b981':d.total>=3?'#f59e0b':d.total>0?'#93c5fd':'#e5e7eb';
                return(
                  <div key={d.ds} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
                    {d.total>0&&<span style={{fontSize:8,fontWeight:700,color:d.isToday?'#3b82f6':'#6b7280'}}>{d.total}</span>}
                    <div style={{flex:1,display:'flex',alignItems:'flex-end',width:'100%'}}>
                      <div style={{width:'100%',height:h,background:col,borderRadius:'3px 3px 0 0'}}/>
                    </div>
                    <span style={{fontSize:7.5,opacity:.5,transform:'rotate(-35deg)',transformOrigin:'center',whiteSpace:'nowrap',marginTop:3,height:18}}>{d.label.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
            <div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}>
              {[['#10b981','5+'],['#f59e0b','3–4'],['#93c5fd','1–2'],['#e5e7eb','0']].map(([c,l])=>(
                <div key={l} style={{display:'flex',alignItems:'center',gap:4,fontSize:10,opacity:.6}}>
                  <div style={{width:10,height:10,borderRadius:2,background:c}}/><span>{l} lec</span>
                </div>
              ))}
            </div>
          </div>
          <div style={Cd}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>📚 Lecture Progress by Subject</div>
            {SUBJECTS.map(s=>{
              const done=completed[s.id]||0;
              const pct=Math.round((done/s.total)*100);
              return(
                <div key={s.id} style={{marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:2}}>
                    <span style={{fontWeight:500}}>{s.emoji} {s.name}</span>
                    <span style={{fontWeight:700,color:s.color}}>{done}/{s.total}</span>
                  </div>
                  <div style={{height:18,background:'#e5e7eb',borderRadius:4,overflow:'hidden',position:'relative'}}>
                    <div style={{height:'100%',width:`${pct}%`,background:s.color,borderRadius:4,transition:'width .5s'}}/>
                    <span style={{position:'absolute',right:6,top:'50%',transform:'translateY(-50%)',fontSize:9,fontWeight:700,opacity:.7}}>{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {sec==='calendar'&&(
        <div style={Cd}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>📅 Study Calendar — Last 63 Days</div>
          <div style={{fontSize:12,opacity:.5,marginBottom:14}}>Darker = more lectures that day</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3,marginBottom:6}}>
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=><div key={d} style={{textAlign:'center',fontSize:10,opacity:.5,fontWeight:600}}>{d}</div>)}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:3}}>
            {calCells.map((d,i)=>{
              if(!d)return<div key={`e${i}`}/>;
              return(
                <div key={d.ds} title={`${d.ds}: ${d.total} lectures`} style={{aspectRatio:'1',borderRadius:3,background:heatCol(d.total),border:d.isToday?'2px solid #3b82f6':'none',position:'relative',cursor:'default'}}>
                  {d.total>0&&<span style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,fontWeight:800,color:d.total>=3?'#fff':'#1e40af'}}>{d.total}</span>}
                </div>
              );
            })}
          </div>
          <div style={{display:'flex',gap:8,marginTop:12,flexWrap:'wrap'}}>
            {[['#e5e7eb','0'],['#bfdbfe','1–2'],['#3b82f6','3–4'],['#1d4ed8','5+']].map(([c,l])=>(
              <div key={l} style={{display:'flex',alignItems:'center',gap:4,fontSize:10,opacity:.7}}>
                <div style={{width:12,height:12,borderRadius:2,background:c}}/><span>{l} lec</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {sec==='simulator'&&(
        <div>
          <div style={{...Cd,background:'linear-gradient(135deg,#eff6ff,#f5f3ff)',borderColor:'#bfdbfe'}}>
            <div style={{fontWeight:800,fontSize:16,marginBottom:4}}>🎯 Score Simulator</div>
            <div style={{fontSize:12,opacity:.65,marginBottom:14}}>Set expected performance per paper → see projected marks</div>
            {SIM_PAPERS.map(s=>{
              const projected=Math.round(simScores[s.id]*s.max/100);
              const passThresh=s.max===100?40:Math.round(s.max*0.4);
              const passes=projected>=passThresh;
              return(
                <div key={s.id} style={{marginBottom:12,padding:'10px 12px',background:s.done?'rgba(0,0,0,.03)':'var(--background-color)',borderRadius:8,border:'1px solid var(--border-color,#e5e7eb)',opacity:s.done?.65:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <span style={{fontSize:11,fontWeight:700,background:s.color+'20',color:s.color,padding:'2px 6px',borderRadius:6}}>{s.paper}</span>
                      <span style={{fontSize:13,fontWeight:600}}>{s.name}</span>
                      {s.done&&<span style={{fontSize:9,background:'#d1fae5',color:'#065f46',padding:'1px 5px',borderRadius:8,fontWeight:700}}>✓ Done</span>}
                    </div>
                    <span style={{fontWeight:800,fontSize:15,color:passes?'#10b981':'#ef4444'}}>{projected}<span style={{fontSize:10,opacity:.5}}>/{s.max}</span></span>
                  </div>
                  <input type="range" min={0} max={100} value={simScores[s.id]} onChange={e=>setSimScores(p=>({...p,[s.id]:parseInt(e.target.value)}))} style={{width:'100%',accentColor:s.color}} disabled={s.done}/>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:10,opacity:.5,marginTop:2}}>
                    <span>0%</span>
                    <span>{simScores[s.id]}% → {passes?'✅ passes':'❌ need '+passThresh}</span>
                    <span>100%</span>
                  </div>
                </div>
              );
            })}
            <div style={{padding:'14px',background:'linear-gradient(135deg,#1e3a8a,#5b21b6)',borderRadius:10,color:'#fff',marginTop:4}}>
              <div style={{display:'flex',gap:8,marginBottom:10}}>
                {[{l:'Group 1',v:`${g1Score}/300`,pass:g1Score>=150},{l:'Group 2',v:`${g2Score}/300`,pass:g2Score>=150},{l:'Total',v:`${total}/600`,pass:total>=300}].map(x=>(
                  <div key={x.l} style={{flex:1,textAlign:'center',background:'rgba(255,255,255,.12)',borderRadius:8,padding:'8px 4px'}}>
                    <div style={{fontSize:16,fontWeight:800,color:x.pass?'#34d399':'#f87171'}}>{x.v}</div>
                    <div style={{fontSize:10,opacity:.7,marginTop:2}}>{x.l} {x.pass?'✅':'❌'}</div>
                  </div>
                ))}
              </div>
              <div style={{textAlign:'center',fontSize:12,opacity:.9,fontWeight:600}}>{verdict}</div>
            </div>
          </div>
        </div>
      )}

      {sec==='settings'&&(
        <div>
          <div style={Cd}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:14}}>⚙️ Settings</div>
            <div style={{marginBottom:16}}>
              <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>📅 Lecture Completion Target Date</div>
              <div style={{fontSize:12,opacity:.6,marginBottom:8}}>Currently: <strong>{targetDate}</strong></div>
              <input type="date" value={targetDate} onChange={e=>updateTargetDate(e.target.value)} style={{padding:'8px 12px',border:'1px solid var(--border-color,#d1d5db)',borderRadius:8,background:'var(--bg-200,#f9fafb)',color:'var(--text-color)',fontSize:14,width:'100%'}}/>
            </div>
            <div style={{padding:'12px',background:'var(--background-color)',borderRadius:8,border:'1px solid var(--border-color,#e5e7eb)',marginBottom:16}}>
              <div style={{fontWeight:600,fontSize:13,marginBottom:8}}>📊 Data Summary</div>
              {[['Total log entries',dailyLogs.length],['Total lectures logged',dailyLogs.reduce((a,l)=>a+l.total,0)],['Total revisions done',totalRevisions],['Days to exam',daysToExam]].map(([l,v])=>(
                <div key={l} style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'5px 0',borderBottom:'1px solid var(--border-color,#f3f4f6)'}}>
                  <span style={{opacity:.7}}>{l}</span><span style={{fontWeight:700}}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={resetAllData} style={{width:'100%',padding:'12px',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:10,cursor:'pointer',fontSize:13,fontWeight:700,color:'#ef4444'}}>
              🗑️ Reset All Data (cannot be undone)
            </button>
          </div>
          <div style={{...Cd,background:'#f0fdf4',borderColor:'#bbf7d0'}}>
            <div style={{fontWeight:700,fontSize:14,color:'#16a34a',marginBottom:6}}>ℹ️ About This Planner</div>
            <div style={{fontSize:12,lineHeight:1.7,opacity:.75}}>Built for CA Inter Jan 2027 AIR preparation. All data is saved automatically and persists across sessions. Use Reset only if you want to start fresh.</div>
          </div>
        </div>
      )}
    </div>
  );
}