const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

exports.sendContactMail = async ({ name, email, message }) => {
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev', // temporal
      to: process.env.EMAIL_TO,
      subject: 'Nuevo mensaje desde el portafolio',
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `
    })

    console.log('📨 Correo enviado:', response.id)
    return response

  } catch (error) {
    console.error('❌ Error enviando correo:', error)
    throw error
  }
}