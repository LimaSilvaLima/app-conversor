import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Input } from '../components/Input';
import { colors } from '../styles/colors';
import backend from '../services/backend';
import { t, useLanguage } from '../localization';

export default function ForgotPasswordScreen({ navigation }) {
  const { locale } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleResetRequest() {
    if (!email) {
      Alert.alert(t('auth.alerts.warning'), t('auth.alerts.forgotWarning'));
      return;
    }

    setLoading(true);
    try {
      await backend.post('/auth/forgot-password', { email });
      Alert.alert(t('auth.alerts.success'), t('auth.alerts.forgotSuccess'));
      navigation.navigate('ResetPassword', { email }); 
    } catch (error) {
      Alert.alert(t('auth.alerts.warning'), t('auth.alerts.forgotError'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.forgotTitle')}</Text>
      <Text style={styles.subtitle}>{t('auth.forgotSubtitle')}</Text>
      
      <Input label={t('auth.email')} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder={t('auth.emailPlaceholder')} />

      <TouchableOpacity style={styles.primaryButton} onPress={handleResetRequest} disabled={loading}>
        {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryButtonText}>{t('auth.sendCodeBtn')}</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryButtonText}>{t('auth.backBtn')}</Text>
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