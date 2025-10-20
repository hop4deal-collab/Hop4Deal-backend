const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email')
      .sort({ updatedAt: -1 });
    
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email');
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = new Category({
      name,
      description,
      createdBy: req.user._id
    });

    await category.save();
    
    const categoryResponse = await Category.findById(category._id)
      .populate('createdBy', 'email');
    res.status(201).json(categoryResponse);
  } catch (error) {
    console.error('Create category error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Category name already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (name) category.name = name;
    if (description) category.description = description;
    if (isActive !== undefined) category.isActive = isActive;
    category.updatedBy = req.user._id;

    await category.save();
    
    const categoryResponse = await Category.findById(category._id)
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email');
    res.json(categoryResponse);
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};

