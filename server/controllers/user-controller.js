const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modals/user-modal');
const Membership= require('../modals/membership-modal')
const registerUser = async (req, res) => {
  const { name, email, password, mobilenumber, confirmPassword ,membership} = req.body;
  if (!name || !email || !password || !mobilenumber || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords must match.' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    // const membership = await Membership.findOne({ type: membershipType });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobilenumber,
      // membership: membership._id,
    });
    await newUser.save();
    const payload = { userId: newUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully.',token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(password,"req.body")
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid user credentials.' });
    }
    console.log(user.password,"user Password")
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user.password,"isMatch")
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password.' });
    }
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, role:user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error)
  }
};

module.exports = { registerUser, loginUser };