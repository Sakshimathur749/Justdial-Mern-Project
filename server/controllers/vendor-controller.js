const Vendor = require('../modals/vendor-modal');
const User = require('../modals/user-modal')
const Category = require('../modals/category-modal')
const bcrypt = require('bcryptjs');
const slugify=require('slugify')
const mongoose = require('mongoose');

// const createVendor = async (req, res) => {
//   try {
//     const { username, email, mobileNumber, password,city, address, bio } = req.body;
//     const imageFilename = req.file ? req.file.filename : '';
//     const existingVendor = await User.findOne({ email });
//     if (existingVendor) {
//       return res.status(400).json({ message: 'Vendor already exists' });
//     }
//     const slug = slugify(username, { lower: true, strict: true });
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newVendor = new User({ username, email, mobileNumber,password: hashedPassword,city, slug,  address, bio, role:'vendor',profilepicture: imageFilename });
//     await newVendor.save();
//     res.status(201).json({ message: 'Vendor created successfully', vendor: newVendor });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
// const getVendorById = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.params.id);
//     if (!vendor) {
//       return res.status(404).json({ message: 'Vendor not found' });
//     }
//     res.status(200).json(vendor);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
const createVendor = async (req, res) => {
  const { businessName, mobileNumber, address, city, bio, password, email, username } = req.body;
  try {
    let userId = req.user.id;
    if (userId === 'defaultAdminId') {
      userId = new mongoose.Types.ObjectId('507f191e810c19729de860ea');
    }
    if (userId !== 'defaultAdminId' && !password) {
      return res.status(400).json({ message: 'Password is required for vendor registration.' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor with this email already exists' });
    }
    const emailPrefix = email.split('@')[0];
    const emailSlug = slugify(emailPrefix, { lower: true, strict: true });
    let existingSlug = await Vendor.findOne({ slug: emailSlug });
    if (existingSlug) {
      const uniqueSlug = `${emailSlug}-${Date.now()}`;
      const vendor = new Vendor({ userId, businessName,  mobileNumber, address,username, city,  bio,   email,   slug: uniqueSlug,     password: hashedPassword,});
      await vendor.save();
      return res.status(201).json(vendor);
    }
   const vendor = new Vendor({userId, businessName,  mobileNumber, address,city, bio,username, email, slug: emailSlug,  password: hashedPassword,  });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ role: 'vendor' });
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getVendorBySlug = async (req,res) => {
  const updatedData = req.body;
  try {
    const { slug } = req.params;
    const vendor = await Vendor.findOneAndUpdate({ slug }, updatedData, { new: true });
    if (!vendor) {
      return res.status(404).send('Vendor not found');
    }
    res.json(vendor);
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to update vendor');
  }
}
const updateVendorBySlug = async (req, res) => {
  const { slug } = req.params;
  const updatedData = req.body;
  try {
    const vendor = await Vendor.findOneAndUpdate({ slug }, updatedData, { new: true });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update vendor', error: error.message });
  }
};
const deleteVendorById = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendor = await Vendor.findByIdAndDelete(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = { createVendor, getAllVendors, getVendorBySlug, updateVendorBySlug,deleteVendorById };