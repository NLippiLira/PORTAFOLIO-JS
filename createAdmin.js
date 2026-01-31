require('dotenv').config()
const bcrypt = require('bcrypt')
const pool = require('../src/config/db.js')

const createAdmin = async () => {
  const username = 'admin'
  const plainPassword = 'admin123' // luego cámbiala

  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  await pool.query(
    'INSERT INTO admins (username, password) VALUES ($1, $2)',
    [username, hashedPassword]
  )

  console.log('✅ Admin creado')
  process.exit()
}

createAdmin()
