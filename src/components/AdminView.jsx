import { BUSINESS } from '../data/plan.js'
import AdminGate from './AdminGate.jsx'
import CostTracker from './CostTracker.jsx'

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
        <CostTracker />
      </AdminGate>
    </div>
  )
}
