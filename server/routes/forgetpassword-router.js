require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../modals/user-modal');
const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth-middleware')
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log(email,"email")
  try {
    const user = await User.findOne({ email });
    console.log(user,"user");
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const resetLink = `http://localhost:5174/reset-password?token=${token}`;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mathursakshi143@gmail.com', 
        pass: 'obpqeuimqyhakugo',  
      },
    });
    const mailOptions = {
      from: 'mathursakshi143@gmail.com',
      to: email,
     subject: 'Test Email',
     text: `You requested a password reset. Please click the link below to reset your password: \n\n${resetLink}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error,"Check");
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset link sent' });
    });
  } catch (error) {
    console.log(error,"Error");
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/reset-password', async (req, res) => {
    const { newPassword , confirmPassword} = req.body;
    const { token } = req.query;
    console.log(token,"token mil gaye ")
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
      console.log(user.password,"New password Save")
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "Password successfully reset" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error resetting password" });
    }
  })


module.exports = router;