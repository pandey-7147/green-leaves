const POINTS = [
  {
    k: 'Built for the road',
    v: 'We target travellers, not locals — people mid-journey between Butwal and Chitwan who need food, coffee, and a charge.',
  },
  {
    k: 'Always open',
    v: 'A genuine 24/7 stop. Night drivers, early starts, and odd-hour buses all get a hot, reliable meal.',
  },
  {
    k: 'Eat while you charge',
    v: 'Pairing a restaurant with EV charging turns dwell time into an advantage — the charge becomes the reason to stop here.',
  },
]

export default function Concept() {
  return (
    <section id="concept" className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="text-3xl font-bold text-leaf-900">The concept</h2>
      <p className="mt-3 max-w-2xl text-leaf-900/70">
        One stop on the East–West Highway that solves three needs travellers have at the same
        moment: a meal, a coffee, and a charge.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {POINTS.map((p) => (
          <div
            key={p.k}
            className="rounded-2xl border border-leaf-100 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-leaf-700">{p.k}</h3>
            <p className="mt-2 text-sm leading-relaxed text-leaf-900/70">{p.v}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
