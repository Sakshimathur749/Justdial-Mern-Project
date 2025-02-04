const mongoose = require('mongoose');
const slugify = require('slugify'); 
const productSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true, required: true },
  category: String,
  location: String,
  rating: Number,
  phoneNumber: String,
  status: String,
  relevantTags: [String],
  image: String,
  gallery: [String],
  websiteUrl: String,
  about: String,
  mapEmbedLink: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
productSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);