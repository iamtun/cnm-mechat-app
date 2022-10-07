import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { StyleSheet, Platform } from "react-native";
import { Alert } from "react-native";
import { useEffect, useRef, useState } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat/app";

import GlobalStyle from "../styles/GlobalStyle";
import LoginStyles from "../styles/LoginStyles";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import TextInputPrimary from "../components/Inputs/TextInputPrimary";
import config from "../config";
import { firebaseConfig } from "../utils/firebase";
import { fetchUserInfo } from "../redux/slice/userInfoSlice";
import { getItem, setItem } from "../utils/asyncStorage";
import { useIsFocused } from "@react-navigation/native";

function LoginScreen({ navigation }) {
  //ui ref
  const phoneNumberLoginRef = useRef(null);
  const passLoginRef = useRef(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  //firebase
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  const isFocused = useIsFocused();
  

  //actions
  useEffect(() => {
    getItem("user_token").then((token) => {
      if (token) {
        console.log("login");
        dispatch(fetchUserInfo(token));
        navigation.navigate("HomeScreen", { screen: "HomeScreen" });
      }
      setIsLoading(false);
    });
  }, [isFocused]);

  // function
  const senOTP = async () => {
    let _phoneNumber = "+84" + phoneNumberLoginRef.current.slice(1);

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

  const sign = () => {
    return fetch(`${config.LINK_API}/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumberLoginRef.current,
        passWord: passLoginRef.current,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status == "success") {
          return resData._token;
        }
        if (resData?.error.statusCode === 403)
          throw new Error("Mật khẩu của bạn không đúng!");
        if (resData?.error.statusCode === 402)
          throw new Error("Bạn chưa đăng ký tài khoản?");
      });
  };

  const clickRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  const _handleLogin = () => {
    if (phoneNumberLoginRef.current == null || passLoginRef.current == null) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      sign()
        .then((token) => {
          senOTP()
            .then((otp) => {
              setVerificationId(otp);
              navigation.navigate("AuthenticationScreen", {
                verificationId: otp,
                token: token,
              });
            })
            .catch((err) => {
              return;
            });
        })
        .catch((err) => {
          Alert.alert("Thông báo", err.message);
        });
    }
  };

  const _handleLoginTemp = () => {
    if (phoneNumberLoginRef.current == null || passLoginRef.current == null) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      setIsLoading(true);
      sign()
        .then((token) => {
          setItem("user_token", token);
          navigation.navigate("HomeScreen");
        })
        .catch((err) => {
          setIsLoading(false);
          Alert.alert("Thông báo", err.message);
        });
    }
  };

  return (
    <View style={GlobalStyle.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={GlobalStyle.primaryColor} />
      ) : (
        <>
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
              source={require("../assets/mechat-logo.png")}
            />
            <Text style={LoginStyles.title}>Đăng nhập</Text>
            <Text style={LoginStyles.subtitle}>
              Chào mừng bạn đến với MeChat
            </Text>
          </View>
          {/* Login */}
          <View style={LoginStyles.enterData}>
            <TextInputPrimary
              ref={phoneNumberLoginRef}
              placeholder="Nhập số điện thoại"
              keyboardType="number-pad"
            />
            <TextInputPrimary
              ref={passLoginRef}
              placeholder="Mật khẩu"
              isPass
            />
            <View style={styles.newData}>
              <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
              <Text style={styles.register} onPress={clickRegister}>
                Đăng ký
              </Text>
            </View>

            <ButtonPrimary title="Đăng nhập" onPress={_handleLoginTemp} />
          </View>
          {Platform.OS === "ios" ? (
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={40}
            />
          ) : (
            <KeyboardAvoidingView
              behavior="height"
              keyboardVerticalOffset={0}
            />
          )}
        </>
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
