import { View, Text, StyleSheet, FlatList } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { TouchableOpacity, Alert } from "react-native";
import { LogBox } from "react-native";
import Header from "../../components/Header";
import { removeItem } from "../../utils/asyncStorage";

function ProfileScreen({ navigation }) {
  LogBox.ignoreLogs(["EventEmitter.removeListener"]);

  const remove = async () => {
    await removeItem("user_token");
  };

  const logoutScreen = () => {
    remove();
    navigation.navigate("LoginScreen", {flag: true});
  };
  
  const settings = [
    {
      name: "Dashboard",
      icon: require("../../assets/dashboard.png"),
      key: "lCUTs2",
    },
    {
      name: "Display",
      icon: require("../../assets/display.png"),
      key: "TXdL0c",
    },
    {
      name: "Change Account",
      icon: require("../../assets/change.png"),
      key: "zqsiEw",
    },
    {
      name: "Logout",
      icon: require("../../assets/logout.png"),
      key: "iaT1Ex",
    },
  ];

  const showConfirmDialog = () => {
    Alert.alert("ĐĂNG XUẤT", "Bạn có muốn đăng xuất?", [
      {
        text: "Có",
        onPress: () => {
          logoutScreen();
        },
      },
      {
        text: "Không",
      },
    ]);
  };

  function getUserItem({ item: settings }) {
    return (
      <TouchableOpacity
        onPress={() => {
          if (settings.name == "Logout") {
            showConfirmDialog();
          }
        }}
      >
        <ListItem key={settings.key} bottomDivider>
          <Avatar rounded size={55} source={settings.icon} />
          <ListItem.Content>
            <ListItem.Title>{settings.name}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.info}>TRANG CÁ NHÂN</Text>
      </View>
      <View style={styles.viewSettings}>
        <View style={styles.topSetting} />
        <FlatList
          style={styles.setting}
          data={settings}
          keyExtractor={(settings) => settings.key}
          renderItem={getUserItem}
        />
      </View>
      <View style={styles.image}>
        <Avatar
          rounded
          size="large"
          source={require("../../assets/hinh-anh-conan.jpg")}
        />
        <Text style={styles.textName}>Võ Minh Phương</Text>
        <Text style={styles.textPhone}>+1234</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    backgroundColor: "#3475F5",
    height: 200,
  },
  info: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  image: {
    width: "80%",
    height: "18%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    position: "absolute",
    marginTop: 150,
    borderRadius: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 20,
  },
  textName: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  textPhone: {
    color: "#C2C2C2",
  },
  viewSettings: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
  },
  setting: {
    flex: 1,
  },
  topSetting: {
    flex: 0.1,
  },
});

export default ProfileScreen;
