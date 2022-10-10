import { PointPropType } from 'deprecated-react-native-prop-types';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '../../../redux/selector';
import ActionMessage from './ActionMessage';
import ImageMessage from './ImageMessage';

function MessageItem({ message }) {
    const { _id } = useSelector(userInfoSelector);
    const isMe = message.user.id === _id;

    return (
        <>
            {message.action ? (
                <ActionMessage createAt={message.createdAt} message={message.action} />
            ) : (
                <View
                    style={[styles.container, { justifyContent: isMe ? 'flex-end' : null, marginRight: isMe ? 8 : 0 }]}
                >
                    {isMe || <Image source={{ uri: message.user.avatar }} style={styles.avatar} />}

                    <View
                        style={[
                            styles.body,
                            {
                                backgroundColor: isMe ? '#a2d2ff' : '#fff',
                                borderWidth: 1,
                                borderColor: '#3777F3',
                            },
                        ]}
                    >
                        <View>
                            {isMe || <Text style={styles.username}>{message.user.name}</Text>}
                            {message.imageLink ? (
                                <ImageMessage imageURI={message.imageLink} content={message.content} />
                            ) : (
                                <Text style={[styles.message]}>{message.content}</Text>
                            )}
                            <Text style={styles.time}>{message.createdAt}</Text>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    body: {
        maxWidth: '80%',
        width: 'auto',
        borderRadius: 8,
        padding: 8,
        marginLeft: 4,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 50,
    },
    username: {
        color: '#2a9d8f',
        marginBottom: 8,
    },
    time: {
        fontSize: 10,
        color: '#354f52',
        fontWeight: '400',
        paddingVertical: 8,
    },
});

export default MessageItem;
