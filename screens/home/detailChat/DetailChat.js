import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DetailFeature from '../../../components/DetailFeature/DetailFeature';
import Header from '../../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import userInfoSlice from '../../../redux/slice/userInfoSlice';
import { userInfoSelector } from '../../../redux/selector';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchOutGroup } from '../../../redux/slice/conversationSlice';
import useDebounce from '../../../hooks/useDebounce';

export default function DetailChat({ route, navigation }) {
    const { isGroup, members, name, image, createdBy, idConversation } = route.params;
    const userInfo = useSelector(userInfoSelector);
    const idFriend = userInfo._id === members[0] ? members[1] : members[0];
    const [isOutGroup, setIsOutGroup] = useState(false);
    const debounce = useDebounce(isOutGroup, 1000);

    const dispatch = useDispatch();

    const handleClickInfo = () => {
        if (!isGroup) {
            dispatch(userInfoSlice.actions.clickSearchItem(idFriend));
            navigation.navigate('PersonalScreen', { isMe: false });
        }
    };

    const handleAddMembers = () => {
        navigation.navigate('NewGroupChat', { isCreate: false });
    };

    console.log('userInfo._id', userInfo._id);
    const outGroup = () => {
        const data = {
            idConversation: idConversation,
            userId: userInfo._id,
        };

        console.log(data);
        dispatch(fetchOutGroup(data));
        setIsOutGroup(true);
    };

    useEffect(() => {
        if (isOutGroup) {
            navigation.navigate('HomeScreen');
        }
    }, [debounce]);
    return (
        <>
            <Header />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon style={{ marginLeft: 10 }} name="arrow-back-outline" color="white" size={20} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>Tùy chọn</Text>
                </View>
                <View style={styles.infoUser}>
                    <View style={styles.avatar}>
                        <Avatar rounded size={90} source={{ uri: image }}></Avatar>
                        <Text style={{ marginTop: 15, fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
                    </View>
                    <View style={styles.feature}>
                        <DetailFeature nameIcon="search-outline" nameFeature="Tìm tin nhắn"></DetailFeature>
                        {isGroup ? (
                            <DetailFeature
                                onPress={handleAddMembers}
                                nameIcon="person-add-outline"
                                nameFeature="Thêm hành viên"
                            ></DetailFeature>
                        ) : (
                            <DetailFeature
                                nameIcon="person-outline"
                                nameFeature="Trang cá nhân"
                                onPress={handleClickInfo}
                            ></DetailFeature>
                        )}

                        <DetailFeature nameIcon="brush-outline" nameFeature="Đổi hình nền"></DetailFeature>
                        <DetailFeature nameIcon="notifications-outline" nameFeature="Tắt thông báo"></DetailFeature>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.photo}
                    onPress={() => {
                        navigation.navigate('ImageScreen');
                    }}
                >
                    <Icon name="images-outline" color="black" size={20}></Icon>
                    <Text style={{ marginLeft: 10 }}>Ảnh,file,video đã gửi</Text>
                </TouchableOpacity>
                {isGroup ? (
                    <>
                        <TouchableOpacity
                            style={styles.photo}
                            onPress={() =>
                                navigation.navigate('AllMembers', {
                                    idConversation,
                                    createdBy,
                                    isGroup,
                                    members: members,
                                })
                            }
                        >
                            <Icon name="people-outline" color="black" size={20}></Icon>
                            <Text style={{ marginLeft: 10 }}>Xem thành viên</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.photo} onPress={outGroup}>
                            <Icon name="enter-outline" color="red" size={20}></Icon>
                            <Text style={{ marginLeft: 10, color: 'red' }}>Rời nhóm</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity style={styles.photo}>
                        <Icon name="remove-circle-outline" color="black" size={20}></Icon>
                        <Text style={{ marginLeft: 10 }}>Chặn tin nhắn</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.photo}>
                    <Icon name="trash-bin-outline" color="red" size={20}></Icon>
                    <Text style={{ marginLeft: 10, color: 'red' }}>Xóa cuộc trò chuyện</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E1E2E3',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#3475F5',
    },
    infoUser: {
        backgroundColor: 'white',
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 150,
        marginTop: 10,
    },
    feature: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    photo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        marginTop: 10,
        padding: 10,
    },
});
