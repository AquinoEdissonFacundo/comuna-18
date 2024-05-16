// import React from 'react';
// import styles from './searchBar.module.css';
// const SearchBar = ({ onSearch }) => {
//   const handleSearch = (event) => {
//     onSearch(event.target.value);
//   };

//   return (
//     <div className={styles.containerSearchBar}>
//       <input
//         type='text'
//         placeholder='Buscar Pokémon...'
//         onChange={handleSearch}
//       />
//     </div>
//   );
// };

// export default SearchBar;
// searchBar.jsx

// searchBar.jsx
import React, { useState } from 'react';
import styles from './searchBar.module.css';
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.containerSearchBar}>
      <input
        type='text'
        placeholder='Buscar Pokémon...'
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
