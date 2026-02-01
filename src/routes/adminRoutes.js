const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const adminAuth = require('../middlewares/adminAuth')

// 🔓 RUTAS PÚBLICAS
router.get('/login', authController.showLogin)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

// 🔐 PROTEGER TODO LO QUE VIENE DESPUÉS
router.use(adminAuth)

// DASHBOARD
router.get('/dashboard', (req, res) => {
  res.render('admin/dashboard', {
    layout: 'admin/layout',
    active: 'dashboard'
  })
})

// BIOGRAFÍA
router.get('/biografia', (req, res) => {
  res.render('admin/biography/index', {
    layout: 'admin/layout',
    active: 'biografia'
  })
})

router.get('/bibliografia', (req, res) => {
  res.render('admin/bibliography', {
    layout: 'admin/layout',
    active: 'bibliografia'
  })
})

router.get('/proyectos', (req, res) => {
  res.render('admin/projects', {
    layout: 'admin/layout',
    active: 'proyectos'
  })
})

module.exports = router
