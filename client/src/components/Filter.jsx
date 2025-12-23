const STATUS_OPTIONS = [
    'All',
    'Not Applied',
    'Applied',
    'Interviewing',
    'Offer',
    'Rejected',
    'Withdrawn'
  ];
  
  function Filter({ selectedStatus, onStatusChange }) {
    return (
      <div className="filter-container">
        <label htmlFor="status-filter" className="filter-label">
          Filter by Status:
        </label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="filter-select"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default Filter;