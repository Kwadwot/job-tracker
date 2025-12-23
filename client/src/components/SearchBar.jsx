
function SearchBar({ searchTerm, onSearchChange }) {
    return (
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by position, company, or location..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
    );
  }
  
  export default SearchBar;