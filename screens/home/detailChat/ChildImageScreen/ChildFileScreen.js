import { View, Image, FlatList, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { getFileMessage } from '../../../../redux/selector';
import { TouchableOpacity } from 'react-native';
import { iconExtends, icons, handleFileExtension, handleFileName } from '../../../../utils/filePathConfig';

function ChildImageScreen() {
    const allFile = useSelector(getFileMessage);
    let listFile = [];

    for (let file of allFile) {
        if (file != null) {
            const fileEx = handleFileExtension(file);
            const fileName = handleFileName(file);

            listFile.push({
                fileEx: fileEx,
                fileName: fileName,
            });
        }
    }

    return (
        <>
            {listFile.length > 0 ? (
                <View style={styles.container}>
                    <FlatList
                        key={'#'}
                        data={listFile}
                        keyExtractor={(item, index) => '#' + index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.file}>
                                <Image
                                    source={iconExtends.includes(item.fileEx) ? icons[item.fileEx] : icons['blank']}
                                    style={styles.icon}
                                />
                                <Text style={styles.fileName}>{item.fileName}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            ) : (
                <Text>Chưa có file</Text>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    file: {
        margin: 5,
        width: 250,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 70,
        height: 70,
    },
    fileName: {
        width: '80%',
        height: '100%',
        padding: 8,
        fontWeight: 'bold',
    },
});
export default ChildImageScreen;
