const pool = require('../config/db')

exports.getBiography = async () => {
  const result = await pool.query(
    'SELECT * FROM biographies ORDER BY id DESC LIMIT 1'
  )
  return result.rows[0]
}

exports.saveBiography = async (content) => {
  await pool.query(
    'INSERT INTO biographies (content) VALUES ($1)',
    [content]
  )
}
