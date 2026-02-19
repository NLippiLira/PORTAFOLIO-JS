const biographyModel = require('../models/biographyModel')


// ==============================
// ADMIN - LISTAR
// ==============================
exports.showAdminForm = async (req, res) => {
  try {
    const biografias = await biographyModel.getAllBiographies()

    res.render('admin/biography', {
      layout: 'admin/layout',
      active: 'biografia',
      biografias
    })

  } catch (error) {
    console.error(error)
    res.render('admin/biography', {
      layout: 'admin/layout',
      active: 'biografia',
      biografias: []
    })
  }
}


// ==============================
// CREAR
// ==============================
exports.create = async (req, res) => {
  try {
    const { title, content } = req.body

    await biographyModel.createBiography(title, content)

    res.redirect('/admin/biografia')

  } catch (error) {
    console.error(error)
    res.redirect('/admin/biografia')
  }
}


// ==============================
// ACTUALIZAR
// ==============================
exports.update = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body

    await biographyModel.updateBiography(id, title, content)

    res.redirect('/admin/biografia')

  } catch (error) {
    console.error(error)
    res.redirect('/admin/biografia')
  }
}


// ==============================
// ELIMINAR
// ==============================
exports.delete = async (req, res) => {
  try {
    const { id } = req.params

    await biographyModel.deleteBiography(id)

    res.redirect('/admin/biografia')

  } catch (error) {
    console.error(error)
    res.redirect('/admin/biografia')
  }
}


// ==============================
// PÚBLICO
// ==============================
exports.showPublic = async (req, res) => {
  try {
    const bio = await biographyModel.getBiography()

    res.render('public/biography', { bio })

  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
}