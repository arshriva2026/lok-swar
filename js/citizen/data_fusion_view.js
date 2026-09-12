/**
 * LOK SWAR - Data Fusion & Civic Intelligence Dashboard View
 * Extracted modular component for performance and maintainability.
 */
(function() {
  function DataFusionView(props) {
    var navigateView = props.navigateView;
    var handleCopyFusionJson = props.handleCopyFusionJson;
    var fusionCopied = props.fusionCopied;
    var fusionAnalysisResult = props.fusionAnalysisResult;
    var playChime = props.playChime;
    var Icons = window.Icons || {};

    return React.createElement("main", {
    className: "flex-1 max-w-6xl w-full mx-auto px-4 py-6 z-10 relative space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 md:p-8 rounded-3xl border shadow-sm space-y-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800"
  }, /*#__PURE__*/React.createElement(Icons.Shield, { className: "w-5 h-5" })), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl md:text-2xl font-black text-slate-900 dark:text-white"
  }, "Civic Intelligence & Multi-Source Evidence Fusion")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed"
  }, "Corroborates subjective citizen feedback against objective ground sensors, census demographic indices, and government master development plans.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 self-start md:self-auto"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => navigateView('citizen'),
    className: "px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer transition-all"
  }, "← Return to Intake"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleCopyFusionJson,
    className: `px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${fusionCopied ? 'bg-emerald-600 text-white' : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900'}`
  }, /*#__PURE__*/React.createElement(fusionCopied ? Icons.CheckCircle : Icons.FileText, { className: "w-3.5 h-3.5" }), /*#__PURE__*/React.createElement("span", null, fusionCopied ? "JSON Copied!" : "Export Valid JSON")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-3.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl border bg-slate-50 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] font-bold text-slate-500 uppercase tracking-wider"
  }, "Demand Weight"), /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-black text-slate-900 dark:text-white mt-1"
  }, "25%"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-400 mt-0.5"
  }, "Volume & Grievance Severity")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl border bg-slate-50 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] font-bold text-slate-500 uppercase tracking-wider"
  }, "Demographics Weight"), /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-black text-blue-600 dark:text-blue-400 mt-1"
  }, "30%"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-400 mt-0.5"
  }, "Vulnerability & Human Impact")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl border bg-slate-50 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] font-bold text-slate-500 uppercase tracking-wider"
  }, "Objective Data Gap"), /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-black text-purple-600 dark:text-purple-400 mt-1"
  }, "35%"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-400 mt-0.5"
  }, "Sensors, GIS & Physical Deficit")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl border bg-slate-50 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] font-bold text-slate-500 uppercase tracking-wider"
  }, "Plan Overlap Rule"), /*#__PURE__*/React.createElement("div", {
    className: "text-xl font-black text-rose-600 dark:text-rose-400 mt-1"
  }, "-20% to -40%"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-400 mt-0.5"
  }, "Deduction for Existing Plans"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      playChime('tap');
      setFusionMode('benchmarks');
    },
    className: `flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${fusionMode === 'benchmarks' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`
  }, "Constituency Benchmark Cases (Ground Truth)"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      playChime('tap');
      setFusionMode('custom');
    },
    className: `flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${fusionMode === 'custom' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`
  }, "Custom Multi-Source AI Evaluator (Paste Any Data)")), fusionMode === 'benchmarks' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold text-slate-700 dark:text-slate-300"
  }, "Select Hotspot Case Study to Inspect Multi-Source Fusion:"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5"
  }, (fusionBenchmarkCases.length > 0 ? fusionBenchmarkCases : [
    { id: 'CASE-01', title: 'Jhirpani Water Deprivation', theme: 'Water & Fluoride', discrepancy_category: 'VERIFIED_CRISIS', priority_score: 95 },
    { id: 'CASE-02', title: 'Kalyanpur Bridge Severance', theme: 'Roads & Bridges', discrepancy_category: 'VERIFIED_CRISIS', priority_score: 84 },
    { id: 'CASE-03', title: 'Birmitrapur PHC Maternal Care', theme: 'Healthcare & PHC', discrepancy_category: 'VERIFIED_CRISIS', priority_score: 81 },
    { id: 'CASE-04', title: 'Bandhamunda Telecom Blind Spot', theme: 'Power & Telecom', discrepancy_category: 'UNREPORTED_VULNERABILITY', priority_score: 70 },
    { id: 'CASE-05', title: 'Civil Lines Streetlights', theme: 'Urban Lighting', discrepancy_category: 'PERCEPTION_GAP', priority_score: 10 }
  ]).map(c => {
    const isAct = fusionActiveCaseId === c.id;
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      onClick: () => handleSelectFusionCase(c),
      className: `p-3 rounded-2xl border text-left cursor-pointer transition-all space-y-1.5 ${isAct ? 'bg-purple-50/90 dark:bg-purple-950/40 border-purple-400 dark:border-purple-600 shadow-md ring-2 ring-purple-500/20 scale-[1.02]' : 'bg-slate-50/70 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-[10px] font-mono font-bold"
    }, /*#__PURE__*/React.createElement("span", {
      className: isAct ? "text-purple-700 dark:text-purple-300" : "text-slate-500"
    }, c.id), /*#__PURE__*/React.createElement("span", {
      className: `px-1.5 py-0.2 rounded ${c.priority_score >= 80 ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' : c.priority_score >= 60 ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'}`
    }, c.priority_score, "/100")), /*#__PURE__*/React.createElement("h4", {
      className: "font-bold text-xs leading-snug line-clamp-2 text-slate-900 dark:text-white"
    }, c.title), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 inline-block"
    }, c.discrepancy_category));
  }))), fusionMode === 'custom' && /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      handleRunFusionAnalysis();
    },
    className: "space-y-4 pt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300"
  }, "1. CITIZEN_FEEDBACK (Complaints / Petitions):"), /*#__PURE__*/React.createElement("textarea", {
    rows: 4,
    value: fusionCustomInputs.citizen_feedback,
    onChange: e => setFusionCustomInputs({ ...fusionCustomInputs, citizen_feedback: e.target.value }),
    placeholder: "Paste citizen complaints, petitions, voice summaries...",
    className: "w-full p-3 rounded-2xl border text-xs font-sans bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/30"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300"
  }, "2. WARD_DEMOGRAPHICS (Population, Vulnerability):"), /*#__PURE__*/React.createElement("textarea", {
    rows: 4,
    value: fusionCustomInputs.ward_demographics,
    onChange: e => setFusionCustomInputs({ ...fusionCustomInputs, ward_demographics: e.target.value }),
    placeholder: "Population, % elderly, % children, median income / BPL index, vulnerability...",
    className: "w-full p-3 rounded-2xl border text-xs font-sans bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/30"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300"
  }, "3. OBJECTIVE_PUBLIC_DATASETS (Sensors, GIS, Inventory):"), /*#__PURE__*/React.createElement("textarea", {
    rows: 4,
    value: fusionCustomInputs.objective_public_datasets,
    onChange: e => setFusionCustomInputs({ ...fusionCustomInputs, objective_public_datasets: e.target.value }),
    placeholder: "Municipal infrastructure inventory, sensor logs, telemetry, hospital bed capacity...",
    className: "w-full p-3 rounded-2xl border text-xs font-sans bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/30"
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300"
  }, "4. EXISTING_GOVERNMENT_PLANS (Budget Items, Tenders):"), /*#__PURE__*/React.createElement("textarea", {
    rows: 4,
    value: fusionCustomInputs.existing_government_plans,
    onChange: e => setFusionCustomInputs({ ...fusionCustomInputs, existing_government_plans: e.target.value }),
    placeholder: "Approved budget items, ongoing tenders, master plan projects for 1-3 years...",
    className: "w-full p-3 rounded-2xl border text-xs font-sans bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/30"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-2.5 pt-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isAnalyzingFusion,
    className: "px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs shadow-md cursor-pointer transition-all flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Sparkles, { className: "w-4 h-4" }), /*#__PURE__*/React.createElement("span", null, isAnalyzingFusion ? "Computing Multi-Source Fusion..." : "⚡ Run Multi-Source Data Fusion Analysis")))), fusionAnalysisResult && /*#__PURE__*/React.createElement("div", {
    className: "space-y-5 pt-3 animate-in fade-in duration-300"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-5 rounded-3xl border shadow-sm ${
      fusionAnalysisResult.discrepancy_category === 'VERIFIED_CRISIS'
        ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
        : fusionAnalysisResult.discrepancy_category === 'PERCEPTION_GAP'
        ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
        : fusionAnalysisResult.discrepancy_category === 'UNREPORTED_VULNERABILITY'
        ? 'bg-purple-50/70 dark:bg-purple-950/30 border-purple-300 dark:border-purple-800'
        : 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
    }`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/10 dark:border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5 flex-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
  }, "Discrepancy Category"), /*#__PURE__*/React.createElement("span", {
    className: `px-3 py-1 rounded-xl font-black text-xs ${
      fusionAnalysisResult.discrepancy_category === 'VERIFIED_CRISIS'
        ? 'bg-rose-600 text-white shadow-xs'
        : fusionAnalysisResult.discrepancy_category === 'PERCEPTION_GAP'
        ? 'bg-amber-500 text-slate-900 shadow-xs'
        : fusionAnalysisResult.discrepancy_category === 'UNREPORTED_VULNERABILITY'
        ? 'bg-purple-600 text-white shadow-xs'
        : 'bg-emerald-600 text-white shadow-xs'
    }`
  }, fusionAnalysisResult.discrepancy_category)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-600 dark:text-slate-300"
  }, "Plan Status:"), /*#__PURE__*/React.createElement("span", {
    className: `text-xs font-black px-2.5 py-0.5 rounded-lg border ${
      fusionAnalysisResult.plan_status === 'ALREADY_PLANNED'
        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300'
        : fusionAnalysisResult.plan_status === 'PARTIALLY_ADDRESSED'
        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300'
        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300'
    }`
  }, fusionAnalysisResult.plan_status))), /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed"
  }, /*#__PURE__*/React.createElement("strong", null, "Discrepancy Rationale: "), fusionAnalysisResult.discrepancy_rationale)), /*#__PURE__*/React.createElement("div", {
    className: "p-5 rounded-3xl border bg-slate-50 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-black text-slate-900 dark:text-white"
  }, "Composite Priority Score: ", fusionAnalysisResult.priority_score, " / 100"), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-500 dark:text-slate-400"
  }, "Formula: (Demand 25%) + (Demographics 30%) + (Data Deficit 35%) - Plan Penalty")), /*#__PURE__*/React.createElement("div", {
    className: `text-2xl font-black px-3.5 py-1 rounded-2xl border ${
      fusionAnalysisResult.priority_score >= 80 ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800' :
      fusionAnalysisResult.priority_score >= 60 ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800' :
      'text-slate-600 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
    }`
  }, fusionAnalysisResult.priority_score)), /*#__PURE__*/React.createElement("div", {
    className: "w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: `h-full transition-all duration-500 ${
      fusionAnalysisResult.priority_score >= 80 ? 'bg-gradient-to-r from-amber-500 to-rose-600' :
      fusionAnalysisResult.priority_score >= 60 ? 'bg-gradient-to-r from-emerald-500 to-blue-600' :
      'bg-slate-500'
    }`,
    style: { width: `${Math.min(100, Math.max(5, fusionAnalysisResult.priority_score))}%` }
  })), fusionAnalysisResult.score_breakdown && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[10px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", { className: "text-slate-500" }, "Demand (25%)"), /*#__PURE__*/React.createElement("div", { className: "font-bold text-slate-900 dark:text-white" }, "+", fusionAnalysisResult.score_breakdown.demand_and_severity_25pct, " pts")), /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", { className: "text-slate-500" }, "Demographics (30%)"), /*#__PURE__*/React.createElement("div", { className: "font-bold text-blue-600 dark:text-blue-400" }, "+", fusionAnalysisResult.score_breakdown.demographic_vulnerability_30pct, " pts")), /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", { className: "text-slate-500" }, "Deficit Gap (35%)"), /*#__PURE__*/React.createElement("div", { className: "font-bold text-purple-600 dark:text-purple-400" }, "+", fusionAnalysisResult.score_breakdown.objective_deficit_gap_35pct, " pts")), /*#__PURE__*/React.createElement("div", {
    className: "p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", { className: "text-slate-500" }, "Plan Penalty"), /*#__PURE__*/React.createElement("div", { className: "font-bold text-rose-600 dark:text-rose-400" }, fusionAnalysisResult.score_breakdown.plan_overlap_penalty, " pts")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
  }, /*#__PURE__*/React.createElement(Icons.Layers, { className: "w-3.5 h-3.5 text-slate-600" }), /*#__PURE__*/React.createElement("span", null, "Theme & Summary of Need")), /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold text-purple-600 dark:text-purple-400"
  }, fusionAnalysisResult.theme), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium"
  }, fusionAnalysisResult.summary_of_need)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
  }, /*#__PURE__*/React.createElement(Icons.Compass, { className: "w-3.5 h-3.5 text-blue-600" }), /*#__PURE__*/React.createElement("span", null, "Demographic Contextualization")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium"
  }, fusionAnalysisResult.demographic_context)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
  }, /*#__PURE__*/React.createElement(Icons.Activity, { className: "w-3.5 h-3.5 text-purple-600" }), /*#__PURE__*/React.createElement("span", null, "Objective Public Dataset Substantiation")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium"
  }, fusionAnalysisResult.objective_substantiation)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
  }, /*#__PURE__*/React.createElement(Icons.Building, { className: "w-3.5 h-3.5 text-emerald-600" }), /*#__PURE__*/React.createElement("span", null, "Higher Authority Plan Cross-Referencing")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium"
  }, fusionAnalysisResult.plan_notes))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/60 dark:bg-purple-950/20 space-y-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-black text-purple-900 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icons.Sparkles, { className: "w-4 h-4 text-purple-600" }), /*#__PURE__*/React.createElement("span", null, "Actionable Policy Recommendation")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-purple-950 dark:text-purple-200 font-medium leading-relaxed"
  }, fusionAnalysisResult.actionable_recommendation)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl border bg-slate-950 text-emerald-400 font-mono text-[11px] space-y-2 border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 font-sans"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-xs"
  }, "Strict JSON Output Schema:"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleCopyFusionJson,
    className: "hover:text-white font-bold text-xs cursor-pointer flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(fusionCopied ? Icons.CheckCircle : Icons.FileText, { className: "w-3 h-3" }), /*#__PURE__*/React.createElement("span", null, fusionCopied ? "Copied" : "Copy JSON"))), /*#__PURE__*/React.createElement("pre", {
    className: "overflow-x-auto whitespace-pre leading-relaxed max-h-60"
  }, JSON.stringify({
    theme: fusionAnalysisResult.theme,
    summary_of_need: fusionAnalysisResult.summary_of_need,
    demographic_context: fusionAnalysisResult.demographic_context,
    plan_status: fusionAnalysisResult.plan_status,
    plan_notes: fusionAnalysisResult.plan_notes,
    objective_substantiation: fusionAnalysisResult.objective_substantiation,
    discrepancy_category: fusionAnalysisResult.discrepancy_category,
    discrepancy_rationale: fusionAnalysisResult.discrepancy_rationale,
    priority_score: fusionAnalysisResult.priority_score,
    actionable_recommendation: fusionAnalysisResult.actionable_recommendation
  }, null, 2))))));
  }

  window.DataFusionView = DataFusionView;
})();
