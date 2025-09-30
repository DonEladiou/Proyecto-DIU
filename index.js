const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir carpeta "public" como frontend
app.use(express.static('public'))
app.get('/reservas', (req, res) => {
  res.sendFile(__dirname + '/public/reservas.html')
})

// Ruta para procesar reservas (POST)
app.post('/api/reservas', (req, res) => {
  const { tipoSala, fecha, horaInicio, horaFin, nombre, email, motivo } = req.body
  
  // Aquí puedes agregar lógica para guardar en base de datos
  console.log('Nueva reserva recibida:', {
    tipoSala,
    fecha,
    horaInicio,
    horaFin,
    nombre,
    email,
    motivo,
    timestamp: new Date().toISOString()
  })
  
  // Respuesta exitosa
  res.json({
    success: true,
    message: 'Reserva enviada exitosamente',
    reservaId: Math.random().toString(36).substr(2, 9) // ID temporal
  })
})

// Ruta para obtener reservas existentes
app.get('/api/reservas', (req, res) => {
  // Aquí puedes obtener reservas de una base de datos
  res.json({
    reservas: [
      // Ejemplo de reservas
    ]
  })
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
  console.log(`Página de reservas disponible en http://localhost:${port}/reservas`)
})
