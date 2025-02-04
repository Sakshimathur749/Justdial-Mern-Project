const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir = '';
    if (req.body.imageType === 'subcategory') {
      uploadDir = path.join(__dirname, '../../admin/src/images/subcategory_uploads');
    } else {
      uploadDir = path.join(__dirname, '../../admin/src/images/category_uploads');
    }
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
    console.log('Saving file as:', filename);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 }});

module.exports = upload;
