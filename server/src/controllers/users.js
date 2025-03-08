const User = require('../models/User');
const Resume = require('../models/Resume');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

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
      message: 'Error retrieving user profile',
      error: err.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      preferredLanguage: req.body.preferredLanguage,
      preferredCountry: req.body.preferredCountry,
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(
      (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    }).select('-password');

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating user profile',
      error: err.message,
    });
  }
};

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating password',
      error: err.message,
    });
  }
};

// @desc    Get user dashboard data
// @route   GET /api/users/dashboard
// @access  Private
exports.getDashboard = async (req, res) => {
  try {
    // Get user's resumes
    const resumes = await Resume.find({ user: req.user.id }).sort({
      updatedAt: -1,
    });

    // Get resume stats
    const totalResumes = resumes.length;
    const optimizedResumes = resumes.filter(
      (resume) => resume.status === 'optimized' || resume.status === 'exported'
    ).length;
    const draftResumes = resumes.filter(
      (resume) => resume.status === 'draft'
    ).length;

    // Get recent resumes
    const recentResumes = resumes.slice(0, 5);

    // Get countries used
    const countriesUsed = [...new Set(resumes.map((resume) => resume.country))];

    // Get average ATS score
    const atsScores = resumes
      .filter((resume) => resume.atsScore)
      .map((resume) => resume.atsScore);
    const averageAtsScore =
      atsScores.length > 0
        ? atsScores.reduce((acc, score) => acc + score, 0) / atsScores.length
        : 0;

    // Get subscription info
    const user = await User.findById(req.user.id);
    const subscriptionInfo = {
      type: user.subscription,
      expiry: user.subscriptionExpiry,
      isActive:
        user.subscription === 'free' ||
        (user.subscription === 'premium' &&
          user.subscriptionExpiry > new Date()),
    };

    res.status(200).json({
      success: true,
      data: {
        user: {
          name: user.name,
          email: user.email,
          preferredLanguage: user.preferredLanguage,
          preferredCountry: user.preferredCountry,
        },
        resumeStats: {
          total: totalResumes,
          optimized: optimizedResumes,
          draft: draftResumes,
          averageAtsScore,
        },
        recentResumes,
        countriesUsed,
        subscriptionInfo,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving dashboard data',
      error: err.message,
    });
  }
};

// @desc    Delete user account
// @route   DELETE /api/users
// @access  Private
exports.deleteAccount = async (req, res) => {
  try {
    // Delete user's resumes
    await Resume.deleteMany({ user: req.user.id });

    // Delete user
    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting account',
      error: err.message,
    });
  }
};

// @desc    Upgrade to premium
// @route   POST /api/users/premium
// @access  Private
exports.upgradeToPremium = async (req, res) => {
  try {
    // In a real application, this would handle payment processing
    // For this example, we'll just update the user's subscription

    // Set subscription expiry to 30 days from now
    const subscriptionExpiry = new Date();
    subscriptionExpiry.setDate(subscriptionExpiry.getDate() + 30);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        subscription: 'premium',
        subscriptionExpiry,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Upgraded to premium successfully',
      data: {
        subscription: user.subscription,
        subscriptionExpiry: user.subscriptionExpiry,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error upgrading to premium',
      error: err.message,
    });
  }
};
