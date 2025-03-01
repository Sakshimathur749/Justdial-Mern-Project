const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  title: {type: String,required: true},
  price: {type: Number, required: true},
  duration: {type: Number, required: true},
  validityInMonths: { type: Number,required: true, },
  feature: [String],
  isActive: { type: Boolean, default: true },
},{timestamps:true});

module.exports = mongoose.model('Membership', MembershipSchema);