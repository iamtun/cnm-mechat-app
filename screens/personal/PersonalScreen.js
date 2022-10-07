import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {searchItemClickSelector} from "../../redux/selector"

import moment from 'moment';
moment().format();

function PersonalScreen({ navigation }) {
    const isFriend = true;

    const userInfo = useSelector(searchItemClickSelector);
    const {fullName, bio, gender, birthday, avatarLink, backgroundLink} = userInfo;

    //handle go back set search -> null

    return (
        <View>
            <View style={styles.background}>
                <Image style={styles.backgroundImage} source={{uri: backgroundLink}} />
            </View>
            <View style={styles.bottomContainer}>
                <Image style={styles.avatar} source={{uri: avatarLink}} />
                <Text style={styles.name}>{fullName}</Text>
                <Text style={styles.bio}>{bio}</Text>
                <View style={styles.info}>
                    <Text style={styles.title}>Thông tin cá nhân</Text>
                    <View style={styles.infoDetail}>
                        <Text>Giới tính: {gender === 0 ? "Nam" : "Nữ"}</Text>
                        <Text>Ngày sinh: {moment(birthday).format('MM/DD/YYYY')}</Text>
                    </View>
                </View>
                {!isFriend ? (
                    <TouchableOpacity style={styles.buttonMakeFriend}>
                        <Icon style={{ marginRight: 10 }} name="person-add-outline" color="#4ACFED" size={20} />
                        <Text>Kết bạn</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
            {isFriend ? (
                <TouchableOpacity style={styles.buttonChat} onPress={goHomeScreen}>
                    <Icon
                        style={{ marginRight: 10 }}
                        name="ios-chatbubble-ellipses-outline"
                        color="#4F8ADC"
                        size={25}
                    />
                    <Text style={{ fontSize: 13 }}>Nhắn tin</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        with: '100%',
        height: '55%',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    bottomContainer: {
        position: 'absolute',
        marginTop: '65%',
        height: '190%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    avatar: {
        height: 130,
        width: 130,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 2,
        bottom: '8%',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        bottom: '8%',
    },
    bio: {
      bottom: '7%',
    },
    info: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        bottom: "4%",
    },
    title: {
      fontWeight: 'bold',
      textAlign: "center"
    },
    infoDetail: {
        margin: 8,
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonMakeFriend: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 50,
        borderRadius: 15,
        borderColor: '#1E99CA',
        borderWidth: 2,
    },
    buttonChat: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 40,
        borderRadius: 13,
        backgroundColor: 'white',
        borderColor: '#1E99CA',
        shadowColor: '#000',
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 20,
        top: '110%',
        marginStart: '70%',
    },
});

export default PersonalScreen;
