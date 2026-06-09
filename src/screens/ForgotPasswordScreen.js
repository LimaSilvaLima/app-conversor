import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Input } from '../components/Input';
import { colors } from '../styles/colors';
import backend from '../services/backend';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleResetRequest() {
    if (!email) {
      Alert.alert('Aviso', 'Digite seu e-mail.');
      return;
    }

    setLoading(true);
    try {
      await backend.post('/auth/forgot-password', { email });
      Alert.alert('Sucesso!', 'Se o e-mail existir, você receberá um código de 6 dígitos.');
      
      // Envia o usuário para a tela de digitar o OTP e a nova senha
      navigation.navigate('ResetPassword', { email }); 
    } catch (error) {
      // Como configuramos no backend, ele nunca diz se o e-mail não existe por segurança
      // Mas se der erro 429 (Rate Limit), cai aqui
      Alert.alert('Aviso', 'Muitas tentativas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.subtitle}>Enviaremos um código para o seu e-mail.</Text>
      
      <Input label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="seu@email.com" />

      <TouchableOpacity style={styles.primaryButton} onPress={handleResetRequest} disabled={loading}>
        {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryButtonText}>Enviar Código</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryButtonText}>Voltar</Text>
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
  secondaryButton: { backgroundColor: 'transparent', paddingVertical: 16, borderRadius: 16, alignItems: 'center', borderWidth: 2, borderColor: colors.cardBackground },
  secondaryButtonText: { color: colors.text, fontSize: 16, fontFamily: 'Inter_700Bold' }
});