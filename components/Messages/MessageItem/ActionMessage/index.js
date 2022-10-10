import { Text, View, StyleSheet } from 'react-native';

function ActionMessage({ message, createAt }) {
    return (
        <View style={styles.body}>
            <View style={styles.message}>
                <Text>{message}</Text>
                <Text style={styles.createAt}>{createAt}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        marginVertical: 4,
        justifyContent: 'center',
    },
    message: {
        backgroundColor: '#fff',
        maxWidth: '80%',
        padding: 8,
        borderRadius: 50,
    },
    createAt: {
        textAlign: "center",
        marginTop: 4,
        color: "#abf"
    }
});
export default ActionMessage;
