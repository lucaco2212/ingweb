const express = require('express')
const servicios = require('./data/servicios')

const app = express()
const PORT = 3000

// Middleware para parsear cuerpos de peticiones en formato JSON
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Servidor de empresa funcionando correctamente')
})

app.get('/api/servicios', (req, res) => {
  const { categoria } = req.query

  if (categoria) {
    const filtrados = servicios.filter(
      s => s.categoria.toLowerCase() === categoria.toLowerCase()
    )
    return res.json(filtrados)
  }

  res.json(servicios)
})

app.get('/api/servicios/:id', (req, res) => {
  const id = Number(req.params.id)
  const servicio = servicios.find(s => s.id === id)

  if (!servicio) {
    return res.status(404).json({ mensaje: 'Servicio no encontrado' })
  }

  res.json(servicio)
})

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})
