import { TextInput } from "react-native";
import React from "react";

export default function TextInputPrimary(props) {
  return (
    <TextInput
      placeholder="Số điện thoại"
      style={props.style}
    ></TextInput>
  );
}
