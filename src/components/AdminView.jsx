import { useState } from 'react'
import { BUSINESS } from '../data/plan.js'
import AdminGate from './AdminGate.jsx'
import CostTracker from './CostTracker.jsx'
import InvestmentReturns from './InvestmentReturns.jsx'
import Timeline from './Timeline.jsx'

const TABS = [
  { id: 'costs', label: 'Cost tracker' },
  { id: 'invest', label: 'Investment & returns' },
  { id: 'timeline', label: 'Timeline' },
]

function AdminTabs() {
  const [tab, setTab] = useState('costs')
  return (
    <div>
      <div className="mx-auto max-w-3xl px-5 pt-8">
        <div className="inline-flex rounded-xl border border-leaf-200 bg-white p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={
                'rounded-lg px-4 py-1.5 text-sm font-semibold transition ' +
                (t.id === tab ? 'bg-leaf-700 text-white shadow-sm' : 'text-leaf-700 hover:bg-leaf-100')
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {tab === 'costs' && <CostTracker />}
      {tab === 'invest' && <InvestmentReturns />}
      {tab === 'timeline' && <Timeline />}
    </div>
  )
}

export default function AdminView() {
  return (
    <div className="min-h-screen bg-leaf-50">
      <header className="border-b border-leaf-100 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <span className="flex items-center gap-2 font-bold text-leaf-800">
            <span>🌿</span>
            {BUSINESS.name} · Admin
          </span>
          <a href="#top" className="text-sm font-medium text-leaf-700 hover:text-leaf-800">
            ← Back to site
          </a>
        </div>
      </header>
      <AdminGate>
        <AdminTabs />
      </AdminGate>
    </div>
  )
}
