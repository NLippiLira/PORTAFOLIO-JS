const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadPath = path.resolve(__dirname, '..', 'public', 'uploads')

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, 'cv.pdf')
  }
})

module.exports = multer({ storage })
