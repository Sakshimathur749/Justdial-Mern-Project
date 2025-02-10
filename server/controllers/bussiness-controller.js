const Business = require('../modals/bussiness-modal');
const slugify= require('slugify')
const User = require('../modals/admin-modal');
const createBusiness = async (req, res) => {
  try {
    const user = await User.findOne({ username: 'admin' });
    const {addedBy,businessName, mainCategory, subCategory,location,personName, mobileNumber,openingHours, services,paymentModes,aboutYear} = req.body;
    const slug = slugify(businessName, { lower: true, strict: true });
    const image = req.files && req.files.image ? req.files.image[0].filename : null;
    const gallery = req.files && req.files.gallery ? req.files.gallery.map(file => file.filename) : [];
    const productImages = req.files && req.files.productImages ? req.files.productImages.map(file => file.filename) : [];
    console.log('Received city: After', location);
    const newBusiness = new Business({  slug,  addedBy: user._id,businessName,mainCategory,subCategory, image, gallery,ProductImages: productImages,location: {country: location.country, state: location.state, city: location.city,},personName,mobileNumber,openingHours,services,paymentModes,aboutYear,});
    await newBusiness.save();
    res.status(201).json(newBusiness); 
  } catch (error) {
    res.status(500).json({ message: 'Error creating business listing' });
    console.log(error)
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
module.exports = { createBusiness, getAllBusinesses ,deleteBusinessById,getBusinessBySlug};