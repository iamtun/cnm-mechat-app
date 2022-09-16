import { FlatList, RefreshControl, ScrollView } from 'react-native';
import { useState } from 'react';
import SearchBar from '../../components/searchBar/SearchBar';
import ChatItem from '../../components/chats/ChatItem';
import Header from '../../components/headers/Header';
const chats = [
    {
        id: 1,
        name: 'Le Tuan',
        image: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        message: 'Đi nhậu nè',
    },
    {
        id: 2,
        name: 'Thanh Nho',
        image: '',
        message: 'Đi chơi không bro?',
    },
    {
        id: 3,
        name: 'Le Tuan',
        image: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        message: 'Đi nhậu nè',
    },
    {
        id: 4,
        name: 'Thanh Nho',
        image: '',
        message: 'Đi chơi không bro?',
    },
    {
        id: 5,
        name: 'Le Tuan',
        image: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        message: 'Đi nhậu nè',
    },
    {
        id: 6,
        name: 'Thanh Nho',
        image: '',
        message: 'Đi chơi không bro?',
    },
    {
        id: 7,
        name: 'Le Tuan',
        image: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        message: 'Đi nhậu nè',
    },
    {
        id: 8,
        name: 'Thanh Nho',
        image: '',
        message: 'Đi chơi không bro?',
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
                        key={item.id}
                        navigation={navigation}
                    />
                )}
                refreshControl={<RefreshControl onRefresh={() => setIsRefresh(true)}/>}
            />
        </>
    );
}

export default ChatListScreen;
