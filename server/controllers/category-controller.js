const Category = require('../modals/category-modal');
const createCategory = async (req, res) => {
  const { name, subcategories } = req.body;
  const imageFilename = req.file ? req.file.filename : '';   
  const subcategoryList = subcategories.split(',').map(subcategory => ({ name: subcategory.trim() }));

  try {
    const newCategory = new Category({
      name,
      image:imageFilename,
      subcategories: subcategoryList
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


const editCategory = async (req, res) => {
  const { id } = req.params;
  const { name, subcategories } = req.body;
  let imageFilename = '';

  if (req.file) {
    imageFilename = req.file.filename;
  } else {
    imageFilename = req.body.existingImage || '';
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        image: imageFilename || undefined,
        subcategories: subcategories.split(',').map((sub) => ({ name: sub.trim() })),
      },
      { new: true } 
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory); 
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = { createCategory, getCategories,deleteCategory,editCategory};