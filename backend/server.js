const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose');
const VolunteerRegistration = require('./models/volunteerRegistration');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
require('dotenv').config(); // חשוב להוסיף את זה!

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// הוסף את האירועים של mongoose כאן
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

// בדיקת מסמכים באוסף
mongoose.connection.once('open', () => {
  const VolunteerLocation = require('./models/volunteerLocation');
  VolunteerLocation.find({}).then(docs => {
    console.log('Documents in volunteerlocations:', docs);
  }).catch(err => {
    console.error('Error fetching documents:', err);
  });

  VolunteerRegistration.find({}).then(docs => {
    console.log('Documents in volunteerregistrations:', docs);
  }).catch(err => {
    console.error('Error fetching documents:', err);
  });
});

// Debug logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});



// יצירת גישה לתמונות
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use('/api/volunteer-locations', require('./routes/volunteerLocations'));
app.use('/api/register-volunteer', require('./routes/volunteerRegistrations'));
app.use('/api/cancel-registration', require('./routes/cancelReg'));
app.use('/api/check-registration', require('./routes/checkRegistrationRoutes'));
// הוספת נתיב סטטי לתיקיית uploads
app.use('/uploads', express.static('uploads'));

// עדכון הראוט של register-farmer כדי לטפל בקבצים
app.use('/api/register-farmer', upload.array('farmImages', 3), require('./routes/farmerRoutes'));

// בדיקת תקינות משתני הסביבה הנדרשים לשליחת מיילים
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASSWORD' ];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

// Test route
app.get('/api/test-data', (req, res) => {
  res.json({ message: 'Test route works' });
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Log all routes
function printRoutes(stack, prefix = '') {
  stack.forEach(layer => {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods).join(',');
      console.log(`${methods.toUpperCase()} ${prefix}${layer.route.path}`);
    } else if (layer.name === 'router' && layer.handle.stack) {
      printRoutes(layer.handle.stack, prefix + layer.regexp.source.slice(1, -2));
    }
  });
}

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'גודל הקובץ חורג מהמותר (מקסימום 5MB)'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'מספר הקבצים חורג מהמותר (מקסימום 3 תמונות)'
      });
    }
    return res.status(400).json({
      success: false,
      message: 'שגיאה בהעלאת הקבצים'
    });
  }
  next(error);
});

// טיפול בשגיאות כלליות
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'אירעה שגיאה בשרת'
  });
});

console.log('Registered routes:');
printRoutes(app._router.stack);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));