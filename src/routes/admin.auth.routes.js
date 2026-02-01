const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const pool = require('../config/db')

router.get('/login', (req, res) => {
  res.render('admin/login', { error: req.flash('error') })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const result = await pool.query(
      'SELECT * FROM admins WHERE username = $1',
      [username]
    )

    if (result.rows.length === 0) {
      req.flash('error', 'Credenciales inválidas')
      return res.redirect('/admin/login')
    }

    const admin = result.rows[0]
    const valid = await bcrypt.compare(password, admin.password)

    if (!valid) {
      req.flash('error', 'Credenciales inválidas')
      return res.redirect('/admin/login')
    }

    req.session.admin = {
      id: admin.id,
      username: admin.username
    }

    res.redirect('/admin/dashboard')

  } catch (error) {
    req.flash('error', 'Error del servidor')
    res.redirect('/admin/login')
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login')
  })
})

module.exports = router
