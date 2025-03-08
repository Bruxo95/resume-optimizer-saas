const express = require('express');
const {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  optimizeResume,
  applySuggestion,
  exportResume,
} = require('../controllers/resumes');
const { protect, checkSubscription } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// Basic resume operations
router.route('/')
  .get(getResumes)
  .post(createResume);

router.route('/:id')
  .get(getResume)
  .put(updateResume)
  .delete(deleteResume);

// Advanced operations
router.post('/:id/optimize', checkSubscription('premium'), optimizeResume);
router.put('/:id/suggestions/:suggestionId', applySuggestion);
router.get('/:id/export', exportResume);

module.exports = router;
