import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversationIdByIdFriendSelector,
  searchItemClickSelector,
} from "../../../redux/selector";
import friendListSlice from "../../../redux/slice/friendSlice";

import moment from "moment";
import { useEffect } from "react";
moment().format();

function PersonalScreen({ route, navigation }) {
  const isMe = route.params.isMe;
  const infoSelf = route.params._userInfoSelector;

  let userInfo;
  if (isMe) {
    userInfo = infoSelf;
  } else {
    userInfo = useSelector(searchItemClickSelector);
  }

  const {
    _id,
    fullName,
    bio,
    gender,
    birthday,
    avatarLink,
    backgroundLink,
    isFriend,
  } = userInfo;

  const conversationId = useSelector(getConversationIdByIdFriendSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    //first run
    if (conversationId === 0) return;
    else
      navigation.navigate("MessageScreen", {
        id: conversationId,
        name: fullName,
      });
  }, [conversationId]);

  const handleSendChat = () => {
    dispatch(friendListSlice.actions.clickSendChat(_id));
  };

  const _handleUpdateInfo = () => {
    navigation.navigate("InfoSelf")
  }

  return (
    <View>
      <View style={styles.background}>
        <Image
          style={styles.backgroundImage}
          source={{ uri: backgroundLink }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Image style={styles.avatar} source={{ uri: avatarLink }} />
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.bio}>{bio}</Text>
        <View style={styles.info}>
          <Text style={styles.title}>Thông tin cá nhân</Text>
          <View style={styles.infoDetail}>
            <Text>Giới tính: {gender === 0 ? "Nam" : "Nữ"}</Text>
            <Text>Ngày sinh: {moment(birthday).format("DD/MM/YYYY")}</Text>
          </View>
        </View>
        {!isMe ? (
          !isFriend ? (
            <TouchableOpacity style={styles.buttonMakeFriend}>
              <Icon
                style={{ marginRight: 10 }}
                name="person-add-outline"
                color="#4ACFED"
                size={20}
              />
              <Text>Kết bạn</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonChat}
              onPress={handleSendChat}
            >
              <Icon
                style={{ marginRight: 10 }}
                name="ios-chatbubble-ellipses-outline"
                color="#4F8ADC"
                size={25}
              />
              <Text style={{ fontSize: 13 }}>Nhắn tin</Text>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity style={styles.editInfo} onPress = {_handleUpdateInfo}>
            <Icon
              style={{ marginRight: 10 }}
              name="md-pencil"
              color="white"
              size={20}
            />
            <Text style={{ color: "white" }}>Cập nhật thông tin</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    with: "100%",
    height: "55%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  bottomContainer: {
    position: "absolute",
    marginTop: "65%",
    height: "190%",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 2,
    bottom: "8%",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    bottom: "8%",
  },
  bio: {
    bottom: "7%",
  },
  info: {
    justifyContent: "flex-start",
    alignItems: "center",
    bottom: "4%",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  infoDetail: {
    margin: 8,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonMakeFriend: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 50,
    borderRadius: 15,
    borderColor: "#1E99CA",
    borderWidth: 2,
  },
  editInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: "70%",
    backgroundColor: "#3475F5",
    height: 50,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonChat: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 40,
    borderRadius: 13,
    backgroundColor: "white",
    borderColor: "#1E99CA",
    shadowColor: "#000",
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 20,
    top: "110%",
    marginStart: "70%",
  },
});

export default PersonalScreen;
