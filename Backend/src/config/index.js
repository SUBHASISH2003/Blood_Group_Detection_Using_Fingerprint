import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  uploadsDir: path.join(__dirname, '../../uploads'),
  pythonScript: path.join(__dirname, '../../python/predict_resnet.py'),
  modelPath: path.join(__dirname, '../../python/resnet_blood_group.h5')
};
