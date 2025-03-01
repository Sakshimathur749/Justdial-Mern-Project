const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessListingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  message: String,
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
});

module.exports = mongoose.model('Lead', leadSchema);