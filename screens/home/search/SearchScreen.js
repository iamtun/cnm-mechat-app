import { useState } from "react";
import React from "react";
import Header from '../../../components/Header';
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SearchScreen({ route, navigation }) {
  //   const userSearching = route.params.userSearching;
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (value) => {
    setSearchInput(() => setSearchInput(value));
  };
  return (
    <>
      <Header />
      <View style={styles.searchBar}>
        <Icon
        style ={{marginLeft:10}}
          name="arrow-left"
          size={30}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.inputSearch}>
          <TextInput
            placeholder="Tìm kiếm"
            value={searchInput}
            onChangeText={handleSearchInput}
          />
        </View>
        {/* {userSearching === 1 ? (
        <SearchItem isNull />
      ) : (
        <FlatList
          data={userSearching}
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
      )} */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    width: "100%",
    backgroundColor: "#3777F3",
    flexDirection: "row",
    alignItems: "center"
  },
  inputSearch: {
    marginLeft: 20,
    width: "70%",
    height: "70%",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
});
