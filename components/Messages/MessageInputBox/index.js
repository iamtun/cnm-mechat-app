import { useRef, useState } from 'react';
import { Platform } from 'react-native';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector } from '../../../redux/selector';
import { sendImageMessage, sendMessage } from '../../../redux/slice/messageSlice';

function MessageInputBox({ conversationId }) {
    const [isWrite, setIsWrite] = useState(false);
    const [message, setMessage] = useState('');
    const userInfo = useSelector(userInfoSelector);

    const dispatch = useDispatch();

    const handleWriteText = (value) => {
        setMessage(value);
        if (value.length > 0) {
            setIsWrite(true);
        } else {
            setIsWrite(false);
        }
    };

    const handleSendMessage = () => {
        if(message.trim()) {
            const data = { content: message, senderID: userInfo._id, conversationID: conversationId };
            dispatch(sendMessage(data));
            setMessage('');
            setIsWrite(false);
        }else {
            //send white space
            setIsWrite(false);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            videoQuality: ImagePicker.UIImagePickerControllerQualityType.High,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const data = { imageLink: result.uri, senderID: userInfo._id, conversationID: conversationId };
            dispatch(sendImageMessage(data));
        }
    };

    return (
        <View style={[styles.body, styles.row]}>
            <Icon name="sticker-emoji" size={32} style={styles.icon} />
            <View style={styles.inputView}>
                <TextInput
                    placeholder="Nhập tin nhắn"
                    value={message}
                    style={[styles.input, { paddingTop: Platform.OS === 'ios' ? 25 : 0 }]}
                    multiline
                    onChangeText={handleWriteText}
                />
            </View>
            <View style={[styles.row, styles.rightIcons, { justifyContent: isWrite ? 'flex-end' : 'space-around' }]}>
                {isWrite ? (
                    <Icon
                        name="send"
                        size={32}
                        style={[styles.icon, { color: '#3777F3' }]}
                        onPress={handleSendMessage}
                    />
                ) : (
                    <>
                        <Icon name="microphone" size={32} style={styles.icon} />
                        <Icon name="image-multiple-outline" size={32} onPress={pickImage} />
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    body: {
        // borderWidth: 1,
        height: 70,
        paddingHorizontal: 8,
    },
    icon: {
        color: '#333',
        fontWeight: '200',
    },
    inputView: {
        width: '70%',
        height: '100%',
    },
    input: {
        //borderWidth: 1,
        width: '100%',
        height: '100%',
        fontSize: 18,
        paddingLeft: 8,
    },
    rightIcons: {
        width: '23%',
        padding: 4,
    },
});

export default MessageInputBox;
