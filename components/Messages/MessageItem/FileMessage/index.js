import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, Image } from 'react-native';
import { iconExtends, icons, handleFileExtension, handleFileName } from '../../../../utils/filePathConfig';
function FileMessage({ fileUri, navigation }) {
    const fileEx = handleFileExtension(fileUri);
    const fileName = handleFileName(fileUri);

    const handleOpenFile = () => {
        navigation.navigate('ViewFileScreen', {link: fileUri});
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleOpenFile}>
            <Image source={iconExtends.includes(fileEx) ? icons[fileEx] : icons['blank']} style={styles.icon} />
            <Text style={styles.file}>{fileName}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 275,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 70,
        height: 70,
    },
    file: {
        width: '80%',
        height: '100%',
        padding: 8,
        fontWeight: 'bold',
    },
});

export default FileMessage;
