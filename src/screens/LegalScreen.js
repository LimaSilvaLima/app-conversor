import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { t, useLanguage } from '../localization';

export default function LegalScreen({ route, navigation }) {
  const { locale } = useLanguage();
  const { type } = route.params;

  const title = t(`legal.${type}Title`);
  const paragraphs = t(`legal.${type}Text`);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {Array.isArray(paragraphs) ? (
          paragraphs.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))
        ) : (
          <Text style={styles.paragraph}>{paragraphs}</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
    marginLeft: -4,
  },
  headerTitle: {
    fontFamily: 'Inter_700Bold',
    color: colors.text,
    fontSize: 24,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  paragraph: {
    fontFamily: 'Inter_400Regular',
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 24,
  }
});