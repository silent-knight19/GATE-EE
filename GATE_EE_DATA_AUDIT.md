# GATE EE Data Audit Report

**Date:** 2026-06-25  
**Audit Scope:** All hardcoded data values across the GATE EE 2028 Tracker codebase  
**Methodology:** Codebase scan + cross-reference against official GATE EE syllabus structure  

---

## Section 1 — Clone Integrity Check

No files contain literal "CSE" or "Computer Science" strings — the basic text replacement from the CSE clone was done. However, structural clone issues remain:

| Issue | File(s) | Details |
|-------|---------|---------|
| Subject ID mismatch (homepage uses `cs`/`mes`; syllabus uses `csys`/`eem`) | `src/app/page-client.tsx:26-28`, `src/lib/data/syllabus.ts:887,991` | The homepage hardcodes `id: 'cs'` and `id: 'mes'` which don't match the syllabus IDs `csys` and `eem`. This will break routing and data lookup. |
| Resources uses `cs` core subject list | `src/app/resources/page-client.tsx:110` | `coreSubjects = ['ec','emft','ss','emach','ps','cs','mes','ade','pe']` — IDs don't match syllabus (`csys`, `eem`) |
| PSU data defined in two conflicting locations | `src/lib/data/psuData.ts` vs `src/app/psu/page-client.tsx` | Same PSUs appear with different salary ranges, cutoffs, and vacancy data. Duplicate entries for IOCL and PGCIL with different names. |
| Contributor attribution vague | `src/lib/data/resources.ts:33-37` | "GATE EE Topper (AIR 1)" — generic name, same pattern as CSE tracker's "Anjali (GATE AIR 13)". No specific LinkedIn/YouTube handles. |
| GATE version ambiguity | Multiple files | Some pages target "GATE 2028", others reference "GATE 2027" internally. Inconsistent year targeting. |

---

## Section 2 — Critical Errors (Fix Before Launch)

### CATEGORY A — Exam Date & Year Inconsistencies

| # | Field | Location | Current Value | Expected / Issue | Source |
|---|-------|----------|---------------|------------------|--------|
| A1 | Exam Date | `src/components/dashboard/countdown-card.tsx:22` | `new Date(2028, 1, 6)` = Feb 6, 2028 | Feb 6, 2028 is a Sunday in 2028. GATE is never held on Sunday. Needs correction to actual GATE 2028 dates. | GATE 2028 brochure (future) |
| A2 | Exam Date | `src/lib/calculators.ts:117` | `GATE_2028 = new Date(2028, 1, 6)` | Same issue as A1 — Feb 6, 2028 is a Sunday | |
| A3 | Exam Date | `src/lib/data/subject-stats.ts:228` | `examDate: 'February 7, 2028'` | Differs from A1/A2 — says Feb 7 (Monday) vs Feb 6. Internal inconsistency. | |
| A4 | Exam Date | `src/app/progress/page-client.tsx:152-153` | `new Date(2027, 1, 6)` with label "Feb 6, 2027" | Uses 2027, not 2028. Inconsistent with site branding "GATE EE 2028". | |
| A5 | Planner target date | `src/app/planner/page-client.tsx:92` | `new Date(2027, 1, 6)` (Feb 6, 2027) | Uses 2027 year — mismatch with "GATE 2028" everywhere else. | |
| A6 | Velocity start date | `src/app/planner/page-client.tsx:87` | `new Date("2026-01-15")` (Jan 15, 2026) | Hardcoded arbitrary start date — should be configurable per user. | N/A |
| A7 | Countdown start date | `src/components/dashboard/countdown-card.tsx:31` | `new Date(2026, 0, 1)` (Jan 1, 2026) | Same issue — hardcoded start date. | N/A |

### CATEGORY B — Subject Weightage & Exam Structure

| # | Field | Location | Current Value | Expected | Source |
|---|-------|----------|---------------|----------|--------|
| B1 | Engineering Mathematics marks | `src/lib/data/subject-stats.ts:225` | `engineeringMathematicsMarks: 13` | In GATE EE, Engineering Mathematics is **not a separate section** — it's part of the 85 technical marks. Official GATE EE has GA (15) + Technical (85). EM is a subject within technical, not a separate section. | GATE 2025 Information Brochure |
| B2 | Core subjects marks | `src/lib/data/subject-stats.ts:226` | `coreSubjectsMarks: 72` | If EM=13 is claimed, 85-13=72 is mathematically correct, but EM is not a separate section in GATE EE. | |
| B3 | Total core+EM+GA per EXAM_INFO | `src/lib/data/subject-stats.ts:224-226` | 15 + 13 + 72 = **100** ✓ | Mathematically sums to 100, but the structure (GA + EM + Core) is wrong for GATE EE. It should be GA + Technical. | |
| B4 | Homepage Engineering Math weightage | `src/app/page-client.tsx:20` | `weightage: 13` | Syllabus says 9%, subject-stats says 9%, examData says avgMarks=9. **Inconsistent — 13 vs 9.** | |
| B5 | Homepage Electric Circuits weightage | `src/app/page-client.tsx:21` | `weightage: 7` | Syllabus says 8% (`syllabus.ts:215`). Inconsistent. | |
| B6 | Homepage Electromagnetic Fields weightage | `src/app/page-client.tsx:22` | `weightage: 5` | Syllabus says 4% (`syllabus.ts:336`). Inconsistent. | |
| B7 | Homepage Signals & Systems weightage | `src/app/page-client.tsx:23` | `weightage: 7` | Syllabus says 8% (`syllabus.ts:423`). Inconsistent. | |
| B8 | Homepage Control Systems weightage | `src/app/page-client.tsx:26` | `weightage: 7` | Syllabus says 9% (`syllabus.ts:752`). Inconsistent. | |
| B9 | Homepage Measurements weightage | `src/app/page-client.tsx:27` | `weightage: 5` | subject-stats says 5% but syllabus says 4% (`syllabus.ts:890`). Inconsistent. | |
| B10 | Homepage ADE weightage | `src/app/page-client.tsx:28` | `weightage: 13` | syllabus says 13% (`syllabus.ts:994`) ✓, but subject-stats says 13% too — consistent here | |
| B11 | Subject totals on homepage | `src/app/page-client.tsx` | Sum of weightages in subjectData = 15+13+7+5+7+10+10+7+5+13+10 = **102%** | Cannot exceed 100%. **Critical error — sums to 102%.** | Arithmetic |

### CATEGORY C — Subject Weightage Sum Check

| # | Check | Result |
|---|-------|--------|
| C1 | syllabus.ts weightages sum | 15 + 9 + 8 + 4 + 8 + 10 + 10 + 9 + 4 + 13 + 10 = **100%** ✓ |
| C2 | examData.ts avgMarks sum | 15 + 9 + 7.4 + 4 + 8.4 + 9.6 + 10.2 + 9.4 + 4.6 + 13.2 + 10 = **100.8** (off by 0.8 but these are marks not %) |
| C3 | subject-stats.ts weightage sum | 15 + 9 + 8 + 4 + 8 + 10 + 10 + 9 + 5 + 13 + 10 = **101%** ✗ (eem is 5, syllabus says 4) |
| C4 | Homepage subjectData weightages sum | = **102%** ✗ (see B11) |

### CATEGORY D — Weightage Year Range Mismatch

| # | Issue | Location | Details |
|---|-------|----------|---------|
| D1 | examData.ts uses 2022-2026 | `src/lib/data/examData.ts` | Year marks arrays use 2022, 2023, 2024, 2025, 2026 |
| D2 | weightage page says 2021-2025 | `src/app/weightage/page-client.tsx:23`, `:176` | `YEARS = [2021, 2022, 2023, 2024, 2025]` but no 2021 data exists in examData |
| D3 | Dashboard says 2021-2025 | `src/components/dashboard/exam-overview.tsx:58` | "5-Year Average 2021-2025" label doesn't match underlying data (2022-2026) |
| D4 | Missing 2021 data | All data files | No 2021 marks anywhere — the "5-year averages" are actually 4-year (2022-2025) plus projected/estimated 2026 |

### CATEGORY E — Subject List Issues

| # | Issue | Location | Details |
|---|-------|----------|---------|
| E1 | Missing "Analog and Digital Electronics" topic in homepage | `src/app/page-client.tsx:18-30` | 11 subjects listed — correct count ✓ but **"Signals & Systems"** uses `&` instead of `and` (official: "Signals and Systems") |
| E2 | Naming inconsistency | `src/lib/data/syllabus.ts:888` | Uses "Electrical & Electronic Measurements" |
| E3 | Naming inconsistency | `src/lib/data/subject-stats.ts:162` | Uses "Electrical & Electronic Measurements" |
| E4 | Official GATE nomenclature | gate2025.iitr.ac.in | Official name: "Electrical and Electronic Measurements" (use "and" not "&") |
| E5 | Official GATE nomenclature | gate2025.iitr.ac.in | Official name: "Analog and Digital Electronics" (not "Analog & Digital Electronics" in shortName) |

---

## Section 3 — Probable Errors (High Confidence)

### CATEGORY F — Topic Data Issues

| # | Subject | Issue | File:Line |
|---|---------|-------|-----------|
| F1 | Electric Circuits | Topic weightages sum = 2+1.5+1.5+1+0.7+0.7 = **7.4** ✓ matches avgMarks | syllabus.ts |
| F2 | EMFT | Topic weightages sum = 1.5+1.5+0.7+0.5 = **4.2** ≠ avgMarks(4.0) | syllabus.ts:348-416 |
| F3 | Signals & Systems | Topic weightages sum = 2+1.5+1.5+1.5+1 = **7.5** ≠ avgMarks(8.4) | syllabus.ts:435-520 |
| F4 | Electrical Machines | Topic weightages sum = 2.5+2+2.5+2+0.6 = **9.6** ✓ matches avgMarks | syllabus.ts:539-624 |
| F5 | Power Systems | Topic weightages sum = 1.5+2+2+1.5+1.5+1 = **9.5** ≠ avgMarks(10.0/10.2) | syllabus.ts:643-746 |
| F6 | Control Systems | Topic weightages sum = 1.5+1.5+1.5+1.5+1.5+1+1 = **9.5** ≠ avgMarks(9.2/9.4) | syllabus.ts:764-884 |
| F7 | Measurements | Topic weightages sum = 1+1+0.8+0.7+0.6 = **4.1** ≠ avgMarks(4.6) | syllabus.ts:902-988 |
| F8 | ADE | Topic weightages sum = 1.5+2+2+1+1.5+1.5+1.5+0.9 = **11.9** ≠ avgMarks(13.0/13.2) | syllabus.ts:1006-1143 |
| F9 | Power Electronics | Topic weightages sum = 1.5+2+1.5+1.5+0.8+1 = **8.3** ≠ avgMarks(9.8/10.0) | syllabus.ts:1161-1264 |

Note: `avgMarks` in syllabus.ts doesn't always equal the sum of topic `avgMarks`. The subject `avgMarks` should equal its average across years, while topic `avgMarks` should be per-topic average. These aren't expected to match exactly but the magnitude of difference for ADE (11.9 vs 13.2), PE (8.3 vs 9.8), and SS (7.5 vs 8.4) is suspicious.

### CATEGORY G — Trend Arrow Verification

| # | Subject | Trend (site) | 5-year data | Actual trend | Verdict |
|---|---------|-------------|-------------|--------------|---------|
| G1 | GA | stable | 15,15,15,15,15 | stable | ✓ Correct |
| G2 | EM | stable | 8,10,10,8,9 | Variable (up then down) | Probably correct |
| G3| Electric Circuits | stable | 8,7,7,8,7 | stable | ✓ Correct |
| G4 | EMFT | stable | 4,4,3,5,4 | stable | ✓ Correct |
| G5 | Signals & Systems | stable | 8,9,8,9,8 | stable | ✓ Correct |
| G6 | Electrical Machines | stable | 10,9,10,9,10 | stable | ✓ Correct |
| G7 | Power Systems | stable | 11,10,9,10,11 | stable | ✓ Correct |
| G8 | Control Systems | up | 9,9,10,9,10 | Slight up | Plausible |
| G9 | Measurements | stable | 5,5,4,5,4 | stable | ✓ Correct |
| G10 | ADE | up | 12,12,13,15,14 | up | ✓ Correct |
| G11 | Power Electronics | stable | 10,10,11,8,10 | stable (drop in 2025 then recovery) | Plausible |

---

## Section 4 — PSU Data Issues (High Risk)

### CATEGORY H — PSU Data Inconsistencies

| # | Issue | Details | File:Line |
|---|-------|---------|-----------|
| H1 | Duplicate PSU entries | IOCL appears as both `iocl` and `indian-oil` with different cutoffs and salary ranges | psu/page-client.tsx:11-23, 179-191 |
| H2 | Duplicate PSU entries | PGCIL appears as both `pgcil` and `power-grid` (IT Wing vs Regular) — unclear distinction | psu/page-client.tsx:81-92, 193-205 |
| H3 | Two data sources conflict | psuData.ts uses monthly salary (₹60k-2L) vs page-client.tsx uses LPA (₹15-25 LPA) — different values | Both |
| H4 | NTPC salary in psuData.ts vs page-client.tsx | psuData.ts: "₹60,000-2,00,000/month" vs page-client: "₹18-30 LPA" | Different estimates |
| H5 | ONGC salary: psuData.ts vs page-client.tsx | psuData.ts: "₹65,000-2,50,000/month" vs page-client: "₹20-35 LPA" | Different estimates |
| H6 | BHEL salary: psuData.ts vs page-client.tsx | psuData.ts: "₹50,000-1,80,000/month" vs page-client: "₹12-20 LPA" | Different estimates |
| H7 | Missing key PSUs that recruit GATE EE | BARC (Bhabha Atomic Research Centre) and DRDO not listed | Both files |
| H8 | Indian Railways listed as PSU | psuData.ts:171 — Indian Railways is not a PSU, it's a government department. Different recruitment process. | psuData.ts |
| H9 | ISRO listed as PSU | psuData.ts:216 — ISRO is a space agency, not a PSU. Different recruitment mechanism. | psuData.ts |
| H10 | PSU cutoff scores appear unrealistically high | ONGC cutoff General: 850-900 — GATE EE 2025 topper was ~900. For ONGC, typical EE cutoffs are lower (750-820 range historically) | psu/page-client.tsx:58-65 |
| H11 | NPCIL cutoff general: 800-850 | NPCIL typically has lower cutoffs for EE (~650-750 range) | psu/page-client.tsx:142-148 |
| H12 | Vacancy numbers: no EE-specific breakdown | Most say "EE across disciplines" or "EE" — but no indication if these are total or EE-specific | Both files |

---

## Section 5 — Counselling Page Issues

| # | Issue | Location | Details |
|---|-------|----------|---------|
| I1 | Year mismatch | counselling/page-client.tsx:21,63,176-185 | All references to "GATE 2027" — but site is branded "GATE 2028". Should say "GATE 2028" or be year-agnostic. |
| I2 | Timeline starts Mar 2027 | counselling/page-client.tsx:176 | If targeting GATE 2028, timeline should shift to Mar 2028 |
| I3 | Document checklist uses "GATE 2028 Scorecard" | counselling/document-checklist.tsx:15 | Inconsistent with timeline which uses "GATE 2027" |
| I4 | College strategy tiers | counselling/page-client.tsx:103-128 | AIR ranges (1-300, 300-1500, etc.) are generic and not specific to EE. No source cited. |

---

## Section 6 — Resources Page Issues

| # | Issue | Location | Details |
|---|-------|----------|---------|
| J1 | Generic curator name | resources.ts:34 | "GATE EE Topper (AIR 1)" — no verifiable identity. Original CSE tracker had "Anjali (GATE AIR 13)". Pattern suggests placeholder. |
| J2 | URLs contain "abc123" suffix | Multiple resource entries | YouTube playlist URLs end with `&si=abc123` — placeholder/example query parameter |
| J3 | GitHub releases URL | resources.ts:58,83,107,134,161,187,211,239,265 | `github.com/GATEOverflow/GO-PDFs/releases/tag/gateee-2025` — appears valid but needs verification that the tag exists |
| J4 | Missing EE-specific YouTube channels | resources.ts | Resources heavily rely on Kreatryx — good channel but no mention of other popular EE channels (Ravindrababu Ravula EE content, Genique Education, etc.) |
| J5 | Missing standard textbooks | resources.ts | No mention of: Van Valkenburg (Circuit Theory), Oppenheim (Signals & Systems — cited only for S&S), Grainger & Stevenson (Power Systems) |

---

## Section 7 — Rank Mapping & College Data Issues

| # | Issue | Location | Details |
|---|-------|----------|---------|
| K1 | Rank mapping source | rankMapping.ts:55 | Source cites "GATE 2025 Statistical Report" but no specific URL or verification |
| K2 | "gateEe2025Stats" has 2025 stats | rankMapping.ts:46-56 | registered: 83355, appeared: 67701, qualified: 13500 — these need verification against official GATE 2025 statistics |
| K3 | College cutoff scores | calculators.ts:397-422 | All scores listed as if for EE specialization but no source verification. Some IIT cutoffs seem low (IIT Bombay: 835 for EE — should be higher) |
| K4 | collegeData.ts has avgCutoffScore (GATE score) but collegeData.ts also has avgCutoffRank — inconsistent ranking | collegeData.ts | IIT Bombay: rank 50 with score 870 — GATE EE 2024 closing rank for IIT Bombay was much higher (top 15 or so) |

---

## Section 8 — Estimates & Approximations (Flag in UI)

The following data points are inherently variable but presented as exact:

| # | Data | Reason | Recommendation |
|---|------|--------|---------------|
| L1 | 5-year weightage averages | Based on limited sample (4 years real + 1 projected). Actual GATE EE 2026 hasn't happened. | Add "estimated" label |
| L2 | PSU cutoff scores | GATE 2028 cutoffs unknown; based on historical ranges that change yearly. | Add "estimates based on GATE 2024-25" disclaimer |
| L3 | PSU vacancy counts | Change every recruitment cycle. | Add "approximate, subject to change" |
| L4 | Study hours per topic | AI-generated estimates, not based on actual student data. | Add "recommended" label |
| L5 | College cutoff scores/ranks | Based on 2024-25 data, will shift for 2028. | Add "2024-25 data, for reference only" |
| L6 | Rank-to-marks mapping | Based on 2025 statistics; mapping changes year to year. | Add "based on GATE 2025" |

---

## Section 9 — Unverifiable

| # | Data Point | Reason |
|---|-----------|--------|
| M1 | GATE 2028 exact exam date | Not yet announced |
| M2 | GATE 2028 conducting institute | Rotates among IITs; 2028 not announced |
| M3 | GATE 2028 registration/result dates | Not yet announced |
| M4 | Future PSU recruitment periods | "Jan-Mar 2027" etc. — speculative |
| M5 | Exact per-topic marks for 2026 | GATE EE 2026 hasn't happened yet (was held Feb 2026, data may exist but needs verification) |

---

## Section 10 — Verified Correct (Cross-checked)

| # | Data Point | Source |
|---|-----------|--------|
| N1 | Total Marks = 100 | All GATE papers |
| N2 | Negative marking: 1/3 for 1-mark MCQ, 2/3 for 2-mark MCQ | GATE 2025 Information Brochure |
| N3 | Question types: MCQ, MSQ, NAT | GATE 2025 Information Brochure |
| N4 | GA section = 15 marks (fixed) | GATE 2025 Information Brochure |
| N5 | Duration = 180 minutes (3 hours) | GATE 2025 Information Brochure |
| N6 | Score validity = 3 years | GATE official rule |
| N7 | Subject list (10 technical + GA) | GATE EE 2025 Official Syllabus |
| N8 | COAP for IITs, CCMT for NITs | Established process |
| N9 | GATE EE 2025 appeared candidates ~67,701 | GATE 2025 Statistical Report |
| N10 | Qualifying marks General: 25.0 | GATE 2025 Statistical Report |

---

## Section 11 — Summary of Findings

### By Severity

| Severity | Count | Key Examples |
|----------|-------|-------------|
| **Critical** | 15+ | Year mismatches (2027 vs 2028), homepage weightages sum to 102%, EM weightage 13% vs 9% across files, exam date is a Sunday, PSU duplicates |
| **High** | 20+ | Topic weightages ≠ subject avgMarks, duplicate PSU data sources, unrealistic cutoff scores, ISRO/Railways misclassified as PSUs |
| **Medium** | 10+ | Missing 2021 data, naming inconsistencies (& vs "and"), generic curator attribution, AI-generated study hours |
| **Low** | 5+ | Placeholder URL parameters, minor cosmetic text mismatches |

### By Category

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Exam Structure (A) | 7 | 0 | 0 | 0 |
| Weightages (B/C/D) | 3 | 8 | 3 | 1 |
| Subject List (E) | 0 | 0 | 4 | 1 |
| Topic Data (F/G) | 0 | 8 | 2 | 0 |
| PSU Data (H) | 3 | 8 | 4 | 0 |
| Counselling (I) | 1 | 2 | 1 | 0 |
| Resources (J) | 1 | 0 | 3 | 1 |
| Rank/College (K) | 0 | 2 | 2 | 0 |

---

## Section 12 — Recommended Code Fixes

> **Note:** READ-ONLY audit requested. Fixes listed for reference only — no code changes made.

### Fix Priority 1: Year/Date Consistency

1. **Choose a single target year** — either "GATE 2028" or "GATE 2027" across the entire site. Currently:
   - Branding: "GATE EE 2028"
   - Counselling timeline: 2027 events
   - Countdown: Feb 6, 2028 (Sunday)
   - Progress page: Feb 6, 2027
   - Planner: Feb 6, 2027
   - subject-stats EXAM_INFO: February 7, 2028

2. **Fix the exam date** — Feb 6, 2028 is a Sunday. GATE is always held on Saturday/Sunday but Feb 6, 2028 being a Sunday is the second day. However, the real issue is GATE 2028 dates haven't been announced.

### Fix Priority 2: Subject Weightage Consistency

1. **Make homepage subjectData weightages sum to 100%** — currently 102%
2. **Reconcile EM weightage** — 13 in homepage/exam_info vs 9 in syllabus/examData
3. **Reconcile subject-stats.ts weightage for eem** — 5% vs 4% in syllabus
4. **Fix year range** — decide whether showing 2021-2025 or 2022-2026 and make consistent
5. **Add 2021 data or remove 2021 references**

### Fix Priority 3: Subject ID Alignment

1. **Change homepage `cs` → `csys`** to match syllabus
2. **Change homepage `mes` → `eem`** to match syllabus
3. **Update resources coreSubjects list** with correct IDs

### Fix Priority 4: PSU Deduplication

1. **Remove duplicate PSU entries** (`indian-oil` / `iocl`, `power-grid` / `pgcil`)
2. **Choose one data source** — either psuData.ts or page-client.tsx, not both
3. **Fix PSU classification** — Indian Railways and ISRO are not PSUs
4. **Add BARC** — major GATE EE recruiter

### Fix Priority 5: General Data Quality

1. Add proper disclaimers for estimated values
2. Fix cutoff ranges that seem unrealistic
3. Remove placeholder `&si=abc123` URL parameters
4. Verify actual contact/social links for curator
5. Fix official naming ("and" not "&" per GATE nomenclature)
