import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import SearchBar from "../../components/searchBar/SearchBar";
import Icon from "react-native-vector-icons/Ionicons";

function PhoneBookScreen({ navigation }) {
  const onMoveScreen = () => {
    navigation.navigate("");
  };

  return (
    <>
      <SearchBar />
        <ScrollView>
          <View style={styles.user}>
            <Avatar
              rounded
              size={60}
              source={require("../../assets/hinh-anh-conan.jpg")}
            ></Avatar>
            <View style={styles.infoUser}>
              <Text style={styles.nameUser}>Minh Phuong</Text>
              <Text style={styles.phoneUser}>+123456</Text>
            </View>
            <View style={styles.call}>
              <Icon
                style={{ marginRight: 20 }}
                name="call-outline"
                color="#000"
                size={20}
              />
              <Icon name="videocam-outline" color="#000" size={20} />
            </View>
          </View>
        </ScrollView>
        <ScrollView>
          <View>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
            <Text>A</Text>
          </View>
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  user: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20,
  },
  infoUser: {
    width: "50%",
    margin: 5,
    marginLeft: 30,
  },
  nameUser: {
    fontWeight: "bold",
    fontSize: 18,
  },
  phoneUser: {
    paddingTop: 5,
  },
  call: {
    flexDirection: "row",
  },
});
export default PhoneBookScreen;
