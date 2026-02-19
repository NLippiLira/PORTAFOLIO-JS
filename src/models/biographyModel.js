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
const createBiography = async (titulo, contenido) => {
  await pool.query(
    'INSERT INTO biographies (titulo, contenido) VALUES ($1, $2)',
    [titulo, contenido]
  )
}

// ==============================
// ACTUALIZAR
// ==============================
const updateBiography = async (id, titulo, contenido) => {
  await pool.query(
    'UPDATE biographies SET titulo = $1, contenido = $2 WHERE id = $3',
    [titulo, contenido, id]
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