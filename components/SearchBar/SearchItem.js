import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import userInfoSlice from '../../redux/slice/userInfoSlice';
import { getUserByPhoneNumber, userInfoSelector, friendListSelector } from '../../redux/selector';
import { fetchFriendsRequest, fetchBackFriendRequest } from '../../redux/slice/friendSlice';
function SearchItem({ id, image, name, phonNumber, isFriend, isNull, navigation }) {
    const dispatch = useDispatch();
    const [isRequest, setIsRequest] = useState(false);

    const usersByPhone = useSelector(getUserByPhoneNumber);
    const _userInfoSelector = useSelector(userInfoSelector);
    const allFriendsRequest = useSelector(friendListSelector);

  // console.log("usersByPhone", usersByPhone);
  // console.log("_userInfoSelector", _userInfoSelector);
  // request make friend
  const _handleSendRequest = () => {
    //Set data for send require make friend
    const data = {
      senderID: _userInfoSelector._id,
      receiverID: usersByPhone[0]._id,
    };
    setIsRequest(true);
    dispatch(fetchFriendsRequest(data));
  };

    //Close request make friend
    const _handleCloseRequest = () => {
        setIsRequest(false);
        const data = {
            friendRequestID: allFriendsRequest.receiver.id,
            status: isRequest,
            senderID: _userInfoSelector._id,
        };
        dispatch(fetchBackFriendRequest(data));
    };

    const handleClickSearchItem = () => {
        dispatch(userInfoSlice.actions.clickSearchItem(id));
        navigation.navigate('PersonalScreen', {isMe: false });
    };

    return (
        <View style={[styles.container, isNull ? styles.noSearchText : null]}>
            {isNull ? (
                <Text> Không tìm thấy</Text>
            ) : (
                <>
                    <TouchableOpacity style={styles.body} onPress={isNull ? null : handleClickSearchItem}>
                        <Image source={{ uri: image }} style={styles.image} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{name}</Text>
                            {isFriend ? null : <Text style={styles.phonNumber}>{phonNumber}</Text>}
                        </View>
                    </TouchableOpacity>

                    <View>
                        {isFriend ? (
                            <View style={styles.call}>
                                <TouchableOpacity>
                                    <Icon name="ios-call-outline" size={24} style={styles.icon} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon name="md-videocam-outline" size={24} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={() => (isRequest ? _handleCloseRequest() : _handleSendRequest())}
                                style={styles.buttonAdd}
                            >
                                <Icon color="#3777F3" name={isRequest ? 'close' : 'person-add-outline'} size={20} />
                                <Text style={{ marginLeft: 5, color: '#59AFC4' }}>{isRequest ? 'Hủy' : 'Kết bạn'}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
    },
    body: {
        width: '75%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    call: {
        width: '100%',
        flexDirection: 'row',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginLeft: 20,
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
        marginRight: 24,
    },
    noSearchText: {
        justifyContent: 'center',
    },
    buttonAdd: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 40,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#33B0E0',
        marginRight: 8,
    },
});

export default SearchItem;
