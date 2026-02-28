const nodemailer = require('nodemailer')

// ===============================
// Crear transporter con timeouts
// ===============================
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465, // true solo si es 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  // 🔥 Evita que Railway quede esperando indefinidamente
  connectionTimeout: 5000, // 5 segundos
  greetingTimeout: 5000,
  socketTimeout: 5000
})

// ===============================
// Verificar conexión al iniciar
// ===============================
transporter.verify()
  .then(() => {
    console.log('✅ Servidor de correo listo')
  })
  .catch((error) => {
    console.error('❌ Error configurando servidor SMTP:')
    console.error(error.message)
  })

// ===============================
// Enviar correo de contacto
// ===============================
exports.sendContactMail = async ({ name, email, message }) => {
  try {
    const info = await transporter.sendMail({
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

    console.log('📨 Correo enviado:', info.messageId)
    return info

  } catch (error) {
    console.error('❌ Error enviando correo:')
    console.error(error.message)

    // Lanzamos el error para que el controller lo capture si quiere
    throw error
  }
}