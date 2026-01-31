const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/login', authController.showLogin)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('admin/dashboard')
})

module.exports = router
