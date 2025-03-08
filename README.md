# Resume Optimizer SaaS Platform

A comprehensive AI-powered resume optimization platform that adapts to each country's specific CV standards.

## Features

### Resume Generation and Optimization
- AI analysis of user CVs with improvement suggestions based on country-specific standards
- Automatic data structuring according to regional requirements
- Optimized keyword suggestions for ATS (Applicant Tracking System)

### Secure Database
- Secure storage of user data (names, phone numbers, emails)
- Compliance with data protection regulations (GDPR, LGPD, etc.)

### External API Integration
- Import resumes in various formats (PDF, DOCX, LinkedIn)
- Export optimized resume templates

### User Interface
- Intuitive interface for editing resumes
- "AI Assistant Mode" to guide users
- Dashboard for tracking resume improvements

### Multilingual Support
- Automatic language detection for CVs
- AI-driven adaptation to country-specific requirements

### Monetization
- Free plan with basic features
- Premium plan with advanced AI suggestions, more templates, and enhanced optimization

## Tech Stack

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- Material UI for component library
- React Router for navigation
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- OpenAI API for AI-powered optimization
- Cloudinary for file storage
- Stripe for payment processing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- OpenAI API key
- Cloudinary account
- Stripe account (for payment processing)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/resume-optimizer-saas.git
cd resume-optimizer-saas
```

2. Install dependencies for both client and server
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In the server directory
cp .env.example .env
# Edit the .env file with your configuration
```

4. Start the development servers
```bash
# Start the backend server (from the server directory)
npm run dev

# Start the frontend server (from the client directory)
npm start
```

5. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
resume-optimizer-saas/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── store/          # Redux store and slices
│       ├── utils/          # Utility functions
│       └── App.tsx         # Main application component
│
└── server/                 # Backend Node.js application
    ├── src/                # Server source code
    │   ├── controllers/    # Route controllers
    │   ├── middleware/     # Express middleware
    │   ├── models/         # Mongoose models
    │   ├── routes/         # API routes
    │   ├── utils/          # Utility functions
    │   └── index.js        # Server entry point
    └── .env.example        # Example environment variables
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/logout` - Logout a user
- `GET /api/auth/me` - Get current user

### Resumes
- `GET /api/resumes` - Get all user resumes
- `GET /api/resumes/:id` - Get a specific resume
- `POST /api/resumes` - Create a new resume
- `PUT /api/resumes/:id` - Update a resume
- `DELETE /api/resumes/:id` - Delete a resume
- `POST /api/resumes/:id/optimize` - Optimize a resume
- `POST /api/resumes/:id/export` - Export a resume

### Countries
- `GET /api/countries` - Get all countries
- `GET /api/countries/:code` - Get a specific country

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/stats` - Get platform statistics (admin only)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for providing the AI capabilities
- Material UI for the component library
- All the open-source libraries used in this project
