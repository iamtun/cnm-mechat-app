import { View, Image, FlatList, StyleSheet,Text} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { getImageMessage } from '../../../../redux/selector';
import { TouchableOpacity } from 'react-native';
import { handleFileExtension } from '../../../../utils/filePathConfig';

function ChildImageScreen() {
    const allImage = useSelector(getImageMessage);
    let listImage = [];

    for (let image of allImage) {
        if (image != null) {
            const fileEx = handleFileExtension(image);
            if (fileEx === 'jpeg' || fileEx === 'jpg' || fileEx === 'png') {
                listImage.push({
                    image: image,
                });
            }
        }
    }

    return (
        <>
            {listImage.length > 0 ? (
                <View style={styles.container}>
                    <FlatList
                        data={listImage}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'column',
                                    margin: 1,
                                }}
                            >
                                <Image style={styles.imageThumbnail} source={{ uri: item.image }} />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            ) : (
                <Text>Chưa có ảnh</Text>
            )}
        </>
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
