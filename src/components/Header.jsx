import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Header() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && setOpen(false)
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo y navegación */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-primary text-3xl">import_contacts</span>
                <h1 className="text-xl font-bold">BibliotecaUSM</h1>
              </Link>

              {/* Navegación principal */}
              <nav className="hidden md:flex items-center gap-6">
                {[
                  { path: '/', label: 'Inicio' },
                  { path: '/busqueda', label: 'Explorar' },
                  { path: '/reservas', label: 'Reservas' },
                  { path: '/mis-reservas', label: 'Mis Reservas' },
                  { path: '/articulos', label: 'Artículos' },
                ].map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === path
                        ? 'text-primary font-semibold'
                        : 'hover:text-primary'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Iconos laterales */}
            <div className="flex items-center gap-4">
              {/* Campanita */}
              <button
                onClick={() => setOpen(true)}
                aria-label="Abrir notificaciones"
                className="relative rounded-full p-2 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined">notifications</span>
              </button>

              {/* Menú móvil */}
              <button className="md:hidden">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Panel deslizante de notificaciones */}
      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
          {/* fondo oscuro */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />

          {/* panel */}
          <aside className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-background-dark shadow-xl border-l border-slate-200 dark:border-slate-700 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Notificaciones</h2>
              <button
                aria-label="Cerrar"
                onClick={() => setOpen(false)}
                className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">close</span>
              </button>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-2">No tienes notificaciones.</p>
          </aside>
        </div>
      )}
    </>
  )
}

export default Header
