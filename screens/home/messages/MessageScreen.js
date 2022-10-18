import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { View, StyleSheet } from "react-native";
import Header from "../../../components/Header";
import MessageInputBox from "../../../components/Messages/MessageInputBox";
import MessageItem from "../../../components/Messages/MessageItem";
import TopBar from "../../../components/Messages/TopBar/TopBar";

import { useDispatch, useSelector } from "react-redux";
import {
  conversationsListSelector,
  getMessageByIdConversationSelector,
  messageListSelector,
  userInfoSelector,
} from "../../../redux/selector";
import { useEffect } from "react";
import messageListSlice, {
  fetchMessagesById,
} from "../../../redux/slice/messageSlice";
import { socket } from "../../../config";
import { useIsFocused } from "@react-navigation/native";
function MessageScreen({ route, navigation }) {
  const { id, name } = route.params;
  const dispatch = useDispatch();
  const isFocus = useIsFocused();

  const messages = useSelector(getMessageByIdConversationSelector);
  const conversations = useSelector(conversationsListSelector);
  const myConversation = conversations.filter(
    (conversation) => conversation.id === id
  );
  const userInfo = useSelector(userInfoSelector);
  const receiverId = myConversation[0].members.find(
    (member) => member !== userInfo._id
  );

  //Chưa nhận được dữ liệu từ socket
  useEffect(() => {
    socket.emit("join_room", id);
  });

  useEffect(() => {
    if (!isFocus) return;
    else {
      dispatch(fetchMessagesById(id));
      dispatch(messageListSlice.actions.setReceiverId(receiverId));
    }
    socket.on("receiver_message", (message) => {
      dispatch(messageListSlice.actions.addMessageFromSocket(message));
    });
  }, [isFocus]);

  const renderItem = ({ item }) => <MessageItem message={item} />;

  return (
    <>
      <Header />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 10}
      >
        <View style={styles.body}>
          <TopBar name={name} navigation={navigation} />
          <FlatList
            data={messages}
            renderItem={renderItem}
            initialNumToRender={20}
            inverted
            keyExtractor={(item, index) => item._id || index.toString()}
            contentContainerStyle={{ flexDirection: "column-reverse" }}
          />
        </View>
        <MessageInputBox conversationId={id} />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: "90%",
    backgroundColor: "#ccc",
  },
  messageView: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
});

export default MessageScreen;
