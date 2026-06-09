import { OPPORTUNITY } from '../data/plan.js'

export default function Opportunity() {
  return (
    <section id="opportunity" className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="text-3xl font-bold text-leaf-900">The opportunity</h2>
      <p className="mt-3 max-w-2xl text-leaf-900/70">
        Why this spot, and why now — the case a lender or partner needs to hear.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {OPPORTUNITY.map((o) => (
          <div
            key={o.title}
            className="rounded-2xl border border-leaf-100 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-leaf-700">{o.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-leaf-900/70">{o.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
