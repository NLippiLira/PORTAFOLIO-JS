const pool = require('../config/db');
const cloudinary = require('../config/cloudinary'); // asegúrate que exporte v2
// NO más fs
// NO más path

// ===============================
// Mostrar vista
// ===============================
exports.index = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cvs LIMIT 1');

    res.render('admin/cv', {
      layout: 'admin/layout',
      cv: result.rows[0] || null,
      active: 'cv'
    });

  } catch (error) {
    console.error(error);
    req.flash('error', 'Error cargando CV');
    res.redirect('/admin/dashboard');
  }
};


// ===============================
// Subir / Reemplazar CV
// ===============================
exports.upload = async (req, res) => {
  try {

    if (!req.file) {
      req.flash('error', 'Debe subir un archivo PDF');
      return res.redirect('/admin/cv');
    }

    // 🔎 Verificar si ya existe un CV en BD
    const existing = await pool.query('SELECT * FROM cvs LIMIT 1');

    // Si existe, eliminarlo de Cloudinary
    if (existing.rows.length > 0) {
      const oldPublicId = existing.rows[0].public_id;

      if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId, {
          resource_type: 'raw'
        });
      }

      // eliminar registro anterior
      await pool.query('DELETE FROM cvs');
    }

    // Guardar nuevo en BD
    await pool.query(
      'INSERT INTO cvs (filename, originalname, file_url, public_id) VALUES ($1, $2, $3, $4)',
      [
        req.file.filename,
        req.file.originalname,
        req.file.path,       // URL Cloudinary
        req.file.filename    // public_id en raw suele coincidir con filename
      ]
    );

    req.flash('success', 'CV subido correctamente');
    res.redirect('/admin/cv');

  } catch (error) {
    console.error('Error subiendo CV:', error);
    req.flash('error', 'Error al subir CV');
    res.redirect('/admin/cv');
  }
};


// ===============================
// Eliminar CV
// ===============================
exports.delete = async (req, res) => {
  try {

    const existing = await pool.query('SELECT * FROM cvs LIMIT 1');

    if (existing.rows.length === 0) {
      req.flash('error', 'No hay CV para eliminar');
      return res.redirect('/admin/cv');
    }

    const publicId = existing.rows[0].public_id;

    if (publicId) {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: 'raw'
      });
    }

    await pool.query('DELETE FROM cvs');

    req.flash('success', 'CV eliminado correctamente');
    res.redirect('/admin/cv');

  } catch (error) {
    console.error('Error eliminando CV:', error);
    req.flash('error', 'Error al eliminar CV');
    res.redirect('/admin/cv');
  }
};