const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  subcategories: [subCategorySchema]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;