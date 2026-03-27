import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, KeyboardAvoidingView, Platform, ScrollView, View, TouchableOpacity } from 'react-native';
import Button from './src/components/Button';
import styles from './src/App.styles';
import { currencies } from './src/constants/currencies';
import { Input } from './src/components/Input';
import { ResultCard } from './src/components/ResultCard';
import { exchangeRateApi } from './src/services/api';
import { convertCurrency } from './src/utils/convertCurrency';

export default function App() {
  const [tempoAtual, setTempoAtual] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [valorInput, setValorInput] = useState('1');
  const [resultado, setResultado] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('USD');

  // Função para inverter as moedas de origem e destino
  function handleSwap() {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setResultado(null); // Limpa o resultado ao inverter
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTempoAtual(new Date());
    }, 1000);

    return () => clearInterval(timer); // Limpa o timer se o componente desmontar
  }, []);

  async function fetchExchangeRate() {
    try {
      
      const data = await exchangeRateApi(fromCurrency);
      const rate = data.rates[toCurrency];
      const convertedAmount = convertCurrency(amount, rate);
      setResultado(convertedAmount);
      console.log(convertedAmount)
      
    } catch (error) {
      console.warn('Não foi possível buscar a cotação:', error.message);
    }
  }

  

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: '#25292e' }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="light" backgroundColor="#25292e" />
      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
        <View style={{ width: '100%', alignItems: 'center', paddingVertical: 20 }}>
          <View style={styles.header}>
            <Text style={styles.title}>Conversor de Moedas</Text>
            <Text style={styles.subtitle}>
              Converta valores entre diferentes moedas
            </Text>
          </View>
          <View style={styles.header}>
              <Text style={styles.label}>Digite o valor a ser convertido</Text>
      </View>
          <View style={styles.card}>
            <Text style={styles.label}>De:</Text>
            <View style={styles.currencyGrid}>
              {currencies.map((currency) => (
            <Button
              variant="primary"
              key={currency.code}
              currency={currency}
              onPress={() => setFromCurrency(currency.code)}
              isSelected={fromCurrency === currency.code}
            />
              ))}
            </View>
          </View>
          <View style={styles.card}>
            <Input 
              label="valor: " 
              value={amount}
              onChangeText={setAmount}
            />
              <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
                <Text style={styles.swapButtonText}>
                  ↑↓
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Para:</Text>
                  <View style={styles.currencyGrid}>
                    {currencies.map((currency) => (
                      <Button variant='secondary' key={currency.code}
                      currency={currency}
                      onPress ={() => setToCurrency(currency.code)}
                      isSelected={toCurrency === currency.code}
                      >
                      </Button> 
                    ))}
                  </View>                                                                                                                                                                
                  <TouchableOpacity style={styles.convertButton}
                  onPress={fetchExchangeRate}>
                    <Text style={styles.swapButtonText}>
                      Converter
                    </Text>
                  </TouchableOpacity>
                  {resultado && <ResultCard valor={resultado} moeda={toCurrency} />}
            </View>
        </View>
        <Text style={{ fontSize: 14, color: '#888', marginTop: 20 }}>
            ({tempoAtual.toLocaleTimeString()})
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
