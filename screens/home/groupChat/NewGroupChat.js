import { View, Text, StyleSheet, TextInput } from 'react-native';
import Header from '../../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

function NewGroupChat() {
    const [searchInput, setSearchInput] = useState(null);
    return (
        <>
            <Header />
            <View style={styles.container}>
                <View style={styles.frameNameGroup}>
                    <Icon style={{ marginRight: 10 }} name="pencil" color="black" size={22} />
                    <TextInput style={{ fontSize: 18 }} placeholder="Đặt tên nhóm"></TextInput>
                </View>
                <View style={styles.searchBar}>
                    <Icon style={{ marginLeft: 10 }} name="search-outline" size={22} color="black" />
                    <View style={styles.inputSearch}>
                        <TextInput
                            style={{ marginLeft: 5 , width: "100%"}}
                            placeholder="Tìm tên hoặc số điện thoại"
                            value={searchInput}
                            onChangeText={(value) => {
                                setSearchInput(value);
                            }}
                        />
                    </View>
                </View>
                <View style ={{width: "100%", height:500, marginTop: 10}}>

                </View>
                <TouchableOpacity style={styles.successRegister}>
                    <Icon style={{ marginRight: 10 }} name="create-outline"  size={22} />
                    <Text >Tạo nhóm</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    frameNameGroup: {
        padding: 5,
        marginTop: 10,
        height: 60,
        borderRadius: 8,
        borderBottomColor: '#CCE8FF',
        alignItems: 'center',
        borderBottomWidth: 2,
        flexDirection: 'row',
        width: '90%',
    },
    searchBar: {
        marginTop: 20,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#E5E5E5',
    },
    successRegister: {
        marginTop: 10,
        backgroundColor: "#1BA9FF",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: '90%',
        height: 50,
        marginBottom: 0
    },
});
export default NewGroupChat;
