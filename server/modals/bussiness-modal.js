const mongoose = require("mongoose");
const slugify = require('slugify'); 
const businessSchema = new mongoose.Schema({
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slug: { type: String, unique: true, required: true },  
  businessName: { type: String, required: true },
  categoryId: { type: String, required: true },
  subcategoryId: { type: String ,required:true},
  image: { type: String },
  gallery: [String], 
  title: String,
  location: {
    country: String,
    state: String,
    city: String, 
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    pinCode: String,
  },
  personName: String,
  rating: Number,
  mobileNumber: { type: String, required: true },
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },
  services: [String],
  status: String,
  relevantTags: [String],
  paymentModes: [String],
  keywords: [String],
  websiteUrl: String,
  aboutYear: Number,
  about: String,
  mapEmbedLink: String,
}, { timestamps: true });

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;