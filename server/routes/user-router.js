const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const User = require('../modals/user-modal');
const auth = require('../middleware/auth-middleware')
const { OAuth2Client } = require('google-auth-library');
const { registerUser, loginUser, getProfile,updateProfile } = require('../controllers/user-controller');
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
const client = new OAuth2Client('510164715040-lj99bre09a5co1gbelb7u3ul16kgakqo.apps.googleusercontent.com');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getProfile);
router.put('/profile-edit', auth, upload.single('profilepicture'), updateProfile);
router.post('/google-login', async (req, res) => {
  try {
    const { token } = req.body;
    const response = await axios.post(
      'https://oauth2.googleapis.com/tokeninfo',
      null,
      { params: { id_token: token } }
    );
  const googleUser = response.data;
  console.log(googleUser)
    res.json(googleUser); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to authenticate user with Google' });
  }
});

module.exports = router;