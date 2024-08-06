import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MessageInput from './MessageInput'; // Importa il componente MessageInput
import ChatCard from './ChatCard'; // Importa il componente ChatCard
import { fetchChatList } from './api/api'; // Importa la funzione per ottenere la lista delle chat
import './App.css';

const myavatar = 'https://robohash.org/03db50531c3dda18824837d98f54315e?set=set4&bgset=&size=400x400';

function ChatPage() {
    const { id_chatlist, id_chat } = useParams(); // Ottenere id_chatlist e id_chat dai parametri dell'URL
    const navigate = useNavigate();
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getChat = async () => {
            const chatList = await fetchChatList(parseInt(id_chatlist)); // Usare id_chatlist per ottenere la chatlist corretta
            const selectedChat = chatList.find(chat => chat.id === parseInt(id_chat));
            setChat(selectedChat);
            if (selectedChat) {
                setMessages(selectedChat.messages);
            }
        };

        getChat();
    }, [id_chatlist, id_chat]);

    const handleSendMessage = (messageText) => {
        if (messageText.trim() === '' || !chat) return;

        const newMessage = {
            id: Date.now(),
            sender: 'You',
            text: messageText,
            timestamp: new Date().toLocaleTimeString(),
            avatar: myavatar // Avatar URL for the sender 'You'
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        setChat(prevChat => ({
            ...prevChat,
            messages: updatedMessages
        }));
    };

    return (
        <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ padding: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center' }}>
                <IconButton
                    color="primary"
                    onClick={() => navigate(`/chatlist/${id_chatlist}`)} // Modificato per navigare alla lista di chat corretta
                    sx={{ marginRight: 1 }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Box component="span" sx={{ flex: 1 }}>
                    <strong>{chat ? chat.name : 'Chat'}</strong>
                </Box>
            </Box>
            <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
                {chat && <ChatCard chat={chat} />} {/* Use ChatCard component and pass the chat prop */}
            </Box>
            <Box sx={{ padding: 2 }}>
                <MessageInput onSend={handleSendMessage} /> {/* Usa il componente MessageInput */}
            </Box>
        </Container>
    );
}

export default ChatPage;