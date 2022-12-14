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
import config, { regexPass } from '../../../config';
import { setItem } from '../../../utils/asyncStorage';

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
    const [isSuccess, setIsSuccess] = useState(false);

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
            setErrPass('Vui l??ng nh???p m???t kh???u m???i');
        } else if (password != null && password.length > 0) {
            if(!regexPass.test(password)){
                setErrPass('M???t kh???u ph???i c?? 8 k?? t??? bao g???m  ch??? s???,\nk?? t??? hoa, k?? t??? th?????ng');
            } else{
                setErrPass(null);
            }
        } else {
            setErrPass(null);
        }
    }, [debouncedPass]);

    //check error Old
    useEffect(() => {
        if (passOld === '') {
            setErrPassOld('Vui l??ng nh???p m???t kh???u hi???n t???i');
        } else {
            setErrPassOld(null);
        }
    }, [debouncedPassOld]);

    // check error pass again
    useEffect(() => {
        if (passwordAgain === '') {
            setErrPassAgain('Vui l??ng nh???p l???i m???t kh???u');
        } else if (password != passwordAgain) {
            setErrPassAgain('Vui l??ng nh???p l???i ????ng m???t kh???u');
        } else {
            setErrPassAgain(null);
        }
    }, [debouncedPassAgain]);

    // function fetch sign with api
    const signWithNewPass = () => {
        return fetch(`${config.LINK_API}/auths/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                passWord: passwordAgain,
            }),
        })
            .then((res) => res.json())
            .then((resData) => {
                if (resData.status == 'success') {
                    return resData._token;
                }
                if (resData?.error.statusCode === 403) throw new Error(403);
                if (resData?.error.statusCode === 402) throw new Error(402);
            });
    };

    const _handleLogin = () => {
        signWithNewPass()
            .then((token) => {
                setItem('user_token', token)
                    .then((key) => {
                        console.log(`save ${key} success!`);
                        navigation.navigate('LoadingScreen');
                    })
                    .catch((err) => {
                        console.log(`save ${key} err!`, err);
                    });
            })
            .catch((err) => {
                if (err.message === '403') {
                    console.log('Sai m???t kh???u');
                }
                if (err.message === '402') {
                    console.log('S??? ??i???n tho???i n??y ch??a ????ng k?? t??i kho???n');
                }
            });
    };

    // login
    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                _handleLogin();
            }, 2000);
        }
    }, [isSuccess]);

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
            Alert.alert('?????i m???t kh???u th??nh c??ng');
            setIsSuccess(true);
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
                    setErrPassOld('Sai m???t kh???u');
                } else {
                    console.log('Ok');
                    const data = {
                        userId: userId,
                        oldPass: passOld,
                        newPassword: password,
                        confirmNewPass: passwordAgain,
                    };
                    dispatch(fetchChangePass(data));
                    Alert.alert('Thay ?????i m???t kh???u th??nh c??ng');
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
                <Text style={LoginStyles.title}>{isChange ? 'Thay ?????i m???t kh???u' : 'Kh??i ph???c m???t kh???u'} </Text>
                {isChange ? null : <Text style={LoginStyles.subtitle}>T???o m???t kh???u m???i</Text>}
            </View>
            {/* Register */}
            <View style={LoginStyles.enterData}>
                {isChange ? (
                    <View>
                        <TextInputPrimary
                            onChange={(value) => {
                                if (errPass === 'Sai m???t kh???u') {
                                    setErrPass(null);
                                }
                                setPassOld(value);
                            }}
                            placeholder="Nh???p m???t kh???u hi???n t???i"
                            isPass={true}
                        />
                        {errPassOld ? <Text style={{ marginLeft: 15, color: 'red' }}>{errPassOld}</Text> : null}
                    </View>
                ) : null}
                <TextInputPrimary
                    onChange={(value) => {
                        setPassword(value);
                    }}
                    placeholder="Nh???p m???t kh???u m???i"
                    isPass={true}
                />
                {errPass ? <Text style={{ marginLeft: 15, color: 'red' }}>{errPass}</Text> : null}
                <TextInputPrimary
                    onChange={(value) => {
                        setPasswordAgain(value);
                    }}
                    placeholder="Nh???p l???i m???t kh???u"
                    isPass={true}
                />
                {errPassAgain ? <Text style={{ marginLeft: 15, color: 'red' }}>{errPassAgain}</Text> : null}

                <ButtonPrimary title="X??c nh???n" onPress={isChange ? _handleChangePass : _handleForgotPass} />
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
