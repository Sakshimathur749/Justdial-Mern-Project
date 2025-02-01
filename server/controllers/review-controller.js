const Review = require('../modals/review-modal');

const createReview = async (req, res) => {
  try {
    const { productId, rating, email, name, phoneNumber, comment } = req.body;
    if (!productId || !rating || !comment || !name || !email || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const newReview = new Review({
      productId, 
      rating,
      email,
      name,
      phoneNumber,
      comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create review' });
  }
};
const getAllReviews = async (req, res) => {
  try {
    const { productId } = req.query; 
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required!' });
    }

    const reviews = await Review.find({ productId }); 
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id); 
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch review' });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
};
