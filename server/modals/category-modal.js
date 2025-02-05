const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  slug: { type: String, required: true, unique: true }, 
});

categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;