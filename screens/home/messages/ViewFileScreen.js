import { Text, View } from 'react-native';
import Header from '../../../components/Header';
import { WebView } from 'react-native-webview';
function ViewFileScreen({route}) {
    const {link} = route.params;
    return (
        <>
            <Header />
            <View style={{ width: '100%', height: '100%' }}>
                <View style={{ width: '100%', height: '100%' }}>
                    <WebView source={{ uri: link }} />
                </View>
            </View>
        </>
    );
}

export default ViewFileScreen;
