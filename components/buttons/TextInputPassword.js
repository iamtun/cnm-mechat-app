import { View,  TextInput } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function TextInputPassword(props) {
  return (
    <View style={props.style[0]}>
      <TextInput
        style={props.style[1]}
        secureTextEntry={true}
        placeholder="Nhập lại mật khẩu"
      ></TextInput>
      <Icon name="eye-outline" color="#000" size={20} />
    </View>
  );
}
