const pool = require('../../config/db')

exports.inbox = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM contacts ORDER BY created_at DESC'
  )

  res.render('admin/contacts/inbox', {
    layout: 'admin/layout',
    messages: result.rows,
    active: 'contactos'
  })
}

exports.showMessage = async (req, res) => {
  const { id } = req.params

  await pool.query(
    'UPDATE contacts SET is_read = true WHERE id = $1',
    [id]
  )

  const result = await pool.query(
    'SELECT * FROM contacts WHERE id = $1',
    [id]
  )

  res.render('admin/contacts/show', {
    layout: 'admin/layout',
    message: result.rows[0],
    active: 'contactos'
  })
}

exports.deleteMessage = async (req, res) => {
  const { id } = req.params

  await pool.query(
    'DELETE FROM contacts WHERE id = $1',
    [id]
  )

  res.redirect('/admin/contactos')
}
