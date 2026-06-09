import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Input } from '../components/Input';
import { colors } from '../styles/colors';
import backend from '../services/backend';

export default function VerifyScreen({ route, navigation }) {
  const { email } = route.params; // Pegamos o e-mail que veio da RegisterScreen
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    if (!otp) {
      Alert.alert('Aviso', 'Digite o código de 6 dígitos.');
      return;
    }

    setLoading(true);
    try {
      await backend.post('/auth/verify', { email: email, otp: otp });
      Alert.alert('Conta Ativada!', 'Sua conta foi verificada com sucesso. Já pode fazer login!');
      
      // Joga para a tela de Login
      navigation.navigate('Login');
    } catch (error) {
      const message = error.response?.data?.detail || "Erro ao verificar conta.";
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ative sua conta</Text>
      <Text style={styles.subtitle}>Enviamos um código de 6 dígitos para {email}</Text>
      
      <Input label="Código de Ativação" value={otp} onChangeText={setOtp} keyboardType="numeric" placeholder="000000" />

      <TouchableOpacity style={styles.primaryButton} onPress={handleVerify} disabled={loading}>
        {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryButtonText}>Verificar</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center' },
  title: { color: colors.text, fontSize: 28, fontFamily: 'Inter_700Bold', marginBottom: 8, textAlign: 'center' },
  subtitle: { color: colors.textSecondary, fontSize: 14, fontFamily: 'Inter_400Regular', marginBottom: 32, textAlign: 'center' },
  primaryButton: { backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginBottom: 16 },
  primaryButtonText: { color: colors.background, fontSize: 16, fontFamily: 'Inter_700Bold' },
});