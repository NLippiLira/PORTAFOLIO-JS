const express = require('express')
const router = express.Router()

const bibliographyController = require('../controllers/bibliographyController')
const isAuthenticated = require('../middlewares/isAuthenticated')

// pública
router.get('/bibliografia', bibliographyController.showPublic)

// admin
router.get('/admin/bibliografia', isAuthenticated, bibliographyController.showAdmin)
router.post('/admin/bibliografia', isAuthenticated, bibliographyController.create)
router.post('/admin/bibliografia/:id/delete', isAuthenticated, bibliographyController.delete)

module.exports = router
