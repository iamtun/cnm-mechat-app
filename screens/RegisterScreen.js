import { View, Image, Text, KeyboardAvoidingView, Alert } from 'react-native';
import { useRef, useState } from 'react';
import firebase from 'firebase/compat/app';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

import { firebaseConfig } from '../utils/firebase';
import config, { checkPhoneNumber } from '../config';
import GlobalStyle from '../styles/GlobalStyle';
import LoginStyles from '../styles/LoginStyles';
import ButtonPrimary from '../components/Buttons/ButtonPrimary';
import TextInputPrimary from '../components/Inputs/TextInputPrimary';
import useDebounce from '../hooks/useDebounce';
import { useEffect } from 'react';

function RegisterScreen({ navigation }) {
    //ui ref
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordAgain, setPasswordAgain] = useState(null);
    const [errPhone, setErrPhone] = useState(null);
    const [errUserName, setErrUserName] = useState(null);
    const [errPass, setErrPass] = useState(null);
    const [errPassAgain, setErrPassAgain] = useState(null);

    const debouncedPhone = useDebounce(phoneNumber, 500);
    const debouncedUseName = useDebounce(userName, 500);
    const debouncedPass = useDebounce(password, 500);
    const debouncedPassAgain = useDebounce(passwordAgain, 500);

    useEffect(() => {
        if (phoneNumber === '') {
            setErrPhone('Vui lòng nhập số điện thoại');
        } else if (phoneNumber != null && phoneNumber.length != 10) {
            setErrPhone('Vui lòng nhập số điện thoại là 10 số');
        } else if (phoneNumber != null && !checkPhoneNumber(phoneNumber)) {
            setErrPhone('Số điện thoại của bạn không tồn tại');
        } else {
            setErrPhone(null);
        }
    }, [debouncedPhone]);

    useEffect(() => {
        if (userName === '') {
            setErrUserName('Vui lòng nhập tên tài khoản');
        } else {
            setErrUserName(null);
        }
    }, [debouncedUseName]);

    useEffect(() => {
        if (password === '') {
            setErrPass('Vui lòng nhập mật khẩu');
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
    //firebase
    const recaptchaVerifier = useRef(null);
    const [verificationId, setVerificationId] = useState(null);

    //function
    const senOTP = async () => {
        let _phoneNumber = '+84' + phoneNumber.slice(1);
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

    const getUserByPhoneNumber = async () => {
        return await fetch(`${config.LINK_API_V2}/users/get-user-by-phone/${phoneNumber}`)
            .then((res) => res.json())
            .then((resData) => {
                if (resData._id != null) {
                    return true;
                }
                //return catch
                if (resData?.status == 500) return false;
            });
    };

    const _handleRegister = async () => {
        const userPhone = await getUserByPhoneNumber();

    if (phoneNumber === null) {
      setPhoneNumber("");
    }
    if (userName === null) {
      setUserName("");
    }
    if (password === null) {
      setPassword("");
    }
    if (passwordAgain === null) {
      setPasswordAgain("");
    } else if(userPhone){
      setErrPhone("Số điện thoại đã đăng ký tài khoản")
    } else if (
      errPhone != null ||
      errPass != null ||
      errUserName != null ||
      errPassAgain != null
    ) {
    } else {
      senOTP()
        .then((otp) => {
          setVerificationId(otp);
          navigation.navigate("AuthenticationScreen", {
            verificationId: otp,
            phoneNumber: phoneNumber,
            passWord: passwordAgain,
            fullName: userName,
            isForgetPass: false,
            isRegister: true,
          });
        })
        .catch((err) => {
          console.log("ERRR", err);
          return;
        });
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
                <TextInputPrimary
                    value={phoneNumber}
                    onChange={(value) => {
                        setPhoneNumber(value);
                    }}
                    keyboardType="number-pad"
                    placeholder="Số điện thoại"
                    isPass={false}
                />
                <Text style={{ marginLeft: 15, color: 'red' }}>{errPhone}</Text>
                <TextInputPrimary
                    onChange={(value) => {
                        setUserName(value);
                    }}
                    placeholder="Tên người dùng"
                    isPass={false}
                />
                <Text style={{ marginLeft: 15, color: 'red' }}>{errUserName}</Text>
                <TextInputPrimary
                    onChange={(value) => {
                        setPassword(value);
                    }}
                    placeholder="Nhập mật khẩu"
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
                <ButtonPrimary
                    title="Đăng ký"
                    onPress={() => {
                        _handleRegister();
                    }}
                />
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
