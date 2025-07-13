
const express = require('express');
const Brand = require('../models/Brand');
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

module.exports = router;
