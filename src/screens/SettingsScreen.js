import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { useLanguage, t } from '../localization';

export default function SettingsScreen() {
  const { locale, setLocale } = useLanguage();

  const SettingItem = ({ icon, title, value, isLast, children }) => (
    <View style={[styles.settingItem, !isLast && styles.itemBorder]}>
      <View style={styles.itemLeft}>
        <MaterialIcons name={icon} size={22} color={colors.textSecondary} style={styles.itemIcon} />
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={styles.itemRight}>
        {value && <Text style={styles.itemValue}>{value}</Text>}
        {children}
        <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('settings.title')}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>{t('settings.preferences')}</Text>
        <View style={styles.sectionCard}>
          <View style={{ paddingVertical: 8 }}>
            <Text style={[styles.itemTitle, { marginLeft: 6, marginBottom: 8 }]}>{t('settings.language')}</Text>
            <View style={styles.langRow}>
              <TouchableOpacity onPress={() => setLocale('pt')} style={[styles.langButton, locale === 'pt' && styles.langSelected]}>
                <Text style={[styles.langText, locale === 'pt' && styles.langTextSelected]}>{t('languages.pt')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLocale('en')} style={[styles.langButton, locale === 'en' && styles.langSelected]}>
                <Text style={[styles.langText, locale === 'en' && styles.langTextSelected]}>{t('languages.en')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLocale('es')} style={[styles.langButton, locale === 'es' && styles.langSelected]}>
                <Text style={[styles.langText, locale === 'es' && styles.langTextSelected]}>{t('languages.es')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <SettingItem icon="dark-mode" title={t('settings.theme')} value="Escuro" isLast={true} />
        </View>

        <Text style={styles.sectionTitle}>{t('settings.about')}</Text>
        <View style={styles.sectionCard}>
          <SettingItem icon="info-outline" title={t('settings.version')} value="1.0.0" />
          <SettingItem icon="description" title={t('settings.terms')} />
          <SettingItem icon="privacy-tip" title={t('settings.privacy')} isLast={true} />
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
  ,
  langButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  langSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  langText: {
    fontFamily: 'Inter_400Regular',
    color: colors.text,
    fontSize: 14,
  }
  ,
  langTextSelected: {
    color: colors.background,
  }
  ,
  langRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingBottom: 12,
    alignItems: 'center',
    flexWrap: 'wrap'
  }
});