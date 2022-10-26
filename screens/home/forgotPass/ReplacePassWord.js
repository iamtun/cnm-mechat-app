import { View, Image, Text, KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";

import GlobalStyle from "../../../styles/GlobalStyle";
import LoginStyles from "../../../styles/LoginStyles";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import TextInputPrimary from "../../../components/Inputs/TextInputPrimary";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchForgetPassword } from "../../../redux/slice/userInfoSlice";
import { Alert } from "react-native";

function ReplacePassWord({route, navigation}) {
  const dispatch = useDispatch();

  const phoneNumber = route.params.phoneNumber;

  const newPass = useRef(null);
  const newPassAgain = useRef(null);

  const _handleForgotPass = () =>{
    if (newPass.current != newPassAgain.current) {
      Alert.alert("Vui lòng nhập lại đúng mật khẩu");
    } else{
      const data = {phoneNumber: phoneNumber, newPassword: newPassAgain.current}
      dispatch(fetchForgetPassword(data))
      console.log("Mật khẩu đã được thay đổi");
      navigation.navigate("LoginScreen")
    }
  }
  return (
    <View style={GlobalStyle.container}>
      {/* logo */}
      <View style={LoginStyles.logo}>
        <Image
          style={LoginStyles.img}
          source={require("../../../assets/mechat-logo.png")}
        />
        <Text style={LoginStyles.title}>Khôi phục mật khẩu</Text>
        <Text style={LoginStyles.subtitle}>Tạo mật khẩu mới</Text>
      </View>
      {/* Register */}
      <View style={LoginStyles.enterData}>
        <TextInputPrimary
          ref={newPass}
          placeholder="Nhập mật khẩu mới"
          isPass={true}
        />
        <TextInputPrimary
          ref={newPassAgain}
          placeholder="Nhập lại mật khẩu"
          isPass={true}
        />

        <ButtonPrimary
          title="Xác nhận"
          onPress={_handleForgotPass}
        />
      </View>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20} />
      ) : (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-30} />
      )}
    </View>
  );
}

export default ReplacePassWord;
