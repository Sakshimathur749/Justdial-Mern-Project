const express = require('express');
const ProductController = require('../controllers/product-controller');
const router = express.Router();
const upload = require('../middleware/product-middleware');

router.post('/products/create', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 },{ name: 'productImages', maxCount: 5 } ]), ProductController.createProduct);
router.delete('/products/:id', ProductController.deleteProduct); 
router.put('/products/:slug', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 },{ name: 'productImages', maxCount: 5 }]),ProductController.updateProductBySlug);
router.get('/products/:slug', ProductController.getProductBySlug);
router.get('/products', ProductController.getProducts);

module.exports = router;