const express = require('express');
const Category = require('../modals/category-modal');
const { createCategory, getCategories ,deleteCategory,editCategory} = require('../controllers/category-controller');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../admin/src/images/uploads");
    console.log("Uploading file to:", uploadDir);
    if (!fs.existsSync(uploadDir)) {
   fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);; 
  },
  filename: (req, file, cb) => {
    if (!file || !file.originalname) {
      console.log("File is missing or invalid");
      return cb(new Error("Invalid file"));
  }
  const filename = Date.now() + '-' + file.originalname;
  cb(null, filename);
  console.log("Saving file as:", filename);
  },
});
const upload = multer({ storage: storage,limits: { fileSize: 5 * 1024 * 1024 }},);

router.post('/categories/create', upload.single('image'), createCategory);
router.delete('/categories/:id', deleteCategory);  
router.put('/categories/:id', upload.single('image'), editCategory);
router.get('/categories/:id', async (req, res) => {
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
}); 
router.get('/categories', getCategories);

module.exports = router;