require('dotenv').config()
const bcrypt = require('bcrypt')
const pool = require('../src/config/db')

const createAdmin = async () => {
  try {
    const username = 'admin'
    const password = 'admin123'

    const hashedPassword = await bcrypt.hash(password, 10)

    await pool.query(
      'INSERT INTO admins (username, password) VALUES ($1, $2)',
      [username, hashedPassword]
    )

    console.log('✅ Admin creado correctamente')
    process.exit()
  } catch (error) {
    console.error('❌ Error creando admin:', error.message)
    process.exit(1)
  }
}

createAdmin()
