import { useState } from 'react'
import { ADMIN_PIN } from '../data/plan.js'

const SESSION_KEY = 'green-leaves.admin.unlocked'

function isUnlocked() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export default function AdminGate({ children }) {
  const [unlocked, setUnlocked] = useState(isUnlocked)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    if (pin === String(ADMIN_PIN)) {
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // session storage unavailable — stay unlocked in-memory for this view
      }
      setUnlocked(true)
      setError('')
    } else {
      setError('Incorrect PIN.')
      setPin('')
    }
  }

  if (unlocked) return children

  return (
    <div className="mx-auto mt-20 max-w-sm rounded-2xl border border-leaf-100 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-bold text-leaf-900">Admin access</h2>
      <p className="mt-2 text-sm text-leaf-900/60">
        Enter the PIN to view the private cost tracker.
      </p>
      <form onSubmit={submit} className="mt-5 space-y-3">
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
          className="w-full rounded-lg border border-leaf-200 px-4 py-2.5 outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-lg bg-leaf-600 px-4 py-2.5 font-semibold text-white transition hover:bg-leaf-700"
        >
          Unlock
        </button>
      </form>
      <p className="mt-4 text-xs text-leaf-900/40">
        Note: this only hides costs from casual viewers. It runs in the browser and is not strong
        security.
      </p>
    </div>
  )
}
