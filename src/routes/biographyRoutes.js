const express = require('express')
const router = express.Router()

const biographyController = require('../controllers/biographyController')
const isAuthenticated = require('../middlewares/isAuthenticated')

// pública
router.get('/biografia', biographyController.showPublic)

// admin
router.get('/admin/biografia', isAuthenticated, biographyController.showAdminForm)
router.post('/admin/biografia', isAuthenticated, biographyController.save)

module.exports = router
