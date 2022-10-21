import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import Header from "../../components/Header";
import filterSlice from "../../redux/slice/filterSlice";
import useDebounce from "../../hooks/useDebounce";
import { getUserByPhoneNumber } from "../../redux/selector";
import SearchItem from "../../components/SearchBar/SearchItem";
import { userInfoSelector, friendListSelector } from "../../redux/selector";
import {
  fetchFriendsRequest,
  fetchBackFriendRequest,
  fetchListFriendRequestSent,
} from "../../redux/slice/friendSlice";

function AddFriendScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isRequest, setIsRequest] = useState(false);

  const allFriendsRequest = useSelector(friendListSelector);

  //Set phone number when change text
  const [text, setText] = useState("");
  //Get user by phone number
  const usersByPhone = useSelector(getUserByPhoneNumber);
  //Get info me
  const _userInfoSelector = useSelector(userInfoSelector);
  //Get all friend request sent
  useEffect(() => {
    search;
    clearText;
    _handleClick;
    allFriendsRequest;
  }, []);

  //click button remove text
  const clearText = () => {
    setText("");
    dispatch(filterSlice.actions.searchFilterChange(null));
  };

  //dispatch actions search
  const search = () => {
    dispatch(filterSlice.actions.searchFilterChange(text));
  };
  
  //click button search
  const _handleClick = () => {
    search();
    usersByPhone;
  };
 
  // request make friend
  const _handleRequest = () => {
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

  return (
    <>
      <Header />
      <View style={styles.viewTitle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            style={{ marginLeft: 10 }}
            name="arrow-back-outline"
            color="white"
            size={30}
          />
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
        <TouchableOpacity style={styles.viewSearch} onPress={_handleClick}>
          <Text style={styles.textSearch}>TÌM</Text>
        </TouchableOpacity>
      </View>

      {usersByPhone === 1 ? (
        <View style={{ marginTop: 5 }}>
          <SearchItem isNull />
        </View>
      ) : (
        <FlatList
          style={{ marginTop: 5 }}
          data={usersByPhone}
          renderItem={({ item }) => (
            <SearchItem
              id={item._id}
              name={item.fullName}
              phonNumber={item.phoneNumber}
              image={item.avatarLink}
              isFriend={item.isFriend}
              onPress={isRequest ? _handleCloseRequest : _handleRequest}
              isRequest={isRequest}
            />
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  viewTitle: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    width: "100%",
    backgroundColor: "#33B0E0",
  },
  title: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  viewSubTitle: {
    height: 30,
    width: "100%",
    backgroundColor: "#E1E2E3",
  },
  subTitle: {
    fontSize: 13,
    marginLeft: 20,
    marginTop: 5,
  },
  viewInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: "100%",
    backgroundColor: "white",
  },
  input: {
    padding: 10,
    width: "70%",
  },
  viewSearch: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 30,
    backgroundColor: "#1E99CA",
    borderRadius: 15,
  },
  textSearch: {
    color: "white",
  },
});

export default AddFriendScreen;
