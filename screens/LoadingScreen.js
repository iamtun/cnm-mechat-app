import { useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../utils/asyncStorage';
import { fetchUserInfo } from '../redux/slice/userInfoSlice';
import { fetchUsers } from '../redux/slice/usersSlice';
import { getFriendsByUserSelector } from '../redux/selector';
import friendListSlice from '../redux/slice/friendSlice';
import { useIsFocused } from '@react-navigation/native';
function LoadingScreen({ navigation }) {
    const dispatch = useDispatch();
    const friends = useSelector(getFriendsByUserSelector);
    const isFocus = useIsFocused();

    useEffect(() => {
        getItem('user_token').then((token) => {
            if (token) {
                console.log('have token');
                dispatch(fetchUserInfo(token));
                dispatch(fetchUsers());
                if (!friends) return;
                else {
                    setTimeout(() => {
                        dispatch(friendListSlice.actions.loadDataFriend(friends));
                        navigation.navigate('HomeScreen', { screen: 'HomeScreen' });
                    }, 1000);
                }
            } else {
                navigation.navigate('LoginScreen', { screen: 'LoginScreen' });
            }
        });
    }, [isFocus]);

    return (
        <View style={GlobalStyle.container}>
            <ActivityIndicator size="large" color={GlobalStyle.primaryColor} />
        </View>
    );
}

export default LoadingScreen;
