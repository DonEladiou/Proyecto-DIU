import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

function MyReservations() {
  const [reservations, setReservations] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all')
  const [reservationToCancel, setReservationToCancel] = useState(null)
  const [showCancelModal, setShowCancelModal] = useState(false)

  useEffect(() => {
    loadReservations()
  }, [])

  const loadReservations = () => {
    const stored = localStorage.getItem('reservations')
    setReservations(stored ? JSON.parse(stored) : [])
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getDate()} de ${monthNames[date.getMonth()]} de ${date.getFullYear()}`
  }

  const getReservationStatus = (reservation) => {
    const now = new Date()
    const reservationDate = new Date(reservation.date)

    if (reservation.status === 'cancelada') {
      return 'cancelada'
    }

    if (reservationDate < now) {
      return 'pasada'
    }

    return 'activa'
  }

  const cancelReservation = (reservationId) => {
    const updated = reservations.map(r =>
      r.id === reservationId ? { ...r, status: 'cancelada' } : r
    )
    setReservations(updated)
    localStorage.setItem('reservations', JSON.stringify(updated))
    setShowCancelModal(false)
    setReservationToCancel(null)
  }

  const filteredReservations = reservations.filter(r => {
    const status = getReservationStatus(r)
    if (currentFilter === 'all') return true
    if (currentFilter === 'active') return status === 'activa'
    if (currentFilter === 'cancelled') return status === 'cancelada'
    return true
  })

  const renderReservation = (reservation) => {
    const status = getReservationStatus(reservation)
    const statusColors = {
      'activa': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      'pasada': 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
      'cancelada': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
    }

    const statusTexts = {
      'activa': 'Activa',
      'pasada': 'Pasada',
      'cancelada': 'Cancelada'
    }

    return (
      <div
        key={reservation.id}
        className="reservation-card bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{reservation.room}</h3>
            <p className="text-slate-600 dark:text-slate-400">Biblioteca {reservation.library}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
            {statusTexts[status]}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Fecha</p>
            <p className="font-medium text-slate-900 dark:text-white">{formatDate(reservation.date)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Hora</p>
            <p className="font-medium text-slate-900 dark:text-white">{reservation.time}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Reservada el {formatDate(reservation.createdAt)}
          </p>
          {status === 'activa' && (
            <button
              onClick={() => {
                setReservationToCancel(reservation.id)
                setShowCancelModal(true)
              }}
              className="cancel-btn bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Mis Reservas</h1>
            <p className="text-slate-600 dark:text-slate-400">Gestiona tus reservas de salas de estudio</p>
          </div>
          <Link
            to="/reservas"
            className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Nueva Reserva
          </Link>
        </div>

        {/* Filtros */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              className={`filter-btn px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                currentFilter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-slate-200 dark:bg-slate-800 hover:bg-primary/20 dark:hover:bg-primary/30'
              }`}
              onClick={() => setCurrentFilter('all')}
            >
              Todas
            </button>
            <button
              className={`filter-btn px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                currentFilter === 'active'
                  ? 'bg-primary text-white'
                  : 'bg-slate-200 dark:bg-slate-800 hover:bg-primary/20 dark:hover:bg-primary/30'
              }`}
              onClick={() => setCurrentFilter('active')}
            >
              Activas
            </button>
            <button
              className={`filter-btn px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                currentFilter === 'cancelled'
                  ? 'bg-primary text-white'
                  : 'bg-slate-200 dark:bg-slate-800 hover:bg-primary/20 dark:hover:bg-primary/30'
              }`}
              onClick={() => setCurrentFilter('cancelled')}
            >
              Canceladas
            </button>
          </div>
        </div>

        {/* Lista de reservas */}
        {filteredReservations.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <span className="material-symbols-outlined text-slate-400 text-3xl">event_available</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No tienes reservas</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Haz tu primera reserva de sala de estudio</p>
            <Link
              to="/reservas"
              className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              Hacer Reserva
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReservations.map(renderReservation)}
          </div>
        )}
      </div>

      {/* Modal de confirmación de cancelación */}
      {showCancelModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            setShowCancelModal(false)
            setReservationToCancel(null)
          }}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-xl p-8 max-w-md mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-3xl">warning</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">¿Cancelar Reserva?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Esta acción no se puede deshacer. La reserva será eliminada permanentemente.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (reservationToCancel) {
                      cancelReservation(reservationToCancel)
                    }
                  }}
                  className="flex-1 bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sí, Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowCancelModal(false)
                    setReservationToCancel(null)
                  }}
                  className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  No, Mantener
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyReservations

