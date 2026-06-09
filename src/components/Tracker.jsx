import { useEffect, useMemo, useState } from 'react'
import { SEED_MILESTONES } from '../data/plan.js'

const STORAGE_KEY = 'green-leaves.milestones.v1'

function loadMilestones() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore corrupt/unavailable storage — fall back to seed
  }
  return SEED_MILESTONES
}

export default function Tracker() {
  const [items, setItems] = useState(loadMilestones)
  const [text, setText] = useState('')
  const [group, setGroup] = useState('General')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage may be unavailable (private mode); UI still works in-memory
    }
  }, [items])

  const { done, total, pct } = useMemo(() => {
    // Future-phase items are aspirational — don't count them toward Phase-1 progress.
    const active = items.filter((i) => i.phase !== 'future')
    const total = active.length
    const done = active.filter((i) => i.done).length
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
  }, [items])

  const groups = useMemo(() => {
    const map = new Map()
    for (const i of items) {
      if (!map.has(i.group)) map.set(i.group, [])
      map.get(i.group).push(i)
    }
    return [...map.entries()]
  }, [items])

  function addItem(e) {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    const id = `t${Date.now()}`
    setItems((prev) => [...prev, { id, text: t, done: false, group: group.trim() || 'General' }])
    setText('')
  }

  function toggle(id) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)))
  }

  function remove(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function reset() {
    setItems(SEED_MILESTONES)
  }

  return (
    <section id="tracker" className="mx-auto max-w-6xl px-5 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-leaf-900">Plan tracker</h2>
          <p className="mt-2 max-w-xl text-leaf-900/70">
            Live checklist of everything needed to open. Saved in your browser as you go.
          </p>
        </div>
        <button
          onClick={reset}
          className="rounded-lg border border-leaf-200 px-3 py-1.5 text-sm font-medium text-leaf-700 transition hover:bg-leaf-100"
        >
          Reset to defaults
        </button>
      </div>

      {/* progress */}
      <div className="mt-6 rounded-2xl border border-leaf-100 bg-white p-5">
        <div className="flex items-center justify-between text-sm font-medium text-leaf-900/70">
          <span>
            {done} of {total} done
          </span>
          <span>{pct}%</span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-leaf-100">
          <div
            className="h-full rounded-full bg-leaf-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* add form */}
      <form onSubmit={addItem} className="mt-6 flex flex-wrap gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task…"
          className="min-w-0 flex-1 rounded-lg border border-leaf-200 bg-white px-4 py-2.5 outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
        />
        <input
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          placeholder="Group"
          className="w-36 rounded-lg border border-leaf-200 bg-white px-4 py-2.5 outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
        />
        <button
          type="submit"
          className="rounded-lg bg-leaf-600 px-5 py-2.5 font-semibold text-white transition hover:bg-leaf-700"
        >
          Add
        </button>
      </form>

      {/* grouped list */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {groups.map(([name, list]) => (
          <div key={name} className="rounded-2xl border border-leaf-100 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-leaf-600">{name}</h3>
            <ul className="space-y-2">
              {list.map((i) => (
                <li key={i.id} className="group flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={i.done}
                    onChange={() => toggle(i.id)}
                    disabled={i.phase === 'future'}
                    className="h-4 w-4 accent-leaf-600 disabled:opacity-40"
                  />
                  <span
                    className={
                      'flex-1 text-sm ' +
                      (i.phase === 'future'
                        ? 'italic text-leaf-900/40'
                        : i.done
                          ? 'text-leaf-900/40 line-through'
                          : 'text-leaf-900/80')
                    }
                  >
                    {i.text}
                    {i.phase === 'future' && (
                      <span className="ml-2 rounded bg-leaf-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase not-italic text-leaf-600">
                        future
                      </span>
                    )}
                  </span>
                  <button
                    onClick={() => remove(i.id)}
                    aria-label="Delete task"
                    className="text-leaf-900/20 opacity-0 transition hover:text-red-500 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
