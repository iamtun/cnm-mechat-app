import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';

import { conversationListLoadingSelector, conversationsListSelector } from '../../redux/selector';
import SearchBar from '../../components/SearchBar';
import ChatItem from '../../components/ChatItem';
import Header from '../../components/Header';
import { fetchConversations } from '../../redux/slice/conversationSlice';
import { useIsFocused } from '@react-navigation/native';
import Loading from '../../components/Loading';

function ChatListScreen({ navigation }) {
    const dispatch = useDispatch();
    const conversationLoading = useSelector(conversationListLoadingSelector);
    const conversations = useSelector(conversationsListSelector);
    const isFocus = useIsFocused();

    useEffect(() => {
        //init
        // if(conversations.length === 0)
        dispatch(fetchConversations());
    }, [isFocus]);

    return (
        <>
            <Header />
            <SearchBar navigation={navigation} />
            {conversationLoading ? (
                <Loading />
            ) : (
                <FlatList
                    data={conversations}
                    renderItem={({ item }) => (
                        <ChatItem
                            id={item.id}
                            isGroup={item.isGroup}
                            name={item.name}
                            image={item.imageLinkOfConver}
                            members={item.members}
                            message={item.content ? item.content : item.lastMessage}
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
