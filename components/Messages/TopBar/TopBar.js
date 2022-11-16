import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { conversationBlockBySelector, friendOnlineSelector, userInfoSelector } from '../../../redux/selector';
import { fetchConversations } from '../../../redux/slice/conversationSlice';

function TopBar({ idConversation, isGroup, members, createdBy, image, name, memberGroup, navigation }) {
    const friendOnline = useSelector(friendOnlineSelector);

    const handleClickArrowLeftIcon = () => {
        navigation.navigate('HomeScreen');
    };

    const _sendCallVoice = () => {
        navigation.navigate('SendCallVoice');
    };

    const _receiveCallVoice = () => {
        navigation.navigate('ReceiveCallVoice');
    };
    return (
        <View style={[styles.topBar, styles.row]}>
            <View style={[styles.leftBar]}>
                <Icon
                    name="arrow-back-outline"
                    color="white"
                    size={20}
                    onPress={handleClickArrowLeftIcon}
                />
                <View style={styles.group}>
                    <Text style={styles.nameText}>{name}</Text>
                    {memberGroup && <Text style={{ color: '#fff' }}>{`${memberGroup} người`}</Text>}
                </View>
            </View>
            <View style={[styles.rightBar, styles.row]}>
                {memberGroup ? (
                    <>
                        <Icon name="video-outline" size={24} style={styles.icon} />
                        <Icon name="magnify" size={24} style={styles.icon} />
                    </>
                ) : (
                    <>
                        <TouchableOpacity onPress={_sendCallVoice}>
                            <Icon name="call-outline" size={24} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={_receiveCallVoice}
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Icon name="videocam-outline" size={24} style={styles.icon} />
                            {!isGroup && friendOnline.includes(members[0]) && friendOnline.includes(members[1]) && (
                                <Icon name="ellipse" size={12} color="#38A3A5" />
                            )}
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('DetailChat', {
                            idConversation,
                            createdBy,
                            isGroup: isGroup,
                            members: members,
                            name: name,
                            image: image,
                        })
                    }
                >
                    <Icon name="list-outline" size={24} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        width: '100%',
        height: 60,
        backgroundColor: '#3777F3',
    },
    leftBar: {
        width: '50%',
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    group: {
        marginLeft: 8,
    },
    nameText: {
        fontSize: 16,
        color: '#fff',
    },
    rightBar: {
        width: '40%',
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        fontWeight: '500',
        color: '#fff',
    },
});
export default TopBar;
