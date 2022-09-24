import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import MessageInputBox from '../../components/Messages/MessageInputBox';
import MessageItem from '../../components/Messages/MessageItem';
import TopBar from '../../components/Messages/TopBar/TopBar';

const messages = [
    {
        id: 'm1',
        content: 'How are you?',
        user: {
            id: 'u1',
            name: 'Le Tuan',
            avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        },
        createAt: '22:30',
    },
    {
        id: 'm2',
        content: 'Fine, and u',
        user: {
            id: 'u2',
            name: 'Thanh Nho',
            avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        },
        createAt: '22:35',
    },
    {
        id: 'm3',
        content: 'Fine, and u',
        user: {
            id: 'u2',
            name: 'Thanh Nho',
            avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        },
        createAt: '22:35',
    },
    {
        id: 'm4',
        content: 'Fine, and u',
        user: {
            id: 'u2',
            name: 'Thanh Nho',
            avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        },
        createAt: '22:35',
    },
    {
        id: 'm5',
        content: 'Fine, and u',
        user: {
            id: 'u2',
            name: 'Thanh Nho',
            avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        },
        createAt: '22:35',
    },
    {
        id: 'm6',
        content: 'Fine, and u',
        user: {
            id: 'u2',
            name: 'Thanh Nho',
            avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        },
        createAt: '22:35',
    },
    {
        id: 'm7',
        content: 'Học thì điện thoại lúc nào cũng bấm, Học thì điện thoại lúc nào cũng bấm',
        imageLink: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        user: {
            id: 'u2',
            name: 'Thanh Nho',
            avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        },
        createAt: '22:35',
    },
    {
        id: 'm8',
        content: 'Ok!',
        imageLink: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        user: {
            id: 'u1',
            name: 'Le Tuan',
            avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        },
        createAt: '22:35',
    },
    {
        id: 'm9',
        imageLink: 'https://zpsocial-f51-org.zadn.vn/2bb60175220bcc55951a.jpg',
        user: {
            id: 'u2',
            name: 'Thanh Nho',
            avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
        },
        createAt: '22:35',
    },
];

function MessageScreen({ route, navigation }) {
    const { name } = route.params;

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
