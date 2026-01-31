const express = require('express')
const router = express.Router()

const contactController = require('../controllers/contactController')

router.get('/contacto', contactController.showForm)
router.post('/contacto', contactController.send)

module.exports = router
