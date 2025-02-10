const SubCategory = require('../modals/subcategory-modal');
const Category = require('../modals/category-modal');
const mongoose = require('mongoose');
const slugify = require('slugify');
const path = require('path');
const fs = require('fs');

const createSubCategory = async (req, res) => {
  const { name, categoryId } = req.body;
  const imageFilename = req.file ? req.file.filename : '';
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const newSubCategory = new SubCategory({
      name,
      image: imageFilename,
      categoryId: category._id,
      slug: slugify(name, { lower: true, strict: true }),
    });
    await newSubCategory.save();
    res.status(201).json(newSubCategory);
  } catch (error) {
    console.error('Error saving subcategory:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getSubCategories = async (req, res) => {
  const { categorySlug } = req.params;
  try {
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subcategories = await SubCategory.find({ categoryId: category._id });
    res.status(200).json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};
const getSubCategoryBySlug = async (req, res) => {
  const { slug } = req.params;  
  try {
    const subcategory = await SubCategory.findOne({ slug }); 
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const deleteSubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSubCategory = await SubCategory.findById(id);
    if (!deletedSubCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    const imagePath = path.join(__dirname, '../../admin/src/images/subcategory_uploads', deletedSubCategory.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    const products = await Product.find({ subCategoryId: id });
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
    await SubCategory.findByIdAndDelete(id);
    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const updateSubCategory = async (req, res) => {
  const { slug } = req.params;  
  const { name, categoryId } = req.body;
  const imageFilename = req.file ? req.file.filename : '';
  try {
    const subcategory = await SubCategory.findOne({ slug });  
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    subcategory.name = name || subcategory.name;
    subcategory.categoryId = categoryId || subcategory.categoryId;
    subcategory.slug = slugify(subcategory.name, { lower: true, strict: true });

    if (imageFilename) {
      const oldImagePath = path.join(__dirname, '../../admin/src/images/subcategory_uploads', subcategory.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      subcategory.image = imageFilename;
    }

    await subcategory.save();
    res.status(200).json(subcategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};


module.exports = { createSubCategory, getSubCategories, getSubCategoryBySlug, deleteSubCategory, updateSubCategory };