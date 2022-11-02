import { ListItem, Avatar } from 'react-native-elements';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useEffect } from 'react';

import {
    conversationsListSelector,
    getConversationIdByIdGroupConversation,
    userInfoSelector,
} from '../../../redux/selector';
import { fetchConversations } from '../../../redux/slice/conversationSlice';
import conversationsListByUserId from '../../../redux/slice/conversationSlice';
import { useState } from 'react';

function GroupChatScreen({ navigation }) {
    let listGroupChat = [];
    const _userInfoSelector = useSelector(userInfoSelector);
    const dispatch = useDispatch();
    const conversation = useSelector(getConversationIdByIdGroupConversation);
    const [idClick, setIdClick] = useState(null);
    let idGroup = null;

    useEffect(() => {
        dispatch(fetchConversations(_userInfoSelector._id));
    }, []);

    const groupChat = useSelector(conversationsListSelector);

    for (let group of groupChat) {
        if (group.isGroup) {
            listGroupChat.push({
                id: group.id,
                name: group.name,
                members: group.members,
                imageLinkOfConver: group.imageLinkOfConver,
                content: group.content,
                imageLinkOfLastMessage: group.imageLinkOfLastMessage,
                time: group.time,
            });
        }
    }
    useEffect(() => {
        if(idGroup !== null){
            dispatch(conversationsListByUserId.actions.clickGroupChat(idGroup));
        }
    },[idGroup])

    const handleSendChat = () => {
        if (idGroup !== null) {
            
            // navigation.navigate('MessageScreen', {
            //     id: conversation.id,
            //     name: conversation.name,
            //     members: conversation.members,
            //     image: conversation.imageLinkOfConver,
            // });
        }
    };

    function getGroupItem({ item: group }) {
        return (
            <TouchableOpacity
                onPress={() => {
                    idGroup = group.id
                    handleSendChat();
                }}
                styles={{ flex: 1 }}
            >
                <ListItem key={group.id} bottomDivider>
                    <Avatar rounded size={70} source={{ uri: group.imageLinkOfConver }} />
                    <ListItem.Content>
                        <ListItem.Title>{group.name}</ListItem.Title>
                        <ListItem.Subtitle>{group.content}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Text style={{ bottom: '7%' }}>{moment(group.time).fromNow()}</Text>
                </ListItem>
            </TouchableOpacity>
        );
    }

    return (
        <View>
            <FlatList data={listGroupChat} keyExtractor={(group) => group.id.toString()} renderItem={getGroupItem} />
        </View>
    );
}

export default GroupChatScreen;
