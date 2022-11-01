import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import FriendScreen from './phonebook/FriendScreen';
import GroupChatScreen from './phonebook/GroupChatScreen';
import NewFriendScreen from './phonebook/NewFriendScreen';

const Tab = createMaterialTopTabNavigator();
function PhoneBookScreen({ navigation }) {
    return (
        <>
            <Header />
            <SearchBar navigation={navigation} />
            <Tab.Navigator>
                <Tab.Screen name="Friend" component={FriendScreen} options={{ tabBarLabel: 'Bạn bè' }} />

                <Tab.Screen name="GroupChat" component={GroupChatScreen} options={{ tabBarLabel: 'Nhóm' }} />
                <Tab.Screen name="NewFriend" component={NewFriendScreen} options={{ tabBarLabel: 'Lời mời' }} />
            </Tab.Navigator>
        </>
    );
}

export default PhoneBookScreen;
