const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getStats,
  getUserResumes,
  updateUserSubscription,
} = require('../controllers/admin');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect and authorize all routes
router.use(protect);
router.use(authorize('admin'));

// User management routes
router.route('/users')
  .get(getUsers)
  .post(createUser);

router.route('/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.get('/users/:id/resumes', getUserResumes);
router.put('/users/:id/subscription', updateUserSubscription);

// Statistics route
router.get('/stats', getStats);

module.exports = router;
