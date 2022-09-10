import { View, Text } from 'react-native';
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import GlobalStyle from '../styles/GlobalStyle';

function LoginScreen({ navigation }) {
    const onMoveScreen = () => {
        navigation.navigate('AuthencationScreen');
    };

    return (
        <View style={GlobalStyle.container}>
            <Text>This is Login Screen</Text>
            <ButtonPrimary title="Login" onPress={onMoveScreen} />
        </View>
    );
}

export default LoginScreen;
