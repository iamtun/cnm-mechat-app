import { View, Text } from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import ButtonPrimary from '../components/buttons/ButtonPrimary';

function RegisterScreen({ navigation }) {
    const onMoveScreen = () => {
        navigation.navigate('AuthencationScreen');
    };

    return (
        <View style={GlobalStyle.container}>
            <Text>This is Register Screen</Text>
            <ButtonPrimary title="Register" onPress={onMoveScreen} />
        </View>
    );
}

export default RegisterScreen;
