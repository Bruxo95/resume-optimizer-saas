const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../../uploads');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename: userId_timestamp_originalname
    cb(
      null,
      `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type
const fileFilter = (req, file, cb) => {
  // Allowed extensions
  const filetypes = /pdf|doc|docx|txt/;
  // Check extension
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed'));
  }
};

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: fileFilter,
});

// Process uploaded file
const processUploadedFile = async (filePath) => {
  try {
    const fileExtension = path.extname(filePath).toLowerCase();
    let text = '';

    if (fileExtension === '.pdf') {
      // Process PDF file
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else if (fileExtension === '.docx') {
      // Process DOCX file
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else if (fileExtension === '.doc') {
      // For DOC files, we'd need another library or conversion service
      // This is a placeholder
      throw new Error('DOC files are not supported yet');
    } else if (fileExtension === '.txt') {
      // Process TXT file
      text = fs.readFileSync(filePath, 'utf8');
    } else {
      throw new Error('Unsupported file type');
    }

    return text;
  } catch (error) {
    console.error('Error processing file:', error);
    throw error;
  }
};

// Delete file
const deleteFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

module.exports = {
  upload,
  processUploadedFile,
  deleteFile,
};
