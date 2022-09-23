import { View, Image, Text, KeyboardAvoidingView } from "react-native";
import { StyleSheet } from "react-native";
import GlobalStyle from "../styles/GlobalStyle";
import LoginStyles from "../styles/LoginStyles";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import TextInputPrimary from "../components/inputs/TextInputPrimary";

function LoginScreen({ navigation }) {
    const onMoveScreen = () => {
        navigation.navigate('AuthenticationScreen');
    };

    const clickRegister = () => {
        navigation.navigate('RegisterScreen');
    };

    return (
        <View style={GlobalStyle.container}>
            {/* logo */}
            <View style={LoginStyles.logo}>
                <Image style={LoginStyles.img} source={require('../assets/mechat-logo.png')} />

                <Text style={LoginStyles.title}>Đăng nhập</Text>
                <Text style={LoginStyles.subtitle}>Chào mừng bạn đến với MeChat</Text>
            </View>
            {/* Login */}
            <View style={LoginStyles.enterData}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={20}
                >
                    <TextInputPrimary placeholder="Số điện thoại" isPass={false} />
                    <TextInputPrimary placeholder="Mật khẩu" isPass={true} />
                </KeyboardAvoidingView>

                <View style={styles.newData}>
                    <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                    <Text style={styles.register} onPress={clickRegister}>
                        Đăng ký
                    </Text>
                </View>

                <ButtonPrimary title="Đăng nhập" onPress={onMoveScreen} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    newData: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    forgotPassword: {
        textDecorationLine: 'underline',
        marginRight: 16,
    },
    register: {
        color: '#1E99CA',
        marginRight: 8,
    },
});

export default LoginScreen;
