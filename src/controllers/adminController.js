const pool = require('../config/db')

exports.dashboard = async (req, res) => {
  try {
    const bioCount = await pool.query('SELECT COUNT(*) FROM biografia')
    const projectCount = await pool.query('SELECT COUNT(*) FROM proyectos')
    const messageCount = await pool.query('SELECT COUNT(*) FROM contactos')

    res.render('admin/dashboard', {
      layout: 'admin/layout',
      active: 'dashboard',
      stats: {
        biografias: bioCount.rows[0].count,
        proyectos: projectCount.rows[0].count,
        mensajes: messageCount.rows[0].count
      }
    })

  } catch (error) {
    console.error(error)
    res.render('admin/dashboard', {
      layout: 'admin/layout',
      active: 'dashboard',
      stats: { biografias: 0, proyectos: 0, mensajes: 0 }
    })
  }
}
