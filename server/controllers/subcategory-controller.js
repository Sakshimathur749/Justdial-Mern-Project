const SubCategory = require('../modals/subcategory-modal');
const Category = require('../modals/category-modal');
const mongoose = require('mongoose');
const createSubCategory = async (req, res) => {
  const { name, categoryId } = req.body;
  const imageFilename = req.file ? req.file.filename : '';
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ message: 'Invalid categoryId' });
  }
  try {
    const category = await Category.findById(categoryId);  
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const newSubCategory = new SubCategory({
      name,
      image: imageFilename,
      categoryId: categoryId,  
    });
    await newSubCategory.save();
    res.status(201).json(newSubCategory);
  } catch (error) {
    console.error('Error saving subcategory:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getSubCategories = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const subcategories = await SubCategory.find({ categoryId });
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getSubCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const subcategory = await SubCategory.findById(id);
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
    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);
    if (!deletedSubCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const updateSubCategory = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId } = req.body;
  const imageFilename = req.file ? req.file.filename : '';
  try {
    const subcategory = await SubCategory.findById(id);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    subcategory.name = name || subcategory.name;
    subcategory.categoryId = categoryId || subcategory.categoryId;
    if (imageFilename) {
      subcategory.image = imageFilename; 
    }
    await subcategory.save();
    res.status(200).json(subcategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};


module.exports = { createSubCategory, getSubCategories, getSubCategoryById, deleteSubCategory,updateSubCategory };