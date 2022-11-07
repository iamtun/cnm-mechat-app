import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import FriendScreen from './phonebook/FriendScreen';
import GroupChatScreen from './phonebook/GroupChatScreen';
import NewFriendScreen from './phonebook/NewFriendScreen';
import { Text } from 'react-native';
import { useEffect } from 'react';
import { socket } from '../../config';
import { useDispatch } from 'react-redux';
import userInfoSlice from '../../redux/slice/userInfoSlice';

const Tab = createMaterialTopTabNavigator();
function PhoneBookScreen({ navigation }) {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.off('send_friends');
        socket.on('send_friends', (friends) => {
            console.log('sender', friends);
            dispatch(userInfoSlice.actions.receiveFriendListFromSocket(friends));
        });

        socket.off('receive_friends');
        socket.on('receive_friends', (friends) => {
            console.log('receiver', friends);
            dispatch(userInfoSlice.actions.receiveFriendListFromSocket(friends));
        });
    }, []);
    return (
        <>
            <Header />
            <SearchBar navigation={navigation} />
            <Tab.Navigator>
                <Tab.Screen name="Friend" component={FriendScreen} options={{ tabBarLabel: 'Bạn bè' }} />
                <Tab.Screen name="GroupChat" component={GroupChatScreen} options={{ tabBarLabel: 'Nhóm' }} />
                <Tab.Screen
                    name="NewFriend"
                    component={NewFriendScreen}
                    options={{ tabBarBadge: () => <Text>3</Text>, tabBarLabel: 'Lời mời' }}
                />
            </Tab.Navigator>
        </>
    );
}

export default PhoneBookScreen;
