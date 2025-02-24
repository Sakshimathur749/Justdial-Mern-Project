const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modals/user-modal');
const Membership= require('../modals/membership-modal')
const defaultAdminCredentials = {
  email: 'mathursakshi143@gmail.com',
  password: 'admin123',
  role:'Admin',
};
const hashDefaultPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
const registerUser = async (req, res) => {
  const { email, password, username, mobileNumber} = req.body;
  if (!email || !password || !mobileNumber || !username) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    const newUser = new User({ email, password , username, mobileNumber });
    await newUser.save();
    const payload = { userId: newUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully.',token ,  user: { email: newUser.email, username: newUser.username, mobileNumber: newUser.mobileNumber , password:newUser.password},});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
const loginUser = async (req, res) => {
  const { email, password  } = req.body;
  console.log(req.body,"login")
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    if (email === defaultAdminCredentials.email) {
      const hashedDefaultPassword = await hashDefaultPassword(defaultAdminCredentials.password);
      const isMatch = await bcrypt.compare(password, hashedDefaultPassword);
      if (isMatch) {
        const token = jwt.sign({ id: 'defaultAdminId' }, process.env.JWT_SECRET, { expiresIn: '7h' });
        return res.json({
          token,
          admin: { email: defaultAdminCredentials.email, role:defaultAdminCredentials.role,username: 'Admin' },
        });
      } else {
        return res.status(400).json({ message: 'Invalid password' });
      }
    }
    const admin = await User.findOne({ email });
    console.log(admin,"login email")
    if (!admin) {
      return res.status(400).json({ message: 'User not Register' });
    }
    console.log("Found User in DB:", admin.email);
    console.log("Stored Hashed Password in DB:", admin.password);
    const isMatch = await bcrypt.compare(password,admin.password);
    console.log("Password Matched Successfully");

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: admin._id , role:admin.role}, process.env.JWT_SECRET, { expiresIn: '7h' });
    res.json({
      token, role:admin.role,
      user: { email: admin.email, username: admin.username , profilepicture:admin.profilepicture, Googleprofilepicture: admin.profilepicture},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  const { username, email, mobileNumber,bio,city } = req.body;
  const imageFilename = req.file ? req.file.filename : '';
  if (!username || !email || !mobileNumber|| !bio || !city) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.mobileNumber = mobileNumber || user.mobileNumber;
    user.bio = bio || user.bio;
    user.city = city || user.city;
    if (imageFilename) {
      if (user.profilepicture !== 'default.jpg' && user.profilepicture) {
        const oldImagePath = path.join(__dirname, '../../admin/src/images/profile_image', user.profilepicture);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
          user.profilepicture = imageFilename;  
        }
    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { registerUser, loginUser, getProfile, updateProfile };