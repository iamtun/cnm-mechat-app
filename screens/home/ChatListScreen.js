import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";

import {
  usersRemainingSelector,
  conversationsListSelector,
} from "../../redux/selector";
import SearchBar from "../../components/SearchBar";
import ChatItem from "../../components/ChatItem";
import Header from "../../components/Header";
import { fetchConversations } from "../../redux/slice/conversationSlice";
import { useIsFocused } from "@react-navigation/native";

function ChatListScreen({ navigation }) {
  const dispatch = useDispatch();
  const conversations = useSelector(conversationsListSelector);
  const isFocus = useIsFocused();
  // console.log(conversations, userInfo);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [isFocus]);

  return (
    <>
      <Header />
      <SearchBar navigation={navigation} />
      <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <ChatItem
            id={item.id}
            isGroup ={item.isGroup}
            name={item.name}
            image={item.imageLinkOfConver}
            members={item.members}
            message={item.content ? item.content : item.lastMessage}
            time={moment(item.time).fromNow()}
            navigation={navigation}
            key={item.id}
          />
        )}
      />
    </>
  );
}

export default ChatListScreen;
