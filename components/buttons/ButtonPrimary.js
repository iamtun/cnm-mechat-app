import { Text, StyleSheet, TouchableOpacity } from "react-native";

function ButtonPrimary({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 40,
    marginTop: 16,
    backgroundColor: "#2a9d8f",
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
export default ButtonPrimary;
