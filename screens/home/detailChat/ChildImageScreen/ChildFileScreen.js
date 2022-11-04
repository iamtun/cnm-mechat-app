import { View, Image, FlatList, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { getFileMessage } from '../../../../redux/selector';
import { TouchableOpacity } from 'react-native';
import { iconExtends, icons, handleFileExtension, handleFileName } from '../../../../utils/filePathConfig';
import { Linking } from 'react-native';

function ChildImageScreen() {
    const allFile = useSelector(getFileMessage);
    let listFile = [];
    
    console.log(allFile);
    const handleOpenFile = async (fileUri) => {
        const supported = await Linking.canOpenURL(fileUri);

        if (supported) {
            await Linking.openURL(fileUri);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    };

    for (let file of allFile) {
        if (file != null) {
            const fileEx = handleFileExtension(file);
            const fileName = handleFileName(file);

            listFile.push({
                fileEx: fileEx,
                fileName: fileName,
                fileUri: file
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
                        keyExtractor={(index) => '#' + index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.file} onPress={() => {handleOpenFile(item.fileUri)}}>
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
                <View style ={{width:"100%", height: "100%", alignItems:'center', justifyContent:"center"}}>
                    <Text style={{fontSize: 16}}>Chưa có file</Text>
                </View>
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
