import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { AlphabetList } from 'react-native-section-alphabet-list';
import { Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { getConversationIdByIdFriendSelector, getFriendsByUserSelector } from '../../../redux/selector';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import friendListSlice from '../../../redux/slice/friendSlice';

function FriendScreen({ navigation }) {
    // data
    let friendInfo = [];
    const _conversation = useSelector(getConversationIdByIdFriendSelector);
    const friends = useSelector(getFriendsByUserSelector);
    const dispatch = useDispatch();

    if (friends) {
        if (friends.length != 0) {
            for (let i = 0; i < friends.length; i++) {
                friendInfo.push({
                    value: friends[i].fullName,
                    avatar: friends[i].avatarLink,
                    bio: friends[i].bio,
                    key: friends[i]._id,
                });
            }
        }
    }

    useEffect(() => {
        getUserItem;
        if (_conversation) {
            dispatch(friendListSlice.actions.clickSendChat(0));
            navigation.navigate('MessageScreen', {
                id: _conversation.id,
                name: _conversation.name,
                members: _conversation.members,
                image: _conversation.imageLinkOfConver,
            });
        }
    }, [_conversation]);

    const handleSendChat = (id) => {
        dispatch(friendListSlice.actions.clickSendChat(id));
    };

    function getUserItem(item) {
        return (
            <TouchableOpacity
                onPress={() => {
                    handleSendChat(item.key);
                }}
                styles={{ flex: 1 }}
            >
                <ListItem key={item.key} bottomDivider>
                    <Avatar rounded size={70} source={{ uri: item.avatar }} />
                    <ListItem.Content>
                        <ListItem.Subtitle>{item.value}</ListItem.Subtitle>
                        <ListItem.Subtitle>{item.bio}</ListItem.Subtitle>
                    </ListItem.Content>
                    <TouchableOpacity>
                        <Icon style={{ marginRight: 20 }} name="call-outline" color="#000" size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="videocam-outline" color="#000" size={25} />
                    </TouchableOpacity>
                </ListItem>
            </TouchableOpacity>
        );
    }

    return (
        <>
            <AlphabetList
                data={friendInfo}
                key={friendInfo.key+"#"}
                letterItemStyle={{ height: 90 }}
                renderCustomItem={(item) => getUserItem(item)}
                renderCustomSectionHeader={(section) => <Text>{section.title}</Text>}
            />
        </>
    );
}

export default FriendScreen;
