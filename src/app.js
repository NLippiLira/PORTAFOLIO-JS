require('dotenv').config()
require('./config/db') // 👈 ahora sí fuerza conexión

const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const session = require('express-session')
const flash = require('connect-flash')

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hora
      secure: false // true solo con https
    }
  })
)

app.get('/', (req, res) => {
  res.render('public/landing')
})

app.get('/home', (req, res) => {
  res.render('public/home')
})


app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false
}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next()
})

app.use('/', require('./routes/biographyRoutes'))

app.use('/', require('./routes/bibliographyRoutes'))

app.use('/', require('./routes/projectRoutes'))

app.use('/', require('./routes/contactRoutes'))

app.use('/admin', require('./routes/adminRoutes'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})
