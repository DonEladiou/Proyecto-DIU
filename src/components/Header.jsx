import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="material-symbols-outlined text-primary text-3xl">import_contacts</span>
              <h1 className="text-xl font-bold">BibliotecaUSM</h1>
            </Link>

            {/* Navegación principal */}
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'text-primary font-semibold' 
                    : 'hover:text-primary'
                }`}
              >
                Inicio
              </Link>

              <Link 
                to="/busqueda" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/busqueda' 
                    ? 'text-primary font-semibold' 
                    : 'hover:text-primary'
                }`}
              >
                Explorar
              </Link>

              <Link 
                to="/reservas" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/reservas' 
                    ? 'text-primary font-semibold' 
                    : 'hover:text-primary'
                }`}
              >
                Reservas
              </Link>

              <Link 
                to="/mis-reservas" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/mis-reservas' 
                    ? 'text-primary font-semibold' 
                    : 'hover:text-primary'
                }`}
              >
                Mis Reservas
              </Link>

              {/* 🔹 Nuevo enlace agregado */}
              <Link 
                to="/articulos" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/articulos' 
                    ? 'text-primary font-semibold' 
                    : 'hover:text-primary'
                }`}
              >
                Artículos
              </Link>
            </nav>
          </div>

          {/* Íconos laterales */}
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="md:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
