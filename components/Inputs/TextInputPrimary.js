import { forwardRef, useState } from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";

function TextInputPrimary({ placeholder, isPass, keyboardType}, ref) {
  const [isPassState, setIsPassState] = useState(isPass);
  const [text, setText] = useState("");

  const handleChangeText = (value) => {
    setText(preValue => {
      ref.current = value;
      setText(value)
    });
  };

  return (
    <View style={styles.frameInput}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        secureTextEntry={isPassState}
        value={text}
        onChangeText={handleChangeText}
        keyboardType={keyboardType}
      />
      {isPass && (
        <Icon
          name="eye-outline"
          color="#000"
          size={20}
          onPress={() => setIsPassState(!isPassState)}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  frameInput: {
    borderColor: "#5D90F5",
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    height: 50,
    width: 330,
    paddingLeft: 20,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    fontSize: 16,
    width: 260,
    marginRight: 10,
  },
});

export default forwardRef(TextInputPrimary);
