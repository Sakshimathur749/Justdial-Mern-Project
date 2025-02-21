const Business = require('../modals/bussiness-modal');
const slugify= require('slugify')
const Category = require('../modals/category-modal');
const Subcategory = require('../modals/subcategory-modal');
const User = require('../modals/admin-modal');
const generateSlug = async (businessName, categorySlug, subcategorySlug) => {
  let slug = slugify(`${categorySlug}-${subcategorySlug}-${businessName}`, { lower: true, strict: true });
  let existingBusiness = await Business.findOne({ slug });
  let count = 1;
  while (existingBusiness) {
    slug = `${slugify(`${categorySlug}-${subcategorySlug}-${businessName}`, { lower: true, strict: true })}-${count}`;
    count++;
    existingBusiness = await Business.findOne({ slug });
  }

  return slug;
};
const createBusiness = async (req, res) => { 
  const {addedBy,businessName, categoryId, subcategoryId,title,rating,status,relevantTags,keywords,websiteUrl,about,mapEmbedLink,location,personName, mobileNumber,openingHours, services,paymentModes,aboutYear} = req.body;
  try {
    const category = await Category.findOne({ slug: categoryId });
    const subcategory = await Subcategory.findOne({ slug: subcategoryId });
    if (!category || !subcategory) {
      return res.status(404).json({ message: 'Category or Subcategory not found' });
    }
    const user = await User.findOne({ username: 'admin' });
    let slug = await generateSlug(businessName, category.slug, subcategory.slug);
    const image = req.files && req.files.image ? req.files.image[0].filename : null;
    const gallery = req.files && req.files.gallery ? req.files.gallery.map(file => file.filename) : [];
    const newBusiness = new Business({  slug,  addedBy: user._id,businessName,categoryId:category.slug,subcategoryId:subcategory.slug,title,rating,status,relevantTags: relevantTags.split(',').map(tag => tag.trim()),keywords:keywords.split(',').map(keyword => keyword.trim()),websiteUrl,about,mapEmbedLink, image, gallery,location: {country: location.country, state: location.state, city: location.city,pinCode: location.pinCode },personName,mobileNumber,openingHours,services,paymentModes,aboutYear,});
    await newBusiness.save();
    const populatedProduct = await Business.findById(newBusiness._id)
          .populate('categoryId')
          .populate('subcategoryId');
    res.status(201).json(populatedProduct); 
  } catch (error) {
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
const updateBusinessBySlug = async (req, res) => {
  const { slug } = req.params;
  const { addedBy, businessName, categoryId, subcategoryId,title,rating,status,relevantTags,keywords,websiteUrl,about,mapEmbedLink, location, personName, mobileNumber, openingHours, services, paymentModes, aboutYear } = req.body;
  try {
    const business = await Business.findOneAndUpdate(
      { slug },
      { addedBy, businessName, categoryId, subcategoryId,title,rating,status,relevantTags,keywords,websiteUrl,about,mapEmbedLink, location, personName, mobileNumber, openingHours, services, paymentModes, aboutYear },
      { new: true } 
    );
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.status(200).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating business' });
  }
};

module.exports = { createBusiness, getAllBusinesses ,deleteBusinessById,getBusinessBySlug,updateBusinessBySlug};