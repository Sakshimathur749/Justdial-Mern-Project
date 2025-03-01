const Membership = require('../modals/membership-modal')
const User = require('../modals/user-modal')

const createMembership = async (req, res) => {
    try {
      const { title, price, duration, validityInMonths, feature, isActive } = req.body;
      if (!title || !price || !duration || !validityInMonths || !feature) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
      const newMembership = new Membership({title, price, duration,  validityInMonths,feature, isActive,});
      await newMembership.save();
      res.status(201).json({ success: true, message: 'Membership plan created successfully',membership: newMembership,  });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating membership plan', error });
  }
};  

const getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find({ isActive: true });
    res.status(200).json({ success: true, memberships, });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching membership plans', error });
  }
};

const getMembershipById = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) {
      return res.status(404).json({ success: false, message: 'Membership plan not found' });
    }
    res.status(200).json({success: true, membership, });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching membership plan', error });
  }
};

const updateMembership = async (req, res) => {
  try {
    const { title, price, duration, validityInMonths, feature, isActive } = req.body;
    const updatedMembership = await Membership.findByIdAndUpdate(req.params.id, { title, price, duration, validityInMonths, feature, isActive }, { new: true } );
    if (!updatedMembership) {
      return res.status(404).json({ success: false, message: 'Membership plan not found' });
    }
    res.status(200).json({ success: true, message: 'Membership plan updated successfully', membership: updatedMembership,});
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating membership plan', error });
  }
};

const deleteMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndDelete(req.params.id);
    if (!membership) {
      return res.status(404).json({ success: false, message: 'Membership plan not found' });
    }
    res.status(200).json({ success: true,  message: 'Membership plan deleted successfully', });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting membership plan', error });
  }
};
module.exports = { createMembership,  updateMembership,  getMembershipById, getAllMemberships,deleteMembership,};