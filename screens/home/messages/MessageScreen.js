import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../components/Header';
import MessageInputBox from '../../../components/Messages/MessageInputBox';
import MessageItem from '../../../components/Messages/MessageItem';
import TopBar from '../../../components/Messages/TopBar/TopBar';
import { socket } from '../../../config';
import { getMessageByIdConversationSelector, messageLoadingSelector, userInfoSelector } from '../../../redux/selector';
import messageListSlice, { fetch10NextMessagesById, fetchMessagesById } from '../../../redux/slice/messageSlice';
import GlobalStyle from '../../../styles/GlobalStyle';
import { useState } from 'react';

function MessageScreen({ route, navigation }) {
    const { id, isGroup, members,blockBy, name, image, createdBy } = route.params;
    const dispatch = useDispatch();
    const [isBlock, setIsBlock] = useState(false);

    console.log("blockBy",blockBy);
    // const isFocus = useIsFocused();

    const messages = useSelector(getMessageByIdConversationSelector);
    const isLoading = useSelector(messageLoadingSelector);
    const userInfo = useSelector(userInfoSelector)
    console.log("userInfo",userInfo._id);

    useEffect(() => {
        if(blockBy.includes(userInfo._id)){
            setIsBlock(true);
        }
    },[])
    

    console.log(isBlock);
    useEffect(() => {
        //user join room with socket
        socket.emit('join_room', id);

        //fetch message by conversation id
        dispatch(fetchMessagesById({ id }));

        //receiver message from socket
        socket.on('receiver_message', (message) => {
            dispatch(messageListSlice.actions.addMessageFromSocket(message));
        });

        //receiver recall message and update
        socket.on('receiver_recall_message', (message) => {
            dispatch(messageListSlice.actions.recallMessageFromSocket(message));
        });
    }, []);

    const renderItem = ({ item }) => (item ? <MessageItem message={item} id={id} navigation={navigation} /> : null);

    const handleFetchMessageScrollTop = () => {
        const numberMessage = messages.length;
        if (numberMessage >= 10) {
            dispatch(fetch10NextMessagesById({ id, countMessage: numberMessage }));
        }
    };
    return (
        <>
            <Header />
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 10}
            >
                <View style={styles.body}>
                    <TopBar
                        idConversation={id}
                        createdBy={createdBy}
                        isGroup={isGroup}
                        members={members}
                        name={name}
                        image={image}
                        navigation={navigation}
                    />
                    {isLoading ? (
                        <FlatList
                            data={messages}
                            renderItem={renderItem}
                            initialNumToRender={50}
                            inverted //selected last scroll
                            keyExtractor={(item, index) => item?._id || index.toString()}
                            onEndReached={handleFetchMessageScrollTop} //scroll top by inverted
                        />
                    ) : (
                        <View style={styles.isLoading}>
                            <ActivityIndicator size="large" color={GlobalStyle.primaryColor} />
                            <Text>Loading...</Text>
                        </View>
                    )}
                </View>
                <MessageInputBox conversationId={id} isBlock ={isBlock} />
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '90%',
        backgroundColor: '#ccc',
    },
    isLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageView: {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
});

export default MessageScreen;
