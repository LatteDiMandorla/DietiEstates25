import './SearchBar.css'; // File CSS per lo stile della searchbar

function SearchBar() {
  return (
    <div className="search-bar">
      <img src="Home.png" alt="Home" className="icon-left" />
      <input
        type="text"
        className="search-input"
        placeholder="Dove vuoi andare a vivere?"
      />
      <img src="Search.png" alt="Search" className="icon-right" />
    </div>
  );
}

export default SearchBar;
