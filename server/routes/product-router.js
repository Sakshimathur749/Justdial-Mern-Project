const express = require('express');
const multer = require('multer');
const path = require('path');
const ProductController = require('../controllers/product-controller');
const Product = require('../modals/product-modal');
const router = express.Router();
const fs = require('fs');

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

router.post('/products/create', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), ProductController.createProduct);
router.delete('/products/:id', ProductController.deleteProduct); 
router.put('/products/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]),ProductController.updateProduct);
router.get('/products/slug/:slug', ProductController.getProductBySlug);
router.get('/products', ProductController.getProducts);
router.delete('/products/:id/gallery/:imageName', async (req, res) => {
  const { id, imageName } = req.params;
  const imagePath = path.join(__dirname, '../../admin/src/images/uploads', imageName);
  try {
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ message: 'Error deleting file' });
      }
      Product.findByIdAndUpdate(id, {
        $pull: { gallery: imageName },
      })
        .then((updatedProduct) => {
          res.status(200).json(updatedProduct);
        })
        .catch((err) => {
          console.error('Error updating the database:', err);
          res.status(500).json({ message: 'Error updating the database' });
        });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;