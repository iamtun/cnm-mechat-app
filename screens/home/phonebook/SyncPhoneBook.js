import { useEffect } from "react";
import * as Contacts from "expo-contacts";
import { useSelector } from "react-redux";
import { userInfoSelector, userListSelector } from "../../../redux/selector";
import Header from "../../../components/Header";
import { useState } from "react";
import { FlatList } from "react-native";
import SearchItem from "../../../components/SearchBar/SearchItem";
import { View } from "react-native";

function SyncPhoneBook({ navigation }) {
  const users = useSelector(userListSelector);
  const me = useSelector(userInfoSelector);
  const [friends, setFriends] = useState([]);

  //get my number phone
  useEffect(() => {
    const getPhoneNumbersByDevice = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      const phones = [];
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          data.forEach((d) =>
            d.phoneNumbers != undefined
              ? phones.push(d.phoneNumbers[0].digits)
              : null
          );
        }

        return phones;
      }
    };

    const syncPhoneBook = async () => {
      const phones = await getPhoneNumbersByDevice();
      const _friends = users.filter(
        (user) =>
          phones.includes(user.phoneNumber) && !me.friends.includes(user._id)
      );
      setFriends(_friends);
    };
    syncPhoneBook();
  }, []);

  return (
    <>
      <Header />
      <View>
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
      </View>
    </>
  );
}

export default SyncPhoneBook;
