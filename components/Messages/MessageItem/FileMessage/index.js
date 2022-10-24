import { Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, Text, Image } from "react-native";

function FileMessage({ fileUri }) {
  const filePaths = fileUri.split("/");
  const fileExtend = fileUri.split(".");
  const fileEx = fileExtend[fileExtend.length - 1];
  const fileName = filePaths[filePaths.length - 1];

  const iconExtends = ["docx", "ppt", "pdf", "xlsx"];
  const icons = {
    docx: require("../../../../assets/file-icon/word-icon.png"),
    ppt: require("../../../../assets/file-icon/pwp-icon.png"),
    pdf: require("../../../../assets/file-icon/pdf-icon.png"),
    xlsx: require("../../../../assets/file-icon/excel-icon.png"),
    blank: require("../../../../assets/file-icon/blank.png"),
  };

  const handleOpenFile = async() => {
    const supported  = await Linking.canOpenURL(fileUri);

    if(supported ) {
        await Linking.openURL(fileUri);
    }else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleOpenFile}>
      <Image
        source={iconExtends.includes(fileEx) ? icons[fileEx] : icons["blank"]}
        style={styles.icon}
      />
      <Text style={styles.file}>{fileName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 70,
    height: 70,
  },
  file: {
    width: "80%",
    height: "100%",
    padding: 8,
    fontWeight: "bold",
  },
});

export default FileMessage;
