const express = require('express');
const router = express.Router();
const { createVendor, getVendorById, getAllVendors,getVendorBySlug,updateVendorBySlug,deleteVendorById } = require('../controllers/vendor-controller');

router.post('/vendor', createVendor);
router.get('/vendor/:id', getVendorById);
router.get('/vendors', getAllVendors);
router.put('/vendor/slug/:slug', getVendorBySlug);
router.delete('/vendor/:id', deleteVendorById);
router.get('/vendor/slug/:slug', updateVendorBySlug);
module.exports = router;