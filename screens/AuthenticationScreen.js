import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalStyle from '../styles/GlobalStyle';
import ButtonPrimary from '../components/Buttons/ButtonPrimary';
import firebase from 'firebase/compat/app';
import { setItem } from '../utils/asyncStorage';

function AuthenticationScreen({ route, navigation }) {
    //data receiver from login screen
    const confirm = route.params.verificationId;
    const token = route.params.token;

    //screen's variables
    const [counter, setCounter] = useState(10);
    const [intervalId, setIntervalId] = useState(null);
    const [code, setCode] = useState('');

    if (counter === 0) {
        clearInterval(intervalId);
        setCounter(20);
    }

    //functions
    const handleTextChange = (value) => {
        setCode(value);
    };

    const sendBackOTP = () => {
        const interval = setInterval(() => {
            setCounter((prev) => setCounter(prev - 1));
        }, 1000);

        setIntervalId(interval);
    };

    const OtpVerify = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(confirm, code);
        firebase
            .auth()
            .signInWithCredential(credential)
            .then(async () => {
                setCode('');
                setItem('user_token', token);
                navigation.navigate('LoadingScreen');
            })
            .catch((err) => {
                Alert.alert('Mã không tồn tại hoặc quá hạn');
            });
    };

    return (
        <View style={GlobalStyle.container}>
            <View style={GlobalStyle.centerCol}>
                <Text style={GlobalStyle.textSize}>Nhập OTP được gửi tới số điện thoại của bạn</Text>
                <Text style={[GlobalStyle.textSize, styles.phoneNumberText]}></Text>
            </View>

            <TextInput
                style={[GlobalStyle.textSize, styles.textInput]}
                value={code}
                onChangeText={handleTextChange}
                {...(Platform.OS === 'ios' ? { keyboardType: 'number-pad' } : { keyboardType: 'number-pad' })}
            />

            <TouchableOpacity onPress={sendBackOTP} style={styles.sendBackButton}>
                <FontAwesome5 name="undo" size={15} style={GlobalStyle.primaryColor} />
                <Text style={[GlobalStyle.primaryColor, styles.sendBackText]}>Gửi lại OTP ({counter})</Text>
            </TouchableOpacity>

            <ButtonPrimary title="Xác nhận" onPress={OtpVerify} />
        </View>
    );
}

const styles = StyleSheet.create({
    textView: {
        marginBottom: 16,
    },
    phoneNumberText: {
        fontWeight: '700',
        padding: 8,
    },
    textInput: {
        width: 330,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        textAlign: 'center',
    },
    sendBackButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    sendBackText: {
        marginLeft: 8,
        padding: 8,
    },
});

export default AuthenticationScreen;
