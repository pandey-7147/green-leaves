import { useEffect, useMemo, useState } from 'react'
import { SALES_DEFAULTS, SALES_REVENUE_POINTS } from '../data/plan.js'

const STORAGE_KEY = 'green-leaves.sales.v1'
const SLIDER_MAX = 3000000
const SLIDER_STEP = 50000

const npr = new Intl.NumberFormat('en-NP', {
  style: 'currency',
  currency: 'NPR',
  maximumFractionDigits: 0,
})

// Compact "X.X L" / "X.XX Cr" for the table and labels.
function lakh(n) {
  if (Math.abs(n) >= 10000000) return `${(n / 10000000).toFixed(2)} Cr`
  return `${(n / 100000).toFixed(1)} L`
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...clone(SALES_DEFAULTS), ...JSON.parse(raw) }
  } catch {
    // fall through to defaults
  }
  return clone(SALES_DEFAULTS)
}

export default function SalesTracker() {
  const [s, setS] = useState(loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
    } catch {
      // storage unavailable — keep working in-memory
    }
  }, [s])

  const cogsPct = Number(s.cogsPct) || 0
  const revenue = Number(s.monthlyRevenue) || 0
  const fixedTotal = useMemo(
    () => s.fixedCosts.reduce((sum, f) => sum + (Number(f.amount) || 0), 0),
    [s.fixedCosts],
  )

  // net(rev) = rev * (1 - cogs%) - fixed
  const netAt = (rev) => rev * (1 - cogsPct / 100) - fixedTotal

  const monthlyCogs = revenue * (cogsPct / 100)
  const grossProfit = revenue - monthlyCogs
  const netMonthly = grossProfit - fixedTotal
  const netAnnual = netMonthly * 12
  const marginPct = revenue > 0 ? (netMonthly / revenue) * 100 : 0
  // break-even revenue: net = 0  ->  rev = fixed / (1 - cogs%)
  const breakEven = cogsPct < 100 ? fixedTotal / (1 - cogsPct / 100) : Infinity
  const profitable = netMonthly > 0

  function setField(key, value) {
    setS((prev) => ({ ...prev, [key]: value }))
  }
  function setFixed(id, value) {
    setS((prev) => ({
      ...prev,
      fixedCosts: prev.fixedCosts.map((f) => (f.id === id ? { ...f, amount: value } : f)),
    }))
  }
  function removeFixed(id) {
    setS((prev) => ({ ...prev, fixedCosts: prev.fixedCosts.filter((f) => f.id !== id) }))
  }
  const [newLabel, setNewLabel] = useState('')
  function addFixed(e) {
    e.preventDefault()
    const l = newLabel.trim()
    if (!l) return
    setS((prev) => ({
      ...prev,
      fixedCosts: [...prev.fixedCosts, { id: `f${Date.now()}`, label: l, amount: 0 }],
    }))
    setNewLabel('')
  }
  function reset() {
    setS(clone(SALES_DEFAULTS))
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-leaf-900">Sales tracker</h2>
          <p className="mt-2 text-leaf-900/70">
            Drag the monthly revenue and tune your costs to see net profit live — from a weak month
            to a strong one.
          </p>
        </div>
        <button
          onClick={reset}
          className="rounded-lg border border-leaf-200 px-3 py-1.5 text-sm font-medium text-leaf-700 transition hover:bg-leaf-100"
        >
          Reset to defaults
        </button>
      </div>

      {/* revenue slider */}
      <div className="mt-6 rounded-2xl border border-leaf-100 bg-white p-5">
        <div className="flex items-end justify-between">
          <label className="text-sm font-medium text-leaf-900/70">Monthly revenue</label>
          <span className="text-2xl font-bold text-leaf-800">{npr.format(revenue)}</span>
        </div>
        <input
          type="range"
          min="0"
          max={SLIDER_MAX}
          step={SLIDER_STEP}
          value={revenue}
          onChange={(e) => setField('monthlyRevenue', Number(e.target.value))}
          className="mt-3 w-full accent-leaf-600"
        />
        <div className="flex justify-between text-xs text-leaf-900/40">
          <span>0</span>
          <span>{lakh(SLIDER_MAX)}</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="text-leaf-900/60">Exact:</span>
          <input
            type="number"
            min="0"
            step={SLIDER_STEP}
            value={revenue}
            onChange={(e) => setField('monthlyRevenue', Number(e.target.value))}
            className="w-40 rounded-md border border-leaf-200 px-2 py-1 text-right outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
          />
          <span className="text-leaf-900/50">NPR / month</span>
        </div>
      </div>

      {/* headline result */}
      <div
        className={
          'mt-4 grid gap-3 rounded-2xl p-5 sm:grid-cols-2 ' +
          (profitable ? 'bg-leaf-100' : 'bg-amber-100')
        }
      >
        <div>
          <p className="text-xs uppercase tracking-wide text-leaf-700/70">Net profit / month</p>
          <p className={'text-3xl font-extrabold ' + (profitable ? 'text-leaf-800' : 'text-amber-800')}>
            {npr.format(netMonthly)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-leaf-700/70">Net profit / year</p>
          <p className={'text-3xl font-extrabold ' + (profitable ? 'text-leaf-800' : 'text-amber-800')}>
            {npr.format(netAnnual)}
          </p>
        </div>
      </div>

      {/* cost inputs */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-leaf-600">
            Food & supplies (variable)
          </h3>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <input
              type="number"
              min="0"
              max="100"
              value={s.cogsPct}
              onChange={(e) => setField('cogsPct', e.target.value)}
              className="w-24 rounded-md border border-leaf-200 px-2 py-1 text-right outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
            />
            <span className="text-leaf-900/60">% of revenue</span>
          </label>
          <p className="mt-2 text-xs text-leaf-900/50">
            = {npr.format(monthlyCogs)} / month at current revenue.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-leaf-600">
            Fixed monthly costs
          </h3>
          <ul className="mt-2 space-y-1.5">
            {s.fixedCosts.map((f) => (
              <li key={f.id} className="group flex items-center gap-2">
                <span className="flex-1 text-sm text-leaf-900/80">{f.label}</span>
                <input
                  type="number"
                  min="0"
                  value={f.amount}
                  onChange={(e) => setFixed(f.id, e.target.value)}
                  className="w-32 rounded-md border border-leaf-200 px-2 py-1 text-right text-sm outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
                />
                <button
                  onClick={() => removeFixed(f.id)}
                  aria-label="Remove cost"
                  className="text-leaf-900/20 transition hover:text-red-500"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={addFixed} className="mt-2 flex gap-2">
            <input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Add a cost…"
              className="min-w-0 flex-1 rounded-md border border-leaf-200 px-2 py-1 text-sm outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
            />
            <button type="submit" className="rounded-md bg-leaf-600 px-3 py-1 text-sm font-semibold text-white hover:bg-leaf-700">
              Add
            </button>
          </form>
          <p className="mt-2 text-xs font-medium text-leaf-700">
            Fixed total: {npr.format(fixedTotal)} / month
          </p>
        </div>
      </div>

      {/* break-even + margin */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-leaf-100 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-leaf-600">Break-even revenue</p>
          <p className="mt-1 text-lg font-bold text-leaf-900">
            {breakEven === Infinity ? '—' : npr.format(breakEven)} / month
          </p>
          <p className="mt-1 text-xs text-leaf-900/50">Below this, the month runs at a loss.</p>
        </div>
        <div className="rounded-xl border border-leaf-100 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-leaf-600">Net margin (now)</p>
          <p className="mt-1 text-lg font-bold text-leaf-900">{marginPct.toFixed(0)}%</p>
          <p className="mt-1 text-xs text-leaf-900/50">Net profit as a share of revenue.</p>
        </div>
      </div>

      {/* sensitivity table */}
      <h3 className="mt-8 text-lg font-bold text-leaf-800">Weak month vs strong month</h3>
      <p className="mt-1 text-sm text-leaf-900/60">
        Net profit at different monthly revenues (your current costs). The row nearest your slider
        is highlighted.
      </p>
      <div className="mt-3 overflow-hidden rounded-2xl border border-leaf-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-leaf-50 text-xs uppercase tracking-wide text-leaf-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Monthly revenue</th>
              <th className="px-4 py-3 text-right font-semibold">Net / month</th>
              <th className="px-4 py-3 text-right font-semibold">Net / year</th>
            </tr>
          </thead>
          <tbody>
            {SALES_REVENUE_POINTS.map((rev) => {
              const nm = netAt(rev)
              const near = Math.abs(rev - revenue) <= SLIDER_STEP
              return (
                <tr
                  key={rev}
                  className={'border-t border-leaf-100 ' + (near ? 'bg-leaf-50' : '')}
                >
                  <td className="px-4 py-2 font-medium text-leaf-900">
                    {npr.format(rev)} <span className="text-leaf-900/40">({lakh(rev)})</span>
                  </td>
                  <td className={'px-4 py-2 text-right font-semibold ' + (nm >= 0 ? 'text-leaf-700' : 'text-amber-700')}>
                    {npr.format(nm)}
                  </td>
                  <td className={'px-4 py-2 text-right ' + (nm >= 0 ? 'text-leaf-700' : 'text-amber-700')}>
                    {npr.format(nm * 12)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-leaf-900/50">
        What-if model: net = revenue − food/supplies (% of revenue) − fixed monthly costs. It
        excludes loan principal beyond the EMI line, depreciation, and tax. Revenue is your
        assumption — tune the costs to your real quotes.
      </p>
    </section>
  )
}
