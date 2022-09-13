import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import GlobalStyle from "../styles/GlobalStyle";
import LoginStyles from "../styles/LoginStyles";
import TextInputPrimary from "../components/inputs/TextInputPrimary";

function RegisterScreen({ navigation }) {
  const registerScreen = () => {
    navigation.navigate("LoginScreen");
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
          <TextInputPrimary placeholder="Số điện thoại" isPass={false} />
          <TextInputPrimary placeholder="Nhập mật khẩu" isPass={true} />
          <TextInputPrimary placeholder="Nhập lại mật khẩu" isPass={true} />
        </KeyboardAvoidingView>

        <ButtonPrimary
          title="Đăng ký"
          onPress={registerScreen}
        />
      </View>
    </View>
  );
}

export default RegisterScreen;
