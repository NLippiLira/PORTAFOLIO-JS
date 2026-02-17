require('dotenv').config()
require('./config/db')

const express = require('express')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()

/* ================================
   CONFIGURACIÓN BÁSICA
================================ */

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

/* ================================
   MIDDLEWARES GLOBALES
================================ */

// 🔥 MUY IMPORTANTE: STATIC ANTES QUE LAS RUTAS
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* ================================
   SESSION (SOLO UNA VEZ)
================================ */

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hora
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

/* ================================
   RUTAS PÚBLICAS
================================ */

app.get('/', (req, res) => {
  res.render('public/landing')
})

app.get('/home', (req, res) => {
  res.render('public/home')
})

app.use('/contacto', require('./routes/contactRoutes'))
app.use('/', require('./routes/biographyRoutes'))
app.use('/', require('./routes/bibliographyRoutes'))
app.use('/', require('./routes/projectRoutes'))

/* ================================
   RUTAS ADMIN
================================ */

app.use('/admin', require('./routes/adminRoutes'))

/* ================================
   DEBUG OPCIONAL (PUEDES BORRARLO)
================================ */

// app.get('/debug', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'uploads', 'cv.pdf'))
// })

/* ================================
   SERVER
================================ */

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('📂 Static folder:', path.join(__dirname, 'public'))
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
