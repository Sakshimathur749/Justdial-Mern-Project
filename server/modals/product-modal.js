const mongoose = require('mongoose');
const slugify = require('slugify'); 

const productSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' ,required:true},
  location: String,
  rating: Number,
  phoneNumber: String,
  status: String,
  relevantTags: [String],
  image: String,
  gallery: [String],
  productImages: [String],
  keywords: [String],
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