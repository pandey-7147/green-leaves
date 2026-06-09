import { useEffect, useMemo, useState } from 'react'
import { BUDGET } from '../data/plan.js'

const STORAGE_KEY = 'green-leaves.budget.v1'

const npr = new Intl.NumberFormat('en-NP', {
  style: 'currency',
  currency: 'NPR',
  maximumFractionDigits: 0,
})

function loadBudget() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore corrupt/unavailable storage — fall back to seed
  }
  return BUDGET
}

export default function CostTracker() {
  const [rows, setRows] = useState(loadBudget)
  const [label, setLabel] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
    } catch {
      // storage unavailable — keep working in-memory
    }
  }, [rows])

  const total = useMemo(
    () => rows.reduce((sum, r) => sum + (Number(r.amount) || 0), 0),
    [rows],
  )

  function updateAmount(id, value) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, amount: value } : r)))
  }

  function updateLabel(id, value) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, label: value } : r)))
  }

  function addRow(e) {
    e.preventDefault()
    const l = label.trim()
    if (!l) return
    setRows((prev) => [...prev, { id: `b${Date.now()}`, label: l, amount: 0 }])
    setLabel('')
  }

  function remove(id) {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  function reset() {
    setRows(BUDGET)
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-leaf-900">Cost tracker</h2>
          <p className="mt-2 text-leaf-900/70">
            Rough budget — edit any figure; the total updates live and saves in your browser.
          </p>
        </div>
        <button
          onClick={reset}
          className="rounded-lg border border-leaf-200 px-3 py-1.5 text-sm font-medium text-leaf-700 transition hover:bg-leaf-100"
        >
          Reset to defaults
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-leaf-100 bg-white">
        <table className="w-full text-left">
          <thead className="bg-leaf-50 text-xs uppercase tracking-wide text-leaf-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Line item</th>
              <th className="px-4 py-3 text-right font-semibold">Amount (NPR)</th>
              <th className="w-10 px-2 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-leaf-100">
                <td className="px-4 py-2">
                  <input
                    value={r.label}
                    onChange={(e) => updateLabel(r.id, e.target.value)}
                    className="w-full rounded-md border border-transparent bg-transparent px-2 py-1 outline-none hover:border-leaf-100 focus:border-leaf-300 focus:bg-leaf-50"
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  <input
                    type="number"
                    min="0"
                    value={r.amount}
                    onChange={(e) => updateAmount(r.id, e.target.value)}
                    className="w-40 rounded-md border border-leaf-200 px-2 py-1 text-right outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
                  />
                </td>
                <td className="px-2 py-2 text-center">
                  <button
                    onClick={() => remove(r.id)}
                    aria-label="Delete row"
                    className="text-leaf-900/20 transition hover:text-red-500"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-leaf-200 bg-leaf-50">
              <td className="px-4 py-3 font-bold text-leaf-900">Total estimate</td>
              <td className="px-4 py-3 text-right font-bold text-leaf-800">{npr.format(total)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      <form onSubmit={addRow} className="mt-4 flex flex-wrap gap-3">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Add a line item…"
          className="min-w-0 flex-1 rounded-lg border border-leaf-200 px-4 py-2.5 outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
        />
        <button
          type="submit"
          className="rounded-lg bg-leaf-600 px-5 py-2.5 font-semibold text-white transition hover:bg-leaf-700"
        >
          Add
        </button>
      </form>

      <p className="mt-4 text-sm text-leaf-900/50">
        Funding plan: financed via a business loan. Figures are placeholders — replace with real
        quotes as you gather them.
      </p>
    </section>
  )
}
