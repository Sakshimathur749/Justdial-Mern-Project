const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String, 
    required: true
  },
  benefits: [String]
});

module.exports = mongoose.model('Membership', MembershipSchema);