const Brand = require('../models/Brand');

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true })
      .populate('category', 'name')
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email')
      .sort({ updatedAt: -1 });
    
    res.json(brands);
  } catch (error) {
    console.error('Get brands error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id)
      .populate('category', 'name')
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email');
    
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json(brand);
  } catch (error) {
    console.error('Get brand error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createBrand = async (req, res) => {
  try {
    const { name, description, tagline, category } = req.body;
    let logo = '';
    if (req.file) {
      logo = `/uploads/${req.file.filename}`;
    }
    const brand = new Brand({
      name,
      description,
      logo,
      tagline,
      category,
      createdBy: req.user._id
    });

    await brand.save();
    
    const brandResponse = await Brand.findById(brand._id)
      .populate('category', 'name')
      .populate('createdBy', 'email');
    res.status(201).json(brandResponse);
  } catch (error) {
    console.error('Create brand error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Brand name already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

const updateBrand = async (req, res) => {
  try {
    const { name, description, tagline, category, isActive } = req.body;
    console.log('[UPDATE BRAND] Uploaded file:', req.file);
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    let logo = '';
    if (req.file) {
      logo = `/uploads/${req.file.filename}`;
    }

    if (name) brand.name = name;
    if (description) brand.description = description;
    if (logo !== undefined) brand.logo = logo;
    if (tagline !== undefined) brand.tagline = tagline;
    if (category) brand.category = category;
    if (isActive !== undefined) brand.isActive = isActive;
    brand.updatedBy = req.user._id;

    await brand.save();
    
    const brandResponse = await Brand.findById(brand._id)
      .populate('category', 'name')
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email');
    res.json(brandResponse);
  } catch (error) {
    console.error('Update brand error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.error('Delete brand error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
};

