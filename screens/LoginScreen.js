import { View, Image, Text, KeyboardAvoidingView } from 'react-native';

import ButtonPrimary from '../components/buttons/ButtonPrimary';
import GlobalStyle from '../styles/GlobalStyle';
import LoginStyles from '../styles/LoginStyles';
import TextInputPassword from '../components/buttons/TextInputPassword';
import TextInputPrimary from '../components/inputs/TextInputPrimary';

function LoginScreen({ navigation }) {
    const onMoveScreen = () => {
        navigation.navigate('AuthenticationScreen');
    };

    const clickResigter = () => {
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
            <View style={LoginStyles.input}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={20}
                >
                    <TextInputPrimary placeholder="Nhập số điện thoại" isPass={true}/>
                    <TextInputPassword style={[LoginStyles.inputData, LoginStyles.pass]} />
                </KeyboardAvoidingView>

                <View style={LoginStyles.output}>
                    <Text style={LoginStyles.forgotPass}>Quên mật khẩu?</Text>
                    <Text style={LoginStyles.register} onPress={clickResigter}>
                        Đăng ký
                    </Text>
                </View>

                <ButtonPrimary style={LoginStyles.btnLogin} title="Đăng nhập" onPress={onMoveScreen} />
            </View>
        </View>
    );
}

export default LoginScreen;
