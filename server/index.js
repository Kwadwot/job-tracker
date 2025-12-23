import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import { createJobsRouter } from './routes/jobs.js';

dotenv.config();
const { Pool } = pkg;

const app = express();
const port = process.env.PORT || 8000;

const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
});

// Middleware
app.use(cors());
app.use(express.json());

// Mounting jobs routes under /api/jobs
app.use('/api/jobs', createJobsRouter(pool));

// Health check route
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});