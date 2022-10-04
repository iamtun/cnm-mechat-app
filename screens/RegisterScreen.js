import { View, Image, Text, KeyboardAvoidingView, Alert } from "react-native";
import GlobalStyle from "../styles/GlobalStyle";
import LoginStyles from "../styles/LoginStyles";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import TextInputPrimary from "../components/Inputs/TextInputPrimary";
import { useRef } from "react";
import config from "../config";

function RegisterScreen({ navigation }) {
  // //ui ref
  const phoneNumberRegisterRef = useRef(null);
  const passRegisterRef = useRef(null);
  const userNameRegisterRef = useRef(null);
  const passRegisterRefAgain = useRef(null);

  //function
  const register = () => {
    return fetch(`${config.LINK_API}/users/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumberRegisterRef.current,
        passWord: passRegisterRef.current,
        fullName: userNameRegisterRef.current,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status == "success") {
          return resData._token;
        }
        //return catch
        if (resData?.error.statusCode === 403)
          throw new Error("Số điện thoại đã tồn tại");
        if (resData?.error.statusCode === 404)
          throw new Error("Số điện thoại sai định dạng");
      });
  };

  const _handleRegister = () => {
    if (
      phoneNumberRegisterRef.current == null ||
      passRegisterRef.current == null ||
      userNameRegisterRef == null ||
      passRegisterRefAgain == null
    ) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin");
    } else if (phoneNumberRegisterRef.current.toString().length != 10) {
      Alert.alert("Vui lòng nhập số điện thoại là 10 số");
    } else if (passRegisterRef.current != passRegisterRefAgain.current) {
      Alert.alert("Vui lòng nhập lại đúng mật khẩu");
    } else {
      register()
        .then((token) => {
          if (token != null) {
            Alert.alert("Bạn đã đăng kí thành công");
            navigation.navigate("LoginScreen");
          }
        })
        .catch((err) => {
          Alert.alert("Thông báo", err.message);
        });
    }
  };

  return (
    <View style={GlobalStyle.container}>
      {/* logo */}
      <View style={LoginStyles.logo}>
        <Image
          style={LoginStyles.img}
          source={require("../assets/mechat-logo.png")}
        />
        <Text style={LoginStyles.title}>Đăng ký</Text>
        <Text style={LoginStyles.subtitle}>Chào mừng bạn đến với MeChat</Text>
      </View>
      {/* Register */}
      <View style={LoginStyles.enterData}>
        <TextInputPrimary
          ref={phoneNumberRegisterRef}
          placeholder="Số điện thoại"
          isPass={false}
        />
        <TextInputPrimary
          ref={userNameRegisterRef}
          placeholder="Tên người dùng"
          isPass={false}
        />
        <TextInputPrimary
          ref={passRegisterRef}
          placeholder="Nhập mật khẩu"
          isPass={true}
        />
        <TextInputPrimary
          ref={passRegisterRefAgain}
          placeholder="Nhập lại mật khẩu"
          isPass={true}
        />

        <ButtonPrimary title="Đăng ký" onPress={_handleRegister} />
      </View>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20} />
      ) : (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-30} />
      )}
    </View>
  );
}

export default RegisterScreen;
