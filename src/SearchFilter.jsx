import React from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchFilter = ({ onSearch }) => {
    const handleChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <Box sx={{ padding: 1, borderBottom: '1px solid #e0e0e0', position: 'relative' }}>
            <TextField
                variant="outlined"
                size="small"
                placeholder="Search"
                onChange={handleChange}
                sx={{ width: '100%' }}
            />
            <IconButton color="inherit" aria-label="search" sx={{ position: 'absolute', right: 8, top: 8 }}>
                <SearchIcon />
            </IconButton>
        </Box>
    );
};

export default SearchFilter;