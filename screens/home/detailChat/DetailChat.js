import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';
import DetailFeature from '../../../components/DetailFeature/DetailFeature';
import Header from '../../../components/Header';
import userInfoSlice from '../../../redux/slice/userInfoSlice';
import { userInfoSelector } from '../../../redux/selector';
import { fetchChangeNameGroup, fetchOutGroup, fetchUpdateAvatarGroup } from '../../../redux/slice/conversationSlice';
import useDebounce from '../../../hooks/useDebounce';

export default function DetailChat({ route, navigation }) {
    const { isGroup, members, name, image, createdBy, idConversation } = route.params;
    const userInfo = useSelector(userInfoSelector);
    const idFriend = userInfo._id === members[0] ? members[1] : members[0];
    const [isOutGroup, setIsOutGroup] = useState(false);
    const debounce = useDebounce(isOutGroup, 1000);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNameGroup, setNewNameGroup] = useState(name);

    const dispatch = useDispatch();

    const handleClickInfo = () => {
        if (!isGroup) {
            dispatch(userInfoSlice.actions.clickSearchItem(idFriend));
            navigation.navigate('PersonalScreen', { isMe: false });
        }
    };

    const handleAddMembers = () => {
        navigation.navigate('NewGroupChat', { isCreate: false, members: members, idConversation });
    };

    //out group
    const outGroup = () => {
        const data = {
            idConversation: idConversation,
            userId: userInfo._id,
        };

        console.log(data);
        dispatch(fetchOutGroup(data));
        setIsOutGroup(true);
    };

    // change name group
    const changeNameGroup = () => {
        const data = {
            idConversation: idConversation,
            newName: newNameGroup,
            userId: userInfo._id,
        };
        console.log(data);
        dispatch(fetchChangeNameGroup(data));

        setNewNameGroup('');
        setModalVisible(!modalVisible);
    };

    //update avartar nhóm
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            videoQuality: ImagePicker.UIImagePickerControllerQualityType.High,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const data = {
                key1: 'userId',
                key2: 'imageLink',
                userId: userInfo._id,
                imageLink: result.uri,
                idConversation: idConversation
            };
            dispatch(fetchUpdateAvatarGroup(data));
        }
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.frameNameGroup}>
                                <Icon style={{ marginRight: 10 }} name="pencil" color="black" size={22} />
                                <TextInput
                                    value={newNameGroup}
                                    style={{ fontSize: 18, width: '90%', height: '100%' }}
                                    onChangeText={(value) => {
                                        setNewNameGroup(value);
                                    }}
                                    placeholder="Đặt tên nhóm"
                                ></TextInput>
                            </View>
                            <View style={styles.handle}>
                                <TouchableOpacity
                                    style={styles.buttonRemove}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonAdd} onPress={() => changeNameGroup()}>
                                    <Text style={{ color: 'white' }}>Đồng ý</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon style={{ marginLeft: 10 }} name="arrow-back-outline" color="white" size={20} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>Tùy chọn</Text>
                </View>
                <View style={styles.infoUser}>
                    <View style={styles.avatar}>
                        <TouchableOpacity onPress={pickImage}>
                            <Avatar rounded size={90} source={{ uri: image }}></Avatar>
                        </TouchableOpacity>

                        {isGroup ? (
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 15, fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
                                <TouchableOpacity style={styles.editName} onPress={() => setModalVisible(true)}>
                                    <Icon name="pencil-outline" color="black" size={18} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Text style={{ marginTop: 15, fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
                        )}
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
    editName: {
        marginLeft: 10,
        marginTop: 15,
        backgroundColor: '#E5E5E5',
        width: 25,
        height: 25,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    frameNameGroup: {
        padding: 5,
        height: 60,
        borderBottomColor: '#CCE8FF',
        alignItems: 'center',
        borderBottomWidth: 2,
        flexDirection: 'row',
        width: '100%',
    },
    handle: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 150,
    },
    buttonRemove: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 40,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#33B0E0',
        marginRight: 30,
    },
    buttonAdd: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 40,
        borderRadius: 15,
        backgroundColor: '#3475F5',
    },
});
