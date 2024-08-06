import React, { useState } from 'react';
import { IconButton, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SimpleDialog from './SimpleDialog'; // Assicurati di aggiornare il percorso del file

const AddChat = ({ addContactToChat }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        addContactToChat={addContactToChat}
      />
    </Container>
  );
};

export default AddChat;