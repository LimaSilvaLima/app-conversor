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
import { LanguageProvider, useLanguage, t } from './src/localization';

function MainApp() {
  const { locale } = useLanguage(); // re-render quando idioma muda
  const [currentTab, setCurrentTab] = useState('home');

  // Função para renderizar a tela correta baseada no estado
  const renderScreen = () => {
    switch (currentTab) {
      case 'home': return <HomeScreen />;
      case 'profile': return <ProfileScreen />;
      case 'settings': return <SettingsScreen />;
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
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => setCurrentTab('home')}>
          <MaterialIcons name="currency-exchange" size={24} color={currentTab === 'home' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabLabel, { color: currentTab === 'home' ? colors.primary : colors.textSecondary }]}>{t('tab.home')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => setCurrentTab('profile')}>
          <MaterialIcons name="account-circle" size={24} color={currentTab === 'profile' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabLabel, { color: currentTab === 'profile' ? colors.primary : colors.textSecondary }]}>{t('tab.profile')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7} onPress={() => setCurrentTab('settings')}>
          <MaterialIcons name="settings" size={24} color={currentTab === 'settings' ? colors.primary : colors.textSecondary} />
          <Text style={[styles.tabLabel, { color: currentTab === 'settings' ? colors.primary : colors.textSecondary }]}>{t('tab.settings')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
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