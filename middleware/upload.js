const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('[MULTER] Setting destination for upload...');
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
    console.log(`[MULTER] Generated filename: ${filename}`);
    cb(null, filename);
  }
});

// File filter to allow only specific image types
const fileFilter = (req, file, cb) => {
  console.log('[MULTER] File received:', file.originalname);
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    console.log('[MULTER] File type allowed:', file.mimetype);
    cb(null, true);
  } else {
    console.error('[MULTER] Invalid file type:', file.mimetype);
    cb(new Error('Only image files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Optional: limit to 5MB
  }
});

module.exports = upload;
