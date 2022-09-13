import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneBookScreen from '../screens/home/PhoneBookScreen';
import ChatListScreen from '../screens/home/ChatListScreen';
import ProfileScreen from '../screens/home/ProfileScreen';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
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
    headerStyle: { backgroundColor: '#3777F3'},
    headerTitle: () => null,
    headerShadowVisible: false,
});

function HomeTabNavigator() {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Messages" component={ChatListScreen} options={{ tabBarBadge: 3 }} />
            <Tab.Screen name="PhoneBook" component={PhoneBookScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default HomeTabNavigator;
