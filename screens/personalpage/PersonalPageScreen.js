import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { TouchableOpacity } from "react-native";

function PersonalPageScreen({ navigation }) {
  const isFriend = true;

  const goHomeScreen =() =>{
    navigation.navigate("HomeScreen")
  }

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image
          style={styles.backgroundImage}
          source={require("../../assets/anh-shinichi.jpg")}
        />
        <TouchableOpacity
          style={{ position: "absolute", marginLeft: 15, marginTop: 10 }}
          onPress={goHomeScreen}
        >
          <Icon name="arrow-back" color="#fff" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Image
          style={styles.avatar}
          source={require("../../assets/hinh-anh-conan.jpg")}
        />
        <Text style={styles.name}>Edogawa Conan</Text>
        <View style={styles.info}>
          <Text style={{fontWeight:"bold"}}>Thông tin cá nhân</Text>
          <View style={styles.infoDetail}>
            <Text style={{marginRight:20}}>Giới tính: Nam</Text>
            <Text>Ngày sinh: 01/01/2001</Text>
          </View>
          <Text>Sở thích: Đá bóng, code, xem hoạt hình khi ăn cơm</Text>
        </View>
        {!isFriend ? (<TouchableOpacity style={styles.buttonMakeFriend}>
          <Icon
            style={{ marginRight: 10 }}
            name="person-add-outline"
            color="#4ACFED"
            size={20}
          />
          <Text>Kết bạn</Text>
        </TouchableOpacity>) : null}
        
      </View>
      {isFriend ? (<TouchableOpacity style={styles.buttonChat} onPress={goHomeScreen}>
        <Icon
          style={{ marginRight: 10 }}
          name="ios-chatbubble-ellipses-outline"
          color="#4F8ADC"
          size={25}
        />
        <Text style={{ fontSize: 13 }}>Nhắn tin</Text>
      </TouchableOpacity>): null }
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    with: "100%",
    height: "55%",
    marginTop: 24,
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
    bottom: "10%",
  },
  name: {
    fontSize: 18,
    fontWeight:'bold',
    bottom: "9.5%",
  },
  info:{
    justifyContent:"center",
    alignItems:'center',
    bottom: "8%",
  },
  infoDetail:{
    padding:5,
    flexDirection:'row'
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
    bottom:"10%"
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
    top:"105%",
    left:"60%"
  },
});

export default PersonalPageScreen;
