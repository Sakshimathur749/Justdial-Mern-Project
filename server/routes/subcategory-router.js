const express = require('express');
const router = express.Router();
const { createSubCategory, getSubCategories, getSubCategoryBySlug, deleteSubCategory,updateSubCategory } = require('../controllers/subcategory-controller');
const upload = require('../middleware/multer');

router.post('/subcategories/create', upload.single('image'), createSubCategory);
router.get('/subcategories/:categorySlug', getSubCategories);
router.get('/subcategory/:slug', getSubCategoryBySlug);
router.delete('/subcategories/:id', deleteSubCategory);
router.put('/subcategories/:slug', upload.single('image'), updateSubCategory); 

module.exports = router;