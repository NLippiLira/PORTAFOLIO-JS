const nodemailer = require('nodemailer')

// Crear transporter dinámico según puerto
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465, // true solo para 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Verificar conexión al iniciar (opcional pero recomendado)
transporter.verify((error) => {
  if (error) {
    console.error('Error configurando el servidor de correo:', error)
  } else {
    console.log('Servidor de correo listo ✅')
  }
})

exports.sendContactMail = async ({ name, email, message }) => {
  return transporter.sendMail({
    from: `"Portafolio NL" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: 'Nuevo mensaje desde el portafolio',
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
      <hr>
      <p style="font-size:12px;color:gray;">
        Este mensaje fue enviado desde tu portafolio web.
      </p>
    `
  })
}