const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      enum: ['married', 'unmarried'],
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    areaProfile: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true, 
      required: true, 
    },  
    role:{type:String, default:'vendor'},
  },
  { timestamps: true }
);

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;