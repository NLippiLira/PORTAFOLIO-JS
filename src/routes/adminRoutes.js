const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const adminAuth = require('../middlewares/adminAuth')
const adminController = require('../controllers/adminController')
const contactAdminController = require('../controllers/contactAdminController')
const cvController = require('../controllers/cvController')

const upload = require('../config/multer.js');
const biographyModel = require('../models/biographyModel')
import upload from '../config/multerCloudinary.js';



// =====================================================
// 🔓 LOGIN
// =====================================================
router.get('/login', authController.showLogin)
router.post('/login', authController.login)
router.get('/logout', authController.logout)


// =====================================================
// 🔐 PROTEGER RUTAS
// =====================================================
router.use(adminAuth)


// =====================================================
// DASHBOARD
// =====================================================
router.get('/dashboard', adminController.dashboard)


// =====================================================
// ================= BIOGRAFÍA CRUD ====================
// =====================================================

// LISTAR + FORM
router.get('/biografia', async (req, res) => {
  try {
    const biografias = await biographyModel.getAllBiographies()

    res.render('admin/biography', {
      layout: 'admin/layout',
      active: 'biografia',
      biografias,
      bio: null
    })

  } catch (error) {
    console.error(error)
    res.redirect('/admin/dashboard')
  }
})


// EDITAR (carga datos en misma vista)
router.get('/biografia/editar/:id', async (req, res) => {
  try {
    const biografias = await biographyModel.getAllBiographies()
    const bio = await biographyModel.getBiographyById(req.params.id)

    res.render('admin/biography', {
      layout: 'admin/layout',
      active: 'biografia',
      biografias,
      bio
    })

  } catch (error) {
    console.error(error)
    res.redirect('/admin/biografia')
  }
})


// CREAR
router.post('/biografia/nueva', async (req, res) => {
  try {
    const { title, content } = req.body

    await biographyModel.createBiography(title, content)

    res.redirect('/admin/biografia')

  } catch (error) {
    console.error(error)
    res.redirect('/admin/biografia')
  }
})


// ACTUALIZAR
router.post('/biografia/editar/:id', async (req, res) => {
  try {
    const { title, content } = req.body

    await biographyModel.updateBiography(
      req.params.id,
      title,
      content,
    )

    res.redirect('/admin/biografia')

  } catch (error) {
    console.error(error)
    res.redirect('/admin/biografia')
  }
})


// ELIMINAR
router.post('/biografia/eliminar/:id', async (req, res) => {
  try {
    await biographyModel.deleteBiography(req.params.id)

    res.redirect('/admin/biografia')

  } catch (error) {
    console.error(error)
    res.redirect('/admin/biografia')
  }
})


// =====================================================
// RESTO
// =====================================================
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

router.get('/cv', cvController.index)
router.post('/admin/cv/upload', upload.single('cv'), cvController.uploadCV);
router.post('/cv/delete', cvController.delete)



router.get('/contactos', contactAdminController.inbox)
router.get('/contactos/:id', contactAdminController.showMessage)
router.post('/contactos/:id/eliminar', contactAdminController.deleteMessage)

module.exports = router