const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

const testConnection = async () => {
  try {
    const client = await pool.connect()
    console.log('🟢 Conectado a PostgreSQL')
    client.release()
  } catch (error) {
    console.error('🔴 Error conectando a PostgreSQL:', error.message)
    process.exit(1)
  }
}

testConnection()

module.exports = pool
