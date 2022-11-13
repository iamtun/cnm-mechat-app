import HomeTabNavigator from '../../routers/HomeTabNavigator';
import { socket } from '../../config';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import friendListSlice from '../../redux/slice/friendSlice';
function HomeScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        socket.on('get_users', (users) => {
            const usersOnline = users.map((user) => user.userId);
            dispatch(friendListSlice.actions.receiveFriendOnlineWithSocket(usersOnline));
        });
    }, []);
    return <HomeTabNavigator />;
}

export default HomeScreen;
