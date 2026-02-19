const express = require('express')
const router = express.Router()

const biographyController = require('../controllers/biographyController')
const isAuthenticated = require('../middlewares/isAuthenticated')

// pública
router.get('/biografia', biographyController.showPublic)

// admin
router.get('/admin/biografia', isAuthenticated, biographyController.showAdminForm)
router.post('/admin/biografia', isAuthenticated, biographyController.create)
router.put('/admin/biografia/update/:id', isAuthenticated, biographyController.update)
router.delete('/admin/biografia/delete/:id', isAuthenticated, biographyController.delete)
router.get('/biografia', biographyController.showAdminForm)
router.post('/biografia', biographyController.create)
router.post('/biografia/update/:id', biographyController.update)
router.post('/biografia/delete/:id', biographyController.delete)
module.exports = router
