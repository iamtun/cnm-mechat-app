import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { usersRemainingSelector } from '../../redux/selector';
import SearchBar from '../../components/SearchBar';
import ChatItem from '../../components/ChatItem';
import Header from '../../components/Header';
import SearchItem from '../../components/SearchBar/SearchItem';
import { useEffect } from 'react';
import {fetchUsers} from '../../redux/slice/usersSlice';

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
    const userSearching = useSelector(usersRemainingSelector);
    //console.log(userSearching);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return (
        <>
            <Header />
            <SearchBar />
            {userSearching ? (
                <FlatList
                    data={userSearching}
                    renderItem={({ item }) => (
                        <SearchItem name={item.fullName} phonNumber={item.phoneNumber} image={item.avatar}/>
                    )}
                />
            ) : (
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
            )}
        </>
    );
}

export default ChatListScreen;
