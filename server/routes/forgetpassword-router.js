require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../modals/user-modal');
const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth-middleware')
const CryptoJS = require('crypto-js');
const crypto = require('crypto');  

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.ENCRYPTION_SECRET).toString();
};
const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.ENCRYPTION_SECRET);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log(email)
  try {
    const user = await User.findOne({ email });
    console.log(user,"forget password")
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const resetToken = crypto?.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() +  3600000; 
    await user.save();
    const encryptedData = encryptData({ userId: user._id, token: resetToken });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mathursakshi143@gmail.com', 
        pass: 'obpqeuimqyhakugo',  
      },
    });
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${encodeURIComponent(encryptedData)}`;
    const mailOptions = {
      from: 'mathursakshi143@gmail.com',
      to: email,
     subject: 'Test Email',
     text: `You requested a password reset. Please click the link below to reset your password: \n\n${resetLink}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset link sent', email: user.email });
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/change-password/:encryptedData', async (req, res) => {
  try {
    const { userId, token } = decryptData(decodeURIComponent(req.params.encryptedData));
    console.log("Decrypted Data:", decryptData(decodeURIComponent(req.params.encryptedData)));
    const user = await User.findOne({
      _id: userId,
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });
    res.json({ email: user.email, username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Invalid token or error processing request" });
  }
});
router.post('/reset-password/:encryptedData', async (req, res) => {
  const { newpassword , confirmPassword} = req.body;
  console.log("newpassword", req.body)
  if (newpassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  try {
    const encryptedData = decodeURIComponent(req.params.encryptedData); 
    const { userId, token } = decryptData(encryptedData);
    const user = await User.findOne({  _id: userId,
      resetPasswordToken: token, 
      resetPasswordExpires: { $gt: Date.now() } 
    });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });
    user.password=newpassword;
    await user.save();
    const jwtToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7h' });
    res.json({
      message: "Password updated successfully",
      token: jwtToken, 
      user: { email: user.email, username: user.username },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;