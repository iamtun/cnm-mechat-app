import { View, Image, Text, KeyboardAvoidingView } from "react-native";
import { StyleSheet, Platform } from "react-native";
import GlobalStyle from "../styles/GlobalStyle";
import LoginStyles from "../styles/LoginStyles";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import TextInputPrimary from "../components/Inputs/TextInputPrimary";
import { useRef, useState } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../utils/firebase";
import firebase from "firebase/compat/app";

function LoginScreen({ navigation }) {
  //ui ref
  const phoneNumberLoginRef = useRef(null);
  const passLoginRef = useRef(null);

  //firebase
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState(null);

  const sendOTP = async () => {
    let _phoneNumber = "+84" + phoneNumberLoginRef.current.slice(1);

    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const verificationId = await phoneProvider.verifyPhoneNumber(
      _phoneNumber,
      recaptchaVerifier.current
    );

    if (verificationId) {
      setVerificationId(verificationId);
      navigation.navigate("AuthenticationScreen", {
        verificationId: verificationId,
      });
    }
  };

  const clickRegister = () => {
    navigation.navigate("RegisterScreen");
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
        <Text style={LoginStyles.title}>Đăng nhập</Text>
        <Text style={LoginStyles.subtitle}>Chào mừng bạn đến với MeChat</Text>
      </View>
      {/* Login */}
      <View style={LoginStyles.enterData}>
        <TextInputPrimary
          ref={phoneNumberLoginRef}
          placeholder="Nhập số điện thoại"
          keyboardType="number-pad"
        />
        <TextInputPrimary ref={passLoginRef} placeholder="Mật khẩu" isPass />
        <View style={styles.newData}>
          <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
          <Text style={styles.register} onPress={clickRegister}>
            Đăng ký
          </Text>
        </View>

        <ButtonPrimary title="Đăng nhập" onPress={sendOTP} />
      </View>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={60} />
      ) : (
        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={0} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  newData: {
    width: 340,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotPassword: {
    textDecorationLine: "underline",
    marginRight: 16,
  },
  register: {
    color: "#1E99CA",
    marginRight: 8,
  },
});

export default LoginScreen;
