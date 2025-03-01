const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {auth} = require('../middleware/auth-middleware');
const { createVendor, getAllVendors,getVendorBySlug,updateVendorBySlug,deleteVendorById } = require('../controllers/vendor-controller');
const sharp = require('sharp');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../admin/src/images/profile_image')
    if (!uploadDir) {
      console.error('Error: imageType is not valid or missing!');
      return cb(new Error('Invalid imageType specified'));
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = Date.now()  + file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 }}); 
const compressImage = (req, res, next) => {
  if (req.file) {
    const fileSizeInMB = req.file.size / (1024 * 1024);
    const compressThreshold = 3; 
    const fileExtension = path.extname(req.file.originalname);
    const tempFilePath = path.join(__dirname, '../../admin/src/images/profile_image', Date.now() + '-compressed' + fileExtension);
    if (fileSizeInMB > compressThreshold) {
      sharp(req.file.path)
        .resize(800) 
        .jpeg({ quality: 80 }) 
        .toFile(tempFilePath, (err, info)  => {
          if (err) {
            console.error('Error during image compression:', err);
            return res.status(500).json({ error: 'Error during image compression' });
          }
          console.log('Image compressed:', info);
          req.file.path = tempFilePath;
          next(); 
        });
    } else {
      sharp(req.file.path)
        .jpeg({ quality: 80 })
        .toFile(tempFilePath, (err, info) => {
          if (err) {
            console.error('Error during image compression:', err);
            return res.status(500).json({ error: 'Error during image compression' });
          }
          req.file.path = tempFilePath;
          next();
        });
    }
  } else {
    next(); 
  }
};
router.post('/vendor', upload.single('profilepicture'),compressImage,auth, createVendor);
// router.get('/vendor/:id', getVendorById);
router.get('/vendors', getAllVendors);
router.put('/vendor/slug/:slug', updateVendorBySlug);
router.get('/vendor/slug/:slug', getVendorBySlug);
router.delete('/vendor/:id', deleteVendorById);
// router.get('/vendor/slug/:slug', updateVendorBySlug);
module.exports = router;