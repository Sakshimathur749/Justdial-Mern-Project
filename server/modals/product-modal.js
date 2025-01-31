const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  phoneNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    required: true
  },
  relevantTags: [String],
  image: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);