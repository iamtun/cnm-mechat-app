import { View, Text } from 'react-native';
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import GlobalStyle from '../styles/GlobalStyle';

function LoginScreen({ navigation }) {
    const onMoveAuthenticationScreen = () => {
        navigation.navigate('AuthenticationScreen');
    };

    const onMoveRegisterScreen = () => {
        navigation.navigate('RegisterScreen');
    }

    return (
        <View style={GlobalStyle.container}>
            <Text>This is Login Screen</Text>
            <ButtonPrimary title="Login" onPress={onMoveAuthenticationScreen} />
            <ButtonPrimary title="Register" onPress={onMoveRegisterScreen} />
        </View>
    );
}

export default LoginScreen;
