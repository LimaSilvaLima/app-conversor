import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, KeyboardAvoidingView, Platform } from 'react-native';
import Button from './src/components/Button';
import styles from './src/App.styles';

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
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#FFFFFF' }}>
        Teste de atualização
      </Text>
      <Text style={{ fontSize: 18, color: '#FFFFFF' }}>
        ({tempoAtual.toLocaleTimeString()})
      </Text>
      <Button></Button>
    </KeyboardAvoidingView>
  );
}
