import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatListPage from './ChatListPage';
import ChatListPageMobile from './ChatListPageMobile';
import ChatPage from './ChatPage';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
      {/* Versione desktop */}
        <Route path="/:id_chatlist" element={<ChatListPage/>} /> 
        {/* Versione mobile */}
        <Route path="/chatlist/:id_chatlist" element={<ChatListPageMobile />} />
        <Route path="/chatlist/:id_chatlist/chat/:id_chat" element={<ChatPage/>} />
      </Routes>
    </Router>
  );
}

export default App;