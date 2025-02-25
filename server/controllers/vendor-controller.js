const Vendor = require('../modals/vendor-modal');
const User = require('../modals/user-modal')
const bcrypt = require('bcryptjs');
const slugify=require('slugify')

const createVendor = async (req, res) => {
  try {
    const { username, email, mobileNumber, password,city, address, bio } = req.body;
    const imageFilename = req.file ? req.file.filename : '';
    const existingVendor = await User.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already exists' });
    }
    const slug = slugify(username, { lower: true, strict: true });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newVendor = new User({ username, email, mobileNumber,password: hashedPassword,city, slug,  address, bio, role:'vendor',profilepicture: imageFilename });
    await newVendor.save();
    res.status(201).json({ message: 'Vendor created successfully', vendor: newVendor });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    console.log(vendor,"vendorbyId")
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getAllVendors = async (req, res) => {
  try {
    const vendors = await User.find({ role: 'vendor' });
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getVendorBySlug = async (req,res) => {
  const updatedData = req.body;
  console.log(updatedData,"vendorbysllug");
  try {
    const { slug } = req.params;
    const vendor = await User.findOneAndUpdate({ slug }, updatedData, { new: true });
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
    const vendor = await User.findOneAndUpdate({ slug }, updatedData, { new: true });
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
    console.log(vendorId)
    const vendor = await User.findByIdAndDelete(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = { createVendor, getVendorById, getAllVendors, getVendorBySlug, updateVendorBySlug,deleteVendorById };