const Vendor = require('../modals/vendor-modal');
const User = require('../modals/user-modal')
const Category = require('../modals/category-modal')
const bcrypt = require('bcryptjs');
const slugify=require('slugify')
const mongoose = require('mongoose');

const createVendor = async (req, res) => {
  const {  mobileNumber, address, city, bio, password, email, username } = req.body;
  try {
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
      const vendor = new Vendor({ mobileNumber, address,username, city,  bio,   email,   slug: uniqueSlug,     password: hashedPassword,});
      await vendor.save();
      return res.status(201).json(vendor);
    }
   const vendor = new Vendor({ mobileNumber, address,city, bio,username, email, slug: emailSlug,  password: hashedPassword,  });
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