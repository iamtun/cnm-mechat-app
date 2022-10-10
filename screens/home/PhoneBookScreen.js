import { View, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { AlphabetList } from "react-native-section-alphabet-list";

import SearchBar from "../../components/SearchBar";
import Header from "../../components/Header";
import { getFriendsByUserSelector} from "../../redux/selector";


function PhoneBookScreen({ route }) {
  let friendInfo = [];

  const friends = useSelector(getFriendsByUserSelector);

  if (friends.length != 0) {
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
