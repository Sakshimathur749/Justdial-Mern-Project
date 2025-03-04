const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modals/user-modal');
const Vendor = require('../modals/vendor-modal');
const Membership= require('../modals/membership-modal')
const defaultAdminCredentials = {
  email: 'admin@gmail.com',
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
    const existingUser = await Vendor.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    const newUser = new Vendor({ email, password, username, mobileNumber });
    await newUser.save();
    const payload = { userId: newUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully.',token ,  user: { email: newUser.email, username: newUser.username, mobileNumber: newUser.mobileNumber , password:newUser.password},});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};
const loginUser = async (req, res) => {
  const { email, password  } = req.body;
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
          user: { email: defaultAdminCredentials.email, role:defaultAdminCredentials.role,username: 'Admin' },
        });
      } else {
        return res.status(400).json({ message: 'Invalid password of Admin' });
      }
    }
    const user = await Vendor.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not Register' });
    }
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password of Vendor ' });
    }
    const payload = { id: user._id,  role: user.role, vendor:'vendorpanel',};
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7h' });
    res.json({
      token, role:user.role,
      user: { email: user.email, username: user.username , profilepicture:user.profilepicture, Googleprofilepicture: user.profilepicture, password:user.password},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getProfile = async (req, res) => {
  try {
    if (req.user.id === 'defaultAdminId') {
      return res.json({
        email: defaultAdminCredentials.email,
        username: 'Admin',
        role: 'Admin',
        mobileNumber: 'N/A', 
        profilepicture: 'admin_default_profile.jpg', 
        bio: 'Administrator account',
        city: 'Jodhpur',
        address:'Hk High Tech'
      });
    }
    const user = await Vendor.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error' });
  }
};
const updateProfile = async (req, res) => {
  const { username, email, mobileNumber,bio,city,address } = req.body;
  const imageFilename = req.file ? req.file.filename : '';
  if (!username || !email || !mobileNumber|| !bio || !city || !address) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }
  try {
    const user = await Vendor.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.mobileNumber = mobileNumber || user.mobileNumber;
    user.bio = bio || user.bio;
    user.city = city || user.city;
    user.address= address|| user.address
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
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = await Vendor.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }
    user.password = newPassword;
    await user.save();
  return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, getProfile, updateProfile,changePassword };