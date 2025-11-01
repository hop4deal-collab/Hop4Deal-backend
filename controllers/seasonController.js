const Season = require('../models/Season');

const getAllSeasons = async (req, res) => {
  try {
    const seasons = await Season.find()
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email')
      .sort({ updatedAt: -1 });
    
    res.json(seasons);
  } catch (error) {
    console.error('Get seasons error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSeasonById = async (req, res) => {
  try {
    const season = await Season.findById(req.params.id)
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email');
    
    if (!season) {
      return res.status(404).json({ message: 'Season not found' });
    }
    res.json(season);
  } catch (error) {
    console.error('Get season error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createSeason = async (req, res) => {
  try {
    const { name, description,isActive } = req.body;
    console.log(req.body)
    let logo = '';
    if (req.file) {
      logo = `/uploads/${req.file.filename}`;
    }
    const season = new Season({
      name,
      description,
      logo,
      isActive,
      createdBy: req.user._id
    });

    await season.save();
    
    const seasonResponse = await Season.findById(season._id)
      .populate('createdBy', 'email');
    res.status(201).json(seasonResponse);
  } catch (error) {
    console.error('Create season error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Season name already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

const updateSeason = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    console.log('[UPDATE BRAND] Uploaded file:', req.file);
    const season = await Season.findById(req.params.id);
    if (!season) {
      return res.status(404).json({ message: 'Season not found' });
    }
    let logo;
    if (req.file) {
      logo = `/uploads/${req.file.filename}`;
    }

    if (name) season.name = name;
    if (description) season.description = description;
    if (logo !== undefined) season.logo = logo;
    if (isActive !== undefined) season.isActive = isActive;
    season.updatedBy = req.user._id;

    await season.save();
    
    const seasonResponse = await Season.findById(season._id)
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email');
    res.json(seasonResponse);
  } catch (error) {
    console.error('Update season error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteSeason = async (req, res) => {
  try {
    const season = await Season.findById(req.params.id);
    if (!season) {
      return res.status(404).json({ message: 'Season not found' });
    }

    await Season.findByIdAndDelete(req.params.id);
    res.json({ message: 'Season deleted successfully' });
  } catch (error) {
    console.error('Delete season error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllSeasons,
  getSeasonById,
  createSeason,
  updateSeason,
  deleteSeason
};

