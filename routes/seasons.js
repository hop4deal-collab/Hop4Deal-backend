const express = require('express');
const router = express.Router();
const { 
  getAllSeasons, 
  getSeasonById, 
  createSeason, 
  updateSeason, 
  deleteSeason 
} = require('../controllers/seasonController');
const upload = require('../middleware/upload');
const { authMiddleware, roleMiddleware, privilegeMiddleware } = require('../middleware/auth');

// @route   GET /api/seasons
// @desc    Get all seasons
// @access  Public
router.get('/', getAllSeasons);

// @route   GET /api/seasons/:id
// @desc    Get season by ID
// @access  Public
router.get('/:id', getSeasonById);

// @route   POST /api/seasons
// @desc    Create season
// @access  Admin or Data Entry with seasons privilege
router.post('/',upload.single('logo'), authMiddleware, privilegeMiddleware('seasons'), createSeason);

// @route   PUT /api/seasons/:id
// @desc    Update season
// @access  Admin or Data Entry with seasons privilege
router.put('/:id',upload.single('logo'), authMiddleware, privilegeMiddleware('seasons'), updateSeason);

// @route   DELETE /api/seasons/:id
// @desc    Delete season
// @access  Admin only
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteSeason);

module.exports = router;

