const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../modals/user-modal');
const {auth} = require('../middleware/auth-middleware')
const { OAuth2Client } = require('google-auth-library');
const { registerUser, loginUser, getProfile,updateProfile,changePassword } = require('../controllers/user-controller');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
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
const client = new OAuth2Client('510164715040-lj99bre09a5co1gbelb7u3ul16kgakqo.apps.googleusercontent.com');
router.post('/register', registerUser);
router.post('/login',  loginUser);
router.get('/profile', auth, getProfile);
router.put('/change-password', auth, changePassword);
router.put('/profile-edit', auth, upload.single('profilepicture'),compressImage, updateProfile);
router.post('/google-login', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '510164715040-lj99bre09a5co1gbelb7u3ul16kgakqo.apps.googleusercontent.com',
    });
    const { email, name, picture, sub } = ticket.getPayload();
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        username: name,
        Googleprofilepicture: picture,
        slug: new mongoose.Types.ObjectId().toString(),
      });
      await user.save();
    }
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      token: jwtToken,
      user: { email: user.email, username: user.username , profilepicture:user.profilepicture, Googleprofilepicture: user.Googleprofilepicture },
    });
  } catch (error) {
    console.error(error, "Google Login Error");
    res.status(500).json({ error: 'Failed to authenticate user with Google' });
  }
});

module.exports = router;