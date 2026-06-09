import { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Input } from '../components/Input';
import { colors } from '../styles/colors';
import { AuthContext } from '../contexts/AuthContext';
import { t, useLanguage } from '../localization';

export default function LoginScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const { locale } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert(t('auth.alerts.warning'), t('auth.alerts.fillAll'));
      return;
    }

    setLoading(true);
    const response = await signIn(email, password);
    setLoading(false);

    if (response.success) {
      navigation.navigate('MainTabs'); 
    } else {
      Alert.alert(t('auth.alerts.error'), response.message || t('auth.alerts.loginError'));
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{t('auth.welcome')}</Text>
        
        <Input label={t('auth.email')} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder={t('auth.emailPlaceholder')} />
        <Input label={t('auth.password')} value={password} onChangeText={setPassword} secureTextEntry={true} placeholder={t('auth.passwordPlaceholder')} />

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryButtonText}>{t('auth.signInBtn')}</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={{ paddingVertical: 16 }} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={{ color: colors.primary, fontSize: 14, fontFamily: 'Inter_500Medium', textAlign: 'center' }}>
            {t('auth.forgotBtn')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('MainTabs')}>
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