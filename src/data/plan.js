// Single source of content for Green Leaves — edit freely as the plan evolves.
// Rename the whole business in ONE place: BUSINESS.name below.

export const BUSINESS = {
  name: 'Green Leaves',
  tagline: '24/7 Highway Restaurant & EV Charging',
  location: 'East–West Highway (Mahendra Rajmarg) · between Butwal & Sunwal, Nepal',
  pitch:
    'A round-the-clock stop built for the road, not the neighbourhood. Travellers between Butwal and Chitwan get a hot meal, good coffee, and a full charge — any hour, any day.',
  oneLiner:
    'The well-lit, always-open stop on the highway — where a 30-minute EV charge becomes a meal, a rest, and a reason to choose this road.',
}

// Change this to lock/unlock the admin cost view at /#admin.
// NOTE: client-side only — anyone who reads the page source can find it. Not real security.
export const ADMIN_PIN = '5075'

export const OFFERINGS = [
  {
    icon: '🍽️',
    title: '24/7 Restaurant',
    desc: 'Lunch, dinner, snacks — always open. Built around the rhythm of long-distance travellers, not local meal times.',
  },
  {
    icon: '🔌',
    title: 'EV Charging — 60 kW dual-gun',
    desc: 'One 60 kW DC fast charger with two connectors — charges 2 vehicles at once (~30 min). Charge while you eat; the stop pays for itself in dwell time.',
  },
  {
    icon: '☕',
    title: 'Coffee Bar',
    desc: 'Proper coffee for the 2 a.m. drive and the early-morning push. A reliable caffeine stop on the highway.',
  },
  {
    icon: '🍛',
    title: 'Thakali Set (Standard)',
    desc: 'The dependable, satisfying Thakali plate as the everyday anchor — the meal travellers come back for.',
  },
  {
    icon: '💸',
    title: 'Economical Access',
    desc: 'A very-affordable budget option for cost-conscious travellers. Planned for a later phase once the core kitchen is running.',
    phase: 'Later phase',
  },
]

// Why this spot, why now.
export const OPPORTUNITY = [
  {
    title: 'EVs are surging on cheap hydro power',
    desc: "Nepal's electricity is largely hydro — cheap and clean — and EV adoption is climbing fast. Drivers need places to charge on long routes.",
  },
  {
    title: 'Almost no proper highway charging',
    desc: 'The East–West Highway has very little reliable fast charging. Early, well-placed stops capture the corridor before it gets crowded.',
  },
  {
    title: 'Few clean, trustworthy 24/7 stops',
    desc: 'Night drivers and families struggle to find a bright, safe, genuinely 24/7 place to eat and rest. Being open and well-lit is the differentiator.',
  },
  {
    title: 'A natural break on the Butwal–Chitwan run',
    desc: 'The Butwal–Sunwal stretch sits where travellers are ready to stop — the right distance for a meal, a charge, and a breather.',
  },
]

// The strategic spine: a charging EV driver is a captive customer for ~30 minutes.
export const EXPERIENCE = {
  headline: 'The 30-minute window',
  lead: 'An EV charge takes about 30 minutes. For that half hour, the driver and their family are a captive audience — right here, with time to spend.',
  steps: [
    { icon: '🔌', label: 'Plug in', desc: 'Charge starts — ~30 minutes on the clock.' },
    { icon: '🍛', label: 'Eat', desc: 'A hot Thakali set and coffee instead of waiting in the car.' },
    { icon: '🚻', label: 'Refresh', desc: 'Clean restrooms, a stretch, kids burn off energy.' },
    { icon: '🛍️', label: 'Shop & relax', desc: 'Road snacks, local goods, a comfortable lounge.' },
  ],
  close:
    'The business wins by maximizing spend-per-charge-session — turning a technical stop into a genuine break.',
}

export const ATTRACTIONS = [
  { icon: '🚻', title: 'Spotless 24/7 restrooms', desc: 'The #1 reason travellers choose a stop — always clean, always open.' },
  { icon: '📶', title: 'Free fast WiFi', desc: 'Stay connected through the break.' },
  { icon: '👨‍🍳', title: 'Live Thakali kitchen', desc: 'Watch the standard set being made fresh, open-kitchen style.' },
  { icon: '🛋️', title: 'EV waiting lounge', desc: 'A comfortable place to spend the 30-minute charge.' },
  { icon: '📹', title: 'Secure CCTV parking', desc: 'Bright, monitored parking — a safe night stop.' },
  { icon: '🛒', title: 'Convenience mart', desc: 'Road snacks, local honey & ghee, travel essentials.' },
  { icon: '💊', title: 'Pharmacy + first aid', desc: 'Basic medicines and a first-aid corner for the road.' },
  { icon: '🏧', title: 'ATM', desc: 'Cash on hand for the rest of the journey.' },
  { icon: '🧒', title: 'Kids play zone', desc: 'Family seating with space for children to play.' },
  { icon: '📸', title: 'Photo / selfie point', desc: 'A regional backdrop worth stopping for.' },
  { icon: '🕊️', title: 'Quiet / prayer room', desc: 'A calm, private space for a moment of rest.' },
  { icon: '🛏️', title: 'Driver rest area + shower', desc: 'For long-haul drivers — freshen up and recharge too.' },
  { icon: '🛞', title: 'Tyre air + basic check', desc: 'Air pump and a quick vehicle once-over.' },
  { icon: '🔋', title: 'Phone charging lockers', desc: 'Secure spots to top up devices.' },
  { icon: '🧵', title: 'Tharu craft & souvenirs', desc: 'A nook for local crafts and regional gifts.' },
  { icon: '📱', title: 'Loyalty app / QR ordering', desc: 'Order from the table; earn rewards for repeat stops.' },
  { icon: '⏱️', title: 'Reserve-a-charger', desc: 'Book a charging slot ahead via the app.' },
  { icon: '🌿', title: 'Outdoor garden seating', desc: 'Fresh-air seating for a relaxed break.' },
]

export const AUDIENCE = [
  'Long-distance road travellers (Butwal ↔ Chitwan and beyond)',
  'Drivers needing a reliable 24/7 meal and rest stop',
  'EV owners planning charging stops along the East–West Highway',
  'Bus and tour groups looking for a dependable highway halt',
]

// Location candidates to compare. Update notes/score as you scout.
export const LOCATION_OPTIONS = [
  { name: 'Site near Butwal end', note: 'Closer to city; higher footfall, likely higher rent.', score: null },
  { name: 'Midpoint Butwal–Sunwal', note: 'Balanced; needs traffic + land-cost check.', score: null },
  { name: 'Site near Sunwal end', note: 'Cheaper land possible; verify highway visibility.', score: null },
]

// Roadmap milestones seed the tracker on first load; afterwards state lives in localStorage.
// phase: 'future' items are shown greyed and not counted toward progress.
export const SEED_MILESTONES = [
  { id: 'loc', text: 'Finalize location & lease', done: false, group: 'Phase 1' },
  { id: 'permits', text: 'Business registration & permits', done: false, group: 'Phase 1' },
  { id: 'loan-prep', text: 'Prepare loan proposal / financials', done: false, group: 'Phase 1' },
  { id: 'loan', text: 'Secure business loan', done: false, group: 'Phase 1' },
  { id: 'grid', text: 'Electrical capacity / grid connection for chargers', done: false, group: 'Phase 1' },
  { id: 'chargers', text: 'Procure 60 kW dual-gun EV charger (charges 2 cars)', done: false, group: 'Phase 1' },
  { id: 'build', text: 'Construction / fit-out', done: false, group: 'Phase 1' },
  { id: 'staff', text: 'Hire & train staff', done: false, group: 'Phase 1' },
  { id: 'soft', text: 'Soft launch', done: false, group: 'Phase 1' },
  { id: 'open', text: 'Grand opening (24/7)', done: false, group: 'Phase 1' },
  { id: 'site', text: 'Publish this pitch site & share', done: true, group: 'Phase 1' },
  { id: 'econ', text: 'Economical food access tier', done: false, group: 'Future', phase: 'future' },
  { id: 'second', text: 'Second site on the corridor', done: false, group: 'Future', phase: 'future' },
  { id: 'app', text: 'Loyalty & reserve-a-charger app launch', done: false, group: 'Future', phase: 'future' },
]

// Target ceiling for the lean plan (NPR 1 crore = 10,000,000).
export const LEAN_CAP = 10000000

// Two budget scenarios, switchable in the admin cost tracker. NPR. `note` gives the
// researched basis/range (June 2026). These are market-research midpoints, NOT vendor
// quotes — replace with real numbers as you gather them. Sources in BUDGET_SOURCES.
//   • lean: Phase-1 minimum — one dual-gun charger, smaller build, essentials. Under NPR 1 crore.
//   • full: larger build, 2 charger units, full amenities (~NPR 2.4 crore).
export const BUDGET_SCENARIOS = [
  {
    id: 'leaseout',
    label: 'Lease-out EV — under NPR 50 lakh',
    cap: 5000000,
    blurb: 'Restaurant + attractions only. EV charging is handed to a separate tender/operator who funds, runs, and keeps the charging profit — so all charger, transformer, and EV-civil costs leave our books. We may earn rent/footfall from the operator (income, not counted here).',
    rows: [
      {
        id: 'land',
        label: 'Land lease (deposit + first year)',
        amount: 700000,
        note: 'Lease, not purchase. Modest rural plot between Butwal & Sunwal. The EV operator can sub-lease its charging pad from us — potential income, not a cost.',
      },
      {
        id: 'construction',
        label: 'Construction / fit-out (~1,000 sq ft, basic)',
        amount: 2000000,
        note: 'Smallest viable footprint at ~Rs 2,000/sq ft (range Rs 2,500–5,000). Restaurant + restroom + counter.',
      },
      {
        id: 'kitchen',
        label: 'Essential kitchen equipment',
        amount: 600000,
        note: 'Core kitchen only (range, fryer, refrigeration); expand from cash flow.',
      },
      {
        id: 'furniture',
        label: 'Furniture & seating',
        amount: 300000,
        note: 'Basic dining furniture and fittings.',
      },
      {
        id: 'sitework',
        label: 'Site prep, parking & landscaping',
        amount: 200000,
        note: 'Basic parking surface and outdoor seating shared with the charging stop.',
      },
      {
        id: 'signage',
        label: 'Signage & highway visibility',
        amount: 200000,
        note: 'One illuminated highway sign — essential for night visibility.',
      },
      {
        id: 'working',
        label: 'Working capital (3 months)',
        amount: 500000,
        note: 'Lean staffing (waiters Rs 20–50k/mo) + inventory + utilities for 3 months.',
      },
      {
        id: 'licenses',
        label: 'Licenses & permits',
        amount: 150000,
        note: 'Business registration + food/hospitality permits. EV station registration is the operator’s responsibility.',
      },
    ],
  },
  {
    id: 'lean',
    label: 'Lean — under NPR 1 crore',
    cap: 10000000,
    blurb: 'Phase-1 minimum to open: one dual-gun charger, a smaller build, essentials only. Add the rest from cash flow once running.',
    rows: [
      {
        id: 'land',
        label: 'Land lease (deposit + first year)',
        amount: 800000,
        note: 'Lease, not purchase. Modest rural plot between Butwal & Sunwal — far cheaper than Butwal-16 commercial (~Rs 30 lakh/kattha to buy). Local quote needed.',
      },
      {
        id: 'construction',
        label: 'Construction / fit-out (~1,200 sq ft, basic)',
        amount: 3000000,
        note: 'Basic-finish commercial build at ~Rs 2,500/sq ft (range Rs 2,500–5,000). Start small, expand later.',
      },
      {
        id: 'kitchen',
        label: 'Essential kitchen equipment',
        amount: 700000,
        note: 'Core 24/7 kitchen only (range, fryer, refrigeration, basic SS fabrication); add equipment as menu grows.',
      },
      {
        id: 'charger',
        label: '1 × 60 kW dual-gun DC charger (2 cars at once)',
        amount: 2000000,
        note: 'One unit, two connectors — charges 2 vehicles at once (~30 min). Nepal DC fast Rs 15–50 lakh; entry/mid 60 kW unit ≈ Rs 20 lakh.',
      },
      {
        id: 'grid',
        label: 'Transformer + grid connection (~150 kVA)',
        amount: 700000,
        note: 'Smaller load for a single unit. EV transformer/electrical Rs 10–20 lakh range — lower end here.',
      },
      {
        id: 'ev-civil',
        label: 'Charger installation & civil work',
        amount: 300000,
        note: 'Pad, small canopy, cabling for one charger. Install/civil Rs 5–15 lakh range — lower end.',
      },
      {
        id: 'furniture',
        label: 'Furniture & small waiting area',
        amount: 400000,
        note: 'Basic dining furniture + a modest EV waiting corner.',
      },
      {
        id: 'signage',
        label: 'Signage & highway visibility',
        amount: 300000,
        note: 'One illuminated highway-facing sign — essential for being seen at night.',
      },
      {
        id: 'working',
        label: 'Working capital (3 months)',
        amount: 800000,
        note: 'Lean shift staffing (waiters Rs 20–50k/mo) + 3 months inventory + utilities.',
      },
      {
        id: 'licenses',
        label: 'Licenses, permits & EV registration',
        amount: 300000,
        note: 'Business registration, food permit, EV charging station registration.',
      },
    ],
  },
  {
    id: 'full',
    label: 'Full build',
    blurb: 'Larger ~2,500 sq ft build, 2 charger units, and full amenities. The eventual target once funded.',
    rows: [
      {
        id: 'land',
        label: 'Land lease (deposit + first year)',
        amount: 1500000,
        note: 'Lease, not purchase. Butwal-16 commercial land sells ~Rs 30 lakh/kattha; a rural Butwal–Sunwal plot leases for far less.',
      },
      {
        id: 'construction',
        label: 'Construction / fit-out (~2,500 sq ft)',
        amount: 8500000,
        note: 'Commercial build Rs 2,500–5,000/sq ft; ~Rs 3,500 × 2,500 sq ft for restaurant + lounge + restrooms.',
      },
      {
        id: 'kitchen',
        label: 'Commercial kitchen equipment',
        amount: 2000000,
        note: 'Full 24/7 kitchen (ranges, fryers, refrigeration, SS fabrication) from Nepal suppliers.',
      },
      {
        id: 'chargers',
        label: '2 × 60 kW DC fast chargers (hardware)',
        amount: 5000000,
        note: 'Nepal DC fast charger Rs 15–50 lakh; 70 kW ≈ Rs 25–40 lakh each. ~Rs 25 lakh × 2.',
      },
      {
        id: 'grid',
        label: 'Transformer + grid connection (~200 kVA)',
        amount: 1500000,
        note: 'EV transformer & electrical Rs 10–20 lakh; DC fast charging needs heavy load support (~200 kVA).',
      },
      {
        id: 'ev-civil',
        label: 'Charger installation & civil work',
        amount: 1000000,
        note: 'Installation + civil work Rs 5–15 lakh (canopy, foundations, cabling).',
      },
      {
        id: 'furniture',
        label: 'Furniture & EV waiting lounge',
        amount: 1200000,
        note: 'Dining furniture, lounge seating, fittings.',
      },
      {
        id: 'signage',
        label: 'Signage & highway visibility',
        amount: 600000,
        note: 'Illuminated highway-facing signage — the "see it from the road" differentiator.',
      },
      {
        id: 'working',
        label: 'Working capital (3 months)',
        amount: 3000000,
        note: '24/7 means ~15–20 staff across shifts. Waiters Rs 20–50k/mo, cooks/chefs higher; plus 3 months inventory + utilities.',
      },
      {
        id: 'licenses',
        label: 'Licenses, permits & EV station registration',
        amount: 500000,
        note: 'Business registration, food/hospitality permits, and EV charging station registration.',
      },
    ],
  },
]

// Where the figures above come from (June 2026 web research).
export const BUDGET_SOURCES = [
  { label: 'EV charging station business in Nepal — cost & profit (Dongfeng Nepal)', url: 'https://dongfengnepal.com/how-to-start-ev-charging-stations-business-in-nepal-cost-requirements-profit-potential/' },
  { label: 'EV charging station setup cost in Nepal (Aegen)', url: 'https://aegenevcharger.com/ev-charging-station-cost-in-nepal-commercial-vs-residential-setup/' },
  { label: 'EV charging station installation cost in India 2025 (EV Truck India)', url: 'https://evtruckindia.com/ev-charging-station-installation-cost-in-india-2025-price-requirements-subsidy-roi/' },
  { label: 'Per sq ft commercial construction cost in Nepal (House Design in Nepal)', url: 'https://housedesigninnepal.com/per-sq-ft-construction-cost-in-nepal/' },
  { label: 'Commercial land for sale in Rupandehi/Butwal (Gharbazar)', url: 'https://www.gharbazar.com/property/details/commercial-land-for-sale-in-rupandehi-butwal-11263' },
  { label: 'Average waiter salary in Nepal 2025 (WorldSalaries)', url: 'https://worldsalaries.com/average-waiter-waitress-salary-in-nepal/' },
]

// Investment & returns assumptions, per scenario. Used by the admin "Investment & Returns" tab.
//   shareholders     — number of equity partners (3 / 4 / 5 as planned).
//   monthlyRevenue   — ILLUSTRATIVE expected monthly turnover (NPR). NOT researched — a planning guess.
//   marginPct        — net operating margin (% of revenue left after running costs, before loan).
// The funding split (equity vs loan) and loan rate are shared defaults below; all are editable
// in the UI and saved per scenario in the browser.
export const INVESTMENT_DEFAULTS = {
  leaseout: { shareholders: 3, monthlyRevenue: 500000, marginPct: 22 },
  lean: { shareholders: 4, monthlyRevenue: 1000000, marginPct: 25 },
  full: { shareholders: 5, monthlyRevenue: 2200000, marginPct: 28 },
}

// Shared finance assumptions (editable in UI).
//   equityPct    — share of total cost funded by shareholders' cash; the rest is a business loan.
//   loanRatePct  — annual interest rate on the business loan (Nepal SME loans ~12–16%).
export const FINANCE_DEFAULTS = { equityPct: 40, loanRatePct: 14 }

// Project timeline for the 1 crore (Lean) plan. Week 0 = location confirmed.
// startWeek/weeks place each phase on the schedule; some run in parallel.
// `critical` marks the critical path (lease → loan → build → commission → launch → open).
export const TIMELINE = {
  planLabel: 'Lean plan (~NPR 1 crore)',
  totalWeeks: 33, // ≈ 8 months base case
  baseEstimate: '~7.5–8 months',
  riskEstimate: '9–10 months if loan/grid/monsoon slip',
  phases: [
    {
      id: 'lease',
      name: 'Sign lease & take site handover',
      startWeek: 0,
      weeks: 4,
      critical: true,
      blockers: ['Clear land title / ownership dispute', 'Lease term & rent negotiation', 'Confirmed highway access / approach road'],
    },
    {
      id: 'permits',
      name: 'Business registration & permits',
      startWeek: 2,
      weeks: 6,
      blockers: ['Ward / municipal approvals', 'Food & hospitality license', 'Road / environmental clearance if required'],
    },
    {
      id: 'loan',
      name: 'Loan proposal, sanction & disbursement',
      startWeek: 2,
      weeks: 12,
      critical: true,
      blockers: ['Bank due diligence & collateral valuation', 'Tranche-based disbursement delays the build start', 'Final interest rate / terms'],
    },
    {
      id: 'grid',
      name: 'NEA grid & transformer load sanction',
      startWeek: 8,
      weeks: 12,
      blockers: ['NEA application backlog', 'Transformer availability / lead time', 'Load deposit fees'],
    },
    {
      id: 'charger',
      name: 'Procure & ship 60 kW dual-gun charger',
      startWeek: 14,
      weeks: 8,
      blockers: ['Import & customs clearance', 'Vendor lead time', 'Forex / advance payment'],
    },
    {
      id: 'build',
      name: 'Construction & fit-out (~1,200 sq ft)',
      startWeek: 14,
      weeks: 14,
      critical: true,
      blockers: ['Monsoon delays (Jun–Sep)', 'Contractor reliability', 'Material price & availability'],
    },
    {
      id: 'staff',
      name: 'Hire & train staff',
      startWeek: 24,
      weeks: 4,
      blockers: ['24/7 staffing in a semi-rural area', 'Training to service standard'],
    },
    {
      id: 'commission',
      name: 'Charger install & commissioning',
      startWeek: 28,
      weeks: 2,
      critical: true,
      blockers: ['NEA energization sign-off', 'Vendor commissioning schedule'],
    },
    {
      id: 'soft',
      name: 'Soft launch',
      startWeek: 30,
      weeks: 2,
      critical: true,
      blockers: ['Operational teething', 'Kitchen supply chain'],
    },
    {
      id: 'open',
      name: 'Grand opening (24/7)',
      startWeek: 32,
      weeks: 1,
      critical: true,
      blockers: ['Marketing & highway signage ready'],
    },
  ],
  // The handful of things most likely to push the date out.
  topRisks: [
    'Loan disbursement timing — construction can’t start until funds land. This is the usual critical path; line up the bank early.',
    'NEA grid / transformer lead time — can run 3+ months. Apply for the load sanction as soon as the lease is signed.',
    'Monsoon (Jun–Sep) — slows civil work. Schedule foundations and structure outside the heavy-rain window.',
    'Site surprises — verify clear title and highway access before signing, or the whole timeline resets.',
  ],
}

// Defaults for the admin "Sales tracker" what-if model (NPR, monthly).
//   monthlyRevenue — starting point on the slider.
//   cogsPct        — food & supplies as a % of revenue (scales with sales).
//   fixedCosts     — monthly costs that don't move with sales (staff, rent, loan EMI, etc.).
// All editable in the UI. Tuned for the 1 crore (Lean) plan; break-even ≈ NPR 6.2 lakh/month.
export const SALES_DEFAULTS = {
  monthlyRevenue: 1000000,
  cogsPct: 35,
  fixedCosts: [
    { id: 'staff', label: 'Staff salaries (24/7 shifts)', amount: 150000 },
    { id: 'rent', label: 'Rent / lease', amount: 50000 },
    { id: 'utilities', label: 'Electricity & utilities', amount: 60000 },
    { id: 'loan', label: 'Loan repayment (EMI)', amount: 100000 },
    { id: 'misc', label: 'Maintenance & misc', amount: 40000 },
  ],
}

// Monthly-revenue points shown in the sensitivity table (NPR): a weak month → a strong one.
export const SALES_REVENUE_POINTS = [500000, 1000000, 1500000, 2000000, 2500000]
