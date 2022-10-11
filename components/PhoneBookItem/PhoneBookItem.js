import { Text, View, FlatList } from "react-native";
import { AlphabetList } from "react-native-section-alphabet-list";
import Icon from "react-native-vector-icons/Ionicons";
import { ListItem, Avatar } from "react-native-elements";
import React from "react";

function PhoneBookItem({ item: user }) {
  return (
    <View styles={{ flex: 1 }}>
      <ListItem key={user.id} bottomDivider>
        <Avatar rounded size={70} source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.lastMessage}</ListItem.Subtitle>
        </ListItem.Content>
        <Text style={{ bottom: "7%" }}>Time</Text>
      </ListItem>
    </View>
  );
}

export default PhoneBookItem;
