import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import Reservations from './pages/Reservations'
import MyReservations from './pages/MyReservations'
import Articulos from "./pages/Articulos";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/busqueda" element={<Search />} />
            <Route path="/reservas" element={<Reservations />} />
            <Route path="/mis-reservas" element={<MyReservations />} />
            {/* NUEVA RUTA */}
            <Route path="/articulos" element={<Articulos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
