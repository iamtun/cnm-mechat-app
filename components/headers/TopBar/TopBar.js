import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function TopBar({ name, memberGroup, navigation }) {
    const handleClickArrowLeftIcon = () => {
        navigation.goBack();
    };

    return (
        <View style={[styles.topBar, styles.row]}>
            <View style={[styles.leftBar]}>
                <Icon name="arrow-left" size={30} color="#fff" onPress={handleClickArrowLeftIcon} />
                <View style={styles.group}>
                    <Text style={styles.nameText}>{name}</Text>
                    {memberGroup && <Text style={{ color: '#fff' }}>{`${memberGroup} người`}</Text>}
                </View>
            </View>
            <View style={[styles.rightBar, styles.row]}>
                {memberGroup ? (
                    <>
                        <Icon name="video-outline" size={30} style={styles.icon} />
                        <Icon name="magnify" size={30} style={styles.icon} />
                    </>
                ) : (
                    <>
                        <Icon name="phone" size={30} style={styles.icon} />
                        <Icon name="video-outline" size={30} style={styles.icon} />
                    </>
                )}
                <Icon name="format-list-bulleted" size={30} style={styles.icon} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        width: '100%',
        height: 44,
        backgroundColor: '#3777F3',
    },
    leftBar: {
        width: '50%',
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    group: {
        marginLeft: 8,
    },
    nameText: {
        fontSize: 16,
        color: '#fff',
    },
    rightBar: {
        width: '45%',
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        fontWeight: '500',
        color: '#fff',
    },
});
export default TopBar;
