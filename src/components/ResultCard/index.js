import { View, Text } from 'react-native';

export function ResultCard({ amount, fromCurrency, toCurrency, exchangeRate, result, currencies }) {
    
    if(!result ||!exchangeRate) return null;
    const toSymbol = currencies.find(c => c.code === toCurrency)?.symbol || toCurrency;
    const fromSymbol = currencies.find(c => c.code === fromCurrency)?.symbol || fromCurrency;
    
    return (
        <View >
            <Text >Resultado: </Text>
            <Text>{toSymbol} {result}</Text>
            <Text >Taxa de cambio 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}: </Text>
        </View>
    );
}