import { View, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
function SearchItem({ image, name, phonNumber, isFriend }) {
    //console.log(image);
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.body}>
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.phonNumber}>{phonNumber}</Text>
                </View>
                <View>
                    {isFriend ? (
                        <Icon name="phone-in-talk" size={32} style={styles.icon} />
                    ) : (
                        <Icon name="account-plus" size={32} style={styles.icon} />
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    body: {
        width: '80%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginHorizontal: 8,
    },
    info: {
        marginLeft: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    icon: {
        color: '#3777F3',
        marginRight: 16,
    },
});

export default SearchItem;
