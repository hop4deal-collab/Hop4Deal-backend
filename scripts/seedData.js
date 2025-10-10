const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Deal = require('../models/Deal');
const Blog = require('../models/Blog');

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Brand.deleteMany({});
    await Deal.deleteMany({});
    await Blog.deleteMany({});

    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      email: process.env.ADMIN_EMAIL || 'admin@hop4deals.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin',
      privileges: {
        categories: true,
        brands: true,
        deals: true,
        blogs: true
      }
    });

    await adminUser.save();
    console.log('Created admin user');

    // Create sample data entry user
    const dataEntryUser = new User({
      email: 'dataentry@hop4deals.com',
      password: 'DataEntry@123',
      role: 'dataEntry',
      privileges: {
        categories: true,
        brands: true,
        deals: true,
        blogs: false
      },
      createdBy: adminUser._id
    });

    await dataEntryUser.save();
    console.log('Created data entry user');

    // Create categories
    const categories = [
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        createdBy: adminUser._id
      },
      {
        name: 'Fashion',
        description: 'Clothing and fashion accessories',
        createdBy: adminUser._id
      },
      {
        name: 'Sports',
        description: 'Sports equipment and apparel',
        createdBy: adminUser._id
      },
      {
        name: 'Home & Garden',
        description: 'Home improvement and garden supplies',
        createdBy: adminUser._id
      }
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log('Created categories');

    // Create brands
    const brands = [
      {
        name: 'TechCorp',
        description: 'Leading technology company',
        logo: 'https://via.placeholder.com/150x150/8B5CF6/FFFFFF?text=TC',
        tagline: 'Innovation at its finest',
        category: createdCategories[0]._id,
        createdBy: adminUser._id
      },
      {
        name: 'StyleHub',
        description: 'Fashion forward clothing brand',
        logo: 'https://via.placeholder.com/150x150/8B5CF6/FFFFFF?text=SH',
        tagline: 'Express your style',
        category: createdCategories[1]._id,
        createdBy: adminUser._id
      },
      {
        name: 'SportMax',
        description: 'Premium sports equipment',
        logo: 'https://via.placeholder.com/150x150/8B5CF6/FFFFFF?text=SM',
        tagline: 'Push your limits',
        category: createdCategories[2]._id,
        createdBy: adminUser._id
      },
      {
        name: 'HomePro',
        description: 'Professional home solutions',
        logo: 'https://via.placeholder.com/150x150/8B5CF6/FFFFFF?text=HP',
        tagline: 'Make your house a home',
        category: createdCategories[3]._id,
        createdBy: adminUser._id
      }
    ];

    const createdBrands = await Brand.insertMany(brands);
    console.log('Created brands');

    // Create deals
    const deals = [
      {
        brand: createdBrands[0]._id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        code: 'TECH20',
        description: 'Get 20% off on all electronics',
        percentOff: 20,
        isHot: true,
        createdBy: adminUser._id
      },
      {
        brand: createdBrands[1]._id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        code: 'STYLE15',
        description: '15% off on summer collection',
        percentOff: 15,
        isHot: false,
        createdBy: adminUser._id
      },
      {
        brand: createdBrands[2]._id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        code: 'SPORT25',
        description: '25% off on sports equipment',
        percentOff: 25,
        isHot: true,
        createdBy: adminUser._id
      },
      {
        brand: createdBrands[3]._id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
        code: 'HOME10',
        description: '10% off on home improvement',
        percentOff: 10,
        isHot: false,
        createdBy: adminUser._id
      }
    ];

    const createdDeals = await Deal.insertMany(deals);
    console.log('Created deals');

    // Create blogs
    const blogs = [
      {
        headline: 'Top 10 Tech Deals This Month',
        description: 'Discover the best technology deals and discounts available this month.',
        content: 'Technology is constantly evolving, and with it comes amazing deals and discounts. This month, we\'ve curated the top 10 tech deals that you simply cannot miss. From smartphones to laptops, gaming consoles to smart home devices, these deals offer incredible value for money. Don\'t wait too long as these deals are limited time offers!',
        image: 'https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=Tech+Deals',
        isFeatured: true,
        createdBy: adminUser._id
      },
      {
        headline: 'Fashion Trends for Summer 2024',
        description: 'Stay ahead of the fashion curve with these summer trends.',
        content: 'Summer 2024 brings exciting new fashion trends that are both stylish and comfortable. From vibrant colors to sustainable materials, this season is all about expressing your personality while being environmentally conscious. Learn about the must-have pieces and how to style them for any occasion.',
        image: 'https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=Fashion+Trends',
        isFeatured: true,
        createdBy: adminUser._id
      },
      {
        headline: 'Sports Equipment Buying Guide',
        description: 'Everything you need to know before buying sports equipment.',
        content: 'Choosing the right sports equipment can make a huge difference in your performance and safety. This comprehensive guide covers everything from running shoes to gym equipment, helping you make informed decisions based on your fitness goals and budget.',
        image: 'https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=Sports+Guide',
        isFeatured: false,
        createdBy: adminUser._id
      },
      {
        headline: 'Home Improvement on a Budget',
        description: 'Transform your home without breaking the bank.',
        content: 'Home improvement doesn\'t have to be expensive. With the right approach and some creativity, you can transform your living space on a budget. This article shares practical tips, DIY projects, and smart shopping strategies to help you achieve your dream home without overspending.',
        image: 'https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=Home+Improvement',
        isFeatured: false,
        createdBy: adminUser._id
      }
    ];

    const createdBlogs = await Blog.insertMany(blogs);
    console.log('Created blogs');

    console.log('Seed data created successfully!');
    console.log('Admin credentials:');
    console.log(`Email: ${process.env.ADMIN_EMAIL || 'admin@hop4deals.com'}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run seeding
connectDB().then(() => {
  seedData();
});
