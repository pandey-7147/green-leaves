import { LOCATION_OPTIONS } from '../data/plan.js'

export default function LocationPlan() {
  return (
    <section id="location" className="bg-leaf-900 py-20 text-white">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-3xl font-bold">Where</h2>
        <p className="mt-3 max-w-2xl text-leaf-100/80">
          On the East–West Highway, somewhere between <strong>Butwal and Sunwal</strong> — the exact
          plot is still being scouted. Candidate sites under comparison:
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {LOCATION_OPTIONS.map((loc) => (
            <div key={loc.name} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold text-leaf-200">{loc.name}</h3>
              <p className="mt-2 text-sm text-leaf-100/70">{loc.note}</p>
              <p className="mt-4 text-xs uppercase tracking-wide text-leaf-100/50">
                {loc.score == null ? 'Not yet scored' : `Score: ${loc.score}/10`}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-leaf-100/50">
          Edit candidates and scores in <code className="text-leaf-200">src/data/plan.js</code>.
        </p>
      </div>
    </section>
  )
}
