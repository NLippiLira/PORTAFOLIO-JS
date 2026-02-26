const pool = require('../config/db')
const mailService = require('../services/mailService')

// ===============================
// Mostrar formulario
// ===============================
exports.showForm = (req, res) => {
  res.render('public/contact', {
    success: req.flash('success'),
    error: req.flash('error')
  })
}

// ===============================
// Enviar mensaje
// ===============================
exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body

  // Validación básica
  if (!name || !email || !message) {
    req.flash('error', 'Todos los campos son obligatorios')
    return res.redirect('/contacto')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    req.flash('error', 'Correo electrónico inválido')
    return res.redirect('/contacto')
  }

  try {
    // 1️⃣ Guardar en base de datos
    await pool.query(
      `INSERT INTO contacts (name, email, message)
       VALUES ($1, $2, $3)`,
      [name.trim(), email.trim(), message.trim()]
    )

    // 2️⃣ Intentar enviar correo (no bloquea si falla)
    try {
      await mailService.sendContactMail({ name, email, message })
    } catch (mailError) {
      console.error('Error enviando correo:', mailError.message)
      // No detenemos el flujo si falla el email
    }

    req.flash('success', 'Mensaje enviado correctamente')
    return res.redirect('/contacto')

  } catch (error) {
    console.error('Error general:', error)
    req.flash('error', 'Error al enviar el mensaje')
    return res.redirect('/contacto')
  }
}

// ===============================
// Listar mensajes (Admin)
// ===============================
exports.listMessages = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    )

    res.render('admin/messages', {
      messages: result.rows,
      error: req.flash('error')
    })

  } catch (error) {
    console.error(error)
    req.flash('error', 'Error al cargar mensajes')
    res.redirect('/admin/dashboard')
  }
}