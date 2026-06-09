import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { AuthContext } from '../contexts/AuthContext';
import backend from '../services/backend';
import { t, useLanguage } from '../localization';

export default function ProfileScreen({ navigation }) {
  const { signed, signOut } = useContext(AuthContext);
  const { locale } = useLanguage();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (signed) {
      fetchUserProfile();
    }
  }, [signed]);

  async function fetchUserProfile() {
    setLoading(true);
    try {
      const response = await backend.get('/auth/me'); 
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    } finally {
      setLoading(false);
    }
  }

  const renderAuthenticatedView = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={colors.primary} style={styles.loaderSpacing} />;
    }

    return (
      <>
        <Text style={styles.userName}>{user?.nome || t('profile.loading')}</Text>
        <Text style={styles.userEmail}>{user?.email || ''}</Text>

        <View style={styles.badge}>
          <MaterialIcons name="cloud-done" size={16} color={colors.primary} style={styles.badgeIcon} />
          <Text style={styles.badgeText}>{t('profile.syncedData')}</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ForgotPassword')}>
            <MaterialIcons name="lock-reset" size={24} color={colors.text} style={styles.menuIcon} />
            <Text style={styles.menuItemText}>{t('profile.resetPassword')}</Text>
            <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.menuItemNoBorder]} onPress={signOut}>
            <MaterialIcons name="logout" size={24} color="#ef4444" style={styles.menuIcon} />
            <Text style={[styles.menuItemText, styles.dangerText]}>{t('profile.logout')}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderUnauthenticatedView = () => (
    <>
      <Text style={styles.title}>{t('profile.syncTitle')}</Text>
      <Text style={styles.subtitle}>{t('profile.syncSubtitle')}</Text>

      <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.primaryButtonText}>{t('profile.signIn')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.secondaryButtonText}>{t('profile.signUp')}</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('profile.title')}</Text>
      </View>

      <View style={styles.authContainer}>
        <View style={styles.avatarPlaceholder}>
          <MaterialIcons name="person" size={64} color={signed ? colors.primary : colors.inputBackground} />
        </View>
        
        {signed ? renderAuthenticatedView() : renderUnauthenticatedView()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background, 
    paddingTop: 60, 
    paddingHorizontal: 20 
  },
  header: { 
    marginBottom: 40 
  },
  headerTitle: { 
    fontFamily: 'Inter_700Bold', 
    color: colors.text, 
    fontSize: 28 
  },
  authContainer: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingBottom: 80 
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
    borderColor: colors.inputBackground 
  },
  title: { 
    fontFamily: 'Inter_700Bold', 
    color: colors.text, 
    fontSize: 20, 
    marginBottom: 12 
  },
  subtitle: { 
    fontFamily: 'Inter_400Regular', 
    color: colors.textSecondary, 
    fontSize: 14, 
    textAlign: 'center', 
    marginBottom: 32, 
    paddingHorizontal: 20, 
    lineHeight: 20 
  },
  primaryButton: { 
    backgroundColor: colors.primary, 
    width: '100%', 
    paddingVertical: 16, 
    borderRadius: 16, 
    alignItems: 'center', 
    marginBottom: 16 
  },
  primaryButtonText: { 
    fontFamily: 'Inter_700Bold', 
    color: colors.background, 
    fontSize: 16 
  },
  secondaryButton: { 
    backgroundColor: 'transparent', 
    width: '100%', 
    paddingVertical: 16, 
    borderRadius: 16, 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: colors.cardBackground 
  },
  secondaryButtonText: { 
    fontFamily: 'Inter_700Bold', 
    color: colors.text, 
    fontSize: 16 
  },
  userName: { 
    fontFamily: 'Inter_700Bold', 
    color: colors.text, 
    fontSize: 24, 
    marginBottom: 4 
  },
  userEmail: { 
    fontFamily: 'Inter_400Regular', 
    color: colors.textSecondary, 
    fontSize: 14, 
    marginBottom: 16 
  },
  badge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.inputBackground, 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 12, 
    marginBottom: 32 
  },
  badgeText: { 
    fontFamily: 'Inter_500Medium', 
    color: colors.primary, 
    fontSize: 12 
  },
  badgeIcon: { 
    marginRight: 6 
  },
  menuContainer: { 
    width: '100%', 
    backgroundColor: colors.cardBackground, 
    borderRadius: 16, 
    paddingHorizontal: 16 
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: colors.background 
  },
  menuItemNoBorder: { 
    borderBottomWidth: 0 
  },
  menuItemText: { 
    flex: 1, 
    fontFamily: 'Inter_500Medium', 
    color: colors.text, 
    fontSize: 16 
  },
  menuIcon: { 
    marginRight: 16 
  },
  dangerText: { 
    color: '#ef4444' 
  },
  loaderSpacing: { 
    marginTop: 20 
  }
});