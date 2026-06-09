const LINKS = [
  { href: '#opportunity', label: 'Opportunity' },
  { href: '#experience', label: 'Experience' },
  { href: '#offerings', label: 'Offerings' },
  { href: '#attractions', label: 'Attractions' },
  { href: '#tracker', label: 'Roadmap' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-leaf-100 bg-leaf-50/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2 font-bold text-leaf-800">
          <span className="text-xl">🌿</span>
          <span>Green Leaves</span>
          <span className="ml-1 rounded-full bg-amber-400/20 px-2 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-400/30">
            Phase 1
          </span>
        </a>
        <ul className="hidden gap-6 text-sm font-medium text-leaf-900/70 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-leaf-700">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#tracker"
          className="rounded-full bg-leaf-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-leaf-700"
        >
          View plan
        </a>
      </nav>
    </header>
  )
}
