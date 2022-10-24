import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DetailFeature from "../../../components/DetailFeature/DetailFeature";
import Header from "../../../components/Header";

export default function DetailChat({navigation}) {
  return (
    <>
    <Header/>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            style={{ marginLeft: 10 }}
            name="arrow-back-outline"
            color="white"
            size={20}
          />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 15, marginLeft: 10 }}>
          Tùy chọn
        </Text>
      </View>
      <View style={styles.infoUser}>
        <View style={styles.avatar}>
          <Avatar
            rounded
            size={90}
            source={require("../../../assets/anh-shinichi.jpg")}
          ></Avatar>
          <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "bold" }}>
            Tên
          </Text>
        </View>
        <View style={styles.feature}>
          <DetailFeature
            nameIcon="search-outline"
            nameFeature="Tìm tin nhắn"
          ></DetailFeature>
          <DetailFeature
            nameIcon="person-outline"
            nameFeature="Trang cá nhân"
          ></DetailFeature>
          <DetailFeature
            nameIcon="brush-outline"
            nameFeature="Đổi hình nền"
          ></DetailFeature>
          <DetailFeature
            nameIcon="notifications-outline"
            nameFeature="Tắt thông báo"
          ></DetailFeature>
        </View>
      </View>
      <TouchableOpacity style={styles.photo}>
        <Icon name="images-outline" color="black" size={20}></Icon>
        <Text style ={{marginLeft:10}}>Ảnh,file,link đã gửi</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1E2E3",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#3475F5",
  },
  infoUser: {
    backgroundColor: "white"
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 150,
    marginTop: 10,
  },
  feature: {
    flexDirection: "row",
    justifyContent: "center",
  },
  photo: {
    flexDirection:'row',
    alignItems:'center',
    backgroundColor: "white",
    width: "100%",
    height: 60,
    marginTop: 10,
    padding: 10,
  },
});
