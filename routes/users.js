const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// @route   GET /api/users
// @desc    Get all data entry users
// @access  Admin only
router.get('/', authMiddleware, roleMiddleware(['admin']), getAllUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Admin only
router.get('/:id', authMiddleware, roleMiddleware(['admin']), getUserById);

// @route   POST /api/users
// @desc    Create new data entry user
// @access  Admin only
router.post('/', authMiddleware, roleMiddleware(['admin']), createUser);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Admin only
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Admin only
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);

module.exports = router;
