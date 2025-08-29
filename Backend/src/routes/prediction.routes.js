import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { predictController } from '../controllers/prediction.controller.js';
import { ensureUploadsDir } from '../utils/fileUploads.js';

const router = express.Router();

// ensure uploads dir exists
ensureUploadsDir();

// multer config: store in uploads with original filename + timestamp
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `${name}_${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

router.post('/', upload.single('fingerprint'), predictController);

export default router;
