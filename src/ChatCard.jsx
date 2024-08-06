import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

const ChatCard = ({ chat }) => {
    const mtAvatar = 'https://robohash.org/03db50531c3dda18824837d98f54315e?set=set4&bgset=&size=400x400';
    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: 2 }}>
            {chat.messages.map((message) => (
                <Box
                    key={message.id}
                    sx={{
                        display: 'flex',
                        flexDirection: message.sender === 'You' ? 'row-reverse' : 'row',
                        alignItems: 'flex-end',
                        marginBottom: 1
                    }}
                >
                    <Avatar
                        alt={message.sender}
                        src={message.sender === 'You' ? mtAvatar : chat.avatar}
                        sx={{ width: 40, height: 40, marginLeft: message.sender === 'You' ? 0 : 1, marginRight: message.sender === 'You' ? 1 : 0 }}
                    />
                    <Card
                        sx={{
                            maxWidth: '75%',
                            borderRadius: 2,
                            boxShadow: 1,
                            backgroundColor: message.sender === 'You' ? 'primary.main' : 'background.paper',
                            color: message.sender === 'You' ? 'white' : 'text.primary',
                            padding: 1,
                            margin: 1
                        }}
                    >
                        <CardContent sx={{ padding: '8px' }}>
                            <Typography variant="body2">
                                {message.text}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
    );
};

export default ChatCard;