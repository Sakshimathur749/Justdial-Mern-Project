const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slug: { type: String, unique: true, required: true },  
  businessName: { type: String, required: true },
  mainCategory: { type: String, required: true },
  subCategory: { type: String, required: true },
  image: { type: String },
  productImages: [String],
  gallery: [String], 
  location: {
    country: String,
    state: String,
    city: String, 
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    pinCode: { type: String, default: null },
  },
  personName: String,
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
  paymentModes: [String],
  aboutYear: Number,
}, { timestamps: true });

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;