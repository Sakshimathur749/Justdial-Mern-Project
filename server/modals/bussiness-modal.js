const mongoose = require('mongoose');
const slugify = require('slugify');

const businessSchema = new mongoose.Schema({
  addedBy: {
    _id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    name: { type: String }
  },
  slug: { type: String, unique: true, required: true },
  businessName: { type: String, required: true },
  categoryId: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    name: { type: String }
  },
  subcategoryId: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
    name: { type: String }
  },
  image: { type: String },
  gallery: { type: [String], max: 10 },
  address: { type: String, required: true },
  userName: { type: String, required: false}, 
  mobileNumber: { type: String, required: false },
  email: { type: String, required: true },
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },
  services: { type: [String] },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  relevantTags: { type: [String] },
  paymentModes: { type: [String] },
  keywords: { type: [String] },
  websiteUrl: { type: String },
  about: { type: String },
  mapEmbedLink: { type: String },
}, { timestamps: true });

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;