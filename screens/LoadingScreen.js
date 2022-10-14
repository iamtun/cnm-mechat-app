import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getItem, removeItem } from '../utils/asyncStorage';
import { fetchUserInfo } from '../redux/slice/userInfoSlice';
import { fetchUsers } from '../redux/slice/usersSlice';
import { useIsFocused } from '@react-navigation/native';

function LoadingScreen({ navigation }) {
    const dispatch = useDispatch();
    const isFocus = useIsFocused();
    //removeItem("user_token");

    useEffect(() => {
        if (!isFocus) return;
        else {
            getItem('user_token')
                .then((token) => {
                    if (token) {
                        console.log('have token');
                        dispatch(fetchUsers());
                        dispatch(fetchUserInfo(token));
                        navigation.navigate('HomeScreen', { screen: 'HomeScreen' });
                    }
                })
                .catch((err) => {
                    navigation.navigate('LoginScreen', { screen: 'LoginScreen' });
                    return err;
                });
        }
    }, [isFocus]);

    return (
        <View style={GlobalStyle.container}>
            <ActivityIndicator size="large" color={GlobalStyle.primaryColor} />
        </View>
    );
}

export default LoadingScreen;
