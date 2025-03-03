const mongoose = require('mongoose');
const slugify = require('slugify');
const vendorSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    businessName: { type: String, required: true },
    address: String,
    email:String,
    username:String,
    mobileNumber: Number,
    city:String,
    bio:String,
    // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required:false },
    slug: { type: String, unique: true, default: function() { return new mongoose.Types.ObjectId().toString(); }},
    // subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    role:{type:String, default:'vendor'},
  },
  { timestamps: true }
);

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;