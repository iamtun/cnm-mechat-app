import { View, Text } from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import ButtonPrimary from '../components/buttons/ButtonPrimary';

function AuthencationScreen({ navigation }) {
    const onMoveScreen = () => {
        navigation.navigate('HomeScreen');
    };

    return (
        <View style={GlobalStyle.container}>
            <Text>This is Authencation Screen</Text>
            <ButtonPrimary title="Authencation" onPress={onMoveScreen} />
        </View>
    );
}

export default AuthencationScreen;
