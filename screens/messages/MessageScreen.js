import { View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import TopBar from '../../components/Messages/TopBar/TopBar';

function MessageScreen({ route, navigation }) {
    const { name } = route.params;

    return (
        <>
            <Header />
            <View style={styles.messageView}>
                <TopBar name={name} navigation={navigation} />
                
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
    },
    messageView: {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
});

export default MessageScreen;
