import { runPrediction } from '../services/prediction.service.js';

export const predictController = async (req, res) => {
  try {
    const { name, age } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded. Field name should be "fingerprint".' });
    }

    const prediction = await runPrediction(file.path);

    // return structured response
    return res.json({
      name: name || null,
      age: age || null,
      file: file.filename,
      result: prediction
    });
  } catch (err) {
    console.error('Prediction error:', err);
    return res.status(500).json({ error: err.message || 'Prediction server error' });
  }
};
