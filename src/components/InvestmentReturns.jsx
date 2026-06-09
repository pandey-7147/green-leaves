import { useEffect, useMemo, useState } from 'react'
import {
  BUDGET_SCENARIOS,
  INVESTMENT_DEFAULTS,
  FINANCE_DEFAULTS,
} from '../data/plan.js'

const npr = new Intl.NumberFormat('en-NP', {
  style: 'currency',
  currency: 'NPR',
  maximumFractionDigits: 0,
})

const budgetKey = (id) => `green-leaves.budget.${id}.v1`
const investKey = (id) => `green-leaves.invest.${id}.v1`

function seedFor(id) {
  return BUDGET_SCENARIOS.find((s) => s.id === id) ?? BUDGET_SCENARIOS[0]
}

// Current total cost for a scenario: prefer the user's edited budget (localStorage),
// fall back to the seed rows. Keeps this tab in sync with the Costs tab.
function scenarioTotal(id) {
  try {
    const raw = localStorage.getItem(budgetKey(id))
    if (raw) {
      const rows = JSON.parse(raw)
      return rows.reduce((s, r) => s + (Number(r.amount) || 0), 0)
    }
  } catch {
    // fall through to seed
  }
  return seedFor(id).rows.reduce((s, r) => s + (Number(r.amount) || 0), 0)
}

function defaultAssumptions(id) {
  const inv = INVESTMENT_DEFAULTS[id] ?? INVESTMENT_DEFAULTS.lean
  return { ...FINANCE_DEFAULTS, ...inv }
}

function loadAssumptions(id) {
  try {
    const raw = localStorage.getItem(investKey(id))
    if (raw) return { ...defaultAssumptions(id), ...JSON.parse(raw) }
  } catch {
    // fall through to defaults
  }
  return defaultAssumptions(id)
}

function Stat({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-leaf-100 bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-leaf-600">{label}</p>
      <p className={'mt-1 text-lg font-bold ' + (accent ? 'text-leaf-700' : 'text-leaf-900')}>
        {value}
      </p>
    </div>
  )
}

function Field({ label, value, onChange, suffix, step = '1' }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-leaf-900/70">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-leaf-200 px-3 py-2 outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
        />
        {suffix && <span className="text-leaf-900/50">{suffix}</span>}
      </div>
    </label>
  )
}

export default function InvestmentReturns() {
  const [scenarioId, setScenarioId] = useState(BUDGET_SCENARIOS[0].id)
  const [a, setA] = useState(() => loadAssumptions(BUDGET_SCENARIOS[0].id))

  const scenario = seedFor(scenarioId)
  const totalCost = useMemo(() => scenarioTotal(scenarioId), [scenarioId])

  useEffect(() => {
    try {
      localStorage.setItem(investKey(scenarioId), JSON.stringify(a))
    } catch {
      // storage unavailable — keep working in-memory
    }
  }, [a, scenarioId])

  function switchScenario(id) {
    if (id === scenarioId) return
    setScenarioId(id)
    setA(loadAssumptions(id))
  }

  function set(key, value) {
    setA((prev) => ({ ...prev, [key]: value }))
  }

  function reset() {
    setA(defaultAssumptions(scenarioId))
  }

  // ---- derived numbers ----
  const shareholders = Math.max(1, Number(a.shareholders) || 1)
  const equityPct = Number(a.equityPct) || 0
  const loanRatePct = Number(a.loanRatePct) || 0
  const monthlyRevenue = Number(a.monthlyRevenue) || 0
  const marginPct = Number(a.marginPct) || 0

  const equity = totalCost * (equityPct / 100)
  const loan = totalCost - equity
  const perShareholder = equity / shareholders
  const ownershipEach = 100 / shareholders

  const annualRevenue = monthlyRevenue * 12
  const annualOperatingProfit = annualRevenue * (marginPct / 100)
  const annualInterest = loan * (loanRatePct / 100)
  const annualNetProfit = annualOperatingProfit - annualInterest
  const profitPerShareholder = annualNetProfit / shareholders
  const roe = equity > 0 ? (annualNetProfit / equity) * 100 : 0
  const paybackYears = annualNetProfit > 0 ? equity / annualNetProfit : null
  const profitable = annualNetProfit > 0

  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <h2 className="text-3xl font-bold text-leaf-900">Investment &amp; returns</h2>
      <p className="mt-2 text-leaf-900/70">
        How the build is funded and a one-year profit projection. Cost is researched; revenue,
        margin, interest and the equity split are editable assumptions.
      </p>

      {/* scenario switcher */}
      <div className="mt-6 inline-flex flex-wrap rounded-xl border border-leaf-200 bg-white p-1">
        {BUDGET_SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => switchScenario(s.id)}
            className={
              'rounded-lg px-4 py-1.5 text-sm font-semibold transition ' +
              (s.id === scenarioId ? 'bg-leaf-600 text-white shadow-sm' : 'text-leaf-700 hover:bg-leaf-100')
            }
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* 1. Funding plan */}
      <h3 className="mt-8 text-lg font-bold text-leaf-800">1 · Funding plan</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total investment" value={npr.format(totalCost)} accent />
        <Stat label={`Shareholders' equity (${equityPct}%)`} value={npr.format(equity)} />
        <Stat label={`Business loan (${100 - equityPct}%)`} value={npr.format(loan)} />
        <Stat label="Shareholders" value={`${shareholders}`} />
      </div>
      <div className="mt-3 rounded-xl border border-leaf-100 bg-leaf-50 p-4 text-sm text-leaf-900/70">
        Each of the <strong>{shareholders}</strong> shareholders contributes{' '}
        <strong>{npr.format(perShareholder)}</strong> and owns{' '}
        <strong>{ownershipEach.toFixed(1)}%</strong> of the business. The remaining{' '}
        <strong>{npr.format(loan)}</strong> is a business loan at {loanRatePct}% p.a. (the loan is
        debt, not equity — owners keep 100% of the company).
      </div>

      {/* 2. How to invest — assumptions */}
      <h3 className="mt-8 text-lg font-bold text-leaf-800">2 · How to invest</h3>
      <p className="mt-1 text-sm text-leaf-900/60">
        Adjust the assumptions; everything recalculates live and saves in your browser.
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Number of shareholders" value={a.shareholders} onChange={(v) => set('shareholders', v)} />
        <Field label="Equity funded by owners" value={a.equityPct} onChange={(v) => set('equityPct', v)} suffix="%" />
        <Field label="Loan interest rate" value={a.loanRatePct} onChange={(v) => set('loanRatePct', v)} suffix="% p.a." />
        <Field label="Expected monthly revenue" value={a.monthlyRevenue} onChange={(v) => set('monthlyRevenue', v)} suffix="NPR" step="10000" />
        <Field label="Net operating margin" value={a.marginPct} onChange={(v) => set('marginPct', v)} suffix="%" />
        <div className="flex items-end">
          <button
            onClick={reset}
            className="rounded-lg border border-leaf-200 px-3 py-2 text-sm font-medium text-leaf-700 transition hover:bg-leaf-100"
          >
            Reset assumptions
          </button>
        </div>
      </div>

      {/* 3. What to expect in a year */}
      <h3 className="mt-8 text-lg font-bold text-leaf-800">3 · What to expect in year one</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="Annual revenue" value={npr.format(annualRevenue)} />
        <Stat label={`Operating profit (${marginPct}%)`} value={npr.format(annualOperatingProfit)} />
        <Stat label="Loan interest (year)" value={`– ${npr.format(annualInterest)}`} />
        <Stat label="Net profit (year)" value={npr.format(annualNetProfit)} accent />
        <Stat label="Net profit per shareholder" value={npr.format(profitPerShareholder)} accent />
        <Stat label="Return on equity" value={`${roe.toFixed(0)}%`} accent />
      </div>

      <div
        className={
          'mt-4 rounded-xl px-4 py-3 text-sm font-medium ' +
          (profitable ? 'bg-leaf-100 text-leaf-800' : 'bg-amber-100 text-amber-800')
        }
      >
        {profitable ? (
          <>
            At these assumptions, year-one net profit is{' '}
            <strong>{npr.format(annualNetProfit)}</strong> —{' '}
            <strong>{npr.format(profitPerShareholder)}</strong> per shareholder, a{' '}
            <strong>{roe.toFixed(0)}%</strong> return on their cash
            {paybackYears && (
              <>, with equity paid back in roughly <strong>{paybackYears.toFixed(1)} years</strong></>
            )}
            .
          </>
        ) : (
          <>
            At these assumptions the first year does not cover loan interest (net{' '}
            <strong>{npr.format(annualNetProfit)}</strong>). Raise revenue/margin, lower the loan
            share, or expect profitability from a later year.
          </>
        )}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-leaf-900/50">
        Illustrative only. Costs are June-2026 market research; <strong>revenue and margin are
        planning assumptions, not researched</strong>. Net profit here is operating profit minus
        loan <em>interest</em> only — it excludes loan principal repayment, depreciation, and taxes.
        Use real figures and an accountant before committing.
      </p>
    </section>
  )
}
