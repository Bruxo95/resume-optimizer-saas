const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Country = require('../models/Country');
const User = require('../models/User');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-optimizer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample country data
const countries = [
  {
    code: 'us',
    name: 'United States',
    languages: [
      {
        code: 'en',
        name: 'English',
        isDefault: true,
      },
    ],
    resumeStandards: {
      personalInfo: {
        includePhoto: false,
        includeAddress: true,
        includeAge: false,
        includeMaritalStatus: false,
        includeNationality: false,
      },
      format: {
        preferredLength: 1,
        dateFormat: 'MM/YYYY',
        educationFirst: false,
        includeReferences: false,
        includeHobbies: false,
      },
      naming: {
        resumeAlternativeNames: ['CV', 'Curriculum Vitae'],
        preferredName: 'Resume',
      },
    },
    commonTemplates: [
      {
        name: 'Professional',
        description: 'Clean and professional template suitable for most industries',
        previewUrl: '/templates/us/professional.png',
        isDefault: true,
      },
      {
        name: 'Modern',
        description: 'Contemporary design with a touch of color',
        previewUrl: '/templates/us/modern.png',
        isDefault: false,
      },
      {
        name: 'Creative',
        description: 'Bold design for creative industries',
        previewUrl: '/templates/us/creative.png',
        isDefault: false,
      },
    ],
    recommendedSections: [
      {
        name: 'Contact Information',
        isRequired: true,
        description: 'Your name, phone, email, and location (city, state)',
      },
      {
        name: 'Professional Summary',
        isRequired: true,
        description: 'Brief overview of your skills and experience (3-5 sentences)',
      },
      {
        name: 'Work Experience',
        isRequired: true,
        description: 'List your work history in reverse chronological order',
      },
      {
        name: 'Education',
        isRequired: true,
        description: 'Your educational background in reverse chronological order',
      },
      {
        name: 'Skills',
        isRequired: true,
        description: 'Relevant technical and soft skills',
      },
      {
        name: 'Certifications',
        isRequired: false,
        description: 'Professional certifications and licenses',
      },
    ],
    atsKeywords: [
      {
        industry: 'Technology',
        keywords: [
          'JavaScript',
          'Python',
          'React',
          'Node.js',
          'AWS',
          'Cloud',
          'DevOps',
          'Agile',
          'Scrum',
          'Full Stack',
        ],
      },
      {
        industry: 'Finance',
        keywords: [
          'Financial Analysis',
          'Excel',
          'Accounting',
          'CPA',
          'Budget',
          'Forecasting',
          'Risk Management',
          'Investment',
          'Portfolio',
          'Compliance',
        ],
      },
      {
        industry: 'Marketing',
        keywords: [
          'Digital Marketing',
          'SEO',
          'SEM',
          'Social Media',
          'Content Strategy',
          'Analytics',
          'Campaign Management',
          'Brand Development',
          'Market Research',
          'CRM',
        ],
      },
    ],
    culturalNotes: [
      {
        topic: 'Length',
        description: 'US resumes are typically 1 page for early career and 2 pages maximum for experienced professionals.',
      },
      {
        topic: 'Objective Statements',
        description: 'Objective statements are becoming less common, replaced by professional summaries.',
      },
      {
        topic: 'References',
        description: 'Do not include references on your resume. Use "References available upon request" if needed.',
      },
    ],
    active: true,
  },
  {
    code: 'uk',
    name: 'United Kingdom',
    languages: [
      {
        code: 'en',
        name: 'English',
        isDefault: true,
      },
    ],
    resumeStandards: {
      personalInfo: {
        includePhoto: false,
        includeAddress: true,
        includeAge: false,
        includeMaritalStatus: false,
        includeNationality: false,
      },
      format: {
        preferredLength: 2,
        dateFormat: 'MM/YYYY',
        educationFirst: false,
        includeReferences: true,
        includeHobbies: true,
      },
      naming: {
        resumeAlternativeNames: ['Resume', 'Curriculum Vitae'],
        preferredName: 'CV',
      },
    },
    commonTemplates: [
      {
        name: 'Traditional',
        description: 'Classic UK CV format suitable for most industries',
        previewUrl: '/templates/uk/traditional.png',
        isDefault: true,
      },
      {
        name: 'Modern',
        description: 'Contemporary design with a professional look',
        previewUrl: '/templates/uk/modern.png',
        isDefault: false,
      },
    ],
    recommendedSections: [
      {
        name: 'Personal Details',
        isRequired: true,
        description: 'Your name, address, phone, email',
      },
      {
        name: 'Personal Statement',
        isRequired: true,
        description: 'Brief overview of your skills and career goals (100-150 words)',
      },
      {
        name: 'Work Experience',
        isRequired: true,
        description: 'List your work history in reverse chronological order',
      },
      {
        name: 'Education',
        isRequired: true,
        description: 'Your educational background in reverse chronological order',
      },
      {
        name: 'Skills',
        isRequired: true,
        description: 'Relevant technical and soft skills',
      },
      {
        name: 'Hobbies & Interests',
        isRequired: false,
        description: 'Personal interests that demonstrate positive traits',
      },
      {
        name: 'References',
        isRequired: false,
        description: 'Two professional references with contact details',
      },
    ],
    atsKeywords: [
      {
        industry: 'Technology',
        keywords: [
          'JavaScript',
          'Python',
          'React',
          'Node.js',
          'AWS',
          'Cloud',
          'DevOps',
          'Agile',
          'Scrum',
          'Full Stack',
        ],
      },
      {
        industry: 'Finance',
        keywords: [
          'Financial Analysis',
          'Excel',
          'Accounting',
          'ACCA',
          'Budget',
          'Forecasting',
          'Risk Management',
          'Investment',
          'Portfolio',
          'Compliance',
        ],
      },
    ],
    culturalNotes: [
      {
        topic: 'Length',
        description: 'UK CVs are typically 2 pages in length.',
      },
      {
        topic: 'Personal Statement',
        description: 'Include a personal statement at the beginning of your CV.',
      },
      {
        topic: 'Hobbies',
        description: 'Including hobbies and interests is common in UK CVs.',
      },
    ],
    active: true,
  },
  {
    code: 'de',
    name: 'Germany',
    languages: [
      {
        code: 'de',
        name: 'German',
        isDefault: true,
      },
      {
        code: 'en',
        name: 'English',
        isDefault: false,
      },
    ],
    resumeStandards: {
      personalInfo: {
        includePhoto: true,
        includeAddress: true,
        includeAge: true,
        includeMaritalStatus: true,
        includeNationality: true,
      },
      format: {
        preferredLength: 2,
        dateFormat: 'MM/YYYY',
        educationFirst: true,
        includeReferences: false,
        includeHobbies: true,
      },
      naming: {
        resumeAlternativeNames: ['Resume', 'CV'],
        preferredName: 'Lebenslauf',
      },
    },
    commonTemplates: [
      {
        name: 'German Standard',
        description: 'Traditional German CV format with photo',
        previewUrl: '/templates/de/standard.png',
        isDefault: true,
      },
      {
        name: 'Modern',
        description: 'Contemporary design that maintains German standards',
        previewUrl: '/templates/de/modern.png',
        isDefault: false,
      },
    ],
    recommendedSections: [
      {
        name: 'Personal Information',
        isRequired: true,
        description: 'Your name, address, phone, email, date of birth, nationality, marital status',
      },
      {
        name: 'Professional Photo',
        isRequired: true,
        description: 'Professional headshot (passport-style)',
      },
      {
        name: 'Education',
        isRequired: true,
        description: 'Your educational background in reverse chronological order',
      },
      {
        name: 'Work Experience',
        isRequired: true,
        description: 'List your work history in reverse chronological order',
      },
      {
        name: 'Skills',
        isRequired: true,
        description: 'Language skills, technical skills, and other relevant abilities',
      },
      {
        name: 'Hobbies & Interests',
        isRequired: false,
        description: 'Personal interests that demonstrate positive traits',
      },
    ],
    atsKeywords: [
      {
        industry: 'Engineering',
        keywords: [
          'Projektmanagement',
          'Qualitätssicherung',
          'CAD',
          'Prozessoptimierung',
          'Produktentwicklung',
          'Technische Dokumentation',
          'ISO 9001',
          'Lean Manufacturing',
          'Six Sigma',
          'Automatisierung',
        ],
      },
    ],
    culturalNotes: [
      {
        topic: 'Photo',
        description: 'A professional photo is expected on German CVs.',
      },
      {
        topic: 'Personal Information',
        description: 'German CVs typically include more personal information than US or UK CVs.',
      },
      {
        topic: 'Signature',
        description: 'Include your handwritten signature at the end of your CV.',
      },
    ],
    active: true,
  },
];

// Sample admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'password123',
  role: 'admin',
  subscription: 'premium',
  subscriptionExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
};

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Country.deleteMany();
    await User.deleteMany();

    // Import countries
    await Country.create(countries);
    console.log('Countries data imported');

    // Create admin user
    await User.create(adminUser);
    console.log('Admin user created');

    console.log('Data import complete');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Country.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Check command line args
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use -i to import data or -d to delete data');
  process.exit();
}
