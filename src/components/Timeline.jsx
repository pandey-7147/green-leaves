import { TIMELINE } from '../data/plan.js'

const WEEKS_PER_MONTH = 4.345

function weekLabel(start, weeks) {
  const end = start + weeks
  return `Wk ${start}–${end} · ${weeks} wk`
}

export default function Timeline() {
  const { planLabel, totalWeeks, baseEstimate, riskEstimate, phases, topRisks } = TIMELINE
  const months = Math.round(totalWeeks / WEEKS_PER_MONTH)
  // month gridlines for the Gantt background
  const monthTicks = Array.from({ length: months + 1 }, (_, i) => i)

  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <h2 className="text-3xl font-bold text-leaf-900">Timeline to opening</h2>
      <p className="mt-2 text-leaf-900/70">
        From <strong>location confirmed</strong> (week 0) to <strong>grand opening</strong> for the{' '}
        {planLabel}. Some phases run in parallel; the darker bars are the critical path.
      </p>

      {/* headline estimate */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-leaf-100 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-leaf-600">Base estimate</p>
          <p className="mt-1 text-lg font-bold text-leaf-700">{baseEstimate}</p>
        </div>
        <div className="rounded-xl border border-leaf-100 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-leaf-600">With slippage</p>
          <p className="mt-1 text-lg font-bold text-leaf-900">{riskEstimate}</p>
        </div>
        <div className="rounded-xl border border-leaf-100 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-leaf-600">Span</p>
          <p className="mt-1 text-lg font-bold text-leaf-900">
            {totalWeeks} weeks (~{months} mo)
          </p>
        </div>
      </div>

      {/* gantt */}
      <div className="mt-6 rounded-2xl border border-leaf-100 bg-white p-4 sm:p-6">
        {/* month axis */}
        <div className="relative mb-2 ml-0 h-4 sm:ml-56">
          {monthTicks.map((m) => (
            <span
              key={m}
              className="absolute -translate-x-1/2 text-[10px] text-leaf-900/40"
              style={{ left: `${((m * WEEKS_PER_MONTH) / totalWeeks) * 100}%` }}
            >
              {m === 0 ? 'M0' : `M${m}`}
            </span>
          ))}
        </div>

        <ul className="space-y-2.5">
          {phases.map((p) => (
            <li key={p.id} className="sm:flex sm:items-center sm:gap-3">
              <div className="mb-1 sm:mb-0 sm:w-56 sm:shrink-0">
                <p className="text-sm font-semibold text-leaf-900">{p.name}</p>
                <p className="text-xs text-leaf-900/50">{weekLabel(p.startWeek, p.weeks)}</p>
              </div>
              {/* track */}
              <div className="relative h-6 flex-1 rounded bg-leaf-50">
                {monthTicks.map((m) => (
                  <span
                    key={m}
                    className="absolute top-0 h-full w-px bg-leaf-100"
                    style={{ left: `${((m * WEEKS_PER_MONTH) / totalWeeks) * 100}%` }}
                  />
                ))}
                <span
                  className={
                    'absolute top-1/2 h-4 -translate-y-1/2 rounded ' +
                    (p.critical ? 'bg-leaf-700' : 'bg-leaf-400')
                  }
                  style={{
                    left: `${(p.startWeek / totalWeeks) * 100}%`,
                    width: `${(p.weeks / totalWeeks) * 100}%`,
                  }}
                  title={weekLabel(p.startWeek, p.weeks)}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex gap-4 text-xs text-leaf-900/50">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded bg-leaf-700" /> Critical path
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded bg-leaf-400" /> Runs in parallel
          </span>
        </div>
      </div>

      {/* blockers by phase */}
      <h3 className="mt-8 text-lg font-bold text-leaf-800">Blockers by phase</h3>
      <div className="mt-3 space-y-3">
        {phases.map((p) => (
          <div key={p.id} className="rounded-xl border border-leaf-100 bg-white p-4">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-leaf-900">{p.name}</p>
              {p.critical && (
                <span className="rounded bg-leaf-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-leaf-700">
                  critical
                </span>
              )}
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-leaf-900/70">
              {p.blockers.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* top risks */}
      <h3 className="mt-8 text-lg font-bold text-leaf-800">Biggest risks to the date</h3>
      <ul className="mt-3 space-y-2">
        {topRisks.map((r) => (
          <li
            key={r}
            className="flex items-start gap-2 rounded-xl bg-amber-100 px-4 py-3 text-sm text-amber-900"
          >
            <span>⚠</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-leaf-900/50">
        Indicative schedule for planning. Durations are estimates — the loan, NEA grid connection,
        and monsoon are the main swing factors. Confirm lead times with your bank, NEA, and
        contractor before committing dates.
      </p>
    </section>
  )
}
