import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tooltip from 'react-native-walkthrough-tooltip';
import SearchItem from './SearchItem';
import MenuItem from './Menu/MenuItem';

const users = [
    {
        id: 'u1',
        name: 'Thanh Nho',
        avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
    },
    {
        id: 'u2',
        name: 'Le Tuan',
        avatar: 'https://zpsocial-f51-org.zadn.vn/2bb60175220bcc55951a.jpg',
    },
];

const items = [
    {
        id: 1,
        icon: 'account-multiple-plus-outline',
        title: 'Tạo nhóm',
    },
    {
        id: 2,
        icon: 'account-plus-outline',
        title: 'Thêm bạn',
    },
];

function SearchBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const onOpenSearch = () => {
        setIsSearch(true);
    };

    const onHideSearch = () => {
        setIsSearch(false);
    };

    const onOpenMenu = () => setIsVisible(true);

    const handleSearchInput = (value) => {
        setSearchInput(value);
    };

    return (
        <View style={styles.searchBar}>
            {isSearch === true ? (
                <>
                    <Icon name="arrow-left" size={30} color="#fff" onPress={onHideSearch} />
                    <View style={styles.inputSearch}>
                        <TextInput placeholder="Tìm kiếm" value={searchInput} onChangeText={handleSearchInput} />
                    </View>
                </>
            ) : (
                <>
                    <Icon name="magnify" size={30} color="#fff" />
                    <View style={styles.textSearch}>
                        <Text style={styles.textSearch} onPress={onOpenSearch}>
                            Tìm Kiếm
                        </Text>
                    </View>
                </>
            )}

            <Tooltip
                isVisible={isVisible}
                content={
                    <>
                        {items.map((item) => (
                            <MenuItem icon={item.icon} title={item.title} key={item.id} />
                        ))}
                    </>
                }
                //style tool tips
                placement={'bottom'}
                onClose={() => setIsVisible(!isVisible)}
                contentStyle={{ width: 150, height: 100 }}
                {...(Platform.OS === 'ios'
                    ? { tooltipStyle: { marginLeft: 17, marginTop: 10 } }
                    : { tooltipStyle: { marginLeft: 17, marginTop: -40 } })}
            >
                <Icon name="plus" size={30} color="#fff" onPress={onOpenMenu} />
            </Tooltip>
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
        justifyContent: 'center',
    },
    textSearch: {
        width: '70%',
        color: '#fff',
        fontSize: 18,
    },
});

export default SearchBar;
