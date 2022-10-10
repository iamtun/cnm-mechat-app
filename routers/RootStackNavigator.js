import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen, AuthenticationScreen } from '../screens';
import HomeScreen from '../screens/home/HomeScreen';
import MessageScreen from '../screens/messages/MessageScreen';
import PersonalScreen from '../screens/personal/PersonalScreen';
import ProfileScreen from '../screens/home/ProfileScreen';
import LoadingScreen from '../screens/LoadingScreen';
const Stack = createNativeStackNavigator();

function RootStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                
                 initialRouteName="LoadingScreen"
            >
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="AuthenticationScreen" component={AuthenticationScreen} />
                <Stack.Screen name='LoadingScreen' component={LoadingScreen}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{gestureEnabled: false}}/>
                <Stack.Screen name="MessageScreen" component={MessageScreen} />
                <Stack.Screen name="PersonalScreen" component={PersonalScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStackNavigator;
