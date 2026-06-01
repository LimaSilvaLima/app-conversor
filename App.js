import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

// Importação das 3 telas isoladas
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { colors } from './src/styles/colors';

export default function App() {
  const [currentTab, setCurrentTab] = useState('Início');
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  // Função para renderizar a tela correta baseada no estado
  const renderScreen = () => {
    switch (currentTab) {
      case 'Início': return <HomeScreen />;
      case 'Perfil': return <ProfileScreen />;
      case 'Config': return <SettingsScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Área Dinâmica da Tela */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Tab Bar Customizada (3 Ícones) */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => setCurrentTab('Início')}>
          <MaterialIcons name="currency-exchange" size={24} color={currentTab === 'Início' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabLabel, { color: currentTab === 'Início' ? colors.primary : colors.textSecondary }]}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => setCurrentTab('Perfil')}>
          <MaterialIcons name="account-circle" size={24} color={currentTab === 'Perfil' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabLabel, { color: currentTab === 'Perfil' ? colors.primary : colors.textSecondary }]}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => setCurrentTab('Config')}>
          <MaterialIcons name="settings" size={24} color={currentTab === 'Config' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabLabel, { color: currentTab === 'Config' ? colors.primary : colors.textSecondary }]}>Ajustes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderTopColor: colors.background,
    borderTopWidth: 2,
    height: 65,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    marginTop: 4,
  }
});