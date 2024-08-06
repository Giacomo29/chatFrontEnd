// Simula una chiamata API per ottenere la lista delle chat
export const fetchChatList = async (id_chatlist) => {
    // Dati delle chat simulati
    const initialChats = [
        {
            id_chatlist: 1,
            id: 1,
            name: 'Marco',
            avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
            messages: [
                { id: 1, sender: 'Marco', text: 'Hey, how are you?', timestamp: '10:00:00' },
                { id: 2, sender: 'You', text: 'Let’s meet tomorrow.', timestamp: '10:05:00' },
                { id: 3, sender: 'Marco', text: 'Sounds good! What time?', timestamp: '10:10:23' },
            ],
        },
        {
            id_chatlist: 1,
            id: 2,
            name: 'Giovanna',
            avatar: 'https://gravatar.com/avatar/46483d6f0c6c0d026ab4b0739ead9890?s=400&d=robohash&r=x',
            messages: [
                { id: 4, sender: 'Giovanna', text: 'How’s the report coming along?', timestamp: '11:00:01' },
                { id: 5, sender: 'You', text: 'I’m almost done with it.', timestamp: '11:05:06' },
            ],
        },
        {
            id_chatlist: 2,
            id: 3,
            name: 'Victor',
            avatar: 'https://robohash.org/0ccd9c6094a2aff3b50b6f1d82c21650?set=set4&bgset=&size=400x400',
            messages: [
                { id: 6, sender: 'Victor', text: 'Don’t forget to send the report.', timestamp: '12:00:24' },
                { id: 7, sender: 'You', text: 'Got it, thanks for the reminder!', timestamp: '12:05:58' },
            ],
        },
    ];

    // Simula un ritardo di rete
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filtra le chat in base all'id_chatlist
    return initialChats.filter(chat => chat.id_chatlist === parseInt(id_chatlist));
};