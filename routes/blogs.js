const express = require('express');
const router = express.Router();
const { 
  getAllBlogs, 
  getBlogById, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} = require('../controllers/blogController');
const { authMiddleware, roleMiddleware, privilegeMiddleware } = require('../middleware/auth');

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
router.get('/', getAllBlogs);

// @route   GET /api/blogs/:id
// @desc    Get blog by ID
// @access  Public
router.get('/:id', getBlogById);

// @route   POST /api/blogs
// @desc    Create blog
// @access  Admin or Data Entry with blogs privilege
router.post('/', authMiddleware, privilegeMiddleware('blogs'), createBlog);

// @route   PUT /api/blogs/:id
// @desc    Update blog
// @access  Admin or Data Entry with blogs privilege
router.put('/:id', authMiddleware, privilegeMiddleware('blogs'), updateBlog);

// @route   DELETE /api/blogs/:id
// @desc    Delete blog
// @access  Admin only
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteBlog);

module.exports = router;
