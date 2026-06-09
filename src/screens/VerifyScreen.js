import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Input } from '../components/Input';
import { colors } from '../styles/colors';
import backend from '../services/backend';
import { t, useLanguage } from '../localization';

export default function VerifyScreen({ route, navigation }) {
  const { locale } = useLanguage();
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    if (!otp) {
      Alert.alert(t('auth.alerts.warning'), t('auth.alerts.verifyWarning'));
      return;
    }

    setLoading(true);
    try {
      await backend.post('/auth/verify', { email: email, otp: otp });
      Alert.alert(t('auth.alerts.success'), t('auth.alerts.verifySuccess'));
      navigation.navigate('Login');
    } catch (error) {
      const message = error.response?.data?.detail || t('auth.alerts.verifyError');
      Alert.alert(t('auth.alerts.error'), message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.activateTitle')}</Text>
      <Text style={styles.subtitle}>{t('auth.activateSubtitle')} {email}</Text>
      
      <Input label={t('auth.otpLabel')} value={otp} onChangeText={setOtp} keyboardType="numeric" placeholder={t('auth.otpPlaceholder')} />

      <TouchableOpacity style={styles.primaryButton} onPress={handleVerify} disabled={loading}>
        {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryButtonText}>{t('auth.verifyBtn')}</Text>}
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