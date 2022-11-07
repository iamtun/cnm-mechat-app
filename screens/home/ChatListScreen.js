import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';

import { conversationListLoadingSelector, conversationsListSelector } from '../../redux/selector';
import SearchBar from '../../components/SearchBar';
import ChatItem from '../../components/ChatItem';
import Header from '../../components/Header';
import conversationsSlice, { fetchConversations } from '../../redux/slice/conversationSlice';
import { useIsFocused } from '@react-navigation/native';
import Loading from '../../components/Loading';
import { socket } from '../../config';

function ChatListScreen({ navigation }) {
    const dispatch = useDispatch();
    const conversationLoading = useSelector(conversationListLoadingSelector);
    const conversations = useSelector(conversationsListSelector);
    //const isFocus = useIsFocused();

    useEffect(() => {
        //init
        if (conversations.length === 0) dispatch(fetchConversations());
        
        //listening socket
        socket.off('send_friends_give_conversation');
        socket.on('send_friends_give_conversation', (conversation) => {
            console.log('send_friends_give_conversation', conversation);
            dispatch(conversationsSlice.actions.addConversationFromSocket(conversation));
        });

        socket.off('receive_friends_give_conversation');
        socket.on('receive_friends_give_conversation', (conversation) => {
            console.log('receive_friends_give_conversation', conversation);
            dispatch(conversationsSlice.actions.addConversationFromSocket(conversation));
        });

        socket.on('send_conversation_group', (conversation) => {
            console.log(conversation);
            dispatch(conversationsSlice.actions.addConversationFromSocket(conversation));
        })

        console.log('this is conversation -> ', conversations);
    }, []);

    return (
        <>
            <Header />
            <SearchBar navigation={navigation} />
            {conversationLoading ? (
                <Loading />
            ) : (
                <FlatList
                    data={conversations}
                    initialNumToRender={50}
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
                            createdBy={item.createdBy}
                        />
                    )}
                />
            )}
        </>
    );
}

export default ChatListScreen;
