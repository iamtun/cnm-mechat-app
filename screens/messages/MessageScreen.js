import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import MessageInputBox from '../../components/Messages/MessageInputBox';
import MessageItem from '../../components/Messages/MessageItem';
import TopBar from '../../components/Messages/TopBar/TopBar';

import { useSelector } from 'react-redux';
import { messageListSelector } from '../../redux/selector';

function MessageScreen({ route, navigation }) {
    const { name } = route.params;

    const messages = useSelector(messageListSelector);

    return (
        <>
            <Header />
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 10}
            >
                <View style={styles.body}>
                    <TopBar name={name} navigation={navigation} />
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => <MessageItem message={item} />}
                        keyExtractor={(item) => item.id}
                        inverted
                        contentContainerStyle={{ flexDirection: 'column-reverse' }}
                    />
                </View>
                <MessageInputBox />
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
    messageView: {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
});

export default MessageScreen;
