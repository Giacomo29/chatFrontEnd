import React, { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const MessageInput = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage(''); // Reset the message input field after sending
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <Box
            component="form"
            sx={{ display: 'flex', alignItems: 'center', padding: 2, borderTop: '1px solid #e0e0e0' }}
            onSubmit={(e) => {
                e.preventDefault(); // Prevent form submission
                handleSend();
            }}
        >
            <TextField
                variant="outlined"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                multiline
                fullWidth
                sx={{ marginRight: 1 }}
            />
            <IconButton
                color="primary"
                onClick={handleSend}
                aria-label="send message"
            >
                <SendIcon />
            </IconButton>
        </Box>
    );
};

export default MessageInput;