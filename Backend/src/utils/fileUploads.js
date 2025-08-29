import fs from 'fs';
import config from '../config/index.js';

export function ensureUploadsDir() {
  const dir = config.uploadsDir;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('Created uploads directory:', dir);
  }
}
