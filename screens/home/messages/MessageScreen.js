import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { View, StyleSheet, Text } from "react-native";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import Header from "../../../components/Header";
import MessageInputBox from "../../../components/Messages/MessageInputBox";
import MessageItem from "../../../components/Messages/MessageItem";
import TopBar from "../../../components/Messages/TopBar/TopBar";
import { socket } from "../../../config";
import {
  getMessageByIdConversationSelector,
  messageLoadingSelector,
} from "../../../redux/selector";
import messageListSlice, {
  fetchMessagesById,
} from "../../../redux/slice/messageSlice";
import GlobalStyle from "../../../styles/GlobalStyle";

function MessageScreen({ route, navigation }) {
  const { id, name } = route.params;
  const dispatch = useDispatch();
  const isFocus = useIsFocused();

  const messages = useSelector(getMessageByIdConversationSelector);
  const isLoading = useSelector(messageLoadingSelector);

  useEffect(() => {
    if (!isFocus) {
      socket.emit("join_room", id);
    } else {
      dispatch(fetchMessagesById(id));
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
          {isLoading ? (
            <FlatList
              data={messages}
              renderItem={renderItem}
              initialNumToRender={20}
              inverted
              keyExtractor={(item, index) => item._id || index.toString()}
              contentContainerStyle={{ flexDirection: "column-reverse" }}
            />
          ) : (
            <View style={styles.isLoading}>
              <ActivityIndicator size="large" color={GlobalStyle.primaryColor} />
              <Text>Loading...</Text>
            </View>
          )}
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
  isLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageView: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
});

export default MessageScreen;
