const pool = require('../config/db')

exports.dashboard = async (req, res) => {
  try {
    // Ejecutar consultas en paralelo (más eficiente)
    const [
      bioCount,
      projectCount,
      messageCount,
      bibliographyCount
    ] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM biografia'),
      pool.query('SELECT COUNT(*) FROM proyectos'),
      pool.query('SELECT COUNT(*) FROM contactos'),
      pool.query('SELECT COUNT(*) FROM bibliografia')
    ])

    res.render('admin/dashboard', {
      layout: 'admin/layout',
      active: 'dashboard',
      stats: {
        biografias: Number(bioCount.rows[0].count),
        proyectos: Number(projectCount.rows[0].count),
        mensajes: Number(messageCount.rows[0].count),
        bibliografias: Number(bibliographyCount.rows[0].count)
      }
    })

  } catch (error) {
    console.error('Error cargando dashboard:', error)

    res.render('admin/dashboard', {
      layout: 'admin/layout',
      active: 'dashboard',
      stats: {
        biografias: 0,
        proyectos: 0,
        mensajes: 0,
        bibliografias: 0
      }
    })
  }
}
