const express = require('express');
const {createReview,getReviewsBySlug,getReviewById,} = require('../controllers/review-controller'); 

const router = express.Router();
router.post('/review', createReview);
router.get('/review/slug/:slug', getReviewsBySlug);
router.get('/review/:id', getReviewById);

module.exports = router;