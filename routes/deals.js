const express = require('express');
const router = express.Router();
const { 
  getAllDeals, 
  getDealById, 
  createDeal, 
  updateDeal, 
  deleteDeal 
} = require('../controllers/dealController');
const { authMiddleware, roleMiddleware, privilegeMiddleware } = require('../middleware/auth');

// @route   GET /api/deals
// @desc    Get all deals
// @access  Public
router.get('/', getAllDeals);

// @route   GET /api/deals/:id
// @desc    Get deal by ID
// @access  Public
router.get('/:id', getDealById);

// @route   POST /api/deals
// @desc    Create deal
// @access  Admin or Data Entry with deals privilege
router.post('/', authMiddleware, privilegeMiddleware('deals'), createDeal);

// @route   PUT /api/deals/:id
// @desc    Update deal
// @access  Admin or Data Entry with deals privilege
router.put('/:id', authMiddleware, privilegeMiddleware('deals'), updateDeal);

// @route   DELETE /api/deals/:id
// @desc    Delete deal
// @access  Admin only
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteDeal);

module.exports = router;
