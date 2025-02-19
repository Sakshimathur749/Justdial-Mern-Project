const Review = require('../modals/review-modal');

const createReview = async (req, res) => {
  try {
    const { slug, rating, email, name, phoneNumber, comment } = req.body;
    if (!slug || !rating || !comment || !name || !email || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    const newReview = new Review({slug, rating, email, name,phoneNumber, comment, });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create review' });
  }
};

const getReviewsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(slug)
    const reviews = await Review.find({ slug });  
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this slug' });
    }
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

module.exports = { createReview, getReviewsBySlug, getReviewById,};