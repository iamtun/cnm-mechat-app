import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import GlobalStyle from "../styles/GlobalStyle";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import LoginStyles from "../styles/LoginStyles";
import TextInputPassword from "../components/buttons/TextInputPassword";
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
      <View style={LoginStyles.input}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={20}
        >
          <TextInputPrimary placeholder="Nhập số điện thoại"/>

          <TextInputPassword
            style={[LoginStyles.inputData, LoginStyles.pass]}
          />
          
          <TextInputPassword
            style={[LoginStyles.inputData, LoginStyles.pass]}
          />
        </KeyboardAvoidingView>

        <ButtonPrimary
          style={LoginStyles.btnLogin}
          title="Đăng ký"
          onPress={registerScreen}
        />
      </View>
    </View>
  );
}

export default RegisterScreen;
