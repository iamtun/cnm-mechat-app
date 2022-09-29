import { FlatList, RefreshControl, ScrollView } from 'react-native';
import { useState } from 'react';

import SearchBar from "../../components/SearchBar";
import ChatItem from '../../components/ChatItem';
import Header from '../../components/Header';
const chats = [
    {
        id: 1,
        name: 'Le Tuan',
        image: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        lastMessage: 'Đi nhậu nè',
        time: 3,
    },
    {
        id: 2,
        name: 'Thanh Nho',
        image: '',
        lastMessage: 'Đi chơi không bro?',
        time: 5,
    },
];

function ChatListScreen({ navigation }) {
    return (
        <>
            <Header />
            <SearchBar />
            <FlatList
                data={chats}
                renderItem={({ item }) => (
                    <ChatItem
                        name={item.name}
                        image={item.image}
                        message={item.lastMessage}
                        time={item.time}
                        navigation={navigation}
                        key={item.id}
                    />
                )}
            />
        </>
    );
}

export default ChatListScreen;
