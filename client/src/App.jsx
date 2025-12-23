import { useState, useEffect, useMemo } from 'react';
import './App.css';
import JobTable from './components/JobTable';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import AddJobModal from './components/AddJobModal';

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);

  // Filter and search logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = 
        job.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'All' || job.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, selectedStatus]);

  // TODO: Replace with actual API calls
  // For now, using mock data
  useEffect(() => {
    // This will be replaced with API call: fetch('/api/applications')
    setJobs([]);
  }, []);

  const handleAddJob = () => {
    setJobToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditJob = (job) => {
    setJobToEdit(job);
    setIsModalOpen(true);
  };

  const handleSaveJob = async (jobData) => {
    // TODO: Replace with actual API call
    if (jobToEdit) {
      // PUT /api/applications/:id
      setJobs(jobs.map(job => 
        job.id === jobToEdit.id ? { ...jobToEdit, ...jobData } : job
      ));
    } else {
      // POST /api/applications
      const newJob = {
        id: Date.now(), // Temporary ID
        ...jobData,
        date_created: new Date().toISOString(),
        date_updated: new Date().toISOString()
      };
      setJobs([...jobs, newJob]);
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      // TODO: Replace with actual API call: DELETE /api/applications/:id
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Job Application Tracker</h1>
        <button className="add-job-btn" onClick={handleAddJob}>
          + Add New Application
        </button>
      </header>

      <div className="controls-container">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <Filter 
          selectedStatus={selectedStatus} 
          onStatusChange={setSelectedStatus} 
        />
      </div>

      <JobTable 
        jobs={filteredJobs} 
        onEdit={handleEditJob}
        onDelete={handleDeleteJob}
      />

      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setJobToEdit(null);
        }}
        onSave={handleSaveJob}
        jobToEdit={jobToEdit}
      />
    </div>
  );
}

export default App
