import { spawn } from 'child_process';
import config from '../config/index.js';

export const runPrediction = (imagePath) => {
  return new Promise((resolve, reject) => {
    const pythonExec = process.env.PYTHON_PATH || 'python'; // allow override with env var
    const scriptPath = config.pythonScript;
    const modelPath = config.modelPath;

    // spawn the python process
    const proc = spawn(pythonExec, [scriptPath, '--model', modelPath, '--image', imagePath]);

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        console.error('Python script stderr:', stderr);
        return reject(new Error(`Python script exited with code ${code}: ${stderr}`));
      }

      try {
        // Extract JSON object from stdout (ignores warnings/logs)
        const match = stdout.match(/\{[\s\S]*\}/);
        if (!match) {
          throw new Error('No JSON found in Python output');
        }
        const json = JSON.parse(match[0].trim());
        resolve(json);
      } catch (err) {
        console.error('Failed parsing python output:', stdout, stderr);
        reject(new Error('Invalid JSON from prediction script'));
      }
    });
  });
};
