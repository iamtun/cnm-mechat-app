import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function SearchBar({ isRefresh }) {
    return (
        <View style={styles.searchBar}>
            {isRefresh === true ? (
                <>
                    <Icon name="arrow-left" size={30} color="#fff" />
                    <TextInput style={styles.inputSearch} placeholder="Tìm kiếm" />
                </>
            ) : (
                <>
                    <Icon name="magnify" size={30} color="#fff" />
                    <View style={styles.textSearch}>
                        <Text style={styles.textSearch} onPress={() => !isRefresh}>
                            Tìm Kiếm
                        </Text>
                    </View>
                </>
            )}

            <Icon name="plus" size={30} color="#fff" />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        height: 60,
        width: '100%',
        backgroundColor: '#3777F3',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    inputSearch: {
        width: '70%',
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    textSearch: {
        width: '70%',
        color: '#fff',
        fontSize: 18,
    },
});

export default SearchBar;
