const mongoose = require('mongoose');
const slugify = require('slugify');

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  slug: { type: String, required: true, unique: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  categorySlug: { type: String, },
});
subCategorySchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});
const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;