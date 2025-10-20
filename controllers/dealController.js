const Deal = require('../models/Deal');

const getAllDeals = async (req, res) => {
  try {
    const { category, brand, isHot } = req.query;
    let filter = { isActive: true };
    
    if (category) {
      filter['brand.category'] = category;
    }
    if (brand) {
      filter.brand = brand;
    }
    if (isHot !== undefined) {
      filter.isHot = isHot === 'true';
    }

    const deals = await Deal.find(filter)
      .populate('brand', 'name logo category')
      .populate('brand.category', 'name')
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email')
      .sort({ updatedAt: -1 });
    
    res.json(deals);
  } catch (error) {
    console.error('Get deals error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id)
      .populate('brand', 'name logo category')
      .populate('brand.category', 'name')
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email');
    
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.json(deal);
  } catch (error) {
    console.error('Get deal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createDeal = async (req, res) => {
  try {
    const { brand, startDate, endDate, code, description, percentOff, isHot,link,type } = req.body;

    const deal = new Deal({
      brand,
      startDate,
      endDate,
      code,
      link,
      type,
      description,
      percentOff,
      isHot: isHot || false,
      createdBy: req.user._id
    });

    await deal.save();
    
    const dealResponse = await Deal.findById(deal._id)
      .populate('brand', 'name logo category')
      .populate('brand.category', 'name')
      .populate('createdBy', 'email');
    res.status(201).json(dealResponse);
  } catch (error) {
    console.error('Create deal error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Deal code already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

const updateDeal = async (req, res) => {
  try {
    const {link,type, brand, startDate, endDate, code, description, percentOff, isHot, isActive } = req.body;
    
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    if (brand) deal.brand = brand;
    if (link) deal.link = link;
    if (type) deal.type = type;
    if (startDate) deal.startDate = startDate;
    if (endDate) deal.endDate = endDate;
    if (code) deal.code = code;
    if (description) deal.description = description;
    if (percentOff !== undefined) deal.percentOff = percentOff;
    if (isHot !== undefined) deal.isHot = isHot;
    if (isActive !== undefined) deal.isActive = isActive;
    deal.updatedBy = req.user._id;

    await deal.save();
    
    const dealResponse = await Deal.findById(deal._id)
      .populate('brand', 'name logo category')
      .populate('brand.category', 'name')
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email');
    res.json(dealResponse);
  } catch (error) {
    console.error('Update deal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    await Deal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    console.error('Delete deal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal
};

