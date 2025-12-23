import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import { createJobsRouter } from './routes/jobs.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const { Pool } = pkg;

const app = express();
const port = process.env.PORT || 5000;

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

// Host static files from the client
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle requests by serving index.html for all routes
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});