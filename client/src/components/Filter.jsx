import './Filter.css';

const STATUS_OPTIONS = [
  'All',
  'Not Applied',
  'Applied',
  'Interviewing',
  'Offer',
  'Rejected',
  'Withdrawn'
];

const POSITION_TYPE_OPTIONS = [
  'All',
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Temporary',
  'Freelance',
  'Other'
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
          <option key={status} value={status}>
            {status}
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
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;