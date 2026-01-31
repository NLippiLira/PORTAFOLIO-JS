const Biography = require('../models/biographyModel')

exports.showPublic = async (req, res) => {
  const bio = await Biography.getBiography()
  res.render('public/biography', { bio })
}

exports.showAdminForm = async (req, res) => {
  const bio = await Biography.getBiography()
  res.render('admin/biographyForm', { bio })
}

exports.save = async (req, res) => {
  const { content } = req.body
  await Biography.saveBiography(content)
  res.redirect('/admin/dashboard')
}
