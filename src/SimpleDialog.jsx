import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, DialogTitle, Dialog } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';

const contacts = ['Martina', 'Paolo', 'Sara', 'Giorgia', 'Grace','Luigi', 'Aaron', 'Andy'];

function SimpleDialog(props) {
    const { onClose, open, addContactToChat } = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (contact) => {
        addContactToChat(contact);
        handleClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Scrivi messaggio a...</DialogTitle>
            <List sx={{ pt: 0 }}>
                {contacts.map((contact) => (
                    <ListItem disableGutters key={contact}>
                        <ListItemButton onClick={() => handleListItemClick(contact)}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={contact} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disableGutters>
                    <ListItemButton autoFocus onClick={() => handleListItemClick('addAccount')}>
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    addContactToChat: PropTypes.func.isRequired,
};

export default SimpleDialog;