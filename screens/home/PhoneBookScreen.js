import { View, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlphabetList } from "react-native-section-alphabet-list";

import SearchBar from "../../components/SearchBar";
import Header from "../../components/Header";
import { friendListSelector, userInfoSelector } from "../../redux/selector";
import { fetchFriends } from "../../redux/slice/friendSlice";
import { useState } from "react";

function PhoneBookScreen({ route }) {
  let friendInfo = [];
  const userInfo = useSelector(userInfoSelector);

  const { _id } = userInfo;
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchFriends(_id));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const friends = useSelector(friendListSelector);

  if (friends.length != 0) {
    console.log(friends);
    for (let i = 0; i < friends.length; i++) {
      friendInfo.push({
        value: friends[i].fullName,
        avatar: friends[i].avatarLink,
        bio: friends[i].bio,
        key: friends[i]._id,
      });
    }
  }

  function getUserItem(item) {
    return (
      <View styles={{ flex: 1 }}>
        <ListItem key={item.key} bottomDivider>
          <Avatar rounded size="large" source={{uri: item.avatar}} />
          <ListItem.Content>
            <ListItem.Subtitle>{item.value}</ListItem.Subtitle>
            <ListItem.Subtitle>{item.bio}</ListItem.Subtitle>
          </ListItem.Content>
          <Icon
            style={{ marginRight: 20 }}
            name="call-outline"
            color="#000"
            size={20}
          />
          <Icon name="videocam-outline" color="#000" size={20} />
        </ListItem>
      </View>
    );
  }

  return (
    <>
      <Header />
      <SearchBar />
      <AlphabetList
        data={friendInfo}
        letterItemStyle={{ height: 90 }}
        renderCustomItem={(item) => getUserItem(item)}
        renderCustomSectionHeader={(section) => <Text>{section.title}</Text>}
      />
    </>
  );
}
export default PhoneBookScreen;
