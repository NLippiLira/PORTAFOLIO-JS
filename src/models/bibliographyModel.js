const pool = require('../config/db')

exports.getAll = async () => {
  const result = await pool.query(
    'SELECT * FROM bibliographies ORDER BY created_at DESC'
  )
  return result.rows
}

exports.create = async (data) => {
  const { title, author, year, url } = data

  await pool.query(
    `INSERT INTO bibliographies (title, author, year, url)
     VALUES ($1, $2, $3, $4)`,
    [title, author, year, url]
  )
}

exports.remove = async (id) => {
  await pool.query(
    'DELETE FROM bibliographies WHERE id = $1',
    [id]
  )
}
