import { View, Image,Text,KeyboardAvoidingView,TextInput } from "react-native";
import GlobalStyle from "../styles/GlobalStyle";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import LoginStyles from "../styles/LoginStyles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function RegisterScreen({ navigation }) {
  const registerScreen = () => {
    navigation.navigate("LoginScreen");
  };
  return (
    <View style={GlobalStyle.container}>
      <View style={LoginStyles.logo}>
        <Image
          style={LoginStyles.img}
          source={require("../assets/mechat-logo.png")}
        />

        <Text style={LoginStyles.title}>Đăng ký</Text>

        <Text style={LoginStyles.subtitle}>Chào mừng bạn đến với MeChat</Text>
      </View>
      <View style={LoginStyles.input}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={20}
        >
          <TextInput
            placeholder="Số điện thoại"
            style={LoginStyles.inputData}
          ></TextInput>

          <View style={LoginStyles.inputData}>
            <TextInput
              style={LoginStyles.pass}
              placeholder="Mật khẩu"
              secureTextEntry={true}
            ></TextInput>
            <FontAwesome
              style={LoginStyles.iconShowPass}
              name="eye"
              color="#000"
              size={20}
            />
          </View>
          <View style={[LoginStyles.inputData]}>
            <TextInput
              style={LoginStyles.pass}
              secureTextEntry={true}
              placeholder="Nhập lại mật khẩu"
            ></TextInput>
            <FontAwesome
              style={LoginStyles.iconShowPass}
              name="eye"
              color="#000"
              size={20}
            />
          </View>
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
