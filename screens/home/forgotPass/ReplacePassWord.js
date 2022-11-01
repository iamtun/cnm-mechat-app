import { View, Image, Text, KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';

import GlobalStyle from '../../../styles/GlobalStyle';
import LoginStyles from '../../../styles/LoginStyles';
import ButtonPrimary from '../../../components/Buttons/ButtonPrimary';
import TextInputPrimary from '../../../components/Inputs/TextInputPrimary';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchForgetPassword } from '../../../redux/slice/userInfoSlice';
import useDebounce from '../../../hooks/useDebounce';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';

function ReplacePassWord({ route, navigation }) {
    const dispatch = useDispatch();

    const phoneNumber = route.params.phoneNumber;

    const [password, setPassword] = useState(null);
    const [passwordAgain, setPasswordAgain] = useState(null);

    const [errPass, setErrPass] = useState(null);
    const [errPassAgain, setErrPassAgain] = useState(null);
    const debouncedPass = useDebounce(password, 500);
    const debouncedPassAgain = useDebounce(passwordAgain, 500);

    useEffect(() => {
        if (password === '') {
            setErrPass('Vui lòng nhập mật khẩu mới');
        } else {
            setErrPass(null);
        }
    }, [debouncedPass]);

    useEffect(() => {
        if (passwordAgain === '') {
            setErrPassAgain('Vui lòng nhập lại mật khẩu');
        } else if (password != passwordAgain) {
            setErrPassAgain('Vui lòng nhập lại đúng mật khẩu');
        } else {
            setErrPassAgain(null);
        }
    }, [debouncedPassAgain]);

    const _handleForgotPass = () => {
        if (password === null) {
            setPassword('');
        }
        if (passwordAgain === null) {
            setPasswordAgain('');
        } else if (errPass != null || errPassAgain != null) {
        } else {
            const data = { phoneNumber: phoneNumber, newPassword: passwordAgain };
            dispatch(fetchForgetPassword(data));
            Alert.alert('Đổi mật khẩu thành công');
            navigation.navigate('LoginScreen');
        }
    };
    return (
        <View style={GlobalStyle.container}>
            {/* logo */}
            <View style={LoginStyles.logo}>
                <Image style={LoginStyles.img} source={require('../../../assets/mechat-logo.png')} />
                <Text style={LoginStyles.title}>Khôi phục mật khẩu</Text>
                <Text style={LoginStyles.subtitle}>Tạo mật khẩu mới</Text>
            </View>
            {/* Register */}
            <View style={LoginStyles.enterData}>
                <TextInputPrimary
                    onChange={(value) => {
                        setPassword(value);
                    }}
                    placeholder="Nhập mật khẩu mới"
                    isPass={true}
                />
                <Text style={{ marginLeft: 15, color: 'red' }}>{errPass}</Text>
                <TextInputPrimary
                    onChange={(value) => {
                        setPasswordAgain(value);
                    }}
                    placeholder="Nhập lại mật khẩu"
                    isPass={true}
                />
                <Text style={{ marginLeft: 15, color: 'red' }}>{errPassAgain}</Text>

                <ButtonPrimary title="Xác nhận" onPress={_handleForgotPass} />
            </View>
            {Platform.OS === 'ios' ? (
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20} />
            ) : (
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-30} />
            )}
        </View>
    );
}

export default ReplacePassWord;
