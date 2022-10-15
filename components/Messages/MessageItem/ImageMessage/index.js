import { View, Text, Image, StyleSheet } from 'react-native';

function ImageMessage({ imageURI, content }) {
    return (
        <View style={styles.body}>
            <Image source={{ uri: imageURI }} style={styles.imageMessage} />
            {content && <Text style={[styles.message]}>{content}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    message: {
        paddingTop: 8,
    },
    imageMessage: {
        width: 270,
        height: 350,
    },
});
export default ImageMessage;
