import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput, Platform } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import RadioForm from "react-native-simple-radio-button";
import Header from "../../../components/Header";

export default function InfoSelf({ navigation }) {
  const [selectedDate, setSelectedDate] = useState("2022/10/18");
  const [textName, setTextName] = useState(null);
  const [textBio, setTextBio] = useState(null);
  const [chosenOption, setChosenOption] = useState("Nam");

  const options = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
  ];

  //console.log(selectedDate);

  return (
    <>
      <Header />
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
              value={textName}
              placeholder="Họ và tên"
              style={styles.input}
              onChange={(value) => setTextName(value)}
            ></TextInput>

            <TextInput
              value={textBio}
              style={styles.input}
              placeholder="Sở thích"
              onChange={(value) => setTextBio(value)}
            ></TextInput>

            <View style={styles.input}>
              <View style={styles.inputDate}>
                <Text>Ngày sinh:</Text>
                <Text style={styles.date}>{selectedDate}</Text>
              </View>
              <DatePicker
                mode="calendar"
                selected={getFormatedDate(new Date(), "YYYY/MM/DD")}
                selectorStartingYear={2000}
                onSelectedChange={(date) => setSelectedDate(date)}
                locale="vie"
              />
            </View>

            {/* không được xóa để dành xài <Text> {chosenOption}</Text> */}
            <View style={styles.input}>
              <RadioForm
                radio_props={options}
                initial={0}
                onPress={(value) => {
                  setChosenOption(value);
                }}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.buttonSave}>
            <Text style={{ color: "white", fontSize: 16 }}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
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
