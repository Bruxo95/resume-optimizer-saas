const express = require('express');
const {
  getCountries,
  getCountry,
  getCountryStandards,
  getCountryTemplates,
  getCountryKeywords,
  createCountry,
  updateCountry,
  deleteCountry,
} = require('../controllers/countries');
const { protect, authorize, checkSubscription } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getCountries);
router.get('/:code', getCountry);
router.get('/:code/standards', getCountryStandards);
router.get('/:code/templates', getCountryTemplates);

// Protected routes
router.get('/:code/keywords', protect, checkSubscription('premium'), getCountryKeywords);

// Admin routes
router.post('/', protect, authorize('admin'), createCountry);
router.put('/:code', protect, authorize('admin'), updateCountry);
router.delete('/:code', protect, authorize('admin'), deleteCountry);

module.exports = router;
