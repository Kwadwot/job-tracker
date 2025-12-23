-- ============================================
-- Job Application Tracker - Sample Data
-- ============================================

-- Insert sample job applications with various statuses and position types
INSERT INTO jobs (position, position_type, company, location, site_link, status, notes, date_applied, date_created, date_updated) VALUES
(
    'Senior Software Engineer',
    'Full-time',
    'TechCorp Solutions',
    'San Francisco, CA',
    'https://techcorp.com/careers/senior-software-engineer',
    'Interviewing',
    'Great company culture, competitive salary. Currently in final round interviews.',
    '2025-01-15',
    '2025-01-10 09:00:00',
    '2025-01-10 09:00:00'
),
(
    'Frontend Developer',
    'Full-time',
    'StartupXYZ',
    'Remote',
    'https://startupxyz.com/jobs/frontend-dev',
    'Applied',
    'Exciting startup with modern tech stack. Applied through their career page.',
    '2025-01-20',
    '2025-01-18 14:30:00',
    '2025-01-18 14:30:00'
),
(
    'DevOps Engineer',
    'Contract',
    'Enterprise Solutions Inc',
    'New York, NY',
    NULL,
    'Offer',
    'Received offer with great benefits package. Considering acceptance.',
    '2025-01-05',
    '2024-12-28 11:15:00',
    '2025-01-22 16:45:00'
),
(
    'Marketing Intern',
    'Internship',
    'Global Marketing Agency',
    'Los Angeles, CA',
    'https://globalmarketing.com/internships',
    'Rejected',
    'Learned about SEO and content marketing. Position was competitive.',
    '2024-12-15',
    '2024-12-10 08:20:00',
    '2024-12-20 13:10:00'
),
(
    'UX Designer',
    'Full-time',
    'DesignStudio Pro',
    'Austin, TX',
    'https://designstudio.com/careers/ux-designer',
    'Not Applied',
    'Interesting role but salary range is below expectations. Will monitor for updates.',
    NULL,
    '2025-01-12 10:45:00',
    '2025-01-12 10:45:00'
),
(
    'Data Analyst',
    'Part-time',
    'Analytics Plus',
    'Chicago, IL',
    NULL,
    'Withdrawn',
    'Decided to pursue full-time opportunities instead. Good learning experience.',
    '2024-12-01',
    '2024-11-25 16:00:00',
    '2024-12-05 09:30:00'
),
(
    'Mobile App Developer',
    'Freelance',
    'Indie Game Studio',
    'Remote',
    'https://indiestudio.com/freelance',
    'Applied',
    'Opportunity to work on indie games. Flexible timeline and creative freedom.',
    '2025-01-25',
    '2025-01-23 12:00:00',
    '2025-01-23 12:00:00'
),
(
    'Technical Writer',
    'Contract',
    'Documentation Experts',
    'Seattle, WA',
    'https://docexperts.com/contracts',
    'Interviewing',
    '6-month contract with possibility of extension. Focus on API documentation.',
    '2025-01-08',
    '2025-01-03 15:20:00',
    '2025-01-03 15:20:00'
),
(
    'QA Engineer',
    'Full-time',
    'Quality Assurance Labs',
    'Denver, CO',
    'https://qalabs.com/jobs/qa-engineer',
    'Applied',
    'Great opportunity to work with automated testing frameworks.',
    '2025-01-28',
    '2025-01-26 10:30:00',
    '2025-01-26 10:30:00'
),
(
    'Product Manager',
    'Full-time',
    'Innovation Hub',
    'Boston, MA',
    NULL,
    'Rejected',
    'Position required more experience than I currently have. Will reapply in 6 months.',
    '2024-11-20',
    '2024-11-15 14:00:00',
    '2024-12-01 11:45:00'
),
(
    'Graphic Designer',
    'Temporary',
    'Creative Agency',
    'Portland, OR',
    'https://creativeagency.com/temp-positions',
    'Not Applied',
    '3-month temporary position. Good for portfolio work but not long-term.',
    NULL,
    '2025-01-14 13:15:00',
    '2025-01-14 13:15:00'
),
(
    'Software Architect',
    'Full-time',
    'Enterprise Systems',
    'Dallas, TX',
    'https://enterprisesys.com/architect',
    'Offer',
    'Excellent compensation package and leadership opportunity. Currently reviewing offer.',
    '2024-12-10',
    '2024-12-05 09:45:00',
    '2025-01-19 17:20:00'
);

-- ============================================
-- END OF SEED DATA
-- ============================================
