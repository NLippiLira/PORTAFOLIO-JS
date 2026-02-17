require('dotenv').config()
require('./config/db')

const express = require('express')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// ✅ SESSION SOLO UNA VEZ
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false
    }
  })
)

app.use(flash())

app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next()
})

app.get('/', (req, res) => {
  res.render('public/landing')
})

app.get('/home', (req, res) => {
  res.render('public/home')
})

const contactRoutes = require('./routes/contactRoutes')
app.use('/contacto', contactRoutes)

app.use('/', require('./routes/biographyRoutes'))
app.use('/', require('./routes/bibliographyRoutes'))
app.use('/', require('./routes/projectRoutes'))

// ❌ elimina esta línea duplicada
// app.use('/', require('./routes/contactRoutes'))

app.use('/admin', require('./routes/adminRoutes'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
