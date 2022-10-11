import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';

import { usersRemainingSelector, conversationsListSelector, userInfoSelector } from '../../redux/selector';
import SearchBar from '../../components/SearchBar';
import ChatItem from '../../components/ChatItem';
import Header from '../../components/Header';
import SearchItem from '../../components/SearchBar/SearchItem';
import { fetchConversations } from '../../redux/slice/conversationSlice';

function ChatListScreen({ navigation }) {

    const userSearching = useSelector(usersRemainingSelector);
    const userInfo = useSelector(userInfoSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo?._id) return;
        else dispatch(fetchConversations(userInfo._id));
    }, [userInfo]);

    const conversations = useSelector(conversationsListSelector);

    return (
        <>
            <Header />
            <SearchBar navigation={navigation}/>
            {userSearching ? (
                //no find
                userSearching === 1 ? (
                    <SearchItem isNull />
                ) : (
                    <FlatList
                        data={userSearching}
                        renderItem={({ item }) => (
                            <SearchItem
                                id={item._id}
                                name={item.fullName}
                                phonNumber={item.phoneNumber}
                                image={item.avatarLink}
                                isFriend={item.isFriend}
                                navigation={navigation}
                            />
                        )}
                    />
                )
            ) : (
                <FlatList
                    data={conversations}
                    renderItem={({ item }) => (
                        <ChatItem
                            id={item.id}
                            name={item.name}
                            image={item.imageLinkOfConver}
                            message={item.content}
                            time={moment(item.time).fromNow()}
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
