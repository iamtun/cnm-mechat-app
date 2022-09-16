import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

function ChatItem({ name, image, message, navigation }) {
    return (
        <TouchableOpacity style={styles.body} onPress={() => {navigation.navigate('MessageScreen', {name})}}>
            <View style={styles.imageView}>
                {image ? (
                    <Image source={{ uri:  image  }} style={styles.image} />
                ) : (
                    <Image source={require('../../assets/no-avatar.png')} style={styles.image} />
                )}
            </View>
            <View style={styles.messageView}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.messageText}>{message}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    imageView: {
        paddingHorizontal: 16,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
    },
    messageText: {
        fontSize: 14,
    },
});
export default ChatItem;
