const bcrypt = require('bcrypt')
const pool = require('../config/db')

exports.showLogin = (req, res) => {
  res.render('admin/login', { error: null })
}

exports.login = async (req, res) => {
  const { username, password } = req.body

  try {
    const result = await pool.query(
      'SELECT * FROM admins WHERE username = $1',
      [username]
    )

    if (result.rows.length === 0) {
      return res.render('admin/login', {
        error: 'Usuario no encontrado'
      })
    }

    const admin = result.rows[0]
    const isValid = await bcrypt.compare(password, admin.password)

    if (!isValid) {
      return res.render('admin/login', {
        error: 'Contraseña incorrecta'
      })
    }

    req.session.adminId = admin.id
    res.redirect('/admin/dashboard')

  } catch (error) {
    console.error(error)
    res.render('admin/login', {
      error: 'Error interno'
    })
  }
}

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login')
  })
}
