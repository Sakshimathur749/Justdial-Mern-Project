const Product = require('../modals/product-modal');
const path = require('path');
const fs = require('fs');

const createProduct = async (req, res) => {
  const { title, category, location, rating, phoneNumber, status, relevantTags } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newProduct = new Product({
      title,
      category,
      location,
      rating,
      phoneNumber,
      status,
      relevantTags: relevantTags.split(',').map(tag => tag.trim()),  
      image
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.image) {
      const imagePath = path.join(__dirname, '../../admin/src/images/uploads', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); 
      }
    }
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { title, category, location, rating, phoneNumber, status, relevantTags } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (image && product.image) {
      const oldImagePath = path.join(__dirname, '../../admin/src/images/uploads', product.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    product.title = title;
    product.category = category;
    product.location = location;
    product.rating = rating;
    product.phoneNumber = phoneNumber;
    product.status = status;
    product.relevantTags = relevantTags.split(',').map(tag => tag.trim());
    if (image) product.image = image;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = {
  getProductById,
  updateProduct,
  createProduct,
  getProducts,
  deleteProduct,
};