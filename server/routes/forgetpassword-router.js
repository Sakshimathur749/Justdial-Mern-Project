const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../modals/user-modal');
const express = require('express');
const router = express.Router();

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
    const resetLink = `http://localhost:3000/reset-password/${user._id}?token=${token}`;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mathursakshi143@gmail.com', 
        pass: 'India@143',  
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
    const { password, token } = req.body;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }
      user.password = bcrypt.hashSync(password, 10);
      await user.save();
      res.send({ success: true });
    } catch (error) {
      res.status(400).send({ message: 'Invalid token' });
    }
  });
  

module.exports = router;