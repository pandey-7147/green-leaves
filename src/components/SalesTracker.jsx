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

// Compact "X.X L" / "X.XX Cr".
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

// One row of the calculation waterfall.
function CalcRow({ label, value, sign, bold, result, loss }) {
  return (
    <div
      className={
        'flex items-baseline justify-between gap-4 px-4 py-2 ' +
        (result ? 'border-t-2 border-leaf-200 ' : '') +
        (bold ? 'font-bold ' : '')
      }
    >
      <span className={result ? 'text-base text-leaf-900' : 'text-sm text-leaf-900/70'}>
        {label}
      </span>
      <span
        className={
          'tabular-nums ' +
          (result
            ? 'text-2xl font-extrabold ' + (loss ? 'text-amber-700' : 'text-leaf-700')
            : sign === '−'
              ? 'text-leaf-900/70'
              : 'text-leaf-900')
        }
      >
        {sign && <span className="mr-1 text-leaf-900/40">{sign}</span>}
        {npr.format(value)}
      </span>
    </div>
  )
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
  const sales = Number(s.monthlyRevenue) || 0
  const fixedTotal = useMemo(
    () => s.fixedCosts.reduce((sum, f) => sum + (Number(f.amount) || 0), 0),
    [s.fixedCosts],
  )

  // net(sales) = sales − food − fixed
  const netAt = (rev) => rev * (1 - cogsPct / 100) - fixedTotal

  const foodCost = sales * (cogsPct / 100)
  const netMonthly = sales - foodCost - fixedTotal
  const netAnnual = netMonthly * 12
  const breakEven = cogsPct < 100 ? fixedTotal / (1 - cogsPct / 100) : Infinity
  const profitable = netMonthly >= 0

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
            Set how much you sell in a month, subtract your costs, and see what you keep.
          </p>
        </div>
        <button
          onClick={reset}
          className="rounded-lg border border-leaf-200 px-3 py-1.5 text-sm font-medium text-leaf-700 transition hover:bg-leaf-100"
        >
          Reset to defaults
        </button>
      </div>

      {/* STEP 1 — sales */}
      <div className="mt-6 rounded-2xl border border-leaf-100 bg-white p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-leaf-600 text-xs font-bold text-white">1</span>
          <h3 className="font-semibold text-leaf-900">Monthly sales</h3>
        </div>
        <p className="mt-1 text-sm text-leaf-900/50">Total money customers pay you in a month.</p>
        <div className="mt-3 flex items-end justify-between">
          <input
            type="number"
            min="0"
            step={SLIDER_STEP}
            value={sales}
            onChange={(e) => setField('monthlyRevenue', Number(e.target.value))}
            className="w-48 rounded-lg border border-leaf-200 px-3 py-2 text-xl font-bold text-leaf-800 outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
          />
          <span className="text-sm text-leaf-900/50">{lakh(sales)} / month</span>
        </div>
        <input
          type="range"
          min="0"
          max={SLIDER_MAX}
          step={SLIDER_STEP}
          value={sales}
          onChange={(e) => setField('monthlyRevenue', Number(e.target.value))}
          className="mt-3 w-full accent-leaf-600"
        />
        <div className="flex justify-between text-xs text-leaf-900/40">
          <span>0</span>
          <span>{lakh(SLIDER_MAX)}</span>
        </div>
      </div>

      {/* STEP 2 — costs */}
      <div className="mt-4 rounded-2xl border border-leaf-100 bg-white p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-leaf-600 text-xs font-bold text-white">2</span>
          <h3 className="font-semibold text-leaf-900">Monthly costs</h3>
        </div>

        {/* food % */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-leaf-900/80">Food &amp; supplies:</span>
            <input
              type="number"
              min="0"
              max="100"
              value={s.cogsPct}
              onChange={(e) => setField('cogsPct', e.target.value)}
              className="w-20 rounded-md border border-leaf-200 px-2 py-1 text-right outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
            />
            <span className="text-leaf-900/60">% of sales</span>
            <span className="ml-auto font-semibold text-leaf-900">= {npr.format(foodCost)}</span>
          </div>
          <p className="mt-1 text-xs text-leaf-900/50">Grows with sales — busier months cost more in ingredients.</p>
        </div>

        {/* fixed costs */}
        <div className="mt-5">
          <p className="text-sm font-medium text-leaf-900/80">Fixed costs (same every month):</p>
          <ul className="mt-2 space-y-1.5">
            {s.fixedCosts.map((f) => (
              <li key={f.id} className="group flex items-center gap-2">
                <span className="flex-1 text-sm text-leaf-900/70">{f.label}</span>
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
          <div className="mt-2 flex justify-between text-sm font-semibold text-leaf-700">
            <span>Fixed costs total</span>
            <span>{npr.format(fixedTotal)}</span>
          </div>
        </div>
      </div>

      {/* STEP 3 — the calculation */}
      <div className="mt-4 rounded-2xl border border-leaf-100 bg-white p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-leaf-600 text-xs font-bold text-white">3</span>
          <h3 className="font-semibold text-leaf-900">What you keep</h3>
        </div>
        <div className="mt-3 overflow-hidden rounded-xl bg-leaf-50">
          <CalcRow label="Monthly sales" value={sales} />
          <CalcRow label={`Food & supplies (${cogsPct}%)`} value={foodCost} sign="−" />
          <CalcRow label="Fixed costs" value={fixedTotal} sign="−" />
          <CalcRow label="Net profit / month" value={netMonthly} result bold loss={!profitable} />
        </div>
        <div className="mt-3 flex items-baseline justify-between rounded-xl bg-leaf-100 px-4 py-3">
          <span className="font-semibold text-leaf-800">Net profit / year (× 12)</span>
          <span className={'text-2xl font-extrabold tabular-nums ' + (profitable ? 'text-leaf-800' : 'text-amber-700')}>
            {npr.format(netAnnual)}
          </span>
        </div>
        {!profitable && (
          <p className="mt-2 text-sm font-medium text-amber-800">
            ⚠ At these sales you lose money each month. You need at least{' '}
            <strong>{breakEven === Infinity ? '—' : npr.format(breakEven)}</strong> in monthly sales
            just to break even.
          </p>
        )}
        {profitable && breakEven !== Infinity && (
          <p className="mt-2 text-sm text-leaf-900/60">
            Break-even point: <strong>{npr.format(breakEven)}</strong> in monthly sales (below that,
            the month runs at a loss).
          </p>
        )}
      </div>

      {/* sensitivity table */}
      <h3 className="mt-8 text-lg font-bold text-leaf-800">Weak month vs strong month</h3>
      <p className="mt-1 text-sm text-leaf-900/60">
        Net profit at different monthly sales, using the costs above. Your current setting is
        highlighted.
      </p>
      <div className="mt-3 overflow-hidden rounded-2xl border border-leaf-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-leaf-50 text-xs uppercase tracking-wide text-leaf-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Monthly sales</th>
              <th className="px-4 py-3 text-right font-semibold">Net / month</th>
              <th className="px-4 py-3 text-right font-semibold">Net / year</th>
            </tr>
          </thead>
          <tbody>
            {SALES_REVENUE_POINTS.map((rev) => {
              const nm = netAt(rev)
              const near = Math.abs(rev - sales) <= SLIDER_STEP
              return (
                <tr key={rev} className={'border-t border-leaf-100 ' + (near ? 'bg-leaf-50' : '')}>
                  <td className="px-4 py-2 font-medium text-leaf-900">
                    {npr.format(rev)} <span className="text-leaf-900/40">({lakh(rev)})</span>
                  </td>
                  <td className={'px-4 py-2 text-right font-semibold tabular-nums ' + (nm >= 0 ? 'text-leaf-700' : 'text-amber-700')}>
                    {npr.format(nm)}
                  </td>
                  <td className={'px-4 py-2 text-right tabular-nums ' + (nm >= 0 ? 'text-leaf-700' : 'text-amber-700')}>
                    {npr.format(nm * 12)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-leaf-900/50">
        What-if model: Net profit = Sales − Food &amp; supplies − Fixed costs. It excludes loan
        principal beyond the EMI line, depreciation, and tax. Sales is your assumption — tune the
        costs to your real quotes.
      </p>
    </section>
  )
}
