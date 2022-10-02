import RootStackNavigator from './routers/RootStackNavigator';
import { Provider } from 'react-redux';
import store from './redux/store';

import { LogBox } from "react-native";
import { getItem } from './utils/asyncStorage';
import { useEffect, useLayoutEffect, useState } from 'react';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default function App() {
    return (
        <Provider store={store}>
            <RootStackNavigator/>
        </Provider>
    )
}
