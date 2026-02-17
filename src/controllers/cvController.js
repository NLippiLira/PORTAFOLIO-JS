const pool = require('../config/db')
const fs = require('fs')
const path = require('path')

// Mostrar vista
exports.index = async (req, res) => {
  const result = await pool.query('SELECT * FROM cvs LIMIT 1')

  res.render('admin/cv', {
    layout: 'admin/layout',
    cv: result.rows[0] || null,
    active: 'cv'
  })
}

// Subir / reemplazar
exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      req.flash('error', 'Debe subir un archivo PDF')
      return res.redirect('/admin/cv')
    }

    // eliminar registro anterior
    await pool.query('DELETE FROM cvs')

    await pool.query(
      'INSERT INTO cvs (filename, originalname) VALUES ($1, $2)',
      [req.file.filename, req.file.originalname]
    )

    req.flash('success', 'CV subido correctamente')
    res.redirect('/admin/cv')

  } catch (error) {
    console.error(error)
    req.flash('error', 'Error al subir CV')
    res.redirect('/admin/cv')
  }
}

// Eliminar CV
exports.delete = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../public/uploads/cv.pdf')

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    await pool.query('DELETE FROM cvs')

    req.flash('success', 'CV eliminado')
    res.redirect('/admin/cv')

  } catch (error) {
    console.error(error)
    req.flash('error', 'Error al eliminar CV')
    res.redirect('/admin/cv')
  }
}
