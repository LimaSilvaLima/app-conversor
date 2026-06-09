import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Input } from '../components/Input';
import { colors } from '../styles/colors';
import backend from '../services/backend';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert('Aviso', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      // Repare que o backend espera "nome" em vez de "name"
      await backend.post('/auth/register', { nome: name, email: email, password: password });
      
      Alert.alert('Sucesso!', 'Conta criada. Verifique seu e-mail para pegar o código de ativação.');
      
      // Joga o usuário para a tela de Verificação passando o e-mail
      navigation.navigate('Verify', { email });
    } catch (error) {
      const message = error.response?.data?.detail || "Erro ao criar conta.";
      Alert.alert('Erro', message);
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
        <Text style={styles.title}>Criar Conta</Text>
        
        <Input 
          label="Nome" 
          value={name} 
          onChangeText={setName} 
          placeholder="Como quer ser chamado?" 
          autoCapitalize="words" 
        />

        <Input label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="seu@email.com" />
        <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry={true} placeholder="******" />

        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryButtonText}>Cadastrar</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  scrollContent: { 
    flexGrow: 1, 
    paddingHorizontal: 20,
    paddingTop: 100, 
    paddingBottom: 60,
  },
  title: { 
    color: colors.text, 
    fontSize: 28, 
    fontFamily: 'Inter_700Bold', 
    marginBottom: 32, 
    textAlign: 'center' 
  },
  customLabel: { 
    fontFamily: 'Inter_500Medium', 
    color: colors.textSecondary, 
    fontSize: 14, 
    marginBottom: 8 
  },
  primaryButton: { 
    backgroundColor: colors.primary, 
    paddingVertical: 16, 
    borderRadius: 16, 
    alignItems: 'center', 
    marginBottom: 16 
  },
  primaryButtonText: { 
    color: colors.background, 
    fontSize: 16, 
    fontFamily: 'Inter_700Bold' 
  },
  secondaryButton: { 
    backgroundColor: 'transparent', 
    paddingVertical: 16, 
    borderRadius: 16, 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: colors.cardBackground 
  },
  secondaryButtonText: { 
    color: colors.text, 
    fontSize: 16, 
    fontFamily: 'Inter_700Bold' 
  }
});