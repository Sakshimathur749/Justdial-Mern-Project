const express = require('express');
const router = express.Router();
const { createCategory, getCategories, getCategoryById, deleteCategory } = require('../controllers/category-controller');
const upload = require('../middleware/multer');


router.post('/categories/create', upload.single('image'), createCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.delete('/categories/:id', deleteCategory);

module.exports = router;