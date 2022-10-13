import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';

function AddFriendScreen({ navigation }) {
    const [text, setText] = useState('');
    const clearText = () => {
        setText('');
    };
    return (
        <>
            <Header />
            <View style={styles.viewTitle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon style={{ marginLeft: 10 }} name="arrow-back-outline" color="white" size={30} />
                </TouchableOpacity>
                <Text style={styles.title}>Thêm bạn</Text>
            </View>
            <View style={styles.viewSubTitle}>
                <Text style={styles.subTitle}>Thêm bạn bằng số điện thoại</Text>
            </View>
            <View style={styles.viewInput}>
                <TextInput
                    keyboardType="number-pad"
                    style={styles.input}
                    placeholder="Nhập số điện thoại"
                    onChangeText={(txt) => setText(txt)}
                    value={text}
                />
                {text.length <= 0 ? null : (
                    <TouchableOpacity onPress={clearText}>
                        <Icon name="close" color="#111" size={25} />
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.viewSearch}>
                    <Text style={styles.textSearch}>TÌM</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    viewTitle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        width: '100%',
        backgroundColor: '#33B0E0',
    },
    title: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    viewSubTitle: {
        height: 30,
        width: '100%',
        backgroundColor: '#E1E2E3',
    },
    subTitle: {
        fontSize: 13,
        marginLeft: 20,
        marginTop: 5,
    },
    viewInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: '100%',
        backgroundColor: 'white',
    },
    input: {
        width: '70%',
    },
    viewSearch: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 30,
        backgroundColor: '#1E99CA',
        borderRadius: 15,
    },
    textSearch: {
        color: 'white',
    },
});

export default AddFriendScreen;
