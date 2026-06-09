import { ATTRACTIONS } from '../data/plan.js'

export default function Attractions() {
  return (
    <section id="attractions" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-3xl font-bold text-leaf-900">Attractions & amenities</h2>
        <p className="mt-3 max-w-2xl text-leaf-900/70">
          Everything that turns a quick stop into the obvious choice on the highway. Mix and match
          as the budget allows — phase what's needed first.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ATTRACTIONS.map((a) => (
            <div
              key={a.title}
              className="flex gap-4 rounded-xl border border-leaf-100 bg-leaf-50 p-4 transition hover:border-leaf-200"
            >
              <div className="text-2xl">{a.icon}</div>
              <div>
                <h3 className="font-semibold text-leaf-800">{a.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-leaf-900/70">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
