const Blog = require('../models/Blog');

const getAllBlogs = async (req, res) => {
  try {
    const { featured } = req.query;
    let filter = { isActive: true };
    
    if (featured !== undefined) {
      filter.isFeatured = featured === 'true';
    }

    const blogs = await Blog.find(filter)
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email')
      .sort({ updatedAt: -1 });
    
    res.json(blogs);
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createBlog = async (req, res) => {
  try {
    const { headline, description, content, image, isFeatured } = req.body;

    const blog = new Blog({
      headline,
      description,
      content,
      image,
      isFeatured: isFeatured || false,
      createdBy: req.user._id
    });

    await blog.save();
    
    const blogResponse = await Blog.findById(blog._id)
      .populate('createdBy', 'email');
    res.status(201).json(blogResponse);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { headline, description, content, image, isFeatured, isActive } = req.body;
    
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (headline) blog.headline = headline;
    if (description) blog.description = description;
    if (content) blog.content = content;
    if (image !== undefined) blog.image = image;
    if (isFeatured !== undefined) blog.isFeatured = isFeatured;
    if (isActive !== undefined) blog.isActive = isActive;
    blog.updatedBy = req.user._id;

    await blog.save();
    
    const blogResponse = await Blog.findById(blog._id)
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email');
    res.json(blogResponse);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};

