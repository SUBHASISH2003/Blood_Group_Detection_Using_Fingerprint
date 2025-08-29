import express from 'express';
import cors from 'cors';
import predictionRoutes from './routes/prediction.routes.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || '*';

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static to serve uploaded images if needed
app.use('/uploads', express.static('uploads'));

app.use('/api/predict', predictionRoutes);

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

export default app;
