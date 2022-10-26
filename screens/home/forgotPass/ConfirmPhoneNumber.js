import { View, Image, Text, KeyboardAvoidingView } from "react-native";
import { StyleSheet, Platform } from "react-native";
import { Alert } from "react-native";
import { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import Icon from "react-native-vector-icons/Ionicons";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { firebaseConfig } from "../../../utils/firebase";
import config from "../../../config";
import GlobalStyle from "../../../styles/GlobalStyle";
import LoginStyles from "../../../styles/LoginStyles";
import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import TextInputPrimary from "../../../components/Inputs/TextInputPrimary";
import { TouchableOpacity } from "react-native";

function ConfirmPhoneNumber({ navigation }) {
  const phoneNumberForgotRef = useRef(null);
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState(null);

  const senOTP = async () => {
    let _phoneNumber = "+84" + phoneNumberForgotRef.current.slice(1);

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
      `${config.LINK_API_V2}/users/get-user-by-phone/${phoneNumberForgotRef.current}`
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

  const _handleForgotPass  = async() => {
    const userPhone = await getUserByPhoneNumber();
    if(userPhone){
      senOTP()
        .then((otp) => {
          setVerificationId(otp);
          navigation.navigate("AuthenticationScreen", {
            verificationId: otp,
            phoneNumber: phoneNumberForgotRef.current,
            isForgetPass: true
          });
        })
        .catch((err) => {
          console.log("ERRR", err);
          return;
        });
    } else{
      Alert.alert("Số điện thoại của bạn chưa đăng kí tài khoản")
    }
  }

  return (
    <View style={GlobalStyle.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        title="Xác thực"
        cancelLabel="Hủy"
      />
      {/*  logo  */}
      <View style={LoginStyles.logo}>
        <Image
          style={LoginStyles.img}
          source={require("../../../assets/mechat-logo.png")}
        />
        <Text style={LoginStyles.title}>Khôi phục mật khẩu</Text>
        <Text style={LoginStyles.subtitle}>
          Nhập số điện thoại để nhận mã xác thực
        </Text>
      </View>
      {/* Login */}
      <View style={LoginStyles.enterData}>
        <TextInputPrimary
          ref={phoneNumberForgotRef}
          placeholder="Số điện thoại"
          keyboardType="number-pad"
        />
        <ButtonPrimary title="Tiếp tục" onPress ={_handleForgotPass}/>
      </View>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon
          style={{ marginRight: 8 }}
          name="chevron-back-circle-outline"
          color="#4D6DEF"
          size={23}
        />
        <Text style={{ fontSize: 16 }}>Quay lại</Text>
      </TouchableOpacity>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40} />
      ) : (
        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={0} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  goBack: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginTop: 10,
  },
});
export default ConfirmPhoneNumber;
