import { View, Text } from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import ButtonPrimary from '../../components/buttons/ButtonPrimary';

function ChatListScreen({ navigation }) {
    const onMoveScreen = () => {
        navigation.navigate('');
    };

    return (
        <View style={GlobalStyle.container}>
            <Text>This is Chat List Screen</Text>
            <ButtonPrimary title="Chat List" onPress={onMoveScreen} />
        </View>
    );
}

export default ChatListScreen;
