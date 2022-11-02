import { View, Text, Image, StyleSheet } from 'react-native';
import { Video, Audio } from 'expo-av';
import { useEffect } from 'react';
import ImageView from 'react-native-image-viewing';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
function ImageMessage({ imageURI, content }) {
    const [visible, setVisible] = useState(false);

    const handleViewingImage = () => {
        setVisible(true);
    };
    return (
        <>
            <View style={styles.body}>
                {imageURI.split('.')[imageURI.split('.').length - 1] === 'mp4' ? (
                    <Video
                        style={styles.imageMessage}
                        source={{ uri: imageURI }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        volume={1.0}
                    />
                ) : (
                    <TouchableOpacity onPress={handleViewingImage}>
                        <Image source={{ uri: imageURI }} style={styles.imageMessage} resizeMode="stretch" />
                    </TouchableOpacity>
                )}
                {content && <Text style={[styles.message]}>{content}</Text>}
            </View>

            <ImageView
                images={[{ uri: imageURI }]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            />
        </>
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
