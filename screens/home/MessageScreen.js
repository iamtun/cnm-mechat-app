import { View, Text } from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import ButtonPrimary from '../../components/buttons/ButtonPrimary';

function MessageListScreen({ navigation }) {
    const onMoveScreen = () => {
        navigation.navigate('');
    };

    return (
        <View style={GlobalStyle.container}>
            <Text>This is MessageList Screen</Text>
            <ButtonPrimary title="MessageList" onPress={onMoveScreen} />
        </View>
    );
}

export default MessageListScreen;
