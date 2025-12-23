import './JobTable.css';

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
        <th>Notes</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}

// TableBody component
function TableBody({ jobs, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    let year, month, day;

    // Check if it's an ISO timestamp (contains 'T') or just a date string
    if (dateString.includes('T')) {
      // ISO timestamp format: "2025-12-22T10:30:00.000Z"
      // Use UTC methods to get the correct UTC date
      const date = new Date(dateString);
      year = date.getUTCFullYear();
      month = date.getUTCMonth() + 1; // getUTCMonth() returns 0-11
      day = date.getUTCDate();
    } else {
      // Date string format: "2025-12-22"
      [year, month, day] = dateString.split('-').map(Number);
    }
    // Validate the parsed values
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return 'Invalid Date';
    }

    // Format directly using the extracted values to avoid timezone issues
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `${monthNames[month - 1]} ${day}, ${year}`;
  };

  const truncateNotes = (notes, maxLength = 50) => {
    if (!notes) return 'N/A';
    if (notes.length <= maxLength) return notes;
    return notes.substring(0, maxLength) + '...';
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
          <td className="notes-cell" title={job.notes || ''}>
            {truncateNotes(job.notes)}
          </td>
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