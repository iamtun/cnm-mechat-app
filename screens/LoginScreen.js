import { View, Image, Text, KeyboardAvoidingView } from 'react-native';
import { StyleSheet, Platform } from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import LoginStyles from '../styles/LoginStyles';
import ButtonPrimary from '../components/Buttons/ButtonPrimary';
import TextInputPrimary from '../components/Inputs/TextInputPrimary';
import { useEffect, useRef, useState } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../utils/firebase';
import firebase from 'firebase/compat/app';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../redux/slice/userInfoSlice';
import config from '../config';
import { getItem } from '../utils/asyncStorage';
import { Alert } from 'react-native';

function LoginScreen({ navigation, route }) {
    // const flag = route.params;
    // console.log(`flag: [${flag === true}]`);

    // - Cần nhận 1 giá trị từ logout để set isLoading = false!
    // - Cần kiểm tra input
    // //ui ref
    const phoneNumberLoginRef = useRef(null);
    const passLoginRef = useRef(null);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    //firebase
    const recaptchaVerifier = useRef(null);
    const [verificationId, setVerificationId] = useState(null);

    //actions

    useEffect(() => {
        getItem('user_token').then((token) => {
            setTimeout(() => {
                console.log(`[token]: ${token}`);
                if (token) {
                    dispatch(fetchUserInfo());
                    navigation.navigate('HomeScreen', { screen: 'HomeScreen' });
                } else {
                    setIsLoading(false);
                }
            }, 1000);
        });
    }, []);

    // function
    const senOTP = async () => {
        let _phoneNumber = '+84' + phoneNumberLoginRef.current.slice(1);

        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(_phoneNumber, recaptchaVerifier.current);
            if (verificationId) {
                return verificationId;
            }
        } catch (err) {
            console.log(err);
        }
    };

    const sign = () => {
        return fetch(`${config.LINK_API}/users/login`, {
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
                console.log(resData);
                //return catch
                if (resData?.error.statusCode === 403) throw new Error('Mật khẩu của bạn không đúng!');
                if (resData?.error.statusCode === 402) throw new Error('Bạn chưa đăng ký tài khoản?');
            })
            // .catch((err) => {
            //     console.log(err);
            //     throw new Error(err);
            // });
    };

    const clickRegister = () => {
        navigation.navigate('RegisterScreen');
    };

    const _handleLogin = () => {
        sign()
            .then((token) => {
                senOTP().then((otp) => {
                    setVerificationId(otp);
                    navigation.navigate('AuthenticationScreen', {
                        verificationId: otp,
                        token: token,
                    });
                });
            })
            .catch((err) => {
                console.log(err);
                Alert.alert("Thông báo", err);  //Không chạy cái này
            });
    };

    return (
        <View style={GlobalStyle.container}>
            {isLoading ? (
                <Text>Loading ....</Text>
            ) : (
                <>
                    <FirebaseRecaptchaVerifierModal
                        ref={recaptchaVerifier}
                        firebaseConfig={firebaseConfig}
                        title="Xác thực"
                        cancelLabel="Hủy"
                    />
                    {/*  logo  */}
                    <View style={LoginStyles.logo}>
                        <Image style={LoginStyles.img} source={require('../assets/mechat-logo.png')} />
                        <Text style={LoginStyles.title}>Đăng nhập</Text>
                        <Text style={LoginStyles.subtitle}>Chào mừng bạn đến với MeChat</Text>
                    </View>
                    {/* Login */}
                    <View style={LoginStyles.enterData}>
                        <TextInputPrimary
                            ref={phoneNumberLoginRef}
                            placeholder="Nhập số điện thoại"
                            keyboardType="number-pad"
                        />
                        <TextInputPrimary ref={passLoginRef} placeholder="Mật khẩu" isPass />
                        <View style={styles.newData}>
                            <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                            <Text style={styles.register} onPress={clickRegister}>
                                Đăng ký
                            </Text>
                        </View>

                        <ButtonPrimary title="Đăng nhập" onPress={_handleLogin} />
                    </View>
                    {Platform.OS === 'ios' ? (
                        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40} />
                    ) : (
                        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={0} />
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    newData: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    forgotPassword: {
        textDecorationLine: 'underline',
        marginRight: 16,
    },
    register: {
        color: '#1E99CA',
        marginRight: 8,
    },
});

export default LoginScreen;
