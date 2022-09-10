import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessageListScreen from '../screens/home/MessageScreen';
import PhoneBookScreen from '../screens/home/PhoneBookScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Messages') {
                        iconName = 'comment';
                        color = focused ? '#219ebc' : '#ccc';
                    } else if (route.name === 'PhoneBook') {
                        iconName = 'book';
                        color = focused ? '#219ebc' : '#ccc';
                    }

                    return <FontAwesome5 name={iconName} size={20} color={color} />;
                },
                //tabBarInactiveTintColor: '#219ebc',
                tabBarActiveTintColor: '#219ebc',
            })}
        >
            <Tab.Screen name="Messages" component={MessageListScreen} options={{tabBarBadge: 3}}/>
            <Tab.Screen name="PhoneBook" component={PhoneBookScreen} />
        </Tab.Navigator>
    );
}

export default HomeTabNavigator;
