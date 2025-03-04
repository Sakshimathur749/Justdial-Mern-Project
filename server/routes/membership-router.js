const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membership-controller');

router.post('/create', membershipController.createMembership);
router.get('/', membershipController.getAllMemberships);
router.get('/:id', membershipController.getMembershipById)
router.put('/:id', membershipController.updateMembership);
router.delete('/:id', membershipController.deleteMembership);

module.exports = router;