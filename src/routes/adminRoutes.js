const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const adminAuth = require('../middlewares/adminAuth')
const adminController = require('../controllers/adminController')
const contactAdminController = require('../controllers/contactAdminController')
const upload = require('../config/multer')
const cvController = require('../controllers/cvController')


// 🔓 RUTAS PÚBLICAS
router.get('/login', authController.showLogin)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

// 🔐 PROTEGER TODO LO QUE VIENE DESPUÉS
router.use(adminAuth)

// DASHBOARD
router.get('/dashboard', adminController.dashboard)

router.get('/biografia', async (req, res) => {
  try {
    const biografias = await bio.findAll(); // o tu modelo real

    res.render('admin/biography', {
      layout: 'admin/layout',
      active: 'biografia',
      biografias
    });

  } catch (error) {
    console.error(error);
    res.redirect('/admin');
  }
});

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

// CV
router.get('/cv', cvController.index)
router.post('/cv', upload.single('cv'), cvController.upload)
router.post('/cv/delete', cvController.delete)

router.get('/contactos', contactAdminController.inbox)
router.get('/contactos/:id', contactAdminController.showMessage)
router.post('/contactos/:id/eliminar', contactAdminController.deleteMessage)



module.exports = router
