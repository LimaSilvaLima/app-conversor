import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Input } from '../components/Input';
import { colors } from '../styles/colors';
import backend from '../services/backend';
import { t, useLanguage } from '../localization';

export default function RegisterScreen({ navigation }) {
  const { locale } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert(t('auth.alerts.warning'), t('auth.alerts.fillAll'));
      return;
    }

    setLoading(true);
    try {
      await backend.post('/auth/register', { nome: name, email: email, password: password });
      Alert.alert(t('auth.alerts.success'), t('auth.alerts.registerSuccess'));
      navigation.navigate('Verify', { email });
    } catch (error) {
      const message = error.response?.data?.detail || t('auth.alerts.registerError');
      Alert.alert(t('auth.alerts.error'), message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{t('auth.signUpBtn')}</Text>
        
        <Input 
          label={t('auth.name')} 
          value={name} 
          onChangeText={setName} 
          placeholder={t('auth.namePlaceholder')} 
          autoCapitalize="words" 
        />

        <Input label={t('auth.email')} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder={t('auth.emailPlaceholder')} />
        <Input label={t('auth.password')} value={password} onChangeText={setPassword} secureTextEntry={true} placeholder={t('auth.passwordPlaceholder')} />

        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryButtonText}>{t('auth.signUpBtn')}</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>{t('auth.backBtn')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 100, paddingBottom: 60 },
  title: { color: colors.text, fontSize: 28, fontFamily: 'Inter_700Bold', marginBottom: 32, textAlign: 'center' },
  primaryButton: { backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginBottom: 16 },
  primaryButtonText: { color: colors.background, fontSize: 16, fontFamily: 'Inter_700Bold' },
  secondaryButton: { backgroundColor: 'transparent', paddingVertical: 16, borderRadius: 16, alignItems: 'center', borderWidth: 2, borderColor: colors.cardBackground },
  secondaryButtonText: { color: colors.text, fontSize: 16, fontFamily: 'Inter_700Bold' }
});