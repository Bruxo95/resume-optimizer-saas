const Country = require('../models/Country');

// @desc    Get all countries
// @route   GET /api/countries
// @access  Public
exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find({ active: true }).select('code name languages');

    res.status(200).json({
      success: true,
      count: countries.length,
      data: countries,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving countries',
      error: err.message,
    });
  }
};

// @desc    Get single country
// @route   GET /api/countries/:code
// @access  Public
exports.getCountry = async (req, res) => {
  try {
    const country = await Country.findOne({ code: req.params.code.toLowerCase(), active: true });

    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found',
      });
    }

    res.status(200).json({
      success: true,
      data: country,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving country',
      error: err.message,
    });
  }
};

// @desc    Get country resume standards
// @route   GET /api/countries/:code/standards
// @access  Public
exports.getCountryStandards = async (req, res) => {
  try {
    const country = await Country.findOne({ code: req.params.code.toLowerCase(), active: true })
      .select('code name resumeStandards');

    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found',
      });
    }

    res.status(200).json({
      success: true,
      data: country.resumeStandards,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving country standards',
      error: err.message,
    });
  }
};

// @desc    Get country templates
// @route   GET /api/countries/:code/templates
// @access  Public
exports.getCountryTemplates = async (req, res) => {
  try {
    const country = await Country.findOne({ code: req.params.code.toLowerCase(), active: true })
      .select('code name commonTemplates');

    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found',
      });
    }

    res.status(200).json({
      success: true,
      data: country.commonTemplates,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving country templates',
      error: err.message,
    });
  }
};

// @desc    Get country ATS keywords
// @route   GET /api/countries/:code/keywords
// @access  Private/Premium
exports.getCountryKeywords = async (req, res) => {
  try {
    const country = await Country.findOne({ code: req.params.code.toLowerCase(), active: true })
      .select('code name atsKeywords');

    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found',
      });
    }

    res.status(200).json({
      success: true,
      data: country.atsKeywords,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving country keywords',
      error: err.message,
    });
  }
};

// @desc    Create country (Admin only)
// @route   POST /api/countries
// @access  Private/Admin
exports.createCountry = async (req, res) => {
  try {
    const country = await Country.create(req.body);

    res.status(201).json({
      success: true,
      data: country,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating country',
      error: err.message,
    });
  }
};

// @desc    Update country (Admin only)
// @route   PUT /api/countries/:code
// @access  Private/Admin
exports.updateCountry = async (req, res) => {
  try {
    let country = await Country.findOne({ code: req.params.code.toLowerCase() });

    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found',
      });
    }

    country = await Country.findOneAndUpdate(
      { code: req.params.code.toLowerCase() },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: country,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating country',
      error: err.message,
    });
  }
};

// @desc    Delete country (Admin only)
// @route   DELETE /api/countries/:code
// @access  Private/Admin
exports.deleteCountry = async (req, res) => {
  try {
    const country = await Country.findOne({ code: req.params.code.toLowerCase() });

    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found',
      });
    }

    // Soft delete by setting active to false
    country.active = false;
    await country.save();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting country',
      error: err.message,
    });
  }
};
