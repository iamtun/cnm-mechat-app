import { View, Text } from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import ButtonPrimary from '../../components/buttons/ButtonPrimary';

function PhoneBookScreen({ navigation }) {
    const onMoveScreen = () => {
        navigation.navigate('');
    };

    return (
        <View style={GlobalStyle.container}>
            <Text>This is PhoneBook Screen</Text>
            <ButtonPrimary title="PhoneBook" onPress={onMoveScreen} />
        </View>
    );
}

export default PhoneBookScreen;
