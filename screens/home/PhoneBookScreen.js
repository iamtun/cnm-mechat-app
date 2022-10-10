import { Text, View, FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlphabetList } from "react-native-section-alphabet-list";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SearchBar from "../../components/SearchBar";
import Header from "../../components/Header";
import { friendListSelector, userInfoSelector } from "../../redux/selector";
import { fetchFriends } from "../../redux/slice/friendSlice";

// Screen PhoneBook
function PhoneBook() {
  // data
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
          <Avatar rounded size="large" source={{ uri: item.avatar }} />
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
      <AlphabetList
        data={friendInfo}
        letterItemStyle={{ height: 90 }}
        renderCustomItem={(item) => getUserItem(item)}
        renderCustomSectionHeader={(section) => <Text>{section.title}</Text>}
      />
    </>
  );
}

// Screen Group Chat
function GroupChat() {
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

  function getGroupItem({ item: user }) {
    return (
      <View styles={{ flex: 1 }}>
        <ListItem key={user.id} bottomDivider>
          <Avatar rounded size="large" source={{ uri: user.avatarUrl }} />
          <ListItem.Content>
            <ListItem.Title>{user.name}</ListItem.Title>
            <ListItem.Subtitle>{user.lastMessage}</ListItem.Subtitle>
          </ListItem.Content>
          <Text style ={{bottom: "7%"}}>Time</Text>
        </ListItem>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(user) => user.id.toString()}
        renderItem={getGroupItem}
      />
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function PhoneBookScreen() {
  return (
    <>
      <Header />
      <SearchBar />
      <Tab.Navigator>
        <Tab.Screen
          name="PhoneBook"
          component={PhoneBook}
          options={{ tabBarLabel: "Bạn bè" }}
        />

        <Tab.Screen
          name="GroupChat"
          component={GroupChat}
          options={{ tabBarLabel: "Nhóm" }}
        />
      </Tab.Navigator>
    </>
  );
}

export default PhoneBookScreen;
