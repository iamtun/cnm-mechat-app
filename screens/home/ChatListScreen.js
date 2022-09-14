import { RefreshControl, ScrollView } from 'react-native';
import SearchBar from '../../components/searchBar/SearchBar';
import { useState } from 'react';

const messages = [
    {
        id: 1,
        name: 'Le Tuan',
        image: '',
        message: 'Đi nhậu nè',
    },
    {
        id: 2,
        name: 'Thanh Nho',
        image: '',
        message: 'Đi chơi không bro?',
    },
];

function ChatListScreen({ navigation }) {
    const [isRefresh, setIsRefresh] = useState(false);

    return (
        <>
            <SearchBar isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
            <ScrollView>
                <RefreshControl onRefresh={() => setIsRefresh(!isRefresh)} />
            </ScrollView>
        </>
    );
}

export default ChatListScreen;
