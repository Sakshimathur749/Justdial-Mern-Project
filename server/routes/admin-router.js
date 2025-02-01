const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../modals/admin-modal');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await admin.password;
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
        res.json({ token , admin:{email:admin.email, name:admin.name}});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    
});

module.exports = router;
