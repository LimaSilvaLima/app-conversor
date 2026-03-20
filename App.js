import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Button from './src/components/Button';
import styles from './src/App.styles';



export default function App() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.ScrollView}>
        <View style={styles.container}>
        <StatusBar style="light" />

            <View style={styles.content}>
              <Text style={styles.title}>Conversor de Moedas</Text>
              <Text style={styles.subTitle}>
                Converta valores entre diferentes moedas
              </Text>
            </View>

            <View style={styles.header}>
              <Text style={styles.label}>Digite o valor a ser convertido</Text>
            </View>

            <View>
              <Button variant='secondary' ></Button>
            </View>

          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
