const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title for your resume'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    country: {
      type: String,
      required: [true, 'Please specify the target country'],
      default: 'us',
    },
    language: {
      type: String,
      required: [true, 'Please specify the language'],
      default: 'en',
    },
    originalContent: {
      type: String,
      required: [true, 'Resume content is required'],
    },
    optimizedContent: {
      type: String,
    },
    parsedData: {
      personalInfo: {
        name: String,
        email: String,
        phone: String,
        address: String,
        linkedin: String,
        website: String,
      },
      education: [
        {
          institution: String,
          degree: String,
          field: String,
          startDate: Date,
          endDate: Date,
          description: String,
        },
      ],
      experience: [
        {
          company: String,
          position: String,
          location: String,
          startDate: Date,
          endDate: Date,
          current: Boolean,
          description: String,
          achievements: [String],
        },
      ],
      skills: [
        {
          name: String,
          level: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced', 'expert'],
          },
          category: String,
        },
      ],
      languages: [
        {
          name: String,
          proficiency: {
            type: String,
            enum: ['basic', 'conversational', 'fluent', 'native'],
          },
        },
      ],
      certifications: [
        {
          name: String,
          issuer: String,
          date: Date,
          description: String,
        },
      ],
      projects: [
        {
          name: String,
          description: String,
          url: String,
          technologies: [String],
          startDate: Date,
          endDate: Date,
        },
      ],
      summary: String,
    },
    aiSuggestions: [
      {
        section: String,
        originalText: String,
        suggestedText: String,
        reason: String,
        applied: {
          type: Boolean,
          default: false,
        },
      },
    ],
    atsScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    keywordMatches: [
      {
        keyword: String,
        count: Number,
        recommended: Boolean,
      },
    ],
    fileUrl: String,
    fileType: {
      type: String,
      enum: ['pdf', 'docx', 'txt', 'json'],
    },
    status: {
      type: String,
      enum: ['draft', 'optimizing', 'optimized', 'exported'],
      default: 'draft',
    },
    template: {
      type: String,
      default: 'modern',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
ResumeSchema.index({ user: 1, createdAt: -1 });
ResumeSchema.index({ isPublic: 1 });

module.exports = mongoose.model('Resume', ResumeSchema);
