const Bibliography = require('../models/bibliographyModel')

exports.showPublic = async (req, res) => {
  const items = await Bibliography.getAll()
  res.render('public/bibliography', { items })
}

exports.showAdmin = async (req, res) => {
  const items = await Bibliography.getAll()
  res.render('admin/bibliography', { items })
}

exports.create = async (req, res) => {
  await Bibliography.create(req.body)
  res.redirect('/admin/bibliografia')
}

exports.delete = async (req, res) => {
  await Bibliography.remove(req.params.id)
  res.redirect('/admin/bibliografia')
}
