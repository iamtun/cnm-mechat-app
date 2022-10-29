import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput, Platform } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import RadioForm from "react-native-simple-radio-button";
import Header from "../../../components/Header";
import { ScrollView } from "react-native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateInfoUsers } from "../../../redux/slice/userInfoSlice";
import {  userInfoSelector } from "../../../redux/selector";
import { useEffect } from "react";
import { fetchUserByPhone } from "../../../redux/slice/userInfoSlice";

export default function InfoSelf({ route, navigation }) {
  const phoneNumber = route.params.phoneNumber;
  const userInfo = useSelector(userInfoSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserByPhone(phoneNumber));
  }, []);
  //use state
  const [selectedDate, setSelectedDate] = useState(userInfo.birthday);
  const [textName, setTextName] = useState(userInfo.fullName);
  const [textBio, setTextBio] = useState(userInfo.bio);
  const [chosenOption, setChosenOption] = useState(userInfo.gender);

  //selected
  const options = [
    { label: "Nam", value: "0" },
    { label: "Nữ", value: "1" },
  ];

  //update
  const data = {
    userID: userInfo._id,
    fullName: textName,
    gender: chosenOption,
    birthday: moment(selectedDate, ["YYYY/MM/DD"]),
    bio: textBio,
  };

  const _handleUpdateInfo = () => {
    dispatch(fetchUpdateInfoUsers(data));
  };

  return (
    <>
      <Header />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PersonalScreen", {
              isMe: true,
            })
          }
        >
          <Icon
            style={{ marginLeft: 10 }}
            name="arrow-back-outline"
            color="white"
            size={20}
          />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 15, marginLeft: 10 }}>
          Chỉnh sửa thông tin
        </Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.updateSelf}>
            <View style={styles.infoSelf}>
              <TextInput
                placeholder="Họ và tên"
                style={styles.input}
                value={textName}
                onChangeText={(value) => setTextName(value)}
              ></TextInput>

              <TextInput
                value={textBio}
                style={styles.input}
                placeholder="Sở thích"
                onChangeText={(value) => setTextBio(value)}
              ></TextInput>

              <View style={styles.input}>
                <View style={styles.inputDate}>
                  <Text>Ngày sinh:</Text>
                  <Text style={styles.date}>{selectedDate}</Text>
                </View>
                <DatePicker
                  mode="calendar"
                  selected={getFormatedDate(userInfo.birthday, "YYYY/MM/DD")}
                  selectorStartingYear={2000}
                  onSelectedChange={(date) => setSelectedDate(date)}
                  locale="vie"
                />
              </View>

              <View style={styles.input}>
                <RadioForm
                  radio_props={options}
                  initial={chosenOption}
                  onPress={(value) => {
                    setChosenOption(value);
                  }}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.buttonSave}
              onPress={_handleUpdateInfo}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#3475F5",
  },
  updateSelf: {
    width: "90%",
    margin: 16,
  },
  infoSelf: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    padding: 8,
    margin: 4,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputDate: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: "700",
  },
  buttonSave: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#33B0E0",
    height: 40,
  },
});
