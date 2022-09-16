import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function TopBar({ name, memberGroup }) {
    return (
        <View style={[styles.topBar, styles.row]}>
            <View style={[styles.leftBar, styles.row]}>
                <Icon name="arrow-left" size={30} color="#fff" />
                <View style={styles.group}>
                    <Text style={styles.nameText}>{name}</Text>
                    {memberGroup && <Text style={{ color: '#fff' }}>{`${memberGroup} người`}</Text>}
                </View>
            </View>
            <View style={[styles.rightBar, styles.row]}>
                {memberGroup ? (
                    <>
                        <Icon name="video-outline" size={30} color="#fff" />
                        <Icon name="magnify" size={30} color="#fff" />
                    </>
                ) : (
                    <>
                        <Icon name="phone" size={30} color="#fff" />
                        <Icon name="video-outline" size={30} color="#fff" />
                    </>
                )}
                <Icon name="format-list-bulleted" size={30} color="#fff" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        position: 'absolute',
        width: '100%',
        height: 45,
        backgroundColor: '#3777F3',
    },
    leftBar: {
        width: '35%',
        paddingHorizontal: 16,
    },
    nameText: {
        fontSize: 16,
        color: '#fff',
    },
    rightBar: {
        width: '35%',
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
export default TopBar;
