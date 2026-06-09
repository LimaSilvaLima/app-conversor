import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { useLanguage, t } from '../localization';

export default function SettingsScreen({ navigation }) {
  const { locale, setLocale } = useLanguage();
  const [isLangModalVisible, setLangModalVisible] = useState(false);

  const handleLanguageSelect = (langCode) => {
    setLocale(langCode);
    setLangModalVisible(false);
  };

  const SettingItem = ({ icon, title, value, isLast, onPress }) => {
    const Container = onPress ? TouchableOpacity : View;
    return (
      <Container 
        style={[styles.settingItem, !isLast && styles.itemBorder]} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.itemLeft}>
          <MaterialIcons name={icon} size={22} color={colors.textSecondary} style={styles.itemIcon} />
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
        <View style={styles.itemRight}>
          {value && <Text style={styles.itemValue}>{value}</Text>}
          <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
        </View>
      </Container>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('settings.title')}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{t('settings.preferences')}</Text>
        <View style={styles.sectionCard}>
          <SettingItem 
            icon="language" 
            title={t('settings.language')} 
            value={t(`languages.${locale}`)} 
            onPress={() => setLangModalVisible(true)} 
          />
          <SettingItem 
            icon="dark-mode" 
            title={t('settings.theme')} 
            value={t('settings.dark')} 
            isLast={true} 
          />
        </View>

        <Text style={styles.sectionTitle}>{t('settings.about')}</Text>
        <View style={styles.sectionCard}>
          <SettingItem icon="info-outline" title={t('settings.version')} value="1.0.0" />
          <SettingItem 
            icon="description" 
            title={t('settings.terms')} 
            onPress={() => navigation.navigate('Legal', { type: 'terms' })} 
          />
          <SettingItem 
            icon="privacy-tip" 
            title={t('settings.privacy')} 
            isLast={true} 
            onPress={() => navigation.navigate('Legal', { type: 'privacy' })} 
          />
        </View>
      </ScrollView>

      <Modal visible={isLangModalVisible} transparent={true} animationType="fade" onRequestClose={() => setLangModalVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setLangModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('settings.selectLanguage')}</Text>
            
            {['pt', 'en', 'es'].map(lang => (
              <TouchableOpacity key={lang} style={styles.modalOption} onPress={() => handleLanguageSelect(lang)}>
                <Text style={[styles.modalOptionText, locale === lang && styles.modalOptionTextSelected]}>
                  {t(`languages.${lang}`)}
                </Text>
                {locale === lang && <MaterialIcons name="check" size={24} color={colors.primary} />}
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setLangModalVisible(false)}>
              <Text style={styles.modalCancelText}>{t('settings.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontFamily: 'Inter_700Bold',
    color: colors.textSecondary,
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBackground,
  },
  modalOptionText: {
    fontFamily: 'Inter_500Medium',
    color: colors.text,
    fontSize: 16,
  },
  modalOptionTextSelected: {
    fontFamily: 'Inter_700Bold',
    color: colors.primary,
  },
  modalCancelButton: {
    marginTop: 24,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
  },
  modalCancelText: {
    fontFamily: 'Inter_700Bold',
    color: colors.text,
    fontSize: 16,
  }
});