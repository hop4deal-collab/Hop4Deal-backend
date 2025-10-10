const express = require('express');
const router = express.Router();
const { 
  getAllCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} = require('../controllers/categoryController');
const { authMiddleware, roleMiddleware, privilegeMiddleware } = require('../middleware/auth');

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getAllCategories);

// @route   GET /api/categories/:id
// @desc    Get category by ID
// @access  Public
router.get('/:id', getCategoryById);

// @route   POST /api/categories
// @desc    Create category
// @access  Admin or Data Entry with categories privilege
router.post('/', authMiddleware, privilegeMiddleware('categories'), createCategory);

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Admin or Data Entry with categories privilege
router.put('/:id', authMiddleware, privilegeMiddleware('categories'), updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Admin only
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteCategory);

module.exports = router;

