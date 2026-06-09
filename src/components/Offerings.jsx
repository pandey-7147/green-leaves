import { OFFERINGS } from '../data/plan.js'

export default function Offerings() {
  return (
    <section id="offerings" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-3xl font-bold text-leaf-900">What we offer</h2>
        <p className="mt-3 max-w-2xl text-leaf-900/70">
          Core offerings from day one, with an economical tier planned for a later phase.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map((o) => (
            <div
              key={o.title}
              className="relative rounded-2xl border border-leaf-100 bg-leaf-50 p-6 transition hover:border-leaf-200"
            >
              {o.phase && (
                <span className="absolute right-4 top-4 rounded-full bg-leaf-200 px-2.5 py-0.5 text-xs font-semibold text-leaf-800">
                  {o.phase}
                </span>
              )}
              <div className="text-3xl">{o.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-leaf-800">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-leaf-900/70">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
