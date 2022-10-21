import { useState } from "react";
import { useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { friendListSelector, userInfoSelector } from "../../../redux/selector";
import {
  fetchHandleFriendsRequest,
  fetchLoadFriendsRequest,
} from "../../../redux/slice/friendSlice";

function NewFriendScreen({ navigation }) {
  const userInfo = useSelector(userInfoSelector);
  const { _id } = userInfo;
  let senderId;
  let idFriendRequest;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickSyncButton = () => {
    navigation.navigate("SyncPhoneBook");
  };
  // load all request make friends
  const getListFriendRequest = () => {
    dispatch(fetchLoadFriendsRequest(_id));
  };

  useEffect(() => {
    allFriendsRequest;
    getListFriendRequest();
  }, []);

  // get all request friends
  const allFriendsRequest = useSelector(friendListSelector);

  //handle request friends
  const _handleRequestFriend = (idRequest, idSender, isAccept) => {
    senderId = idSender;
    idFriendRequest = idRequest;
    const data = {
      idFriendRequest: idFriendRequest,
      status: isAccept,
      senderID: senderId,
      receiverID: _id,
    };
    dispatch(fetchHandleFriendsRequest(data));
  };

  function getNewFriends({ item: user }) {
    return (
      <>
        <TouchableOpacity
          style={styles.syncButton}
          onPress={handleClickSyncButton}
        >
          <Text style={styles.syncText}>Đồng bộ danh bạ</Text>
        </TouchableOpacity>
        <View styles={styles.container}>
          <ListItem key={user.senderId} bottomDivider>
            <Avatar rounded size={70} source={{ uri: user.imageLink }} />
            <ListItem.Content>
              <ListItem.Title>{user.fullName}</ListItem.Title>
              <ListItem.Subtitle>{user.content}</ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity
              style={styles.buttonRemove}
              onPress={() => {
                _handleRequestFriend(
                  user.idFriendRequest,
                  user.senderId,
                  false
                );
              }}
            >
              <Text>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => {
                _handleRequestFriend(user.idFriendRequest, user.senderId, true);
              }}
            >
              <Text style={{ color: "white" }}>Đồng ý</Text>
            </TouchableOpacity>
          </ListItem>
        </View>
      </>
    );
  }
  return (
    <View>
      <FlatList
        data={allFriendsRequest}
        keyExtractor={(user) => user.senderId.toString()}
        renderItem={getNewFriends}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  syncButton: {
    width: "100%",
    padding: 16,
  },
  syncText: {
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
  },
  buttonAdd: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#3475F5",
  },
  buttonRemove: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#33B0E0",
  },
});
export default NewFriendScreen;
