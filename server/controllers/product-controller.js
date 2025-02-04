const Product = require('../modals/product-modal');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const slugify = require('slugify'); 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir = path.join(__dirname, '../../admin/src/images/uploads'); 
    if (file.fieldname === 'gallery') {
      uploadDir = path.join(__dirname, '../../admin/src/images/gallery'); 
    }

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
const generateUniqueSlug = async (title) => {
  let slug = slugify(title, { lower: true, strict: true });
  const existingProduct = await Product.findOne({ slug });
  if (existingProduct) {
    slug = `${slug}-${Date.now()}`;
  }
  return slug;
};

const createProduct = async (req, res) => {
  const { title, category, location, rating, phoneNumber, status, relevantTags, websiteUrl, email, about, mapEmbedLink } = req.body;

  let slug = await generateUniqueSlug(title);
  const image = req.files && req.files.image ? req.files.image[0].filename : null;
  const gallery = req.files && req.files.gallery ? req.files.gallery.map(file => file.filename) : [];

  try {
    const newProduct = new Product({
      title,
      slug,
      category,
      location,
      rating,
      phoneNumber,
      status,
      relevantTags: relevantTags.split(',').map(tag => tag.trim()),
      image,
      gallery,
      websiteUrl,
      email,
      about,
      mapEmbedLink 
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
  const { title, category, location, rating, phoneNumber, status, relevantTags, websiteUrl, email, about, mapEmbedLink } = req.body;
  const image = req.files && req.files.image ? req.files.image[0].filename : null;
  const gallery = req.files && req.files.gallery ? req.files.gallery.map(file => file.filename) : [];
  
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If new image is uploaded, delete the old image
    if (image && product.image) {
      const oldImagePath = path.join(__dirname, '../../admin/src/images/uploads', product.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // If new gallery images are uploaded, delete the old ones
    if (gallery.length > 0 && product.gallery.length > 0) {
      product.gallery.forEach(file => {
        const oldGalleryPath = path.join(__dirname, '../../admin/src/images/uploads', file);
        if (fs.existsSync(oldGalleryPath)) {
          fs.unlinkSync(oldGalleryPath);  
        }
      });
    }

    // Update product fields
    product.title = title;
    product.category = category;
    product.location = location;
    product.rating = rating;
    product.phoneNumber = phoneNumber;
    product.status = status;
    product.relevantTags = relevantTags ? relevantTags.split(',').map(tag => tag.trim()) : [];
    if (image) product.image = image;
    if (gallery.length > 0) product.gallery = gallery;
    product.websiteUrl = websiteUrl;
    product.email = email;
    product.about = about;
    if (mapEmbedLink) product.mapEmbedLink = mapEmbedLink;  

    // Save the updated product
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error('Error during product update:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);  
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  getProductBySlug,
  updateProduct,
  createProduct,
  getProducts,
  deleteProduct,
};