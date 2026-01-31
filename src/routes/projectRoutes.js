const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController')
const isAuthenticated = require('../middlewares/isAuthenticated')

// público
router.get('/proyectos', projectController.showPublic)

// admin
router.get('/admin/proyectos', isAuthenticated, projectController.showAdmin)
router.post('/admin/proyectos', isAuthenticated, projectController.create)
router.post('/admin/proyectos/:id/delete', isAuthenticated, projectController.delete)

module.exports = router
