
const express = require('express');
const Brand = require('../models/Brand');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true });
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single brand
// @route   GET /api/brands/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug, isActive: true });
    
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create brand
// @route   POST /api/brands
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const brand = new Brand(req.body);
    const createdBrand = await brand.save();
    res.status(201).json(createdBrand);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Brand name already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// @desc    Update brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    
    if (brand) {
      Object.assign(brand, req.body);
      const updatedBrand = await brand.save();
      res.json(updatedBrand);
    } else {
      res.status(404).json({ message: 'Brand not found' });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Brand name already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// @desc    Delete brand
// @route   DELETE /api/brands/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    
    if (brand) {
      brand.isActive = false;
      await brand.save();
      res.json({ message: 'Brand removed' });
    } else {
      res.status(404).json({ message: 'Brand not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
