import './Filter.css';

const STATUS_OPTIONS = [
  { value: 'All', label: 'All Statuses' },
  { value: 'Not Applied', label: 'Not Applied' },
  { value: 'Applied', label: 'Applied' },
  { value: 'Interviewing', label: 'Interviewing' },
  { value: 'Offer', label: 'Offer' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Withdrawn', label: 'Withdrawn' }
];

const POSITION_TYPE_OPTIONS = [
  { value: 'All', label: 'All Types' },
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Temporary', label: 'Temporary' },
  { value: 'Freelance', label: 'Freelance' },
  { value: 'Other', label: 'Other' }
];

function Filter({ selectedStatus, onStatusChange, selectedPositionType, onPositionTypeChange }) {
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
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

      <label htmlFor="position-type-filter" className="filter-label">
        Filter by Position Type:
      </label>
        <select
          id="position-type-filter"
          value={selectedPositionType}
          onChange={(e) => onPositionTypeChange(e.target.value)}
          className="filter-select"
        >
          {POSITION_TYPE_OPTIONS.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
    </div>
  );
}

export default Filter;