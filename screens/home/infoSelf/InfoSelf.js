import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import RadioForm from "react-native-simple-radio-button";

export default function InfoSelf({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [textDate, setTextDate] = useState("Ngày");
  const [textName, setTextName] = useState("Tên")
  const [textBio, setTextBio] = useState("Sở thích")
  const [chosenOption, setChosenOption] = useState("Nam");

  const options = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
  ];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
      setTextDate(fDate);
  };

  const showMode = (currentDate) => {
    setShow(true);
    setMode(currentDate);
  };

  return (
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
          Chỉnh sửa thông tin
        </Text>
      </View>
      <View style={styles.updateSelf}>
        <View style={styles.infoSelf}>
          <TextInput
            underlineColorAndroid={"#E1E2E3"}
            value={textName}
            style={styles.input}
            onChange = {(value) => setTextName(value)}
          ></TextInput>
           <TextInput
            underlineColorAndroid={"#E1E2E3"}
            value={textBio}
            style={styles.input}
            onChange = {(value) => setTextBio(value)}
          ></TextInput>
          <TouchableOpacity
            onPress={() => showMode("date")}
            style={{ width: "100%" }}
          >
            <TextInput
              value={textDate}
              editable={false}
              color="black"
              underlineColorAndroid={"#E1E2E3"}
              style={{ padding: 10}}
            />
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        {/* không được xóa để dành xài <Text> {chosenOption}</Text> */}
        <RadioForm
          style={{ marginTop: 10 }}
          radio_props={options}
          initial={0}
          onPress={(value) => {
            setChosenOption(value);
          }}
        />
        <TouchableOpacity style={styles.buttonSave}>
          <Text style={{ color: "white", fontSize: 16 }}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginTop: 25,
    width: "100%",
    height: 50,
    backgroundColor: "#3475F5",
  },
  updateSelf: {
    width: "70%",
  },
  infoSelf: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    padding: 10,
    width: "100%",
  },
  buttonSave: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#33B0E0",
    height: 45,
  },
});
