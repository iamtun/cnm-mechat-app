import { ListItem, Avatar } from 'react-native-elements';
import { Text, View, FlatList } from 'react-native';

function GroupChatScreen() {
    const data = [
        {
            id: 1,
            name: 'CNM_2022',
            lastMessage: 'Ok nè',
            avatarUrl: 'https://cdn.pixabay.com/photo/2019/05/27/19/08/puppy-4233378_960_720.jpg',
        },
        {
            id: 2,
            name: 'PT JAVA',
            lastMessage: 'Ok nè',
            avatarUrl: 'https://cdn.pixabay.com/photo/2015/05/05/08/36/pets-753464_960_720.jpg',
        },
        {
            id: 3,
            name: 'TTDT',
            lastMessage: 'Ok nè',
            avatarUrl: 'https://cdn.pixabay.com/photo/2019/07/03/10/16/pug-4314106_960_720.jpg',
        },
    ];

    function getGroupItem({ item: user }) {
        return (
            <View styles={{ flex: 1 }}>
                <ListItem key={user.id} bottomDivider>
                    <Avatar rounded size={70} source={{ uri: user.avatarUrl }} />
                    <ListItem.Content>
                        <ListItem.Title>{user.name}</ListItem.Title>
                        <ListItem.Subtitle>{user.lastMessage}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Text style={{ bottom: '7%' }}>Time</Text>
                </ListItem>
            </View>
        );
    }

    return (
        <View>
            <FlatList data={data} keyExtractor={(user) => user.id.toString()} renderItem={getGroupItem} />
        </View>
    );
}

export default GroupChatScreen;
