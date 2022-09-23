import { FlatList, RefreshControl, ScrollView } from 'react-native';
import { useState } from 'react';

import SearchBar from '../../components/SearchBar';
import ChatItem from '../../components/ChatItem';
import Header from '../../components/Header';
const chats = [
    {
        id: 1,
        name: 'Le Tuan',
        image: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        message: 'Đi nhậu nè',
        time: 3,
    },
    {
        id: 2,
        name: 'Thanh Nho',
        image: '',
        message: 'Đi chơi không bro?',
        time: 5,
    },
];

function ChatListScreen({ navigation }) {
    const [isRefresh, setIsRefresh] = useState(false);

    return (
        <>
            <Header />
            <SearchBar isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
            <FlatList
                data={chats}
                renderItem={({ item }) => (
                    <ChatItem
                        name={item.name}
                        image={item.image}
                        message={item.message}
                        time={item.time}
                        navigation={navigation}
                        key={item.id}
                    />
                )}
                refreshControl={<RefreshControl onRefresh={() => setIsRefresh(true)} refreshing={false}/>}
            />
        </>
    );
}

export default ChatListScreen;
