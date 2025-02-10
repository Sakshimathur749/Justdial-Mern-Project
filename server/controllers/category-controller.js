const Category = require('../modals/category-modal');
const SubCategory = require('../modals/subcategory-modal');
const Product = require('../modals/product-modal');
const mongoose = require('mongoose');
const slugify = require('slugify');
const path = require('path');
const fs = require('fs');
const createCategory = async (req, res) => {
  const { name } = req.body;
  const imageFilename = req.file ? req.file.filename : '';
  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }
    const newCategory = new Category({
      name,
      image: imageFilename,
      slug: slugify(name, { lower: true, strict: true }),
    });
    await newCategory.save();
    res.status(201).json(newCategory);  
  } catch (error) {
    console.error('Error saving category:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    if (category.image) {
      const categoryImagePath = path.join(__dirname, '../../admin/src/images/category_uploads', category.image);
      if (fs.existsSync(categoryImagePath)) {
        fs.unlinkSync(categoryImagePath);
      }
    }
    const subcategories = await SubCategory.find({ categoryId: id });
    for (const sub of subcategories) {
      if (sub.image) {
        const subcategoryImagePath = path.join(__dirname, '../../admin/src/images/subcategory_uploads', sub.image);
        if (fs.existsSync(subcategoryImagePath)) {
          fs.unlinkSync(subcategoryImagePath); 
        }
      }
      await SubCategory.findByIdAndDelete(sub._id); 
    }
    const products = await Product.find({ categoryId: id });
    for (const product of products) {
      if (product.image) {
        const productImagePath = path.join(__dirname, '../../admin/src/images/uploads/image', product.image);
        if (fs.existsSync(productImagePath)) {
          fs.unlinkSync(productImagePath);
        }
      }
      if (product.gallery && Array.isArray(product.gallery)) {
        product.gallery.forEach(image => {
          const galleryImagePath = path.join(__dirname, '../../admin/src/images/uploads/gallery', image);
          if (fs.existsSync(galleryImagePath)) {
            fs.unlinkSync(galleryImagePath);
          }
        });
      }
      if (product.productImages && Array.isArray(product.productImages)) {
        product.productImages.forEach(image => {
          const additionalImagePath = path.join(__dirname, '../../admin/src/images/uploads/productImages', image);
          if (fs.existsSync(additionalImagePath)) {
            fs.unlinkSync(additionalImagePath);
          }
        });
      }

      await Product.findByIdAndDelete(product._id);  
    }
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category and its subcategories deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const updateCategory = async (req, res) => {
  const { slug } = req.params;
  const { name } = req.body;
  const imageFilename = req.file ? req.file.filename : '';
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    category.name = name || category.name;
    category.slug = slugify(category.name, { lower: true, strict: true });  
    if (imageFilename) {
      const oldImagePath = path.join(__dirname, '../../admin/src/images/category_uploads', category.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      category.image = imageFilename;
    }
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getCategoryBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = { createCategory, getCategories, deleteCategory, updateCategory, getCategoryBySlug };