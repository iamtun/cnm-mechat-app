import { TouchableWithoutFeedback } from "react-native";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import userInfoSlice from "../../redux/slice/userInfoSlice";

function SearchItem({
  id,
  image,
  name,
  phonNumber,
  isFriend,
  isNull,
  navigation,
  onPress,
  isRequest,
}) {
  const dispatch = useDispatch();

  const handleClickSearchItem = () => {
    dispatch(userInfoSlice.actions.clickSearchItem(id));
    navigation.navigate("PersonalScreen", { isMe: false });
  };
  return (
    <View style={[styles.container, isNull ? styles.noSearchText : null]}>
      {isNull ? (
        <Text> Không tìm thấy</Text>
      ) : (
        <>
          <TouchableOpacity
            style={styles.body}
            onPress={isNull ? null : handleClickSearchItem}
          >
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{name}</Text>
              {isFriend ? null : (
                <Text style={styles.phonNumber}>{phonNumber}</Text>
              )}
            </View>
          </TouchableOpacity>

          <View>
            {isFriend ? (
              <TouchableOpacity>
                <Icon name="ios-call-outline" size={24} style={styles.icon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={onPress} style={styles.buttonAdd}>
                <Icon
                  color="#3777F3"
                  name={isRequest ? "close" : "person-add-outline"}
                  size={20}
                />
                <Text style={{ marginLeft: 5, color: "#59AFC4" }}>
                  {isRequest ? "Hủy" : "Kết bạn"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  body: {
    width: "75%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginHorizontal: 8,
  },
  info: {
    marginLeft: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    color: "#3777F3",
    marginRight: 24,
  },
  noSearchText: {
    justifyContent: "center",
  },
  buttonAdd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 35,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#33B0E0",
    marginRight: 8,
  },
});

export default SearchItem;
