const express = require('express');
const router = express.Router();
const upload = require('../middleware/product-middleware');
const businessController = require('../controllers/bussiness-controller');

router.post('/listing',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 },{ name: 'productImages', maxCount: 5 } ]), businessController.createBusiness);
router.get('/listing', businessController.getAllBusinesses);
router.get('/listing/slug/:slug', businessController.getBusinessBySlug);
router.put('/listing/:slug', businessController.updateBusinessBySlug);
router.delete('/listing/:id', businessController.deleteBusinessById);
module.exports = router;