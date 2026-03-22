import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Button from './src/components/Button';
import styles from './src/App.styles';
import { currencies } from './src/constants/currencies';

export default function App() {
  const [tempoAtual, setTempoAtual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTempoAtual(new Date());
    }, 1000);

    return () => clearInterval(timer); // Limpa o timer se o componente desmontar
  }, []);

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: '#25292e' }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="light" backgroundColor="#25292e" />
      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
        <View style={styles.container}>
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
            <Text style={styles.label}>De: </Text>
            <View>
              {currencies.map((currency) => (
                <Button key={currency.code} title={`${currency.name} (${currency.symbol})`} />
              ))}
            </View>
            <Button variant='secondary' title="Converter" />
          </View>
          <Text style={{ fontSize: 18, color: '#FFFFFF' }}>
            ({tempoAtual.toLocaleTimeString()})
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
