import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

export default function SettingsScreen() {
  
  const SettingItem = ({ icon, title, value, isLast }) => (
    <TouchableOpacity style={[styles.settingItem, !isLast && styles.itemBorder]} activeOpacity={0.7}>
      <View style={styles.itemLeft}>
        <MaterialIcons name={icon} size={22} color={colors.textSecondary} style={styles.itemIcon} />
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={styles.itemRight}>
        {value && <Text style={styles.itemValue}>{value}</Text>}
        <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Preferências</Text>
        <View style={styles.sectionCard}>
          {/*  Implementar a lógica de i18n / troca de idioma aqui */}
          <SettingItem icon="language" title="Idioma" value="Português" />
          <SettingItem icon="dark-mode" title="Tema" value="Escuro" isLast={true} />
        </View>

        <Text style={styles.sectionTitle}>Sobre o App</Text>
        <View style={styles.sectionCard}>
          <SettingItem icon="info-outline" title="Versão" value="1.0.0" />
          <SettingItem icon="description" title="Termos de Uso" />
          <SettingItem icon="privacy-tip" title="Política de Privacidade" isLast={true} />
        </View>

      </ScrollView>
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
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: 'Inter_700Bold',
    color: colors.text,
    fontSize: 28,
  },
  sectionTitle: {
    fontFamily: 'Inter_500Medium',
    color: colors.textSecondary,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 8,
  },
  sectionCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBackground,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 12,
  },
  itemTitle: {
    fontFamily: 'Inter_500Medium',
    color: colors.text,
    fontSize: 15,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontFamily: 'Inter_400Regular',
    color: colors.textSecondary,
    fontSize: 14,
    marginRight: 8,
  }
});