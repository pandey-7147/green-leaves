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
export const ADMIN_PIN = '1234'

export const OFFERINGS = [
  {
    icon: '🍽️',
    title: '24/7 Restaurant',
    desc: 'Lunch, dinner, snacks — always open. Built around the rhythm of long-distance travellers, not local meal times.',
  },
  {
    icon: '🔌',
    title: 'EV Charging — 2 × 60 kW',
    desc: 'Two 60 kW fast chargers (one unit can charge 2 vehicles at once, ~30 min). Charge while you eat — the stop pays for itself in dwell time.',
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
  { id: 'chargers', text: 'Procure 2 × 60 kW EV chargers', done: false, group: 'Phase 1' },
  { id: 'build', text: 'Construction / fit-out', done: false, group: 'Phase 1' },
  { id: 'staff', text: 'Hire & train staff', done: false, group: 'Phase 1' },
  { id: 'soft', text: 'Soft launch', done: false, group: 'Phase 1' },
  { id: 'open', text: 'Grand opening (24/7)', done: false, group: 'Phase 1' },
  { id: 'site', text: 'Publish this pitch site & share', done: true, group: 'Phase 1' },
  { id: 'econ', text: 'Economical food access tier', done: false, group: 'Future', phase: 'future' },
  { id: 'second', text: 'Second site on the corridor', done: false, group: 'Future', phase: 'future' },
  { id: 'app', text: 'Loyalty & reserve-a-charger app launch', done: false, group: 'Future', phase: 'future' },
]

// Budget snapshot — placeholder NPR figures, fully editable in the admin cost tracker.
export const BUDGET = [
  { id: 'land', label: 'Land / lease (deposit + first year)', amount: 2500000 },
  { id: 'construction', label: 'Construction / fit-out', amount: 4000000 },
  { id: 'kitchen', label: 'Kitchen equipment', amount: 1500000 },
  { id: 'chargers', label: '2 × 60 kW EV chargers + electrical/grid', amount: 5000000 },
  { id: 'furniture', label: 'Furniture & lounge', amount: 1000000 },
  { id: 'signage', label: 'Signage & highway visibility', amount: 600000 },
  { id: 'working', label: 'Working capital (3 months)', amount: 1500000 },
  { id: 'licenses', label: 'Licenses & permits', amount: 400000 },
]
