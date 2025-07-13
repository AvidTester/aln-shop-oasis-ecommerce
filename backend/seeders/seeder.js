
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load models
const User = require('../models/User');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Product = require('../models/Product');
const Order = require('../models/Order');

dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed data
const users = [
  {
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Demo User',
    email: 'user@demo.com',
    password: 'password123',
    role: 'user'
  }
];

const categories = [
  {
    name: 'Hats',
    description: 'Stylish hats for all occasions',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400'
  },
  {
    name: 'T-Shirts',
    description: 'Comfortable and trendy t-shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
  },
  {
    name: 'Sunglasses',
    description: 'Premium sunglasses with UV protection',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400'
  },
  {
    name: 'Accessories',
    description: 'Fashion accessories and more',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400'
  }
];

const brands = [
  {
    name: 'ALN Brand',
    description: 'Premium quality fashion accessories',
    logo: '/lovable-uploads/4f81c6e4-fd99-4c90-a884-1971609e7f62.png'
  },
  {
    name: 'Style Co',
    description: 'Modern style for everyone'
  },
  {
    name: 'Comfort Wear',
    description: 'Comfortable clothing for daily wear'
  },
  {
    name: 'Classic Vision',
    description: 'Classic eyewear collection'
  },
  {
    name: 'Urban Style',
    description: 'Urban fashion trends'
  }
];

const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Brand.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');

    // Create users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    console.log('Users Imported!');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories Imported!');

    // Create brands
    const createdBrands = await Brand.insertMany(brands);
    console.log('Brands Imported!');

    // Create products
    const sampleProducts = [
      {
        name: 'Classic Black Hat',
        description: 'Premium quality cotton hat perfect for any occasion. Made with sustainable materials and designed for comfort and style.',
        price: 29.99,
        originalPrice: 39.99,
        category: createdCategories[0]._id, // Hats
        brand: createdBrands[0]._id, // ALN Brand
        images: [
          'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600',
          'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
          { name: 'Black', value: '#000000' },
          { name: 'Navy', value: '#001f3f' }
        ],
        features: ['100% organic cotton', 'Adjustable strap', 'UV protection'],
        stock: 50,
        rating: 4.8,
        numReviews: 124,
        badge: 'Sale',
        isFeatured: true
      },
      {
        name: 'Vintage Sunglasses',
        description: 'Retro-inspired sunglasses with UV protection and premium lenses.',
        price: 49.99,
        category: createdCategories[2]._id, // Sunglasses
        brand: createdBrands[1]._id, // Style Co
        images: [
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600'
        ],
        colors: [
          { name: 'Black', value: '#000000' },
          { name: 'Brown', value: '#8b4513' }
        ],
        features: ['UV protection', 'Polarized lenses', 'Durable frame'],
        stock: 30,
        rating: 4.9,
        numReviews: 89,
        badge: 'New',
        isFeatured: true
      },
      {
        name: 'Premium Cotton T-Shirt',
        description: '100% organic cotton t-shirt available in various colors and sizes.',
        price: 24.99,
        category: createdCategories[1]._id, // T-Shirts
        brand: createdBrands[2]._id, // Comfort Wear
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: [
          { name: 'White', value: '#ffffff' },
          { name: 'Black', value: '#000000' },
          { name: 'Navy', value: '#001f3f' }
        ],
        features: ['100% organic cotton', 'Pre-shrunk', 'Machine washable'],
        stock: 100,
        rating: 4.7,
        numReviews: 203,
        badge: 'Best Seller',
        isFeatured: true
      },
      {
        name: 'Designer Baseball Cap',
        description: 'Stylish baseball cap with embroidered logo and adjustable strap.',
        price: 34.99,
        category: createdCategories[0]._id, // Hats
        brand: createdBrands[0]._id, // ALN Brand
        images: [
          'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600'
        ],
        sizes: ['One Size'],
        colors: [
          { name: 'Red', value: '#ff0000' },
          { name: 'Blue', value: '#0000ff' }
        ],
        features: ['Embroidered logo', 'Adjustable strap', 'Cotton blend'],
        stock: 25,
        rating: 4.6,
        numReviews: 67,
        badge: 'Limited',
        isFeatured: false
      },
      {
        name: 'Aviator Sunglasses',
        description: 'Classic aviator style sunglasses with polarized lenses.',
        price: 59.99,
        category: createdCategories[2]._id, // Sunglasses
        brand: createdBrands[3]._id, // Classic Vision
        images: [
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600'
        ],
        colors: [
          { name: 'Gold', value: '#ffd700' },
          { name: 'Silver', value: '#c0c0c0' }
        ],
        features: ['Polarized lenses', 'UV protection', 'Metal frame'],
        stock: 40,
        rating: 4.8,
        numReviews: 156,
        isFeatured: true
      },
      {
        name: 'Graphic Print Tee',
        description: 'Trendy graphic t-shirt with unique artistic designs.',
        price: 27.99,
        category: createdCategories[1]._id, // T-Shirts
        brand: createdBrands[4]._id, // Urban Style
        images: [
          'https://images.unsplash.com/photo-1583743814966-8936f37f3823?w=600'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
          { name: 'Black', value: '#000000' },
          { name: 'White', value: '#ffffff' }
        ],
        features: ['Unique graphic design', 'Soft cotton blend', 'Fade resistant'],
        stock: 60,
        rating: 4.5,
        numReviews: 98,
        isFeatured: false
      }
    ];

    await Product.insertMany(sampleProducts);
    console.log('Products Imported!');

    console.log('Data Import Success!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Brand.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
