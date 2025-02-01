const express = require('express');
const {createReview,getAllReviews,getReviewById,} = require('../controllers/review-controller'); 

const router = express.Router();
router.post('/review', createReview);
router.get('/review', getAllReviews);
router.get('/review/:id', getReviewById);

module.exports = router;