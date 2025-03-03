const Business = require('../modals/bussiness-modal');
const slugify = require('slugify');
const Category = require('../modals/category-modal');
const Subcategory = require('../modals/subcategory-modal');
const Vendor = require('../modals/vendor-modal');
const mongoose = require('mongoose');

// Create a new business listing
const createBusiness = async (req, res) => {
  const { categoryId, subcategoryId, relevantTags, keywords, websiteUrl, about, mapEmbedLink, mobileNumber, openingHours, services, paymentModes, address, email } = req.body;
  
  try {
    if (req.user.role !== 'vendor') {
      return res.status(403).json({ message: 'Access denied. Vendor role required.' });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const vendor = await Vendor.findOne({ userId });

    if (!vendor) {
      return res.status(400).json({ message: 'Vendor not found' });
    }

    const slug = slugify(vendor.businessName, { lower: true, strict: true });
    const existingBusiness = await Business.findOne({ slug });
    if (existingBusiness) {
      return res.status(400).json({ message: 'Business with this name already exists' });
    }

    const category = await Category.findOne({ slug: categoryId });
    const subcategory = await Subcategory.findOne({ slug: subcategoryId });
    if (!category || !subcategory) {
      return res.status(404).json({ message: 'Category or Subcategory not found' });
    }

    const image = req.files && req.files.image ? req.files.image[0].filename : null;
    const gallery = req.files && req.files.gallery ? req.files.gallery.map(file => file.filename) : [];

    const newBusiness = new Business({
      slug,
      addedBy: vendor._id, 
      businessName: vendor.businessName,
      categoryId: category.slug,
      subcategoryId: subcategory.slug,
      status: 'active',
      relevantTags,
      keywords,
      websiteUrl,
      about,
      mapEmbedLink,
      image,
      gallery,
      address,
      userName: vendor.username,
      mobileNumber,
      openingHours,
      services,
      paymentModes,
      email
    });

    await newBusiness.save();

    const populatedProduct = await Business.findById(newBusiness._id)
      .populate('categoryId')
      .populate('subcategoryId');

    res.status(201).json({ success: true, populatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating business listing' });
  }
};

// Get all businesses
const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching business listings' });
  }
};

// Get business by slug
const getBusinessBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const business = await Business.findOne({ slug });
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.status(200).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching business' });
  }
};

// Delete business by ID
const deleteBusinessById = async (req, res) => {
  const { id } = req.params;
  try {
    const business = await Business.findByIdAndDelete(id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.status(200).json({ message: 'Business deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting business' });
  }
};

// Update business by slug
const updateBusinessBySlug = async (req, res) => {
  const { slug } = req.params;
  const updatedData = req.body;
  try {
    const business = await Business.findByIdAndUpdate(slug, updatedData, { new: true });
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.status(200).json(business);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createBusiness, getAllBusinesses, deleteBusinessById, getBusinessBySlug, updateBusinessBySlug };