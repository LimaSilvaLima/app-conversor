import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, KeyboardAvoidingView, Platform, ScrollView, View, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
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
  const [result, setResult] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);

  function swapCurrencies() {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setResult(null); // Limpa o resultado ao inverter
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTempoAtual(new Date());
    }, 1000);

    return () => clearInterval(timer); // Limpa o timer se o componente desmontar
  }, []);

  async function fetchExchangeRate() {
    setLoading(true);
    try {
      if (!amount || isNaN(amount)) {
        alert('Por favor, insira um valor numérico válido para conversão.');
        return;
      }
      const data = await exchangeRateApi(fromCurrency);
      const rate = data.rates[toCurrency];
      setExchangeRate(rate);
      const convertedAmount = convertCurrency(amount, rate);
      setResult(convertedAmount);
      console.log(convertedAmount)
      
    } catch (error) {
      console.error('Erro na conversão:', error);
      alert('Erro ao buscar cotação. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ImageBackground 
      source={require('./assets/background/Converti.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <StatusBar style="light" />
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
              <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
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
                  <TouchableOpacity style={[styles.convertButton, (!amount || loading) && styles.convertButtonDisabled]} 
                  onPress={fetchExchangeRate}
                  disabled={!amount || loading}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.swapButtonText}>
                        Converter
                      </Text> 
                    )}
                  </TouchableOpacity>
                  <ResultCard 
                    amount={amount} 
                    fromCurrency={fromCurrency} 
                    toCurrency={toCurrency} 
                    exchangeRate={exchangeRate} 
                    result={result}
                    currencies={currencies}
                  />
            </View>
        </View>
        <Text style={{ fontSize: 14, color: '#888', marginTop: 20 }}>
            ({tempoAtual.toLocaleTimeString()})
        </Text>
      </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
