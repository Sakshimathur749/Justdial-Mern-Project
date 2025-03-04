const mongoose = require('mongoose');
const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const vendorSchema = new mongoose.Schema(
  {
    address: String,
    email:String,
    username:String,
    mobileNumber: Number,
    city:String,
    bio:String,
    slug: { type: String, unique: true, default: function() { return new mongoose.Types.ObjectId().toString(); }},
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    role:{type:String, default:'vendor'},
    password: { type: String, required: false },
  },
  { timestamps: true }
);
vendorSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next(); 
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    return next(error);
  }
});
const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;