import { AUDIENCE } from '../data/plan.js'

export default function Audience() {
  return (
    <section id="audience" className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="text-3xl font-bold text-leaf-900">Who we serve</h2>
      <p className="mt-3 max-w-2xl text-leaf-900/70">
        Deliberately not aimed at locals — the whole experience is tuned for people on the move.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {AUDIENCE.map((a) => (
          <li
            key={a}
            className="flex items-start gap-3 rounded-xl border border-leaf-100 bg-white p-4"
          >
            <span className="mt-0.5 text-leaf-500">●</span>
            <span className="text-leaf-900/80">{a}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
