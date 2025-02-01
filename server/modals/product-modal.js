const mongoose = require('mongoose');
const slugify = require('slugify');  
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  phoneNumber: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Closed'], required: true },
  relevantTags: [String],
  image: { type: String, required: false },  
  gallery: { type: [String], required: false }, 
  websiteUrl: { type: String, required: false },
  email: { type: String, required: false },
  about: { type: String, required: false },
}, { timestamps: true });
productSchema.pre('save', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});
module.exports = mongoose.model('Product', productSchema);