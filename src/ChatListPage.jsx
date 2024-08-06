import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material';
import ChatCard from './ChatCard';
import MessageInput from './MessageInput';
import SearchFilter from './SearchFilter';
import { fetchChatList } from './api/api'; // Importa la funzione per ottenere la lista delle chat
import Navbar from './Navbar';
import './App.css';

function ChatListPage() {
    const { id_chatlist } = useParams();
    const [listchat, setListchat] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const getChats = async () => {
            if (id_chatlist) {
                const chatList = await fetchChatList(id_chatlist);
                setListchat(chatList);
            }
        };

        getChats();
    }, [id_chatlist]);

    const addContactToChat = (contact) => {
        if (id_chatlist && contact.trim() !== '') {
            setListchat([
                ...listchat,
                {
                    id_chatlist: parseInt(id_chatlist),
                    id: Date.now(),
                    name: contact,
                    avatar: 'https://robohash.org/03db50531c3dda18824837d98f54315e?set=set4&bgset=&size=400x400',
                    messages: [],
                },
            ]);
        }
    };

    const addChat = (messageText) => {
        if (selectedChat) {
            const newMessage = {
                id: Date.now(),
                sender: 'You',
                text: messageText,
                timestamp: new Date().toLocaleTimeString(),
            };
            const updatedChats = listchat.map((chat) => {
                if (chat.id === selectedChat.id) {
                    return {
                        ...chat,
                        messages: [...chat.messages, newMessage],
                    };
                }
                return chat;
            });
            setListchat(updatedChats);
            setSelectedChat({
                ...selectedChat,
                messages: [...selectedChat.messages, newMessage],
            });
        }
    };

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
        .sort((a, b) => {
            const aLastMessageId = a.lastMessage.id || 0;
            const bLastMessageId = b.lastMessage.id || 0;
            return bLastMessageId - aLastMessageId;
        });

    const filteredChats = sortedChats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.messages.some(message => message.text.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <>
            <Navbar addContactToChat={addContactToChat} selectedChat={selectedChat} />
            <Container disableGutters maxWidth={false} sx={{ height: '100vh', padding: 0, margin: 0 }}>
                <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', flexDirection: 'row' }}>
                    <Box
                        sx={{
                            width: { xs: '100%', md: '25%' },
                            borderRight: { md: '1px solid #e0e0e0' },
                            borderBottom: { xs: '1px solid #e0e0e0', md: 'none' },
                            overflowY: 'auto',
                            padding: { xs: 1, md: 0 },
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <SearchFilter onSearch={handleSearch} />
                        <List>
                            {filteredChats.map((chat) => (
                                <ListItem
                                    key={chat.id}
                                    alignItems="flex-start"
                                    sx={{ borderBottom: '1px solid #e0e0e0' }}
                                    button
                                    onClick={() => setSelectedChat(chat)}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt={chat.name} src={chat.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={chat.name}
                                        secondary={
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    sx={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        flex: 1,
                                                    }}
                                                >
                                                    {chat.lastMessage.text || 'No messages'}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary" sx={{ marginLeft: 1 }}>
                                                    {chat.lastMessage.timestamp || ''}
                                                </Typography>
                                            </Box>
                                        }
                                        primaryTypographyProps={{ variant: 'h6' }}
                                        secondaryTypographyProps={{ component: 'div' }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ flex: 1, overflowY: 'auto', padding: { xs: 1, md: 2 } }}>
                            {selectedChat ? (
                                <ChatCard chat={selectedChat} />
                            ) : (
                                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography variant="h6" sx={{ textAlign: 'center', color: 'primary.main' }}>
                                        Seleziona una chat
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        {selectedChat && (
                            <Box sx={{ padding: 2, borderTop: '1px solid #e0e0e0' }}>
                                <MessageInput onSend={addChat} />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default ChatListPage;