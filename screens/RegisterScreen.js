import { View, Image, Text, KeyboardAvoidingView, Alert } from "react-native";
import { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { firebaseConfig } from "../utils/firebase";
import config from "../config";
import GlobalStyle from "../styles/GlobalStyle";
import LoginStyles from "../styles/LoginStyles";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import TextInputPrimary from "../components/Inputs/TextInputPrimary";
function RegisterScreen({ navigation }) {

  //ui ref
  const phoneNumberRegisterRef = useRef(null);
  const passRegisterRef = useRef(null);
  const userNameRegisterRef = useRef(null);
  const passRegisterRefAgain = useRef(null);

  //firebase
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  
  //function
  const senOTP = async () => {
    let _phoneNumber = "+84" + phoneNumberRegisterRef.current.slice(1);

    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        _phoneNumber,
        recaptchaVerifier.current
      );
      if (verificationId) {
        return verificationId;
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const getUserByPhoneNumber = async () => {
    return await fetch(
      `${config.LINK_API_V2}/users/get-user-by-phone/${phoneNumberRegisterRef.current}`
    )
      .then((res) => res.json())
      .then((resData) => {
        if (resData._id != null) {
          return true;
        }
        //return catch
        if (resData?.status == 500) return false;
      });
  };
  
  const _handleRegister = async () => {
    const userPhone = await getUserByPhoneNumber();
    console.log("userPhone", userPhone);
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (
      phoneNumberRegisterRef.current == null ||
      passRegisterRef.current == null ||
      userNameRegisterRef == null ||
      passRegisterRefAgain == null
    ) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin");
    } else if (phoneNumberRegisterRef.current.toString().length != 10) {
      Alert.alert("Vui lòng nhập số điện thoại là 10 số");
    } else if (vnf_regex.test(phoneNumberRegisterRef.current) == false) {
      Alert.alert("Số điện thoại của bạn không đúng định dạng");
    } else if (userPhone) {
      Alert.alert("Số điện thoại của bạn đã đăng ký tài khoản");
    } else if (passRegisterRef.current != passRegisterRefAgain.current) {
      Alert.alert("Vui lòng nhập lại đúng mật khẩu");
    } else {
      senOTP()
        .then((otp) => {
          setVerificationId(otp);
          navigation.navigate("AuthenticationScreen", {
            verificationId: otp,
            phoneNumber: phoneNumberRegisterRef.current,
            passWord: passRegisterRef.current,
            fullName: userNameRegisterRef.current,
            isForgetPass: false
          });
        })
        .catch((err) => {
          console.log("ERRR", err);
          return;
        });
    }
  };

  return (
    <View style={GlobalStyle.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        title="Xác thực"
        cancelLabel="Hủy"
      />
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
          keyboardType="number-pad"
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

        <ButtonPrimary
          title="Đăng ký"
          onPress={() => {
            _handleRegister();
          }}
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

export default RegisterScreen;
