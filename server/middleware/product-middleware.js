const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = '';
    if  (req.body.imageType === 'gallery') {
        folder = path.join(__dirname, '../../admin/src/images/gallery');
    } else if (req.body.imageType === 'productImages') {
      folder = path.join(__dirname, '../../admin/src/images/productImages'); 
    } 
    if (!folder) {
      console.error('Error: imageType is not valid or missing!');
      return cb(new Error('Invalid imageType specified'));
    }
    if (!fs.existsSync(folder)) {
      try {
        fs.mkdirSync(folder, { recursive: true });
      } catch (err) {
        console.error('Error creating directory:', err);
        return cb(err);
      }
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);  
  }
});

const upload = multer({ storage: storage });
module.exports = upload;