const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5, 
    },
    email: {
      type: String,
      required: true,
      match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,  
    },
    comment: {
      type: String,
      required: true, 
    },
  }, { timestamps: true });   
module.exports = mongoose.model('Review', reviewSchema);
