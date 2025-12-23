# Job Application Tracker

A modern, full-stack web application for tracking job applications with real-time updates, advanced filtering, and a neat UI.

## 🌐 Live Deployment

[🚀 View Deployed Application](https://your-app-name.vercel.app)

## 🚀 Features

- **Job Application Management**: Add, edit, delete, and track job applications
- **Advanced Filtering**: Filter by application status and position type
- **Real-time Search**: Search across position, company, and location
- **Status Tracking**: Track applications from "Not Applied" to "Offer" status
- **Position Types**: Support for Full-time, Part-time, Contract, Internship, etc.
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Supabase Client** - Real-time database client
- **CSS3** - Custom styling with gradients and animations

### Backend (Development)
- **Express.js** - REST API server
- **PostgreSQL** - Relational database
- **Node.js** - JavaScript runtime

### Production Database
- **Supabase** - PostgreSQL as a service with real-time features

### Deployment
- **Vercel** - Frontend deployment
- **Supabase** - Database hosting

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (for local development)
- **Supabase account** (for production database)
- **Vercel account** (for deployment)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd job-tracker

# Install client dependencies
cd client
npm install

# Install server dependencies (optional, for local API)
cd ../server
npm install
```

### 2. Database Setup

#### Option A: Supabase (Recommended for Production)

1. **Create Supabase project** at [supabase.com](https://supabase.com)

2. **Run the schema** in Supabase SQL Editor:
   ```sql
   -- Copy and paste the contents of schema.sql
   ```

3. **Get your credentials** from Supabase Dashboard → Settings → API

#### Option B: Local PostgreSQL (Development)

```bash
# Create database
createdb job_tracker

# Run schema
psql -d job_tracker -f schema.sql

# Add sample data (optional)
psql -d job_tracker -f seed.sql
```

### 3. Environment Setup

#### Client Environment Variables

Create `client/.env.local`:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

#### Server Environment Variables (Optional)

Create `server/.env`:

```bash
PGHOST=localhost
PGPORT=5432
PGDATABASE=job_tracker
PGUSER=your_postgres_username
PGPASSWORD=your_postgres_password
PORT=5000
```

### 4. Run Locally

#### Development Mode (Supabase)

```bash
cd client
npm run dev
```

#### Development Mode (Local API)

```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

### 5. Build for Production

```bash
cd client
npm run build
```

## 🌐 Deployment

### Vercel + Supabase Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd client
   vercel --prod
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 📁 Project Structure

```
job-tracker/
├── client/                 # React frontend
│   ├── public/
│   │   └── memo-icon.svg   # Custom favicon
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── JobTable.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Filter.jsx
│   │   │   └── AddJobModal.jsx
│   │   ├── supabase.js     # Supabase client
│   │   └── App.jsx
│   └── package.json
├── server/                 # Express backend (optional)
│   ├── routes/
│   │   └── jobs.js         # Job API routes
│   ├── index.js
│   └── package.json
├── schema.sql              # Database schema
├── seed.sql               # Sample data
└── README.md
```

## 🔌 API Documentation

### Jobs Endpoints (Express Server)

```
GET    /api/jobs           # Get all jobs
POST   /api/jobs           # Create new job
PUT    /api/jobs/:id       # Update job
DELETE /api/jobs/:id       # Delete job
GET    /api/health         # Health check
```

### Supabase Tables

**jobs table:**
- `id` (serial, primary key)
- `position` (varchar)
- `position_type` (enum)
- `company` (varchar)
- `location` (varchar)
- `site_link` (text)
- `status` (enum)
- `notes` (text)
- `date_created` (timestamp)
- `date_applied` (date)
- `date_updated` (timestamp)

### Enums

**position_type:**
- Full-time, Part-time, Contract, Internship, Temporary, Freelance, Other

**application_status:**
- Not Applied, Applied, Interviewing, Offer, Rejected, Withdrawn

## 🎨 UI Features

- **Responsive Design**: Works on all screen sizes
- **Dark Teal Theme**: Professional color scheme
- **Smooth Animations**: CSS transitions and hover effects
- **Status Badges**: Color-coded status indicators
- **Task List Icon**: Custom favicon with checkboxes
- **Form Validation**: Client-side validation for required fields

## 🔧 Development

### Available Scripts

#### Client
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

#### Server (Optional)
```bash
npm run dev      # Start with nodemon
npm run start    # Start production server
```

### Code Style

- **ESLint** configured for React
- **Prettier** recommended for consistent formatting
- **Component-based architecture**
- **Custom hooks** for state management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.
Copyright (c) 2025 Kwadwot

## 🔍 Reflections & Improvements

### Current Limitations
- **Underutilized `date_updated`**: The timestamp field exists but isn't displayed or used for sorting/filtering
- **Basic Date Display**: The "Date Created" column could show relative time (e.g., "3 days ago") instead of absolute dates
- **Manual Status Updates**: No automatic status progression or deadline tracking
- **Simple Search**: Text search could be enhanced with fuzzy matching or advanced filters

### Potential Enhancements
- **Date Display**: Convert "Date Created" to show "X days ago" for better context
- **Activity Tracking**: Use `date_updated` to show recently modified applications
- **Sorting Options**: Add sorting by date created, date updated, company, or status
- **Export Functionality**: Allow users to export job data to CSV/PDF

## 🚀 Future Feature Ideas

### 🔐 Authentication & User Management
- **User Accounts**: Individual user profiles with private job trackers
- **Data Privacy**: Secure user data with proper authentication periods

### 💰 Salary Tracking
- **Salary Fields**: Add salary range, currency, and negotiation notes
- **Salary Types**: Support hourly, annual, equity, and bonus information
- **Market Comparison**: Integration with salary data APIs for market insights

### 🛠 Skills & Matching
- **Skills Column**: Track required and possessed skills for each position
- **Skills Filtering**: Filter jobs by required skills or skill gaps
- **Skill Analytics**: Show most in-demand skills and skill development suggestions

### 📊 Advanced Filtering & Analytics
- **Range Filtering**: Filter by salary range, application date ranges, or experience level
- **Best Fit Calculation**: Algorithm to match jobs to user profile based on salary, skills, and preferences
- **Geographic Insights**: Map visualization for job locations and remote work opportunities

### 📱 Enhanced User Experience
- **Mobile App**: React Native companion app for on-the-go job tracking
- **Email Integration**: Connect with email to automatically track job applications
- **Calendar Integration**: Sync interview dates and deadlines with calendar apps
- **Notifications**: Reminders for follow-ups and application deadlines

### 🤖 AI-Powered Features
- **Resume Optimization**: AI suggestions for resume tailoring based on job descriptions
- **Cover Letter Generation**: AI-assisted cover letter writing
- **Job Matching**: AI-powered job recommendations based on user profile and preferences

---

## 🙏 Acknowledgments

- **Vite** for the fast build tool
- **Supabase** for the amazing database service
- **Vercel** for seamless deployment
- **React** for the powerful UI framework

---

## 📞 Support

If you encounter any issues or have questions about this project, please open an issue on GitHub.

## 🔗 Links

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Vercel](https://vercel.com/) - The platform for frontend developers
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

---

Built with modern web technologies for efficient job application management.
