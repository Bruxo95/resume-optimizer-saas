const User = require('../models/User');
const Resume = require('../models/Resume');
const Country = require('../models/Country');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error: err.message,
    });
  }
};

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private/Admin
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user',
      error: err.message,
    });
  }
};

// @desc    Create user
// @route   POST /api/admin/users
// @access  Private/Admin
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: err.message,
    });
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: err.message,
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Delete user's resumes
    await Resume.deleteMany({ user: req.params.id });

    // Delete user
    await user.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: err.message,
    });
  }
};

// @desc    Get system statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
  try {
    // Get counts
    const userCount = await User.countDocuments();
    const premiumUserCount = await User.countDocuments({ subscription: 'premium' });
    const resumeCount = await Resume.countDocuments();
    const optimizedResumeCount = await Resume.countDocuments({
      status: { $in: ['optimized', 'exported'] },
    });
    const countryCount = await Country.countDocuments({ active: true });

    // Get recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subscription createdAt');

    // Get recent resumes
    const recentResumes = await Resume.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title user country status createdAt')
      .populate('user', 'name email');

    // Get popular countries
    const popularCountries = await Resume.aggregate([
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    // Get subscription stats
    const subscriptionStats = {
      free: await User.countDocuments({ subscription: 'free' }),
      premium: premiumUserCount,
      premiumPercentage: (premiumUserCount / userCount) * 100,
    };

    res.status(200).json({
      success: true,
      data: {
        counts: {
          users: userCount,
          premiumUsers: premiumUserCount,
          resumes: resumeCount,
          optimizedResumes: optimizedResumeCount,
          countries: countryCount,
        },
        recentUsers,
        recentResumes,
        popularCountries,
        subscriptionStats,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving statistics',
      error: err.message,
    });
  }
};

// @desc    Get user resumes
// @route   GET /api/admin/users/:id/resumes
// @access  Private/Admin
exports.getUserResumes = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const resumes = await Resume.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user resumes',
      error: err.message,
    });
  }
};

// @desc    Update user subscription
// @route   PUT /api/admin/users/:id/subscription
// @access  Private/Admin
exports.updateUserSubscription = async (req, res) => {
  try {
    const { subscription, subscriptionExpiry } = req.body;

    if (!subscription) {
      return res.status(400).json({
        success: false,
        message: 'Please provide subscription type',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        subscription,
        subscriptionExpiry: subscriptionExpiry || null,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating user subscription',
      error: err.message,
    });
  }
};
