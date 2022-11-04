import { View, Image, Text, KeyboardAvoidingView } from 'react-native';
import { StyleSheet, Platform } from 'react-native';
import { Alert } from 'react-native';
import { useRef, useState } from 'react';
import firebase from 'firebase/compat/app';
import Icon from 'react-native-vector-icons/Ionicons';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

import { firebaseConfig } from '../../../utils/firebase';
import config, { checkPhoneNumber } from '../../../config';
import GlobalStyle from '../../../styles/GlobalStyle';
import LoginStyles from '../../../styles/LoginStyles';
import ButtonPrimary from '../../../components/Buttons/ButtonPrimary';
import TextInputPrimary from '../../../components/Inputs/TextInputPrimary';
import { TouchableOpacity } from 'react-native';
import useDebounce from '../../../hooks/useDebounce';
import { useEffect } from 'react';

function ConfirmPhoneNumber({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [errPhone, setErrPhone] = useState(null);
    const debouncedPhone = useDebounce(phoneNumber, 500);
    const phoneNumberForgotRef = useRef(null);
    const recaptchaVerifier = useRef(null);
    const [verificationId, setVerificationId] = useState(null);

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
        return await fetch(`${config.LINK_API_V4}/users/get-user-by-phone/${phoneNumber}`)
            .then((res) => res.json())
            .then((resData) => {
                if (resData._id != null) {
                    return true;
                }
                //return catch
                if (resData?.status == 500) return false;
            });
    };

    const _handleForgotPass = async () => {
        const userPhone = await getUserByPhoneNumber();
        if (phoneNumber === null) {
            setPhoneNumber('');
        } else if (errPhone != null) {
        } else if (userPhone) {
            senOTP()
                .then((otp) => {
                    setVerificationId(otp);
                    navigation.navigate('AuthenticationScreen', {
                        verificationId: otp,
                        phoneNumber: phoneNumber,
                        isForgetPass: true,
                    });
                })
                .catch((err) => {
                    console.log('ERRR', err);
                    return;
                });
        } else {
            setErrPhone('Số điện thoại của bạn chưa đăng kí tài khoản');
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
            {/*  logo  */}
            <View style={LoginStyles.logo}>
                <Image style={LoginStyles.img} source={require('../../../assets/mechat-logo.png')} />
                <Text style={LoginStyles.title}>Khôi phục mật khẩu</Text>
                <Text style={LoginStyles.subtitle}>Nhập số điện thoại để nhận mã xác thực</Text>
            </View>
            {/* Login */}
            <View style={LoginStyles.enterData}>
                <TextInputPrimary
                    value={phoneNumber}
                    onChange={(value) => {
                        setPhoneNumber(value);
                    }}
                    placeholder="Số điện thoại"
                    keyboardType="number-pad"
                />
                <Text style={{ marginLeft: 15, color: 'red' }}>{errPhone}</Text>
                <ButtonPrimary title="Tiếp tục" onPress={_handleForgotPass} />
            </View>
            <TouchableOpacity
                style={styles.goBack}
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Icon style={{ marginRight: 8 }} name="chevron-back-circle-outline" color="#4D6DEF" size={23} />
                <Text style={{ fontSize: 16 }}>Quay lại</Text>
            </TouchableOpacity>
            {Platform.OS === 'ios' ? (
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40} />
            ) : (
                <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={0} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    goBack: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginTop: 10,
    },
});
export default ConfirmPhoneNumber;
