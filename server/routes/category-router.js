const express = require('express');
const router = express.Router();
const { createCategory, getCategories, deleteCategory, updateCategory, getCategoryBySlug } = require('../controllers/category-controller');
const upload = require('../middleware/multer');


router.post('/categories/create', upload.single('image'), createCategory);
router.get('/categories', getCategories);
router.get('/categories/:slug', getCategoryBySlug);
router.delete('/categories/:id', deleteCategory);
router.put('/categories/:slug', upload.single('image'), updateCategory); 
router.get('/categories/slug/:slug', getCategoryBySlug);
module.exports = router;