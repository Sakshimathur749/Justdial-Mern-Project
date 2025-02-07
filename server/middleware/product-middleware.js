const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir = '';
    if (file.fieldname === 'image') {
      uploadDir = path.join(__dirname, '../../admin/src/images/uploads/image');
    } else if (file.fieldname === 'gallery') {
      uploadDir = path.join(__dirname, '../../admin/src/images/uploads/gallery');
    } else if (file.fieldname === 'productImages') {
      uploadDir = path.join(__dirname, '../../admin/src/images/uploads/productImages');
    }
    if (!uploadDir) {
      console.error('Error: imageType is not valid or missing!');
      return cb(new Error('Invalid imageType specified'));
    }
    if (!fs.existsSync(uploadDir)) {
      try {
        fs.mkdirSync(uploadDir, { recursive: true });
      } catch (err) {
        console.error('Error creating directory:', err);
        return cb(err);
      }
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 }});
module.exports = upload;