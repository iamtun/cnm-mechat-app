import { View, Image, Text, KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';

import GlobalStyle from '../../../styles/GlobalStyle';
import LoginStyles from '../../../styles/LoginStyles';
import ButtonPrimary from '../../../components/Buttons/ButtonPrimary';
import TextInputPrimary from '../../../components/Inputs/TextInputPrimary';
import { useDispatch } from 'react-redux';
import { fetchChangePass, fetchForgetPassword } from '../../../redux/slice/userInfoSlice';
import useDebounce from '../../../hooks/useDebounce';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
import config from '../../../config';

function ReplacePassWord({ route, navigation }) {
    const dispatch = useDispatch();

    const phoneNumber = route.params.phoneNumber;
    const isChange = route.params?.isChange;
    const userId = route.params?.userId;
    // use state
    const [passOld, setPassOld] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordAgain, setPasswordAgain] = useState(null);
    const [errPass, setErrPass] = useState(null);
    const [errPassOld, setErrPassOld] = useState(null);
    const [errPassAgain, setErrPassAgain] = useState(null);

    const debouncedPass = useDebounce(password, 500);
    const debouncedPassAgain = useDebounce(passwordAgain, 500);
    const debouncedPassOld = useDebounce(passOld, 500);

    // check pass old
    const sign = () => {
        return fetch(`${config.LINK_API}/auths/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                passWord: passOld,
            }),
        })
            .then((res) => res.json())
            .then((resData) => {
                if (resData?.error.statusCode === 403) throw new Error(403);
            });
    };

    //check error pass
    useEffect(() => {
        if (password === '') {
            setErrPass('Vui lòng nhập mật khẩu mới');
        } else {
            setErrPass(null);
        }
    }, [debouncedPass]);

    //check error Old
    useEffect(() => {
        if (passOld === '') {
            setErrPassOld('Vui lòng nhập mật khẩu hiện tại');
        } else {
            setErrPassOld(null);
        }
    }, [debouncedPassOld]);

    // check error pass again
    useEffect(() => {
        if (passwordAgain === '') {
            setErrPassAgain('Vui lòng nhập lại mật khẩu');
        } else if (password != passwordAgain) {
            setErrPassAgain('Vui lòng nhập lại đúng mật khẩu');
        } else {
            setErrPassAgain(null);
        }
    }, [debouncedPassAgain]);

    //button forgot pass
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

    //button change pass
    const _handleChangePass = () => {
        if (passOld === null) {
            setPassOld('');
        }
        if (password === null) {
            setPassword('');
        }
        if (passwordAgain === null) {
            setPasswordAgain('');
        } else if (errPass != null || errPassAgain != null || errPassOld != null) {
        } else {
            sign().catch((err) => {
                if (err.message === '403') {
                    setErrPassOld('Sai mật khẩu');
                } else {
                    console.log('Ok');
                    const data = {
                        userId: userId,
                        oldPass: passOld,
                        newPassword: password,
                        confirmNewPass: passwordAgain,
                    };
                    dispatch(fetchChangePass(data));
                    Alert.alert('Thay đổi mật khẩu thành công');
                    navigation.goBack();
                }
            });
        }
    };
    // UI
    return (
        <View style={GlobalStyle.container}>
            {/* logo */}
            <View style={LoginStyles.logo}>
                <Image style={LoginStyles.img} source={require('../../../assets/mechat-logo.png')} />
                <Text style={LoginStyles.title}>{isChange ? 'Thay đổi mật khẩu' : 'Khôi phục mật khẩu'} </Text>
                {isChange ? null : <Text style={LoginStyles.subtitle}>Tạo mật khẩu mới</Text>}
            </View>
            {/* Register */}
            <View style={LoginStyles.enterData}>
                {isChange ? (
                    <View>
                        <TextInputPrimary
                            onChange={(value) => {
                                if (errPass === 'Sai mật khẩu') {
                                    setErrPass(null);
                                }
                                setPassOld(value);
                            }}
                            placeholder="Nhập mật khẩu hiện tại"
                            isPass={true}
                        />
                        <Text style={{ marginLeft: 15, color: 'red' }}>{errPassOld}</Text>
                    </View>
                ) : null}
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

                <ButtonPrimary title="Xác nhận" onPress={isChange ? _handleChangePass : _handleForgotPass} />
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
