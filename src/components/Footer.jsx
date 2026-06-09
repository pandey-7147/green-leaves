import { BUSINESS } from '../data/plan.js'

export default function Footer() {
  return (
    <footer className="border-t border-leaf-100 bg-leaf-50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 font-bold text-leaf-800">
          <span>🌿</span>
          <span>{BUSINESS.name}</span>
        </div>
        <p className="text-sm text-leaf-900/60">{BUSINESS.location}</p>
        <div className="flex items-center gap-4">
          <p className="text-sm text-leaf-900/40">Work in progress · planning stage</p>
          <a href="#admin" className="text-xs text-leaf-900/30 transition hover:text-leaf-600">
            Admin
          </a>
        </div>
      </div>
    </footer>
  )
}
