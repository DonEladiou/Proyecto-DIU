import { useState, useEffect } from "react"

export default function NotificationBell({ className = "" }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <button
        aria-label="Abrir notificaciones"
        onClick={() => setOpen(true)}
        className={`relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring ${className}`}
      >
        {/* ícono campana */}
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M10 20a2 2 0 0 0 4 0" />
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9z" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
          {/* overlay */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          {/* panel */}
          <aside className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Notificaciones</h2>
              <button
                aria-label="Cerrar"
                onClick={() => setOpen(false)}
                className="p-2 rounded hover:bg-gray-100"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-500">No tienes notificaciones.</p>
          </aside>
        </div>
      )}
    </>
  )
}
