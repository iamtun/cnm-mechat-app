import { View, Text, Image, StyleSheet } from 'react-native';
import { Video, Audio } from 'expo-av';
import { useEffect } from 'react';
function ImageMessage({ imageURI, content }) {
    useEffect(() => {
        Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    }, []);

    return (
        <View style={styles.body}>
            {imageURI.split('.')[imageURI.split('.').length - 1] === 'mov' ? (
                <Video
                    style={styles.imageMessage}
                    source={{ uri: imageURI }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    volume={1.0}
                />
            ) : (
                <Image source={{ uri: imageURI }} style={styles.imageMessage} resizeMode="stretch"/>
            )}
            {content && <Text style={[styles.message]}>{content}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    message: {
        paddingTop: 8,
    },
    imageMessage: {
        width: 250,
        height: 350,
    },
});
export default ImageMessage;
