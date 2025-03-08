const Resume = require('../models/Resume');
const User = require('../models/User');
const Country = require('../models/Country');
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI.OpenAIApi(new OpenAI.Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// @desc    Get all resumes for logged in user
// @route   GET /api/resumes
// @access  Private
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({
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
      message: 'Error retrieving resumes',
      error: err.message,
    });
  }
};

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Make sure user owns the resume
    if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this resume',
      });
    }

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving resume',
      error: err.message,
    });
  }
};

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
exports.createResume = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Check for existing resume with the same title
    const existingResume = await Resume.findOne({
      user: req.user.id,
      title: req.body.title,
    });

    if (existingResume) {
      return res.status(400).json({
        success: false,
        message: 'You already have a resume with this title',
      });
    }

    const resume = await Resume.create(req.body);

    res.status(201).json({
      success: true,
      data: resume,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating resume',
      error: err.message,
    });
  }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
exports.updateResume = async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Make sure user owns the resume
    if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this resume',
      });
    }

    resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating resume',
      error: err.message,
    });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Make sure user owns the resume
    if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this resume',
      });
    }

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting resume',
      error: err.message,
    });
  }
};

// @desc    Optimize resume with AI
// @route   POST /api/resumes/:id/optimize
// @access  Private
exports.optimizeResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Make sure user owns the resume
    if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to optimize this resume',
      });
    }

    // Get country standards
    const country = await Country.findOne({ code: resume.country });
    if (!country) {
      return res.status(404).json({
        success: false,
        message: `Country standards for ${resume.country} not found`,
      });
    }

    // Update resume status
    resume.status = 'optimizing';
    await resume.save();

    // Parse resume content
    const parsedData = await parseResumeContent(resume.originalContent);
    resume.parsedData = parsedData;

    // Generate AI suggestions
    const aiSuggestions = await generateAISuggestions(
      resume.originalContent,
      country,
      resume.language
    );
    resume.aiSuggestions = aiSuggestions;

    // Calculate ATS score
    const atsScore = calculateATSScore(parsedData, aiSuggestions);
    resume.atsScore = atsScore;

    // Generate optimized content
    const optimizedContent = await generateOptimizedContent(
      resume.originalContent,
      aiSuggestions,
      country,
      resume.language
    );
    resume.optimizedContent = optimizedContent;

    // Update resume status
    resume.status = 'optimized';
    await resume.save();

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (err) {
    // If there's an error, update resume status back to draft
    if (req.params.id) {
      try {
        const resume = await Resume.findById(req.params.id);
        if (resume) {
          resume.status = 'draft';
          await resume.save();
        }
      } catch (updateErr) {
        console.error('Error updating resume status after optimization error:', updateErr);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Error optimizing resume',
      error: err.message,
    });
  }
};

// @desc    Apply AI suggestion
// @route   PUT /api/resumes/:id/suggestions/:suggestionId
// @access  Private
exports.applySuggestion = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Make sure user owns the resume
    if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this resume',
      });
    }

    // Find the suggestion
    const suggestionIndex = resume.aiSuggestions.findIndex(
      (s) => s._id.toString() === req.params.suggestionId
    );

    if (suggestionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Suggestion not found',
      });
    }

    // Apply the suggestion
    resume.aiSuggestions[suggestionIndex].applied = true;

    // Update the optimized content
    resume.optimizedContent = applyTextReplacement(
      resume.optimizedContent,
      resume.aiSuggestions[suggestionIndex].originalText,
      resume.aiSuggestions[suggestionIndex].suggestedText
    );

    await resume.save();

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error applying suggestion',
      error: err.message,
    });
  }
};

// @desc    Export resume
// @route   GET /api/resumes/:id/export
// @access  Private
exports.exportResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Make sure user owns the resume
    if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to export this resume',
      });
    }

    // Check if resume is optimized
    if (resume.status !== 'optimized' && resume.status !== 'exported') {
      return res.status(400).json({
        success: false,
        message: 'Resume must be optimized before exporting',
      });
    }

    // Generate export file (in a real app, this would create a PDF or DOCX)
    // For this example, we'll just update the status
    resume.status = 'exported';
    await resume.save();

    res.status(200).json({
      success: true,
      data: {
        message: 'Resume exported successfully',
        resumeId: resume._id,
        exportUrl: `/api/resumes/${resume._id}/download`,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error exporting resume',
      error: err.message,
    });
  }
};

// Helper functions

// Parse resume content using AI
async function parseResumeContent(content) {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that parses resume content into structured data.',
        },
        {
          role: 'user',
          content: `Parse the following resume content into structured JSON data with sections for personalInfo, education, experience, skills, languages, certifications, projects, and summary:\n\n${content}`,
        },
      ],
      temperature: 0.2,
    });

    const parsedData = JSON.parse(response.data.choices[0].message.content);
    return parsedData;
  } catch (error) {
    console.error('Error parsing resume content:', error);
    // Return a basic structure if parsing fails
    return {
      personalInfo: {},
      education: [],
      experience: [],
      skills: [],
      languages: [],
      certifications: [],
      projects: [],
      summary: '',
    };
  }
}

// Generate AI suggestions for resume improvement
async function generateAISuggestions(content, country, language) {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant that provides resume optimization suggestions based on ${country.name} standards. Focus on improving clarity, impact, and ATS optimization.`,
        },
        {
          role: 'user',
          content: `Analyze this resume and provide specific improvement suggestions for a job seeker in ${country.name}. For each suggestion, include the original text, suggested improved text, and the reason for the change. Format your response as a JSON array of suggestion objects:\n\n${content}`,
        },
      ],
      temperature: 0.7,
    });

    const suggestions = JSON.parse(response.data.choices[0].message.content);
    return suggestions.map((suggestion) => ({
      section: suggestion.section,
      originalText: suggestion.originalText,
      suggestedText: suggestion.suggestedText,
      reason: suggestion.reason,
      applied: false,
    }));
  } catch (error) {
    console.error('Error generating AI suggestions:', error);
    return [];
  }
}

// Calculate ATS score based on parsed data and suggestions
function calculateATSScore(parsedData, suggestions) {
  // This is a simplified scoring algorithm
  // In a real application, this would be more sophisticated
  
  let score = 70; // Base score
  
  // Add points for complete sections
  if (parsedData.personalInfo && Object.keys(parsedData.personalInfo).length >= 4) score += 5;
  if (parsedData.education && parsedData.education.length > 0) score += 5;
  if (parsedData.experience && parsedData.experience.length > 0) score += 5;
  if (parsedData.skills && parsedData.skills.length > 0) score += 5;
  if (parsedData.summary && parsedData.summary.length > 20) score += 5;
  
  // Subtract points for each suggestion (indicating issues)
  score -= Math.min(20, suggestions.length * 2);
  
  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, score));
}

// Generate optimized content based on original content and country standards
async function generateOptimizedContent(content, suggestions, country, language) {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant that optimizes resumes according to ${country.name} standards and best practices.`,
        },
        {
          role: 'user',
          content: `Optimize this resume for ${country.name} job market, improving its structure, content, and ATS compatibility. Maintain the same information but enhance its presentation and impact:\n\n${content}`,
        },
      ],
      temperature: 0.5,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating optimized content:', error);
    return content; // Return original content if optimization fails
  }
}

// Apply text replacement in content
function applyTextReplacement(content, originalText, newText) {
  return content.replace(originalText, newText);
}
