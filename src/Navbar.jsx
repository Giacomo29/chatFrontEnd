import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import AddChat from './AddChat';

const Navbar = ({ addContactToChat, selectedChat }) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ padding: 0 }}> {/* Rimuove padding di default */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', marginRight: 1 }}>
            Chat
          </Typography>
          <AddChat addContactToChat={addContactToChat} />
        </Box>
        <Box sx={{ flex: 3, textAlign: 'center' }}>
          {selectedChat && (
            <Typography variant="h6" sx={{ textAlign: 'left' }}>
              {selectedChat.name}
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;