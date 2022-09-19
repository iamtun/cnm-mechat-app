import { View, Image, Text, KeyboardAvoidingView } from "react-native";
import { StyleSheet } from "react-native";
import GlobalStyle from "../styles/GlobalStyle";
import LoginStyles from "../styles/LoginStyles";
<<<<<<< HEAD
import ButtonPrimary from "../components/buttons/ButtonPrimary";
=======
>>>>>>> a8601d49d91cd4c7cd3a5a9780ce2e4f058cd7a3
import TextInputPrimary from "../components/inputs/TextInputPrimary";

function LoginScreen({ navigation }) {
  const onMoveScreen = () => {
    navigation.navigate("AuthenticationScreen");
  };

  const clickRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  return (
    <View style={GlobalStyle.container}>
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={20}
        >
          <TextInputPrimary placeholder="Số điện thoại" isPass={false} />
          <TextInputPrimary placeholder="Mật khẩu" isPass={true} />
        </KeyboardAvoidingView>

        <View style={styles.newData}>
          <Text style={styles.fogotPassword}>Quên mật khẩu?</Text>
          <Text style={styles.register} onPress={clickRegister}>
            Đăng ký
          </Text>
        </View>

        <ButtonPrimary
          title="Đăng nhập"
          onPress={onMoveScreen}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newData: {
    width: 340,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  fogotPassword: {
    textDecorationLine: "underline",
    marginRight: 8,
  },
  register: {
    color: "#1E99CA",
  } 
})

export default LoginScreen;
