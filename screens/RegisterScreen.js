import { View, Image, Text, KeyboardAvoidingView, Alert } from "react-native";
import GlobalStyle from "../styles/GlobalStyle";
import LoginStyles from "../styles/LoginStyles";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import TextInputPrimary from "../components/Inputs/TextInputPrimary";
import { useRef } from "react";

function RegisterScreen({ navigation }) {
  // //ui ref
  const phoneNumberRegisterRef = useRef(null);
  const passRegisterRef = useRef(null);
  const userNameRegisterRef = useRef(null);
  const passRegisterRefAgain = useRef(null);

  const register = () => {
    return fetch("https://me-chat.cyclic.app/api/v1/users/signup", {
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
        throw new Error(resData.error.statusCode);
      });
  };

  const _handleRegister = () => {
    if (passRegisterRef.current != passRegisterRefAgain.current) {
      Alert.alert("Bạn đã đăng kí không thành công");
    } else {
      register()
        .then((token) => {
          if (token != null) {
            Alert.alert("Bạn đã đăng kí thành công");
            navigation.navigate("LoginScreen");
          }
        })
        .catch((err) => {
          if (err == "Error: 403") {
            Alert.alert("Số điện thoại đã tồn tại");
          }
          if (err == "Error: 404") {
            Alert.alert("Số điện thoại sai định dạng");
          }
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={20}
        >
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
        </KeyboardAvoidingView>

        <ButtonPrimary title="Đăng ký" onPress={_handleRegister} />
      </View>
    </View>
  );
}

export default RegisterScreen;
