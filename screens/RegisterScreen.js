import { View, Image, Text, KeyboardAvoidingView, Alert } from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import LoginStyles from '../styles/LoginStyles';
import ButtonPrimary from '../components/Buttons/ButtonPrimary';
import TextInputPrimary from '../components/Inputs/TextInputPrimary';
import { useRef } from 'react';
import config from '../config';

import { setItem } from '../utils/asyncStorage';
import { firebaseConfig } from '../utils/firebase';
import firebase from 'firebase/compat/app';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRegister } from '../redux/selector';
    

function RegisterScreen({ navigation }) {

    //selector
    const userByPhoneNumber = useSelector(getUserRegister)
    const dispatch = useDispatch();
    //ui ref
    const phoneNumberRegisterRef = useRef(null);
    const passRegisterRef = useRef(null);
    const userNameRegisterRef = useRef(null);
    const passRegisterRefAgain = useRef(null);
    const recaptchaVerifier = useRef(null);
    const [verificationId, setVerificationId] = useState(null);

    //function
    const senOTP = async () => {
        let _phoneNumber = '+84' + phoneNumberRegisterRef.current.slice(1);

        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(_phoneNumber, recaptchaVerifier.current);
            if (verificationId) {
                return verificationId;
            }
        } catch (err) {
            throw new Error(err);
        }
    };

    const register = () => {
        return fetch(`${config.LINK_API_V2}/users/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumberRegisterRef.current,
                passWord: passRegisterRef.current,
                fullName: userNameRegisterRef.current,
            }),
        })
            .then((res) => res.json()) 
            .then((resData) => {
                if (resData.status == 'success') {
                    return resData._token;
                }
                //return catch
                if (resData?.error.statusCode === 403) throw new Error('Số điện thoại đã tồn tại');
                if (resData?.error.statusCode === 404) throw new Error('Số điện thoại sai định dạng');
            });
    };

    const sign = () => {
        return fetch(`${config.LINK_API_V2}/users/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumberLoginRef.current,
                passWord: passLoginRef.current,
            }),
        })
            .then((res) => res.json())
            .then((resData) => {
                if (resData.status == 'success') {
                    return resData._token;
                }
                if (resData?.error.statusCode === 403) throw new Error('Mật khẩu của bạn không đúng!');
                if (resData?.error.statusCode === 402) throw new Error('Bạn chưa đăng ký tài khoản?');
            });
    };

    const _handleLogin = () => {
        if (phoneNumberLoginRef.current == null || passLoginRef.current == null) {
            Alert.alert('Vui lòng nhập đầy đủ thông tin');
        } else {
            sign()
                .then((token) => {
                    senOTP()
                        .then((otp) => {
                            setVerificationId(otp);
                            navigation.navigate('AuthenticationScreen', {
                                verificationId: otp,
                                token: token,
                            });
                        })
                        .catch((err) => {
                            return;
                        });
                })
                .catch((err) => {
                    Alert.alert('Thông báo', err.message);
                });
        }
    };

    const _handleRegister = () => {
        if (
            phoneNumberRegisterRef.current == null ||
            passRegisterRef.current == null ||
            userNameRegisterRef == null ||
            passRegisterRefAgain == null
        ) {
            Alert.alert('Vui lòng nhập đầy đủ thông tin');
        } else if (phoneNumberRegisterRef.current.toString().length != 10) {
            Alert.alert('Vui lòng nhập số điện thoại là 10 số');
        } else if (passRegisterRef.current != passRegisterRefAgain.current) {
            Alert.alert('Vui lòng nhập lại đúng mật khẩu');
        } else {
            // register()
            //     .then((token) => {
            //         if (token != null) {
            //             Alert.alert('Bạn đã đăng kí thành công');
            //             navigation.navigate('LoginScreen');
            //         }
            //     })
            //     .catch((err) => {
            //         Alert.alert('Thông báo', err.message);
            //     });
        }
    };

    return (
        <View style={GlobalStyle.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                title="Xác thực"
                cancelLabel="Hủy"
            />
            {/* logo */}
            <View style={LoginStyles.logo}>
                <Image style={LoginStyles.img} source={require('../assets/mechat-logo.png')} />
                <Text style={LoginStyles.title}>Đăng ký</Text>
                <Text style={LoginStyles.subtitle}>Chào mừng bạn đến với MeChat</Text>
            </View>
            {/* Register */}
            <View style={LoginStyles.enterData}>
                <TextInputPrimary ref={phoneNumberRegisterRef} placeholder="Số điện thoại" isPass={false} />
                <TextInputPrimary ref={userNameRegisterRef} placeholder="Tên người dùng" isPass={false} />
                <TextInputPrimary ref={passRegisterRef} placeholder="Nhập mật khẩu" isPass={true} />
                <TextInputPrimary ref={passRegisterRefAgain} placeholder="Nhập lại mật khẩu" isPass={true} />

                <ButtonPrimary title="Đăng ký" onPress={_handleRegister} />
            </View>
            {Platform.OS === 'ios' ? (
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20} />
            ) : (
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-30} />
            )}
        </View>
    );
}

export default RegisterScreen;
