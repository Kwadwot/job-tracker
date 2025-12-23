// TableHeader component
function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Position</th>
          <th>Company</th>
          <th>Location</th>
          <th>Status</th>
          <th>Date Applied</th>
          <th>Date Created</th>
          <th>Actions</th>
        </tr>
      </thead>
    );
}

// TableBody component
function TableBody({ jobs, onEdit, onDelete }) {
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    };
  
    return (
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id}>
            <td>{job.position}</td>
            <td>{job.company}</td>
            <td>{job.location || 'N/A'}</td>
            <td>
              <span className={`status-badge status-${job.status.toLowerCase().replace(' ', '-')}`}>
                {job.status}
              </span>
            </td>
            <td>{formatDate(job.date_applied)}</td>
            <td>{formatDate(job.date_created)}</td>
            <td className="actions-cell">
              {job.site_link && (
                <a 
                  href={job.site_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="action-link"
                  title="View job posting"
                >
                  🔗
                </a>
              )}
              <button 
                onClick={() => onEdit(job)} 
                className="action-btn edit-btn"
                title="Edit"
              >
                ✏️
              </button>
              <button 
                onClick={() => onDelete(job.id)} 
                className="action-btn delete-btn"
                title="Delete"
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
}

// Main JobTable component
function JobTable({ jobs, onEdit, onDelete }) {
    if (!jobs || jobs.length === 0) {
      return (
        <div className="job-table-container">
          <p className="no-jobs">No job applications found. Add your first application!</p>
        </div>
      );
    }
  
    return (
      <div className="job-table-container">
        <table className="job-table">
          <TableHeader />
          <TableBody 
            jobs={jobs} 
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </table>
      </div>
    );
}
  
export default JobTable;