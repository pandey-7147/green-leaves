import { BUSINESS } from '../data/plan.js'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-leaf-700 to-leaf-900 text-white"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-leaf-100 ring-1 ring-white/15">
          <span className="h-2 w-2 animate-pulse rounded-full bg-leaf-400" />
          Open 24 / 7 · {BUSINESS.location}
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
          {BUSINESS.name}
          <span className="block text-leaf-200">{BUSINESS.tagline}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-leaf-100/90">{BUSINESS.pitch}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {['24/7', 'EV Charging', 'Thakali Kitchen'].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-leaf-100 ring-1 ring-white/15"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#concept"
            className="rounded-full bg-white px-6 py-3 font-semibold text-leaf-800 shadow transition hover:bg-leaf-50"
          >
            Explore the concept
          </a>
          <a
            href="#tracker"
            className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            See the plan tracker
          </a>
        </div>
      </div>
    </section>
  )
}
