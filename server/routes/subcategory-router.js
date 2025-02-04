const express = require('express');
const router = express.Router();
const { createSubCategory, getSubCategories, getSubCategoryById, deleteSubCategory,updateSubCategory } = require('../controllers/subcategory-controller');
const upload = require('../middleware/multer');

router.post('/subcategories/create', upload.single('image'), createSubCategory);
router.get('/subcategories/:categoryId', getSubCategories);
router.get('/subcategories/:id', getSubCategoryById);
router.delete('/subcategories/:id', deleteSubCategory);
router.put('/subcategories/:id', upload.single('image'), updateSubCategory); 

module.exports = router;