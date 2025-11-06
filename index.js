import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API Routes
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

// En desarrollo, servir archivos estáticos de Vite
// En producción, servir la carpeta dist
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')))
  
  // Todas las rutas que no sean API, servir index.html (para React Router)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
} else {
  // En desarrollo, solo servir la API
  // Vite manejará el frontend en el puerto 5173
}

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Frontend React disponible en http://localhost:5173`)
    console.log(`API disponible en http://localhost:${port}/api`)
  } else {
    console.log(`Aplicación disponible en http://localhost:${port}`)
  }
})
