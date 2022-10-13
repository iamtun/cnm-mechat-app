import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

function NewFriendScreen() {
    const data = [
        {
            id: 1,
            name: 'Tăng Bảo Trấn',
            greeting: 'Xin chào mình là Tăng Bảo Trấn',
            avatarUrl: 'https://cdn.pixabay.com/photo/2019/05/27/19/08/puppy-4233378_960_720.jpg',
        },
        {
            id: 2,
            name: 'Người lạ ơi',
            greeting: 'Ok nè',
            avatarUrl: 'https://cdn.pixabay.com/photo/2015/05/05/08/36/pets-753464_960_720.jpg',
        },
        {
            id: 3,
            name: 'Chưa có tên',
            greeting: 'Ok nè',
            avatarUrl: 'https://cdn.pixabay.com/photo/2019/07/03/10/16/pug-4314106_960_720.jpg',
        },
    ];

    function getNewFriends({ item: user }) {
        return (
            <View styles={styles.container}>
                <ListItem key={user.id} bottomDivider>
                    <Avatar rounded size={70} source={{ uri: user.avatarUrl }} />
                    <ListItem.Content>
                        <ListItem.Title>{user.name}</ListItem.Title>
                        <ListItem.Subtitle>{user.greeting}</ListItem.Subtitle>
                    </ListItem.Content>
                    <TouchableOpacity style={styles.buttonRemove}>
                        <Text>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonAdd}>
                        <Text style={{ color: 'white' }}>Đồng ý</Text>
                    </TouchableOpacity>
                </ListItem>
            </View>
        );
    }
    return (
        <View>
            <FlatList data={data} keyExtractor={(user) => user.id.toString()} renderItem={getNewFriends} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    buttonAdd: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 40,
        borderRadius: 15,
        backgroundColor: '#3475F5',
    },
    buttonRemove: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 40,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#33B0E0',
    },
});
export default NewFriendScreen;
