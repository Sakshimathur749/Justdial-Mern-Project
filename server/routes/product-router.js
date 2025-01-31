const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ProductController = require('../controllers/product-controller');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../admin/src/images/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);  
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);  
  }
});
const upload = multer({ storage: storage });

router.post('/products/create', upload.single('image'), ProductController.createProduct);
router.delete('/products/:id', ProductController.deleteProduct); 
router.put('/products/:id', upload.single('image'), ProductController.updateProduct);
router.get('/products/:id', ProductController.getProductById);
router.get('/products', ProductController.getProducts);

module.exports = router;