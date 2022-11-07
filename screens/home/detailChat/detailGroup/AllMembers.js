import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import conversationsListByUserId from '../../../../redux/slice/conversationSlice';
import { getFriendsWithMembers } from '../../../../redux/selector';
import SearchItem from '../../../../components/SearchBar/SearchItem';
import Header from '../../../../components/Header';

function AllMembers({ route, navigation }) {
    const dispatch = useDispatch();
    const { createdBy, members, isGroup, idConversation } = route.params;
    console.log('idConversation', idConversation);
    useEffect(() => {
        dispatch(conversationsListByUserId.actions.getMembers(members));
    });

    const memberFriends = useSelector(getFriendsWithMembers);

    return (
        <>
            <Header />
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon style={{ marginLeft: 10 }} name="arrow-back-outline" color="white" size={20} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>Danh sách thành viên</Text>
                </View>
                <FlatList
                    style={{ marginTop: 5 }}
                    data={memberFriends}
                    renderItem={({ item }) => (
                        <SearchItem
                            idConversation={idConversation}
                            id={item._id}
                            name={item.fullName}
                            phonNumber={item.phoneNumber}
                            image={item.avatarLink}
                            isFriend={item.isFriend}
                            isGroup={isGroup}
                            createdBy={createdBy}
                            navigation={navigation}
                        />
                    )}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#3475F5',
    },
});
export default AllMembers;
