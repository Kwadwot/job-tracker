import { useState, useEffect, useMemo } from 'react';
import './App.css';
import JobTable from './components/JobTable';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import AddJobModal from './components/AddJobModal';
import { supabase } from './supabase';

// const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPositionType, setSelectedPositionType] = useState('All');
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
      const matchesPositionType = selectedPositionType === 'All' || job.position_type === selectedPositionType;

      return matchesSearch && matchesStatus && matchesPositionType;
    });
  }, [jobs, searchTerm, selectedStatus, selectedPositionType]);


  useEffect(() => {
    const fetchJobs = async () => {
      // try {
      //   const response = await fetch(`${API_BASE_URL}/jobs`);
      //   if (!response.ok){
      //     throw new Error('Failed to fetch jobs');
      //   }
      //   const data = await response.json();
      //   setJobs(data);
      // } catch (err) {
      //   console.error('Error fetching jobs:', err);
      // }
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('date_created', { ascending: false });
      
      if (error) {
        console.error('Error fetching jobs:', error);
      } else {
        setJobs(data);
      }
    };
    fetchJobs([]);
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
    
    try {
      if (jobToEdit) {
        // UPDATE job
        // const response = await fetch(`${API_BASE_URL}/jobs/${jobToEdit.id}`, {
        //   method: 'PUT',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(jobData)
        // });

        // if (!response.ok) {
        //   throw new Error('Failed to update job');
        // }

        // const updatedJob = await response.json();

        const { data, error } = await supabase
          .from('jobs')
          .update(jobData)
          .eq('id', jobToEdit.id)
          .select()
          .single();

        if (error) throw error;

        setJobs(jobs.map(job =>
          job.id === updatedJob.id ? data : job
        ));
      } else {
        // CREATE job
        // const response = await fetch(`${API_BASE_URL}/jobs`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(jobData)
        // });

        // if (!response.ok) {
        //   throw new Error('Failed to create job');
        // }

        // const newJob = await response.json();

        const { data, error } = await supabase
          .from('jobs')
          .insert([jobData])
          .select()
          .single();

      if (error) throw error;

        setJobs([...jobs, data]);
      }
    } catch (err) {
      console.error('Error saving job:', err);
      alert(`Failed to save job: ${err.message}`);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      // const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      //   method: 'DELETE'
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to delete job');
      // }

      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setJobs(jobs.filter(job => job.id !== id));
    } catch (err) {
      console.error('Error deleting job:', err);
      alert(`Failed to delete job: ${err.message}`);
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
          selectedPositionType={selectedPositionType}
          onPositionTypeChange={setSelectedPositionType}
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
