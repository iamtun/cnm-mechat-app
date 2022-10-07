import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import userInfoSlice from '../../redux/slice/userInfoSlice';

function SearchItem({ id, image, name, phonNumber, isFriend, isNull, navigation }) {
    const dispatch = useDispatch();

    const handleClickSearchItem = () => {
        dispatch(userInfoSlice.actions.clickSearchItem(id));
        navigation.navigate("PersonalScreen");
    }
    return (
        <TouchableOpacity
            style={[styles.container, isNull ? styles.noSearchText : null]}
            onPress={handleClickSearchItem}
        >
            {isNull ? (
                <Text> Không tìm thấy</Text>
            ) : (
                <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.body}>
                        <View style={styles.info}>
                            <Text style={styles.name}>{name}</Text>
                            {isFriend ? null : <Text style={styles.phonNumber}>{phonNumber}</Text>}
                        </View>
                        <View>
                            {isFriend ? (
                                <Icon name="ios-call-outline" size={24} style={styles.icon} />
                            ) : (
                                <Icon name="person-add-outline" size={24} style={styles.icon} />
                            )}
                        </View>
                    </View>
                </>
            )}
        </TouchableOpacity>
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
    noSearchText: {
        justifyContent: 'center',
    },
});

export default SearchItem;
