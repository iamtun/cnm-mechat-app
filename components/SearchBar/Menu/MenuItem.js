import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MenuItem({ icon, title, color, onPress }) {
  return (
    <TouchableOpacity style={styles.body} onPress={onPress}>
      <Icon name={icon} size={20} />
      <Text style={[styles.title, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 14,
    padding: 8,
  },
});
export default MenuItem;
