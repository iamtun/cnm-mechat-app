import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ToolTip from './Menu/Tooltip';

function SearchBar({ isRefresh, setIsRefresh }) {
    const [isVisible, setIsVisible] = useState(false);

    const onOpenSearch = () => {
        setIsRefresh(false);
    };

    const onHideSearch = () => {
        setIsRefresh(true);
    };

    const onOpenMenu = () => setIsVisible(true);

    return (
        <View style={styles.searchBar}>
            {isRefresh === true ? (
                <>
                    <Icon name="arrow-left" size={30} color="#fff" onPress={onOpenSearch} />
                    <TextInput style={styles.inputSearch} placeholder="Tìm kiếm" />
                </>
            ) : (
                <>
                    <Icon name="magnify" size={30} color="#fff" />
                    <View style={styles.textSearch}>
                        <Text style={styles.textSearch} onPress={onHideSearch}>
                            Tìm Kiếm
                        </Text>
                    </View>
                </>
            )}

            <ToolTip isVisible={isVisible} setIsVisible={setIsVisible}>
                <Icon name="plus" size={30} color="#fff" onPress={onOpenMenu} />
            </ToolTip>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        height: 50,
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
