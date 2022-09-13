import { View, Text } from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import ButtonPrimary from '../../components/buttons/ButtonPrimary';

function ProfileScreen({ navigation }) {
    const onMoveScreen = () => {
        navigation.navigate('');
    };

    return (
        <View style={GlobalStyle.container}>
            <Text>This is Profile Screen</Text>
            <ButtonPrimary title="Profile" onPress={onMoveScreen} />
        </View>
    );
}

export default ProfileScreen;
