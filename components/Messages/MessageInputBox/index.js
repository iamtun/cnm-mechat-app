import { useRef, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MICon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector } from '../../../redux/selector';
import { sendFile, sendImageMessage, sendMessage } from '../../../redux/slice/messageSlice';

import { iconExtends } from '../../../utils/filePathConfig';
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
        if (message.trim()) {
            const data = {
                content: message,
                senderID: userInfo._id,
                conversationID: conversationId,
            };
            dispatch(sendMessage(data));
            setMessage('');
            setIsWrite(false);
        } else {
            //send white space
            setIsWrite(false);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            videoQuality: ImagePicker.UIImagePickerControllerQualityType.High,
            allowsEditing: false,
            //mutiple images in version expo 46+ works on web, android and ios 14+
            allowsMultipleSelection: true,
            selectionLimit: 5,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            result.selected.forEach((image) => {
                const fileMB = image.fileSize / 1024 / 1024;
                console.log(fileMB);
                //file small 5mb don't send
                if (fileMB < 5) {
                    const data = {
                        imageLink: image.uri,
                        senderID: userInfo._id,
                        conversationID: conversationId,
                    };
                    dispatch(sendImageMessage(data));
                }
            });
        }
    };

    const pickerFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: '*/*',
            copyToCacheDirectory: true,
        });
        if (result.type === 'success') {
            const { name, size, uri } = result;
            let nameParts = name.split('.');
            const fileType = nameParts[nameParts.length - 1];
            if (iconExtends.includes(fileType)) {
                const fileToUpload = {
                    name,
                    size,
                    uri,
                    type: 'application/' + fileType,
                };

                const message = {
                    senderID: userInfo._id,
                    conversationID: conversationId,
                    fileToUpload,
                };

                dispatch(sendFile(message));
            } else {
                Alert.alert('Thông báo', 'Bạn đang gửi file vui lòng không chọn ảnh hoặc video!');
            }
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
                        <MICon name="attach-file" size={32} style={styles.icon} onPress={pickerFile} />
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
