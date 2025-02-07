const Product = require('../modals/product-modal');
const Category = require('../modals/category-modal');
const Subcategory = require('../modals/subcategory-modal');
const path = require('path');
const slugify = require('slugify'); 
const fs = require('fs');
const upload = require('../middleware/product-middleware');
const generateUniqueSlug = async (title) => {
  let slug = slugify(title, { lower: true, strict: true });
  const existingProduct = await Product.findOne({ slug });
  if (existingProduct) {
    slug = `${slug}-${Date.now()}`;
  }
  return slug;
};
const createProduct = async (req, res) => {
  const {
    title,
    categoryId,
    subcategoryId,
    location,
    rating,
    phoneNumber,
    status,
    relevantTags,
    websiteUrl,
    email,
    about,
    mapEmbedLink,
    keywords,
  } = req.body;

  try {
    // Find category and subcategory using slugs
    const category = await Category.findOne({ slug: categoryId });
    const subcategory = await Subcategory.findOne({ slug: subcategoryId });

    if (!category || !subcategory) {
      return res.status(404).json({ message: 'Category or Subcategory not found' });
    }

    // Generate slug for product
    let slug = await generateUniqueSlug(title);

    // Handle file uploads (image, gallery, productImages)
    const image = req.files && req.files.image ? req.files.image[0].filename : null;
    const gallery = req.files && req.files.gallery ? req.files.gallery.map(file => file.filename) : [];
    const productImages = req.files && req.files.productImages ? req.files.productImages.map(file => file.filename) : [];

    // Create new product object
    const newProduct = new Product({
      title,
      slug,
      categoryId: category._id,
      subcategoryId: subcategory._id,
      location,
      rating,
      phoneNumber,
      status,
      relevantTags: relevantTags.split(',').map(tag => tag.trim()),
      image,
      gallery,
      productImages,
      keywords: keywords.split(',').map(keyword => keyword.trim()),
      websiteUrl,
      email,
      about,
      mapEmbedLink,
    });

    // Save the product
    await newProduct.save();

    // Populate category and subcategory references
    const populatedProduct = await Product.findById(newProduct._id)
      .populate('categoryId')
      .populate('subcategoryId');
    res.status(201).json(populatedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    .populate('categoryId', 'slug')  
    .exec();
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
      const imagePath = path.join(__dirname, '../../admin/src/images/uploads/image', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); 
      }
    }
    if (product.gallery.length > 0) {
      product.gallery.forEach(image => {
        const galleryImagePath = path.join(__dirname, '../../admin/src/images/uploads/gallery', image);
        if (fs.existsSync(galleryImagePath)) {
          fs.unlinkSync(galleryImagePath);
        }
      });
    }
    if (product.productImages.length > 0) {
      product.productImages.forEach(image => {
        const productImagePath = path.join(__dirname, '../../admin/src/images/uploads/productImages', image);
        if (fs.existsSync(productImagePath)) {
          fs.unlinkSync(productImagePath);
        }
      });
    }
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const updateProductBySlug = async (req, res) => {
  const { slug } = req.params;
  const { title,categoryId, subcategoryId, location, rating, phoneNumber, status, relevantTags, websiteUrl, email, about, mapEmbedLink, keywords } = req.body;
  const image = req.files && req.files.image ? req.files.image[0].filename : null;
  const gallery = req.files && req.files.gallery ? req.files.gallery.map(file => file.filename) : [];
  const productImages = req.files && req.files.productImages ? req.files.productImages.map(file => file.filename) : [];
  try {
    const category = await Category.findOne({ slug: categoryId });
    const subcategory = await Subcategory.findOne({ slug: subcategoryId });
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (image && product.image) {
      const oldImagePath = path.join(__dirname, '../../admin/src/images/uploads/image', product.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    if (gallery.length > 0 && product.gallery.length > 0) {
      product.gallery.forEach(file => {
        const oldGalleryPath = path.join(__dirname, '../../admin/src/images/uploads/gallery', file);
        if (fs.existsSync(oldGalleryPath)) {
          fs.unlinkSync(oldGalleryPath);
        }
      });
    }
    if (productImages.length > 0 && product.productImages.length > 0) {
      product.productImages.forEach(file => {
        const oldProductImagePath = path.join(__dirname, '../../admin/src/images/uploads/productImages', file);
        if (fs.existsSync(oldProductImagePath)) {
          fs.unlinkSync(oldProductImagePath);
        }
      });
    }
    product.title = title;
    product.categoryId=category._id;
    product.subcategoryId = subcategory._id;
    product.location = location;
    product.rating = rating;
    product.phoneNumber = phoneNumber;
    product.status = status;
    product.relevantTags = relevantTags ? relevantTags.split(',').map(tag => tag.trim()) : [];
    if (image) product.image = image;
    if (gallery.length > 0) product.gallery = gallery;
    if (productImages.length > 0) product.productImages = productImages;
    product.keywords = keywords.split(',').map(keyword => keyword.trim());
    product.websiteUrl = websiteUrl;
    product.email = email;
    product.about = about;
    if (mapEmbedLink) product.mapEmbedLink = mapEmbedLink;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product by slug:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({ slug }).populate('subcategoryId').populate('categoryId');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);  
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


module.exports = {  getProductBySlug,  updateProductBySlug,  createProduct, getProducts,deleteProduct,};