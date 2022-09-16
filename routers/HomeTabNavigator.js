import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneBookScreen from '../screens/home/PhoneBookScreen';
import ChatListScreen from '../screens/home/ChatListScreen';
import ProfileScreen from '../screens/home/ProfileScreen';
// import MessageScreen from '../screens/messages/MessageScreen';
const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'Messages') {
            iconName = 'message-processing';
        } else if (route.name === 'PhoneBook') {
            iconName = 'book-account';
        } else if (route.name === 'Profile') {
            iconName = 'account';
        }

        return <Icon name={iconName} size={20} color={color} />;
    },
    tabBarInactiveTintColor: '#ccc',
    tabBarActiveTintColor: '#219ebc',
    //handle header
    // headerStyle: { backgroundColor: '#3777F3' },
    header: () => null,
    // headerShadowVisible: false,
});

function HomeTabNavigator() {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Messages" component={ChatListScreen} options={{ tabBarBadge: 3, tabBarLabel: "Tin nhắn"}} />
            <Tab.Screen name="PhoneBook" component={PhoneBookScreen} options={{tabBarLabel: "Danh bạ"}}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{tabBarLabel: "Cá nhân"}}/>
            {/* <Tab.Screen name="MessageScreen" component={MessageScreen} /> */}
        </Tab.Navigator>
    );
}

export default HomeTabNavigator;
