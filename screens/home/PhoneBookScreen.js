import { View, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { AlphabetList } from "react-native-section-alphabet-list";
import SearchBar from "../../components/searchBar";
import Header from '../../components/Header';

function PhoneBookScreen({ route }) {
  const user = [
    {
      value: "Juliano Gaspar",
      phone: "+1234567",
      avatar: require("../../assets/hinh-anh-conan.jpg"),
      key: "lCUTs2",
    },
    {
      value: "Amanda Cristina",
      phone: "+1234567",
      avatar: require("../../assets/hinh-anh-conan.jpg"),
      key: "TXdL0c",
    },
    {
      value: "Benato Silva",
      phone: "+1234567",
      avatar: require("../../assets/hinh-anh-conan.jpg"),
      key: "zqsiEw",
    },
    {
      value: "Luis Miguel Atari",
      phone: "+1234567",
      avatar: require("../../assets/hinh-anh-conan.jpg"),
      key: "iaT1Ex",
    },
    {
      value: "Gomes Salsicha",
      phone: "+1234567",
      avatar: require("../../assets/hinh-anh-conan.jpg"),
      key: "OvMd5e",
    },
    {
      value: "Cosinha Maria",
      phone: "+1234567",
      avatar: require("../../assets/hinh-anh-conan.jpg"),
      key: "25zqAO",
    },
    {
      value: "Rosinha Maria",
      phone: "+1234567",
      avatar: require("../../assets/hinh-anh-conan.jpg"),
      key: "8cWuu3",
    },
  ];

  function getUserItem(item) {
    return (
      <View styles={{ flex: 1 }}>
        <ListItem key={item.key} bottomDivider>
          <Avatar rounded size="large" source={item.avatar} />
          <ListItem.Content>
            <ListItem.Title>{item.value}</ListItem.Title>
            <ListItem.Subtitle>{item.phone}</ListItem.Subtitle>
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
        data={user}
        letterItemStyle={{ height: 90 }}
        renderCustomItem={(item) => getUserItem(item)}
        renderCustomSectionHeader={(section) => <Text>{section.title}</Text>}
      />
    </>
  );
}
export default PhoneBookScreen;
