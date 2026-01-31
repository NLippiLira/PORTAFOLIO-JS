require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (req, res) => {
  res.render('public/landing')
})
app.get('/home', (req, res) => {
  res.render('public/home')
})
app.get('/biografia', (req, res) => {
  res.render('public/biography')
})
app.get('/bibliografia', (req, res) => {
  res.render('public/bibliography')
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
