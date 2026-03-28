import { View, Text } from 'react-native';
import { styles } from './styles';

export function ResultCard({ amount, fromCurrency, toCurrency, exchangeRate, result, currencies }) {
    
    if(!result ||!exchangeRate) return null;
    const toSymbol = currencies.find(c => c.code === toCurrency)?.symbol || toCurrency;
    const fromSymbol = currencies.find(c => c.code === fromCurrency)?.symbol || fromCurrency;
    
    return (
        <View style ={styles.container}>
            <Text style={styles.label}>Resultado: </Text>
            <Text style={styles.amount}>{toSymbol} {result}</Text>
            <Text style={styles.rate}>Taxa de câmbio: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}</Text>
        </View>
    );
}