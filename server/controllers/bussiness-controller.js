const Business = require('../modals/bussiness-modal');
const slugify = require('slugify');
const Category = require('../modals/category-modal');
const Subcategory = require('../modals/subcategory-modal');
const Vendor = require('../modals/vendor-modal');
const mongoose = require('mongoose');

const createBusiness = async (req, res) => {
  const {businessName, userName,categoryId, subcategoryId, relevantTags, keywords, websiteUrl, about, mapEmbedLink, mobileNumber, openingHours, services, paymentModes, address, email } = req.body;
console.log(openingHours,"req.body")
  try {
    if (req.user.role !== 'vendor') {
      return res.status(403).json({ message: 'Access denied. Vendor role required.' });
    }
    const vendor = await Vendor.findById(req.user.id);
    if (!vendor) {
      return res.status(400).json({ message: 'Vendor not found' });
    }
    const slug = slugify(businessName, { lower: true, strict: true });
    const existingBusiness = await Business.findOne({ slug });
    if (existingBusiness) {
      return res.status(400).json({ message: 'Business with this name already exists' });
    }
    const category = await Category.findOne({slug: categoryId});
    const subcategory = await Subcategory.findOne({slug:subcategoryId});
    if (!category || !subcategory) {
      return res.status(404).json({ message: 'Category or Subcategory not found' });
    }
    const image = req.files && req.files.image ? req.files.image[0].filename : null;
    const gallery = req.files && req.files.gallery ? req.files.gallery.map(file => file.filename) : [];
    let parsedOpeningHours = null;
    if (openingHours) {
      parsedOpeningHours = JSON.parse(openingHours); 
    }
    const newBusiness = new Business({slug, addedBy: {_id:vendor._id,name:vendor.username}, businessName,categoryId: {_id:category._id, name:category.name},
       subcategoryId:{ id:subcategory._id, name:subcategory.name}, status: 'active',relevantTags, keywords, websiteUrl, about, mapEmbedLink, image,  
       gallery,  address,mobileNumber,  openingHours:parsedOpeningHours, services, paymentModes,email});
       console.log(newBusiness.openingHours.monday);
    await newBusiness.save();
    const populatedProduct = await Business.findById(newBusiness._id)
      .populate('categoryId._id', 'categoryId.name')
      .populate('subcategoryId._id', 'subcategoryId.name')
      .populate('addedBy._id', 'addedBy.name');
    res.status(201).json({ success: true, populatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating business listing' });
  }
};
const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching business listings' });
  }
};
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
const deleteBusinessById = async (req, res) => {
  const BussinessDelete= req.params.id;
  try {
    const business = await Business.findByIdAndDelete(id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    if (business.image) {
      const imagePath = path.join(
        __dirname,
        "../../admin/src/images/uploads/image",
        business.image
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    if (business.gallery.length > 0) {
      business.gallery.forEach((image) => {
        const galleryImagePath = path.join(
          __dirname,
          "../../admin/src/images/uploads/gallery",
          image
        );
        if (fs.existsSync(galleryImagePath)) {
          fs.unlinkSync(galleryImagePath);
        }
      });
    }
    await Business.findByIdAndDelete(BussinessDelete);
    res.status(200).json({ message: 'Bussiness deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting business' });
  }
};
const updateBusinessBySlug = async (req, res) => {
  const { slug } = req.params;
  const {businessName, userName,categoryId, subcategoryId, relevantTags, keywords, websiteUrl, about, mapEmbedLink, mobileNumber, openingHours, services, paymentModes, address, email } = req.body;
  const image = req.files && req.files.image ? req.files.image[0].filename : null;
  const gallery = req.files && req.files.gallery ? req.files.gallery.map(file => file.filename) : [];
  try {
    const business = await Business.findOne({ slug });
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    let category;
    if (categoryId) {
      category = await Category.findOne({ slug: categoryId });
      if (!category) return res.status(400).json({ message: 'Category not found' });
    }
    let subcategory;
    if (subcategoryId) {
      subcategory = await Subcategory.findOne({ slug: subcategoryId });
      if (!subcategory) return res.status(400).json({ message: 'Subcategory not found' });
    }
    if (image && business.image) {
      const oldImagePath = path.join(__dirname, '../../admin/src/images/uploads/image', business.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    if (gallery.length > 0 && business.gallery.length > 0) {
      business.gallery.forEach(file => {
        const oldGalleryPath = path.join(__dirname, '../../admin/src/images/uploads/gallery', file);
        if (fs.existsSync(oldGalleryPath)) {
          fs.unlinkSync(oldGalleryPath);
        }
      });
    }
    if (businessName) business.businessName = businessName;
    if (category) business.categoryId = category._id;
    if (subcategory) business.subcategoryId = subcategory._id;
    if (relevantTags) business.relevantTags = relevantTags.split(',').map(tag => tag.trim());
    if (keywords) business.keywords = keywords.split(',').map(keyword => keyword.trim());
    if (websiteUrl) business.websiteUrl = websiteUrl;
    if (about) business.about = about;
    if (mapEmbedLink) business.mapEmbedLink = mapEmbedLink;
    if (mobileNumber) business.mobileNumber = mobileNumber;
    if (openingHours) business.openingHours = openingHours;
    if (services) business.services = services;
    if (paymentModes) business.paymentModes = paymentModes;
    if (address) business.address = address;
    if (email) business.email = email;
    if (image) business.image = image;
    if (gallery.length > 0) business.gallery = gallery;
    await business.save();
  res.status(200).json(business);
  } catch (err) {
    console.error('Error updating business by slug:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = { createBusiness, getAllBusinesses, deleteBusinessById, getBusinessBySlug, updateBusinessBySlug };