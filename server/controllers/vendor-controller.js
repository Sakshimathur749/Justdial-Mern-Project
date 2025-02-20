const Vendor = require('../modals/vendor-modal');
const bcrypt = require('bcryptjs');
const slugify=require('slugify')
const createVendor = async (req, res) => {
  try {
    const { fullName, email, mobileNumber, password, maritalStatus, gender, dob, state,city, zipCode, areaProfile, role } = req.body;
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already exists' });
    }
    const slug = slugify(fullName, { lower: true, strict: true });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newVendor = new Vendor({
      fullName,
      email,
      mobileNumber,
      password: hashedPassword,
      maritalStatus,
      gender,
      dob,
      state,
      city,
      zipCode,
      areaProfile, slug, 
    });
    await newVendor.save();
    res.status(201).json({ message: 'Vendor created successfully', vendor: newVendor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
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
    const vendors = await Vendor.find();
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
module.exports = { createVendor, getVendorById, getAllVendors, getVendorBySlug, updateVendorBySlug,deleteVendorById };