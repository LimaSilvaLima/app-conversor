import { View, Text } from 'react-native';

export function ResultCard({ valor, moeda }) {
    return (
        <View >
            <Text >Resultado: {valor} {moeda}</Text>
        </View>
    );
}