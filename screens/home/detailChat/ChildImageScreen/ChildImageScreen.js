import { View, Image, FlatList, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ImageView from 'react-native-image-viewing';
import { getImageMessage } from '../../../../redux/selector';
import { TouchableOpacity } from 'react-native';
import { handleFileExtension } from '../../../../utils/filePathConfig';

function ChildImageScreen() {
    const allImage = useSelector(getImageMessage);
    let listImage = [];
    const [visible, setVisible] = useState(false);
    const [_index, setIndex] = useState(0);

    for (let image of allImage) {
        if (image != null) {
            const fileEx = handleFileExtension(image);
            if (fileEx === 'jpeg' || fileEx === 'jpg' || fileEx === 'png') {
                listImage.push({
                    uri: image,
                });
            }
        }
    }

    return (
        <View style={styles.container}>
            {listImage.length > 0 ? (
                <FlatList
                    data={listImage}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: 'column',
                                margin: 1,
                            }}
                            onPress={() => {
                                setVisible(true);
                                setIndex(index);
                            }}
                        >
                            <Image style={styles.imageThumbnail} source={{ uri: item.uri }} />
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16 }}>Chưa có ảnh</Text>
                </View>
            )}
            <ImageView images={listImage} imageIndex={_index} visible={visible} onRequestClose={() => setVisible(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    imageThumbnail: {
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
    },
});
export default ChildImageScreen;
