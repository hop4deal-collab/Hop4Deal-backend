const express = require('express');
const router = express.Router();
const { 
  getAllBrands, 
  getBrandById, 
  createBrand, 
  updateBrand, 
  deleteBrand 
} = require('../controllers/brandController');
const { authMiddleware, roleMiddleware, privilegeMiddleware } = require('../middleware/auth');

// @route   GET /api/brands
// @desc    Get all brands
// @access  Public
router.get('/', getAllBrands);

// @route   GET /api/brands/:id
// @desc    Get brand by ID
// @access  Public
router.get('/:id', getBrandById);

// @route   POST /api/brands
// @desc    Create brand
// @access  Admin or Data Entry with brands privilege
router.post('/', authMiddleware, privilegeMiddleware('brands'), createBrand);

// @route   PUT /api/brands/:id
// @desc    Update brand
// @access  Admin or Data Entry with brands privilege
router.put('/:id', authMiddleware, privilegeMiddleware('brands'), updateBrand);

// @route   DELETE /api/brands/:id
// @desc    Delete brand
// @access  Admin only
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteBrand);

module.exports = router;
