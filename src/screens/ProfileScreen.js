import { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { AuthContext } from '../contexts/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { signed, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

      <View style={styles.authContainer}>
        <View style={styles.avatarPlaceholder}>
          <MaterialIcons name="person" size={64} color={signed ? colors.primary : colors.inputBackground} />
        </View>
        
        {signed ? (
          // --- VISÃO DO USUÁRIO LOGADO ---
          <>
            <Text style={styles.title}>Conta Sincronizada!</Text>
            <Text style={styles.subtitle}>
              Seus favoritos estão sendo salvos de forma segura na nuvem da Converti.
            </Text>

            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8} onPress={signOut}>
              <Text style={[styles.secondaryButtonText, { color: '#ef4444' }]}>
                Sair da Conta
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          // --- VISÃO DO VISITANTE ---
          <>
            <Text style={styles.title}>Sincronize seus dados</Text>
            <Text style={styles.subtitle}>
              Crie uma conta para salvar suas moedas favoritas na nuvem e acessá-las de qualquer dispositivo.
            </Text>

            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.primaryButtonText}>Entrar na Conta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.secondaryButtonText}>Criar nova conta</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 40,
  },
  headerTitle: {
    fontFamily: 'Inter_700Bold',
    color: colors.text,
    fontSize: 28,
  },
  authContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.inputBackground,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    color: colors.text,
    fontSize: 20,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    fontFamily: 'Inter_700Bold',
    color: colors.background,
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.cardBackground,
  },
  secondaryButtonText: {
    fontFamily: 'Inter_700Bold',
    color: colors.text,
    fontSize: 16,
  }
});