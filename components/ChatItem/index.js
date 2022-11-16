import { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { useDispatch } from 'react-redux';
import conversationsSlice from '../../redux/slice/conversationSlice';
import MenuItem from '../SearchBar/Menu/MenuItem';

function ChatItem({ id, blockBy, createdBy, isGroup, members, name, image, message, time, navigation }) {
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            style={styles.body}
            onPress={() => {
                dispatch(conversationsSlice.actions.clickGroupChat(id));
                dispatch(conversationsSlice.actions.getBlockBy(blockBy));
                navigation.navigate('MessageScreen', { id, blockBy, createdBy, isGroup, members, name, image });
            }}
            onLongPress={() => setIsVisible(true)}
        >
            <View style={styles.left}>
                <View style={styles.imageView}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                        <Image source={require('../../assets/no-avatar.png')} style={styles.image} />
                    )}
                </View>
                <Tooltip
                    isVisible={isVisible}
                    content={<MenuItem icon="delete-forever" title="Xóa" color="red" />}
                    placement={'bottom'}
                    onClose={() => setIsVisible(false)}
                    contentStyle={{ width: 100 }}
                    showChildInTooltip={false} //No duplicate item
                    {...(Platform.OS === 'ios'
                        ? { tooltipStyle: { marginLeft: 17, marginTop: 10 } }
                        : { tooltipStyle: { marginLeft: 17, marginTop: -40 } })}
                >
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.messageText}>
                        {message?.length > 20 ? message.slice(0, 20) + '...' : message}
                    </Text>
                </Tooltip>
            </View>
            <View>
                {/* Thời gian được tính theo thời gian gửi tin nhắn cuối cùng */}
                <Text>{time}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imageView: {
        paddingRight: 16,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
    },
    messageText: {
        fontSize: 14,
    },
});
export default ChatItem;
