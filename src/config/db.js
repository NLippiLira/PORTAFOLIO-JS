const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false }
    : false,
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