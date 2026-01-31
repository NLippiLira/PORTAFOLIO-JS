const Project = require('../models/projectModel')

exports.showPublic = async (req, res) => {
  const projects = await Project.getAll()
  res.render('public/projects', { projects })
}

exports.showAdmin = async (req, res) => {
  const projects = await Project.getAll()
  res.render('admin/projects', { projects })
}

exports.create = async (req, res) => {
  await Project.create(req.body)
  res.redirect('/admin/proyectos')
}

exports.delete = async (req, res) => {
  await Project.remove(req.params.id)
  res.redirect('/admin/proyectos')
}
