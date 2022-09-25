import { View, Image, Text } from 'react-native';

function SearchItem({ image, name }) {
    return (
        <View>
            <Image source={{ uri: image }} />
            <View>
                <Text>{name}</Text>
            </View>
        </View>
    );
}

export default SearchItem;
