import { View, Text } from 'react-native';

export function ResultCard({ amount, fromCurrency, toCurrency, exchangeRate, result, currencies }) {
    
    if(!result ||!exchangeRate) return null;
    return (
        <View >
            <Text >Resultado: </Text>
            <Text>{result}</Text>
            <Text >Taxa de cambio 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}: </Text>
        </View>
    );
}