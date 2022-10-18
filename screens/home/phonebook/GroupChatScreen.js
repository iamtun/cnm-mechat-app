import { ListItem, Avatar } from "react-native-elements";
import { Text, View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useEffect } from "react";

import {
  conversationsListSelector,
  userInfoSelector,
} from "../../../redux/selector";
import { fetchConversations } from "../../../redux/slice/conversationSlice";
function GroupChatScreen() {
  const data = [
    {
      id: 1,
      name: "CNM_2022",
      lastMessage: "Ok nè",
      avatarUrl:
        "https://cdn.pixabay.com/photo/2019/05/27/19/08/puppy-4233378_960_720.jpg",
    },
    {
      id: 2,
      name: "PT JAVA",
      lastMessage: "Ok nè",
      avatarUrl:
        "https://cdn.pixabay.com/photo/2015/05/05/08/36/pets-753464_960_720.jpg",
    },
    {
      id: 3,
      name: "TTDT",
      lastMessage: "Ok nè",
      avatarUrl:
        "https://cdn.pixabay.com/photo/2019/07/03/10/16/pug-4314106_960_720.jpg",
    },
  ];

  let listGroupChat = [];
  const _userInfoSelector = useSelector(userInfoSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConversations(_userInfoSelector._id));
  }, []);

  const groupChat = useSelector(conversationsListSelector);

  for (let group of groupChat) {
    if (group.members.length > 2) {
      listGroupChat.push({
        id : group.id,
        name: group.name,
        members: group.members,
        imageLinkOfConver: group.imageLinkOfConver,
        content: group.content,
        imageLinkOfLastMessage: group.imageLinkOfLastMessage,
        time: group.time
      })
    }
  }

  function getGroupItem({ item: group }) {
    return (
      <View styles={{ flex: 1 }}>
        <ListItem key={group.id} bottomDivider>
          <Avatar rounded size={70} source={{ uri: group.imageLinkOfConver }} />
          <ListItem.Content>
            <ListItem.Title>{group.name}</ListItem.Title>
            <ListItem.Subtitle>{group.content}</ListItem.Subtitle>
          </ListItem.Content>
          <Text style={{ bottom: "7%" }}>{moment(group.time).fromNow()}</Text>
        </ListItem>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={listGroupChat}
        keyExtractor={(group) => group.id.toString()}
        renderItem={getGroupItem}
      />
    </View>
  );
}

export default GroupChatScreen;
