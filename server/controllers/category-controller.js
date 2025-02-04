const Category = require('../modals/category-modal');

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

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id); 
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = { createCategory, getCategories, getCategoryById, deleteCategory };