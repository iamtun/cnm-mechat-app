import { useEffect } from 'react';
import * as Contacts from 'expo-contacts';
import { useSelector } from 'react-redux';
import { userInfoSelector, userListSelector } from '../../../redux/selector';
import Header from '../../../components/Header';
import { useState } from 'react';
import { Alert, FlatList, Platform } from 'react-native';
import SearchItem from '../../../components/SearchBar/SearchItem';
import { StyleSheet, Text, View } from 'react-native';

function SyncPhoneBook({ navigation }) {
    const users = useSelector(userListSelector);
    const me = useSelector(userInfoSelector);
    const [friends, setFriends] = useState([]);

    const getPhoneNumbers = async () => {
        const phones = [];
        //request permission
        const { status } = await Contacts.requestPermissionsAsync();

        //check permission
        if (status === 'granted') {
            //get data
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });

            //check data to platform
            if (data.length > 0) {
                if (Platform.OS === 'ios') {
                    data.forEach((d) => (d.phoneNumbers != undefined ? phones.push(d.phoneNumbers[0].digits) : null));
                } else if (Platform.OS === 'android') {
                    data.forEach((d) => (d.phoneNumbers != undefined ? phones.push(d.phoneNumbers[0].number) : null));
                }
            }
        } else {
            console.warn('no permission!');
        }

        return phones;
    };

    const getPhoneNumbersByDevice = async () => {
        const statusPermission = await Contacts.getPermissionsAsync();
        if (statusPermission.status === Contacts.PermissionStatus.DENIED) {
            const phones = await getPhoneNumbers();
            return phones;
        } else {
            const phones = await getPhoneNumbers();
            return phones;
        }
    };

    const syncPhoneBook = async () => {
        try {
            const phones = await getPhoneNumbersByDevice();
            if (phones?.length > 0) {
                const _friends = users.filter(
                    (user) => phones.includes(user.phoneNumber) && !me.friends.includes(user._id),
                );
                setFriends(_friends);
            } else {
                setFriends(null);
            }
        } catch (error) {
            Alert.alert('Lỗi đồng bộ', error.message);
        }
    };

    useEffect(() => {
        syncPhoneBook();
    }, []);

    return (
        <>
            <Header />
            <Text style={styles.title}>Đồng bộ danh bạ</Text>
            <View>
                {friends?.length > 0 ? (
                    <FlatList
                        data={friends}
                        renderItem={({ item }) => (
                            <SearchItem
                                id={item._id}
                                name={item.fullName}
                                phonNumber={item.phoneNumber}
                                image={item.avatarLink}
                                isFriend={item.isFriend}
                                navigation={navigation}
                            />
                        )}
                    />
                ) : (
                    <Text>Không có bạn bè nào trong danh bạ!</Text>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        padding: 16,
        textAlign: 'center',
        fontSize: 18,
        color: "#333",
        fontWeight: 'bold',
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
});
export default SyncPhoneBook;
