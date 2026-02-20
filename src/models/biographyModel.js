const pool = require('../config/db')

// ==============================
// OBTENER TODAS
// ==============================
const getAllBiographies = async () => {
  const result = await pool.query(
    'SELECT * FROM biographies ORDER BY id DESC'
  )
  return result.rows
}

// ==============================
// OBTENER POR ID
// ==============================
const getBiographyById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM biographies WHERE id = $1',
    [id]
  )
  return result.rows[0]
}

// ==============================
// OBTENER ÚLTIMA (PÚBLICO)
// ==============================
const getBiography = async () => {
  const result = await pool.query(
    'SELECT * FROM biographies ORDER BY id DESC LIMIT 1'
  )
  return result.rows[0]
}

// ==============================
// CREAR
// ==============================
const createBiography = async (title, content) => {
  await pool.query(
    'INSERT INTO biographies (title, content) VALUES ($1, $2)',
    [title, content]
  )
}

// ==============================
// ACTUALIZAR
// ==============================
const updateBiography = async (id, title, content) => {
  await pool.query(
    'UPDATE biographies SET title = $1, content = $2 WHERE id = $3',
    [title, content, id]
  )
}

// ==============================
// ELIMINAR
// ==============================
const deleteBiography = async (id) => {
  await pool.query(
    'DELETE FROM biographies WHERE id = $1',
    [id]
  )
}

module.exports = {
  getAllBiographies,
  getBiographyById,
  getBiography,
  createBiography,
  updateBiography,
  deleteBiography
}