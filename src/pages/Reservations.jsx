import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const libraries = [
  { name: 'Casa Central', hours: '08:15 – 19:45' },
  { name: 'Sede Viña del Mar', hours: '08:30 – 20:30' },
  { name: 'Sede Concepción', hours: '08:10 – 20:15' },
  { name: 'Campus Vitacura', hours: '08:15 – 19:45' },
  { name: 'Campus San Joaquín', hours: '08:00 – 20:00' },
]

const timeSlots = [
  '08:00 - 10:00',
  '10:00 - 12:00',
  '12:00 - 14:00',
  '14:00 - 16:00',
  '16:00 - 18:00',
  '18:00 - 20:00',
]

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

function Reservations() {
  const navigate = useNavigate()
  const [selectedLibrary, setSelectedLibrary] = useState('Casa Central')
  const [selectedRoom, setSelectedRoom] = useState('Sala individual')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [occupiedSlots, setOccupiedSlots] = useState(() => {
    const stored = localStorage.getItem('occupiedSlots')
    return stored ? JSON.parse(stored) : {}
  })
  const [showModal, setShowModal] = useState(false)

  const getDateKey = (dateObj) => {
    const y = dateObj.getFullYear()
    const m = String(dateObj.getMonth() + 1).padStart(2, '0')
    const d = String(dateObj.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const getSlotKey = (library, room, dateObj, time) => {
    const dateKey = getDateKey(dateObj)
    return `${library}|${room}|${dateKey}|${time}`
  }

  const isSlotAvailable = (library, room, dateObj, time) => {
    if (!time) return false
    const key = getSlotKey(library, room, dateObj, time)
    return occupiedSlots[key] !== true
  }

  const markSlotOccupied = (library, room, dateObj, time) => {
    const key = getSlotKey(library, room, dateObj, time)
    const newOccupiedSlots = { ...occupiedSlots, [key]: true }
    setOccupiedSlots(newOccupiedSlots)
    localStorage.setItem('occupiedSlots', JSON.stringify(newOccupiedSlots))
  }

  const formatDate = (date) => {
    const day = date.getDate()
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    return `${day} de ${month} de ${year}`
  }

  const handleConfirmReservation = () => {
    if (!selectedTime) {
      alert('Por favor selecciona un horario')
      return
    }

    if (!isSlotAvailable(selectedLibrary, selectedRoom, selectedDate, selectedTime)) {
      alert('La franja seleccionada ya no está disponible. Por favor, elige otra.')
      return
    }

    const reservation = {
      id: Date.now(),
      library: selectedLibrary,
      room: selectedRoom,
      date: selectedDate.toISOString(),
      time: selectedTime,
      createdAt: new Date().toISOString(),
      status: 'confirmada'
    }

    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    reservations.push(reservation)
    localStorage.setItem('reservations', JSON.stringify(reservations))

    markSlotOccupied(selectedLibrary, selectedRoom, selectedDate, selectedTime)
    setShowModal(true)
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const selectedDay = selectedDate.getDate()
    const selectedMonth = selectedDate.getMonth()
    const selectedYear = selectedDate.getFullYear()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Días vacíos al inicio
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>)
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDay && month === selectedMonth && year === selectedYear
      days.push(
        <button
          key={day}
          className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors ${
            isSelected
              ? 'bg-primary text-white'
              : 'hover:bg-primary/10 dark:hover:bg-primary/20'
          }`}
          onClick={() => {
            const newDate = new Date(year, month, day)
            setSelectedDate(newDate)
          }}
        >
          {day}
        </button>
      )
    }

    return days
  }

  const availableTimeSlots = timeSlots.filter(slot => 
    isSlotAvailable(selectedLibrary, selectedRoom, selectedDate, slot)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Reservar sala de estudio</h1>
          <div className="space-y-8">
            {/* Selección de biblioteca */}
            <div>
              <h2 className="text-xl font-bold mb-4">Disponibilidad de salas de estudio</h2>
              <div className="space-y-4">
                {libraries.map((library) => (
                  <div
                    key={library.name}
                    className="p-4 rounded-lg border border-border-light dark:border-border-dark flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold">Biblioteca {library.name}</p>
                      <p className="text-sm text-subtle-light dark:text-subtle-dark">{library.hours}</p>
                    </div>
                    <button
                      className={`font-bold py-2 px-4 rounded-lg transition-colors text-sm ${
                        selectedLibrary === library.name
                          ? 'bg-primary text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-primary/90'
                      }`}
                      onClick={() => setSelectedLibrary(library.name)}
                    >
                      {selectedLibrary === library.name ? '✓ Seleccionada' : 'Seleccionar'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Selección de fecha y hora */}
            <div>
              <h2 className="text-xl font-bold mb-4">Seleccionar fecha y hora</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20"
                      onClick={() => {
                        const newMonth = new Date(currentMonth)
                        newMonth.setMonth(newMonth.getMonth() - 1)
                        setCurrentMonth(newMonth)
                      }}
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <p className="text-base font-bold">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </p>
                    <button
                      className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20"
                      onClick={() => {
                        const newMonth = new Date(currentMonth)
                        newMonth.setMonth(newMonth.getMonth() + 1)
                        setCurrentMonth(newMonth)
                      }}
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    <div className="font-bold text-subtle-light dark:text-subtle-dark">D</div>
                    <div className="font-bold text-subtle-light dark:text-subtle-dark">L</div>
                    <div className="font-bold text-subtle-light dark:text-subtle-dark">M</div>
                    <div className="font-bold text-subtle-light dark:text-subtle-dark">X</div>
                    <div className="font-bold text-subtle-light dark:text-subtle-dark">J</div>
                    <div className="font-bold text-subtle-light dark:text-subtle-dark">V</div>
                    <div className="font-bold text-subtle-light dark:text-subtle-dark">S</div>
                    {renderCalendar()}
                  </div>
                </div>
                <div className="space-y-4">
                  <select
                    id="time-selector"
                    className="w-full h-12 px-4 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-primary focus:border-primary"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="">Seleccionar hora</option>
                    {timeSlots.map((slot) => (
                      <option
                        key={slot}
                        value={slot}
                        disabled={!isSlotAvailable(selectedLibrary, selectedRoom, selectedDate, slot)}
                        style={{
                          color: isSlotAvailable(selectedLibrary, selectedRoom, selectedDate, slot) ? '' : '#9ca3af',
                          opacity: isSlotAvailable(selectedLibrary, selectedRoom, selectedDate, slot) ? '' : '0.5'
                        }}
                      >
                        {slot}
                      </option>
                    ))}
                  </select>
                  {selectedTime && (
                    <div className={`mt-2 text-sm ${
                      isSlotAvailable(selectedLibrary, selectedRoom, selectedDate, selectedTime)
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {isSlotAvailable(selectedLibrary, selectedRoom, selectedDate, selectedTime)
                        ? 'Disponible'
                        : 'No disponible'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Selección de sala */}
            <div>
              <h2 className="text-xl font-bold mb-4">Seleccionar sala</h2>
              <div className="flex flex-wrap gap-3">
                <label className="cursor-pointer">
                  <input
                    className="peer sr-only"
                    name="room"
                    type="radio"
                    checked={selectedRoom === 'Sala individual'}
                    onChange={() => setSelectedRoom('Sala individual')}
                  />
                  <div className="px-4 py-2 rounded-full border border-border-light dark:border-border-dark peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary">
                    Sala individual
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input
                    className="peer sr-only"
                    name="room"
                    type="radio"
                    checked={selectedRoom === 'Sala grupal'}
                    onChange={() => setSelectedRoom('Sala grupal')}
                  />
                  <div className="px-4 py-2 rounded-full border border-border-light dark:border-border-dark peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary">
                    Sala grupal
                  </div>
                </label>
              </div>
            </div>

            {/* Resumen */}
            <div>
              <h2 className="text-xl font-bold mb-4">Resumen de la reserva</h2>
              <div className="border border-border-light dark:border-border-dark rounded-lg">
                <div className="grid grid-cols-3 gap-4 p-4 border-b border-border-light dark:border-border-dark">
                  <p className="col-span-1 text-subtle-light dark:text-subtle-dark">Biblioteca</p>
                  <p className="col-span-2 font-medium">Biblioteca {selectedLibrary}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 border-b border-border-light dark:border-border-dark">
                  <p className="col-span-1 text-subtle-light dark:text-subtle-dark">Sala</p>
                  <p className="col-span-2 font-medium">{selectedRoom}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 border-b border-border-light dark:border-border-dark">
                  <p className="col-span-1 text-subtle-light dark:text-subtle-dark">Fecha</p>
                  <p className="col-span-2 font-medium">{formatDate(selectedDate)}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4">
                  <p className="col-span-1 text-subtle-light dark:text-subtle-dark">Hora</p>
                  <p className="col-span-2 font-medium">{selectedTime || 'Seleccionar hora'}</p>
                </div>
              </div>
            </div>

            {/* Políticas */}
            <div>
              <h2 className="text-xl font-bold mb-4">Políticas de uso</h2>
              <p className="text-sm text-subtle-light dark:text-subtle-dark">
                Las reservas pueden cancelarse hasta 24 horas antes de la hora de inicio. Las salas se mantendrán durante 15 minutos después de la hora de inicio reservada. Después de eso, la reserva se cancelará.
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleConfirmReservation}
                className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Confirmar reserva
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-xl p-8 max-w-md mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">
                  check_circle
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">¡Reserva Confirmada!</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Tu reserva ha sido procesada exitosamente. Te enviaremos un correo de confirmación.
              </p>
              <div className="space-y-2 mb-6 text-sm">
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Biblioteca:</strong> Biblioteca {selectedLibrary}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Sala:</strong> {selectedRoom}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Fecha:</strong> {formatDate(selectedDate)}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Hora:</strong> {selectedTime}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/mis-reservas')}
                  className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Ver Mis Reservas
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reservations

