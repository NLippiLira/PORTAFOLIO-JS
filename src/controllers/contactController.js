const pool = require('../config/db')

exports.showForm = (req, res) => {
  res.render('public/contact', {
    success: req.flash('success'),
    error: req.flash('error')
  })
}

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    req.flash('error', 'Todos los campos son obligatorios')
    return res.redirect('/contacto')
  }

  try {
    await pool.query(
      `INSERT INTO contacts (name, email, message)
       VALUES ($1, $2, $3)`,
      [name, email, message]
    )

    req.flash('success', 'Mensaje enviado correctamente')
    res.redirect('/contacto')
  } catch (error) {
    console.error(error)
    req.flash('error', 'Error al enviar el mensaje')
    res.redirect('/contacto')
  }
}

exports.listMessages = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    )

    res.render('admin/messages', {
      messages: result.rows
    })

  } catch (error) {
    console.error(error)
    req.flash('error', 'Error al cargar mensajes')
    res.redirect('/admin/dashboard')
  }
}