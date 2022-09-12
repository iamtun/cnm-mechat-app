import { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginStyles from '../../styles/LoginStyles';

function InputPrimary({ placeholder, isPass }) {
    const [isPassState, setIsPassState] = useState(isPass);

    return (
        <View style={LoginStyles.inputData}>
            <TextInput style={isPass && LoginStyles.pass} placeholder={placeholder} secureTextEntry={isPassState} />
            {isPass && <Icon name="eye-outline" color="#000" size={20} onPress={() => setIsPassState(!isPassState)} />}
        </View>
    );
}

export default InputPrimary;
