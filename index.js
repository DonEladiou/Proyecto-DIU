const express = require('express')
const app = express()
const port = 3000

// Servir carpeta "public" como frontend
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
