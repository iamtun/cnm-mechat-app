import {
  View,
  Image,
  TextInput,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GlobalStyle from "../styles/GlobalStyle";
import LoginStyles from "../styles/LoginStyles";

function LoginScreen({ navigation }) {
  const onMoveScreen = () => {
    navigation.navigate("AuthenticationScreen");
  };

  const clickResigter = () => {
    navigation.navigate("RegisterScreen");
  };
  return (
    <View style={GlobalStyle.container}>
      <View style={LoginStyles.logo}>
        <Image
          style={LoginStyles.img}
          source={require("../assets/mechat-logo.png")}
        />

        <Text style={LoginStyles.title}>Đăng nhập</Text>

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
              secureTextEntry={true}
              placeholder="Mật khẩu"
            ></TextInput>
            <Icon
            //   style={LoginStyles.iconShowPass}
              name="eye-outline"
              color="#000"
              size={20}
            />
          </View>
        </KeyboardAvoidingView>

        <View style={LoginStyles.output}>
          <Text style={LoginStyles.fogotPass}>Quên mật khẩu?</Text>
          <Text style={LoginStyles.register} onPress={clickResigter}>
            Đăng ký
          </Text>
        </View>

        <ButtonPrimary
          style={LoginStyles.btnLogin}
          title="Đăng nhập"
          onPress={onMoveScreen}
        />
      </View>
    </View>
  );
}

export default LoginScreen;
