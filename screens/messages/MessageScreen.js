import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Headers/Header';
import TopBar from '../../components/Headers/TopBar/TopBar';

function MessageScreen({ route, navigation }) {
    const { name } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'Hello React, How are you?',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    }, []);

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
            />
        );
    };

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <Icon name="send-circle" size={36} color="#2e64e5" style={{ marginBottom: 8, marginRight: 8 }} />
                </View>
            </Send>
        );
    };

    const scrollToBottomComponent = () => {
        return <Icon name="chevron-double-down" size={36} />;
    };

    return (
        <>
            <Header />
            <View style={styles.messageView}>
                <TopBar name={name} navigation={navigation} />
                <GiftedChat
                    wrapInSafeArea={false} //fix padding top content
                    placeholder="Nhập tin nhắn ..."
                    messages={messages}
                    onSend={(messages) => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    renderBubble={renderBubble}
                    renderSend={renderSend}
                    scrollToBottom
                    scrollToBottomComponent={scrollToBottomComponent}
                />
                {/* fix keyboard in android platform */}
                {Platform.OS === 'android' && <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={80} />}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
    },
    messageView: {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
});

export default MessageScreen;
