import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity } from 'react-native';
import { useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalStyle from '../styles/GlobalStyle';
import ButtonPrimary from '../components/buttons/ButtonPrimary';

function AuthenticationScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('0343220597');
    const [counter, setCounter] = useState(10);
    const [intervalId, setIntervalId] = useState(null);

    if (counter === 0) {
        clearInterval(intervalId);
        setCounter(20);
    }

    //functions
    const onMoveScreen = () => {
        navigation.navigate('HomeScreen');
    };

    const sendBackOTP = () => {
        const interval = setInterval(() => {
            setCounter((prev) => setCounter(prev - 1));
        }, 1000);

        setIntervalId(interval);
    };

    return (
        <View style={GlobalStyle.container}>
            <View style={GlobalStyle.centerCol}>
                <Text style={GlobalStyle.textSize}>Nhập OTP được gửi tới số điện thoại của bạn</Text>
                <Text style={[GlobalStyle.textSize, styles.phoneNumberText]}>{phoneNumber}</Text>
            </View>

            <TextInput
                style={[GlobalStyle.textSize, styles.textInput]}
                {...(Platform.OS === 'ios'
                    ? { keyboardType: 'number-pad' }
                    : { keyboardType: 'number-pad' })}
            />

            <TouchableOpacity onPress={sendBackOTP} style={styles.sendBackButton}>
                <FontAwesome5 name="undo" size={15} style={GlobalStyle.primaryColor} />
                <Text style={[GlobalStyle.primaryColor, styles.sendBackText]}>Gửi lại OTP ({counter})</Text>
            </TouchableOpacity>

            <ButtonPrimary title="Xác nhận" onPress={onMoveScreen} />
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
