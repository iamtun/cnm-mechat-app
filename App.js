import RootStackNavigator from './routers/RootStackNavigator';
import { Provider } from 'react-redux';
import store from './redux/store';

import { LogBox } from "react-native";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
import config from "./config"
console.log(config.API_USERS);

export default function App() {
    return (
        <Provider store={store}>
            <RootStackNavigator/>
        </Provider>
    )
}
