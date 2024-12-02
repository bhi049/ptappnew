import React from 'react';
import { TextField } from '@mui/material';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <TextField
      label="Haku"
      variant="outlined"
      fullWidth
      margin="normal"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;
