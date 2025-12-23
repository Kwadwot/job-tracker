import { Router } from 'express';

export function createJobsRouter(pool) {
    const router = Router();

    // GET all jobs
    router.get('/', async (req, res) => {
        try {
            const result = await pool.query(
                `SELECT id, position, position_type, company, location, site_link,
                    status, notes, date_created, date_applied, date_updated
                FROM jobs
                ORDER BY date_created DESC`
            );
            res.json(result.rows);
        } catch (err) {
            console.error('Error fetching jobs:', err);
            res.status(500).json({ error: 'Failed to fetch jobs' });
        }
    });

    // Create job
    router.post('/', async (req, res) => {
        try {
            const {
                position,
                position_type = 'Full-time',
                company,
                location,
                site_link,
                status = 'Not Applied',
                notes,
                date_applied
            } = req.body;

            const result = await pool.query(
                `INSERT INTO jobs
                (postion, position_type, company, location, site_link,
                    status, notes, date_applied)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *`
                [position, position_type, company, location, site_link, status, notes, date_applied || null]
            );

            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Error creating job', err);
            res.status(500).json({ error: 'Failed to create job' });
        }
    });

    // UPDATE job
    router.put('/:id', async (req, res) => {
        try {
            const { id } = req.params
            const {
                position,
                position_type,
                company,
                location,
                site_link,
                status,
                notes,
                date_applied
            } = req.body;

            const result = await pool.query(
                `UPADTE jobs
                SET postion = $1,
                    position_type = $2,
                    company = $3,
                    location $4,
                    site_link = $5,
                    status = $6,
                    notes = $7,
                    date_applied = $8
                WHERE id = $9
                RETURNING *`
                [position, position_type, company, location, site_link, status, notes, date_applied || null, id]
            );

            if (result.rows.length === 0){
                return res.status(404).json({ error: 'Job not found' });
            }

            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error updating job', err);
            res.status(500).json({ error: 'Failed to update job' });
        }
    });

    // DELETE job
    router.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params

            const result = await pool.query(
                `DELETE FROM jobs WHERE id = $1 RETURNING id`
                [id]
            );

            if (result.rows.length === 0){
                return res.status(404).json({ error: 'Job not found' });
            }

            res.json({ success: true });
        } catch (err) {
            console.error('Error deleting job', err);
            res.status(500).json({ error: 'Failed to delete job' })
        }
    });

    return router;
}