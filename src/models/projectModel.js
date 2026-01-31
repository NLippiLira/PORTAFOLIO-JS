const pool = require('../config/db')

exports.getAll = async () => {
  const result = await pool.query(
    'SELECT * FROM projects ORDER BY created_at DESC'
  )
  return result.rows
}

exports.getById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM projects WHERE id = $1',
    [id]
  )
  return result.rows[0]
}

exports.create = async (data) => {
  const { title, description, github_url, demo_url } = data
  await pool.query(
    `INSERT INTO projects (title, description, github_url, demo_url)
     VALUES ($1, $2, $3, $4)`,
    [title, description, github_url, demo_url]
  )
}

exports.remove = async (id) => {
  await pool.query(
    'DELETE FROM projects WHERE id = $1',
    [id]
  )
}
