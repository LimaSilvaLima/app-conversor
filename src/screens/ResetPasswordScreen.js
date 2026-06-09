import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Input } from '../components/Input';
import { colors } from '../styles/colors';
import backend from '../services/backend';

export default function ResetPasswordScreen({ route, navigation }) {
  const { email } = route.params; // Pega o e-mail passado pela tela anterior
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePasswordReset() {
    if (!otp || !newPassword) {
      Alert.alert('Aviso', 'Preencha o código e a nova senha.');
      return;
    }

    setLoading(true);
    try {
      await backend.post('/auth/reset-password', { email, otp, new_password: newPassword });
      Alert.alert('Sucesso', 'Sua senha foi alterada com sucesso!');
      
      // Volta tudo até a tela de Login
      navigation.navigate('Login');
    } catch (error) {
      const message = error.response?.data?.detail || "Erro ao redefinir senha.";
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Senha</Text>
      <Text style={styles.subtitle}>Digite o código recebido no e-mail {email}</Text>
      
      <Input label="Código de 6 dígitos" value={otp} onChangeText={setOtp} keyboardType="numeric" placeholder="000000" />
      <Input label="Nova Senha" value={newPassword} onChangeText={setNewPassword} secureTextEntry={true} placeholder="******" />

      <TouchableOpacity style={styles.primaryButton} onPress={handlePasswordReset} disabled={loading}>
        {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryButtonText}>Salvar nova senha</Text>}
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