const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  getDashboard,
  deleteAccount,
  upgradeToPremium,
} = require('../controllers/users');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// User profile routes
router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

router.put('/password', updatePassword);
router.get('/dashboard', getDashboard);
router.delete('/', deleteAccount);
router.post('/premium', upgradeToPremium);

module.exports = router;
