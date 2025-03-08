const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Country code is required'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [2, 'Country code must be 2 characters'],
      minlength: [2, 'Country code must be 2 characters'],
    },
    name: {
      type: String,
      required: [true, 'Country name is required'],
      trim: true,
    },
    languages: [
      {
        code: String,
        name: String,
        isDefault: Boolean,
      },
    ],
    resumeStandards: {
      personalInfo: {
        includePhoto: {
          type: Boolean,
          default: false,
        },
        includeAddress: {
          type: Boolean,
          default: true,
        },
        includeAge: {
          type: Boolean,
          default: false,
        },
        includeMaritalStatus: {
          type: Boolean,
          default: false,
        },
        includeNationality: {
          type: Boolean,
          default: false,
        },
      },
      format: {
        preferredLength: {
          type: Number, // in pages
          default: 1,
        },
        dateFormat: {
          type: String,
          default: 'MM/YYYY',
        },
        educationFirst: {
          type: Boolean,
          default: false,
        },
        includeReferences: {
          type: Boolean,
          default: false,
        },
        includeHobbies: {
          type: Boolean,
          default: false,
        },
      },
      naming: {
        resumeAlternativeNames: [String], // CV, Resume, Curriculum Vitae, etc.
        preferredName: {
          type: String,
          default: 'Resume',
        },
      },
    },
    commonTemplates: [
      {
        name: String,
        description: String,
        previewUrl: String,
        isDefault: Boolean,
      },
    ],
    recommendedSections: [
      {
        name: String,
        isRequired: Boolean,
        description: String,
      },
    ],
    atsKeywords: [
      {
        industry: String,
        keywords: [String],
      },
    ],
    culturalNotes: [
      {
        topic: String,
        description: String,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
CountrySchema.index({ code: 1 });
CountrySchema.index({ active: 1 });

module.exports = mongoose.model('Country', CountrySchema);
