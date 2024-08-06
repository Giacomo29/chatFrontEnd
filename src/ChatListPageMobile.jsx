import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material';
import SearchFilter from './SearchFilter';
import { fetchChatList } from './api/api'; // Funzione per ottenere la lista delle chat
import './App.css';

function MobileChatListPage() {
    const [listchat, setListchat] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { id_chatlist } = useParams(); // Ottenere l'id della chatlist dai parametri dell'URL

    useEffect(() => {
        const getChats = async () => {
            const chatList = await fetchChatList(id_chatlist); // Usare l'id_chatlist dall'URL
            setListchat(chatList);
        };

        getChats();
    }, [id_chatlist]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const getLastMessage = (chat) => {
        return chat.messages[chat.messages.length - 1] || {};
    };

    const sortedChats = listchat
        .map((chat) => ({
            ...chat,
            lastMessage: getLastMessage(chat),
        }))
        .sort((a, b) => b.lastMessage.id - a.lastMessage.id);

    const filteredChats = sortedChats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.messages.some(message => message.text.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ padding: 2, borderBottom: 'none', display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6">Chat List</Typography>
            </Box>
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <SearchFilter onSearch={handleSearch} />
                <List>
                    {filteredChats.map((chat) => (
                        <ListItem
                            key={chat.id}
                            alignItems="flex-start"
                            button
                            onClick={() => navigate(`/chatlist/${id_chatlist}/chat/${chat.id}`)} // Usare l'id_chatlist per la navigazione
                        >
                            <ListItemAvatar>
                                <Avatar alt={chat.name} src={chat.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="body1">
                                        {chat.name}
                                    </Typography>
                                }
                                secondary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                flex: 1,
                                                color: 'white', // Imposta il colore del testo su bianco
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            {chat.lastMessage.text || 'No messages'}
                                        </Typography>
                                        <Typography variant="caption" sx={{ marginLeft: '1rem', color: 'white' }}>
                                            {chat.lastMessage.timestamp || ''}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}

export default MobileChatListPage;