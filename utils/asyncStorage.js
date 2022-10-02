import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = (key, val) => {
  AsyncStorage.setItem(key, JSON.stringify(val))
    .then(() => {
      console.log(`save ${key} success!`);
    })
    .catch((err) => {
      console.log(`save ${key} err!`, err);
    });
};

export const getItem = (key) => {
  return AsyncStorage.getItem(key).then((val) => {
    console.log('getItem',val);
    return val;
  });
};

export const removeItem = (key) => {
  return AsyncStorage.removeItem(key)
}