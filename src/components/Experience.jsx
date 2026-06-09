import { EXPERIENCE } from '../data/plan.js'

export default function Experience() {
  return (
    <section id="experience" className="bg-bark-900 py-20 text-white">
      <div className="mx-auto max-w-6xl px-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300 ring-1 ring-amber-400/25">
          The captive-audience insight
        </span>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{EXPERIENCE.headline}</h2>
        <p className="mt-3 max-w-2xl text-leaf-100/80">{EXPERIENCE.lead}</p>

        {/* journey strip */}
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCE.steps.map((s, idx) => (
            <li key={s.label} className="relative rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <span className="absolute right-4 top-4 font-mono text-xs text-leaf-100/40">
                0{idx + 1}
              </span>
              <div className="text-3xl">{s.icon}</div>
              <h3 className="mt-3 font-semibold text-leaf-200">{s.label}</h3>
              <p className="mt-1 text-sm text-leaf-100/70">{s.desc}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-2xl border-l-2 border-amber-400/60 pl-4 text-leaf-100/90">
          {EXPERIENCE.close}
        </p>
      </div>
    </section>
  )
}
