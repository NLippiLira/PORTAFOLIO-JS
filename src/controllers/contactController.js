const mailService = require('../services/mailService')

exports.showForm = (req, res) => {
  res.render('public/contact', { success: null, error: null })
}

exports.send = async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.render('public/contact', {
      error: 'Todos los campos son obligatorios',
      success: null
    })
  }

  try {
    await mailService.sendContactMail({ name, email, message })

    res.render('public/contact', {
      success: 'Mensaje enviado correctamente',
      error: null
    })
  } catch (error) {
    console.error(error)
    res.render('public/contact', {
      error: 'Error al enviar el mensaje',
      success: null
    })
  }
}
