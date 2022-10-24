import { useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import GlobalStyle from "../styles/GlobalStyle";
import { getItem, removeItem } from "../utils/asyncStorage";
import { fetchUserInfo } from "../redux/slice/userInfoSlice";
import { fetchUsers } from "../redux/slice/usersSlice";

function LoadingScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  //removeItem("user_token");

  useEffect(() => {
    if (!isFocus) return;
    else {
      getItem("user_token")
        .then((token) => {
          if (token) {
            dispatch(fetchUsers());
            dispatch(fetchUserInfo(token));
            setTimeout(() => {
              navigation.navigate("HomeScreen", { screen: "HomeScreen" });
            }, 2000);
          }
        })
        .catch((err) => {
          navigation.navigate("LoginScreen", { screen: "LoginScreen" });
          return err;
        });
    }
  }, [isFocus]);

  return (
    <View style={GlobalStyle.container}>
      <ActivityIndicator size="large" color={GlobalStyle.primaryColor} />
      <Text>Loading...</Text>
    </View>
  );
}

export default LoadingScreen;
