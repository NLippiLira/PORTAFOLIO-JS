const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/login', authController.showLogin)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

router.get('/dashboard', (req, res) => {
  res.render('admin/dashboard', {
    layout: 'admin/layout',
    active: 'dashboard'
  })
})
router.get('/biografia', (req, res) => {
  res.render('admin/biography/index', {
    layout: 'admin/layout',
    active: 'biografia'
  })
})
router.get('/bibliografia', (req, res) => {
  res.render('admin/biography', {
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
